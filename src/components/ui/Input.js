'use client';
import { cn, humanBytes } from '@/lib/helpers';

const fieldBase =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-ink ' +
  'placeholder:text-ink-mute focus:outline-none focus:border-google-blue/60 focus:bg-google-blue/[0.06] ' +
  'transition-colors';

export function FieldLabel({ children, htmlFor, error }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs text-ink-dim mb-1.5 font-medium">
      {children}
      {error && <span className="text-google-red ml-2">— {error}</span>}
    </label>
  );
}

export function Input({ label, name, error, className, ...props }) {
  return (
    <div className="mb-4">
      {label && <FieldLabel htmlFor={name} error={error}>{label}</FieldLabel>}
      <input id={name} name={name} className={cn(fieldBase, className)} {...props} />
    </div>
  );
}

export function Select({ label, name, error, children, className, ...props }) {
  return (
    <div className="mb-4">
      {label && <FieldLabel htmlFor={name} error={error}>{label}</FieldLabel>}
      <select id={name} name={name} className={cn(fieldBase, 'cursor-pointer [&>option]:bg-navy-900', className)} {...props}>
        {children}
      </select>
    </div>
  );
}

export function Textarea({ label, name, error, rows = 4, className, ...props }) {
  return (
    <div className="mb-4">
      {label && <FieldLabel htmlFor={name} error={error}>{label}</FieldLabel>}
      <textarea id={name} name={name} rows={rows} className={cn(fieldBase, 'resize-y min-h-[88px]', className)} {...props} />
    </div>
  );
}

export function FileInput({ label, name, error, accept, maxBytes, hint, file, onFile, className }) {
  const handleChange = (e) => {
    const f = e.target.files?.[0] || null;
    if (!f) return onFile?.(null);
    if (maxBytes && f.size > maxBytes) {
      alert(`Dosya çok büyük (${humanBytes(f.size)}). Maksimum: ${humanBytes(maxBytes)}.`);
      e.target.value = '';
      return onFile?.(null);
    }
    onFile?.(f);
  };

  return (
    <div className="mb-4">
      {label && <FieldLabel htmlFor={name} error={error}>{label}</FieldLabel>}
      <label
        htmlFor={name}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition',
          className
        )}
      >
        <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm truncate">
            {file ? file.name : 'Dosya seç ya da buraya sürükle'}
          </div>
          <div className="text-[11px] text-ink-mute">
            {file ? humanBytes(file.size) : (hint || 'Tıkla')}
          </div>
        </div>
        <input id={name} name={name} type="file" className="hidden" accept={accept} onChange={handleChange} />
      </label>
    </div>
  );
}
