/**
 * Hybrid storage layer.
 *
 * Production (Vercel):
 *   Vercel KV (Redis) primary store + Blob backup-on-failure.
 *
 * Development (lokal):
 *   data/*.json + append-only ndjson log dosyaları.
 *
 * Aynı API:
 *   readStore(filename) → array
 *   appendToStore(filename, record) → record
 *   writeStore(filename, items) → void
 */

import fs from 'fs/promises';
import path from 'path';

// KV mevcut mu? (Vercel'de otomatik tanımlanır.)
const KV_AVAILABLE =
  !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
  !!process.env.KV_URL;

let kvClient = null;
async function getKv() {
  if (!KV_AVAILABLE) return null;
  if (kvClient) return kvClient;
  const mod = await import('@vercel/kv');
  kvClient = mod.kv;
  return kvClient;
}

const BLOB_AVAILABLE = !!process.env.BLOB_READ_WRITE_TOKEN;
let blobModule = null;

async function getBlobModule() {
  if (!BLOB_AVAILABLE) return null;
  if (blobModule) return blobModule;
  blobModule = await import('@vercel/blob');
  return blobModule;
}

// Filename → KV key (e.g. "hackathon-applications.json" → "store:hackathon-applications")
function fileToKey(filename) {
  return `store:${filename.replace(/\.json$/, '')}`;
}

function fileToListKey(filename) {
  return `${fileToKey(filename)}:v2:list`;
}

function fileToItemKey(filename, id) {
  return `${fileToKey(filename)}:v2:item:${id}`;
}

function fileToDedupeKey(filename, dedupeKey) {
  return `${fileToKey(filename)}:v2:submission:${dedupeKey}`;
}

function backupPath(filename, key) {
  const base = filename.replace(/\.json$/, '');
  return `structured-backups/${base}/${key}.json`;
}

function safeParseJson(value) {
  if (value == null) return null;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function normalizeRecords(records) {
  const deduped = new Map();

  for (const item of records) {
    const record = safeParseJson(item);
    if (!record || typeof record !== 'object') continue;
    const key = record.id || record.clientSubmissionId || JSON.stringify(record);
    if (!deduped.has(key)) deduped.set(key, record);
  }

  return [...deduped.values()];
}

async function readBackupRecords(filename) {
  if (BLOB_AVAILABLE) {
    const blob = await getBlobModule();
    const prefix = backupPath(filename, '').replace(/\/\.json$/, '/');
    let cursor = undefined;
    const records = [];

    do {
      const page = await blob.list({ prefix, cursor, limit: 1000 });
      cursor = page.hasMore ? page.cursor : undefined;

      const payloads = await Promise.all(
        page.blobs.map(async (entry) => {
          const res = await fetch(entry.downloadUrl, { cache: 'no-store' });
          if (!res.ok) return null;
          return safeParseJson(await res.text());
        })
      );

      for (const payload of payloads) {
        if (payload) records.push(payload);
      }
    } while (cursor);

    return records;
  }

  const dir = path.join(process.cwd(), 'data', '_structured_backups', filename.replace(/\.json$/, ''));
  try {
    const files = await fs.readdir(dir);
    const payloads = await Promise.all(
      files
        .filter((file) => file.endsWith('.json'))
        .map(async (file) => safeParseJson(await fs.readFile(path.join(dir, file), 'utf8')))
    );
    return payloads.filter(Boolean);
  } catch {
    return [];
  }
}

async function writeBackupRecord(filename, record, backupKey) {
  const key = backupKey || record.clientSubmissionId || record.id;

  if (BLOB_AVAILABLE) {
    const blob = await getBlobModule();
    await blob.put(
      backupPath(filename, key),
      JSON.stringify({ ...record, persistenceStatus: 'backup-only' }),
      {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true
      }
    );
    return true;
  }

  const dir = path.join(process.cwd(), 'data', '_structured_backups', filename.replace(/\.json$/, ''));
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, `${key}.json`),
    JSON.stringify({ ...record, persistenceStatus: 'backup-only' }, null, 2),
    'utf8'
  );
  return true;
}

// ───────── KV implementation ─────────

async function kvRead(filename) {
  const kv = await getKv();
  const [listData, legacyData, backupData] = await Promise.all([
    kv.lrange(fileToListKey(filename), 0, -1).catch(() => []),
    kv.get(fileToKey(filename)).catch(() => []),
    readBackupRecords(filename).catch(() => [])
  ]);

  return normalizeRecords([
    ...(Array.isArray(legacyData) ? legacyData : []),
    ...(Array.isArray(listData) ? listData : []),
    ...(Array.isArray(backupData) ? backupData : [])
  ]);
}

async function resolveExistingRecordFromKv(kv, filename, ref) {
  const normalizedRef = typeof ref === 'string' ? ref.replace(/^pending:/, '') : '';
  if (!normalizedRef) return null;

  const existing = await kv.get(fileToItemKey(filename, normalizedRef)).catch(() => null);
  if (existing) return existing;

  const listData = await kv.lrange(fileToListKey(filename), 0, -1).catch(() => []);
  const records = normalizeRecords(listData);
  return records.find((item) => item.id === normalizedRef || item.clientSubmissionId === normalizedRef) || null;
}

