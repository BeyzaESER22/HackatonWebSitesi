/**
 * Hybrid storage layer.
 *
 * Production (Vercel):
 *   Vercel KV (Redis) — KV_URL/KV_REST_API_URL/KV_REST_API_TOKEN env vars otomatik.
 *
 * Development (lokal):
 *   data/*.json dosyaları — env yoksa fallback, eski davranış aynen korunur.
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

// Filename → KV key (e.g. "hackathon-applications.json" → "store:hackathon-applications")
function fileToKey(filename) {
  return `store:${filename.replace(/\.json$/, '')}`;
}

// ───────── KV implementation ─────────

async function kvRead(filename) {
  const kv = await getKv();
  const key = fileToKey(filename);
  const data = await kv.get(key);
  return Array.isArray(data) ? data : [];
}

async function kvAppend(filename, record) {
  const kv = await getKv();
  const key = fileToKey(filename);
  const existing = (await kv.get(key)) || [];
  const items = Array.isArray(existing) ? existing : [];
  items.push(record);
  await kv.set(key, items);
  return record;
}

async function kvWrite(filename, items) {
  const kv = await getKv();
  await kv.set(fileToKey(filename), items);
}

// ───────── Local fs implementation (dev fallback) ─────────

const DATA_DIR = path.join(process.cwd(), 'data');

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

async function fsRead(filename) {
  const full = await fsEnsureFile(filename);
  const raw = await fs.readFile(full, 'utf8');
  try { return JSON.parse(raw || '[]'); } catch { return []; }
}

async function fsAppend(filename, record) {
  const items = await fsRead(filename);
  items.push(record);
  const full = path.join(DATA_DIR, filename);
  await fs.writeFile(full, JSON.stringify(items, null, 2), 'utf8');
  return record;
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

export async function appendToStore(filename, record) {
  return KV_AVAILABLE ? kvAppend(filename, record) : fsAppend(filename, record);
}

export async function writeStore(filename, items) {
  return KV_AVAILABLE ? kvWrite(filename, items) : fsWrite(filename, items);
}

export const STORE_BACKEND = KV_AVAILABLE ? 'vercel-kv' : 'local-fs';
