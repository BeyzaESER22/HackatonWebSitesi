'use client';
import { cn } from '@/lib/helpers';

export function SectionTitle({
  eyebrow,
  title,
  gradient,
  align = 'center',
  className,
  size = 'lg'
}) {
  const sizes = {
    md: 'text-3xl md:text-5xl',
    lg: 'text-4xl md:text-6xl',
    xl: 'text-4xl md:text-6xl lg:text-7xl'
  };
  const alignCls = align === 'left' ? 'text-left' : 'text-center';

  return (
    <div className={cn(alignCls, className)}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.22em] text-ink-dim mb-3">{eyebrow}</div>
      )}
      <h2 className={cn('font-display font-bold leading-[1.05]', sizes[size])}>
        {title} {gradient && <span className="hf-text-gradient">{gradient}</span>}
      </h2>
    </div>
  );
}