async function kvAppend(filename, record, options = {}) {
  const kv = await getKv();
  const dedupeToken = options.dedupeKey || record.clientSubmissionId || null;
  const dedupeKey = dedupeToken ? fileToDedupeKey(filename, dedupeToken) : null;

  if (dedupeKey) {
    const claimed = await kv.setnx(dedupeKey, `pending:${record.id}`);
    if (!claimed) {
      const ref = await kv.get(dedupeKey);
      const normalizedRef = typeof ref === 'string' ? ref.replace(/^pending:/, '') : '';
      const existing = await resolveExistingRecordFromKv(kv, filename, ref);
      return {
        record: existing || { ...record, id: normalizedRef || record.id },
        duplicate: true,
        persisted: 'primary'
      };
    }
  }

  try {
    await kv.rpush(fileToListKey(filename), JSON.stringify(record));
  } catch (error) {
    if (dedupeKey) {
      await kv.del(dedupeKey).catch(() => {});
    }

    const backupSaved = await writeBackupRecord(filename, record, dedupeToken || record.id).catch(() => false);
    if (backupSaved) {
      return {
        record: { ...record, persistenceStatus: 'backup-only' },
        duplicate: false,
        persisted: 'backup'
      };
    }

    throw error;
  }

  const sideEffects = [
    kv.set(fileToItemKey(filename, record.id), record)
  ];

  if (dedupeKey) {
    sideEffects.push(kv.set(dedupeKey, record.id));
  }

  const sideEffectResults = await Promise.allSettled(sideEffects);
  sideEffectResults.forEach((result) => {
    if (result.status === 'rejected') {
      console.error('KV side-effect warning:', result.reason);
    }
  });

  return {
    record,
    duplicate: false,
    persisted: 'primary'
  };
}

async function kvWrite(filename, items) {
  const kv = await getKv();
  await kv.set(fileToKey(filename), items);
}

// ───────── Local fs implementation (dev fallback) ─────────

const DATA_DIR = path.join(process.cwd(), 'data');
const LOG_DIR = path.join(DATA_DIR, '_append_logs');
const DEDUPE_DIR = path.join(DATA_DIR, '_submission_keys');

async function fsEnsureFile(filename) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const full = path.join(DATA_DIR, filename);
  try {
    await fs.access(full);
  } catch {
    await fs.writeFile(full, '[]', 'utf8');
  }
  return full;
}

async function fsEnsureLog(filename) {
  await fs.mkdir(LOG_DIR, { recursive: true });
  const full = path.join(LOG_DIR, `${filename.replace(/\.json$/, '')}.ndjson`);
  try {
    await fs.access(full);
  } catch {
    await fs.writeFile(full, '', 'utf8');
  }
  return full;
}

async function fsEnsureDedupeDir(filename) {
  const dir = path.join(DEDUPE_DIR, filename.replace(/\.json$/, ''));
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

async function fsRead(filename) {
  const [full, logFull, backupRecords] = await Promise.all([
    fsEnsureFile(filename),
    fsEnsureLog(filename),
    readBackupRecords(filename)
  ]);

  const [raw, logRaw] = await Promise.all([
    fs.readFile(full, 'utf8'),
    fs.readFile(logFull, 'utf8')
  ]);

  let arrayData = [];
  try {
    arrayData = JSON.parse(raw || '[]');
  } catch {
    arrayData = [];
  }

  const logData = logRaw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => safeParseJson(line))
    .filter(Boolean);

  return normalizeRecords([
    ...(Array.isArray(arrayData) ? arrayData : []),
    ...logData,
    ...(Array.isArray(backupRecords) ? backupRecords : [])
  ]);
}

async function fsAppend(filename, record, options = {}) {
  const dedupeToken = options.dedupeKey || record.clientSubmissionId || null;
  let dedupeFile = null;

  if (dedupeToken) {
    const dir = await fsEnsureDedupeDir(filename);
    dedupeFile = path.join(dir, `${dedupeToken}.txt`);

    try {
      const existingId = await fs.readFile(dedupeFile, 'utf8');
      return {
        record: { ...record, id: existingId.trim() || record.id },
        duplicate: true,
        persisted: 'primary'
      };
    } catch {}

    try {
      await fs.writeFile(dedupeFile, record.id, { flag: 'wx' });
    } catch {
      try {
        const existingId = await fs.readFile(dedupeFile, 'utf8');
        return {
          record: { ...record, id: existingId.trim() || record.id },
          duplicate: true,
          persisted: 'primary'
        };
      } catch {}
    }
  }

  const logFull = await fsEnsureLog(filename);
  try {
    await fs.appendFile(logFull, `${JSON.stringify(record)}\n`, 'utf8');
  } catch (error) {
    if (dedupeFile) {
      await fs.unlink(dedupeFile).catch(() => {});
    }
    throw error;
  }

  return {
    record,
    duplicate: false,
    persisted: 'primary'
  };
}

async function fsWrite(filename, items) {
  await fsEnsureFile(filename);
  const full = path.join(DATA_DIR, filename);
  await fs.writeFile(full, JSON.stringify(items, null, 2), 'utf8');
}

// ───────── Public API (auto-routes to KV or fs) ─────────

export async function readStore(filename) {
  return KV_AVAILABLE ? kvRead(filename) : fsRead(filename);
}

export async function appendToStore(filename, record, options = {}) {
  return KV_AVAILABLE ? kvAppend(filename, record, options) : fsAppend(filename, record, options);
}

export async function writeStore(filename, items) {
  return KV_AVAILABLE ? kvWrite(filename, items) : fsWrite(filename, items);
}

export const STORE_BACKEND = KV_AVAILABLE ? 'vercel-kv' : 'local-fs';
