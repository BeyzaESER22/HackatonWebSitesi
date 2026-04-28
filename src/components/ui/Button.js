'use client';
import { cn } from '@/lib/helpers';

const variants = {
  primary:
    'bg-g-cta bg-[length:200%_200%] text-white shadow-glow hover:shadow-glow-red hover:-translate-y-0.5 hover:bg-right-bottom transition-all duration-300',
  ghost:
    'border border-white/15 bg-white/[0.04] text-ink hover:border-white/30 hover:bg-white/[0.08] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur',
  outline:
    'border border-white/20 bg-transparent text-ink hover:bg-white/[0.04] transition-all duration-300',
  link:
    'text-ink-dim hover:text-white underline-offset-4 hover:underline transition'
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base'
};

export function Button({
  as: As = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  iconRight,
  iconLeft,
  ...props
}) {
  return (
    <As
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </As>
  );
}

export function ArrowRightIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
