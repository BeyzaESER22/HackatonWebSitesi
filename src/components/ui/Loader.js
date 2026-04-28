'use client';
import { COLORS } from '@/lib/constants';

export function Loader({ size = 36 }) {
  return (
    <div
      className="relative grid grid-cols-2 grid-rows-2 gap-[2px] animate-spin"
      style={{ width: size, height: size, animationDuration: '1.4s' }}
      aria-label="Yükleniyor"
      role="status"
    >
      <span className="rounded-tl-md" style={{ background: COLORS.blue }} />
      <span className="rounded-tr-md" style={{ background: COLORS.red }} />
      <span className="rounded-bl-md" style={{ background: COLORS.green }} />
      <span className="rounded-br-md" style={{ background: COLORS.yellow }} />
    </div>
  );
}

export function LoaderInline({ children }) {
  return (
    <div className="flex items-center gap-3 text-sm text-ink-dim">
      <Loader size={20} />
      {children || 'Yükleniyor...'}
    </div>
  );
}
