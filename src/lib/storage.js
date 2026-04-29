/**
 * File storage layer.
 *
 * Production (Vercel):
 *   Vercel Blob — BLOB_READ_WRITE_TOKEN env var otomatik.
 *   Yüklenen dosyalar global edge-cache'li CDN URL'sine döner.
 *
 * Development (lokal):
 *   public/uploads/ altına yazar, /uploads/... URL'i döner.
 *
 * Public API:
 *   uploadFile(buffer, filename, contentType) → public URL
 */

import fs from 'fs/promises';
import path from 'path';

const BLOB_AVAILABLE = !!process.env.BLOB_READ_WRITE_TOKEN;

let blobClient = null;
async function getBlob() {
  if (!BLOB_AVAILABLE) return null;
  if (blobClient) return blobClient;
  const mod = await import('@vercel/blob');
  blobClient = mod;
  return blobClient;
}

/**
 * @param {Buffer} buffer  - dosya içeriği
 * @param {string} pathname - blob içindeki anahtar (örn. "speakers/eda.jpg")
 * @param {string} contentType - MIME type
 * @returns {Promise<string>} public URL
 */
export async function uploadFile(buffer, pathname, contentType) {
  if (BLOB_AVAILABLE) {
    const { put } = await getBlob();
    const result = await put(pathname, buffer, {
      access: 'public',
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true
    });
    return result.url;
  }

  // Local dev fallback: yaz public/uploads/...
  const targetDir = path.join(process.cwd(), 'public', 'uploads', path.dirname(pathname));
  await fs.mkdir(targetDir, { recursive: true });
  const targetFile = path.join(process.cwd(), 'public', 'uploads', pathname);
  await fs.writeFile(targetFile, buffer);
  return `/uploads/${pathname}`;
}

export const STORAGE_BACKEND = BLOB_AVAILABLE ? 'vercel-blob' : 'local-fs';
