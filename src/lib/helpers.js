import { clsx } from 'clsx';

/** Tailwind class concatenation helper. */
export function cn(...inputs) {
  return clsx(inputs);
}

/** Slugify Turkish strings safely for URLs / filenames. */
export function slugify(str = '') {
  const map = { 'ç':'c','Ç':'c','ğ':'g','Ğ':'g','ı':'i','İ':'i','ö':'o','Ö':'o','ş':'s','Ş':'s','ü':'u','Ü':'u' };
  return String(str)
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, ch => map[ch] || ch)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/** Number padding for countdowns / time formatting. */
export const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

/** Format ISO date into a TR-friendly readable string. */
export function formatDateTR(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

/** Generates a short random id for records. */
export function generateId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Safe filename: keep ascii letters, digits, dot, dash; rest → '-' */
export function safeFilename(name = '') {
  return name
    .normalize('NFKD')
    .replace(/[^\w.\-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120);
}

/** Bytes → human readable */
export function humanBytes(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const units = ['B','KB','MB','GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  return `${(bytes / Math.pow(k, i)).toFixed(i ? 1 : 0)} ${units[i]}`;
}

/** Simple HTML/Script tag stripping for input sanitization. */
export function sanitize(str = '') {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<[^>]*>/g, '') // strip tags
    .replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
}
