'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '@/lib/helpers';

export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  subtitle,
  children,
  size = 'md',
  surface = 'default',
  panelClassName
}) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const widthClass = size === 'xl' ? 'max-w-6xl' : size === 'lg' ? 'max-w-2xl' : 'max-w-xl';
  const isPlainSurface = surface === 'plain';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-navy-900/75 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              'relative w-full max-h-[90vh] overflow-y-auto',
              widthClass,
              isPlainSurface
                ? 'overflow-x-visible'
                : 'rounded-3xl border border-white/10 p-7 shadow-soft lg:p-9',
              panelClassName
            )}
            style={isPlainSurface ? undefined : { background: 'linear-gradient(180deg, #0E1740, #070C25)' }}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <button
              onClick={onClose}
              aria-label="Kapat"
              className={cn(
                'absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition hover:bg-white/5',
                isPlainSurface && 'bg-navy-900/70 backdrop-blur-md'
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {!isPlainSurface && eyebrow && (
              <div className="mb-2 text-xs uppercase tracking-[0.22em] text-ink-dim">{eyebrow}</div>
            )}
            {!isPlainSurface && title && <h3 className="mb-1 font-display text-2xl font-bold">{title}</h3>}
            {!isPlainSurface && subtitle && <p className="mb-6 text-sm text-ink-dim">{subtitle}</p>}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
