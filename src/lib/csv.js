function escapeCell(value) {
  const raw = value == null ? '' : String(value);
  const safe = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function toCsv(rows) {
  return rows
    .map((row) => row.map((cell) => escapeCell(cell)).join(','))
    .join('\n');
}
