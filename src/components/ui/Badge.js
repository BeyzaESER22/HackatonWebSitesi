'use client';
import { cn } from '@/lib/helpers';

export function Badge({ children, dotColor, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10',
        'bg-white/[0.04] backdrop-blur-md text-xs uppercase tracking-[0.18em] text-ink-dim',
        className
      )}
    >
      {dotColor && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: dotColor }} />
          <span className="relative rounded-full w-2 h-2" style={{ background: dotColor }} />
        </span>
      )}
      {children}
    </span>
  );
}
