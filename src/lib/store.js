import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureFile(filename) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const full = path.join(DATA_DIR, filename);
  try {
    await fs.access(full);
  } catch {
    await fs.writeFile(full, '[]', 'utf8');
  }
  return full;
}

export async function readStore(filename) {
  const full = await ensureFile(filename);
  const raw = await fs.readFile(full, 'utf8');
  try {
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

export async function appendToStore(filename, record) {
  const items = await readStore(filename);
  items.push(record);
  const full = path.join(DATA_DIR, filename);
  await fs.writeFile(full, JSON.stringify(items, null, 2), 'utf8');
  return record;
}

export async function writeStore(filename, items) {
  await ensureFile(filename);
  const full = path.join(DATA_DIR, filename);
  await fs.writeFile(full, JSON.stringify(items, null, 2), 'utf8');
}
