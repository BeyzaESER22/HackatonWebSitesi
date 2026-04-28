'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export function Modal({ open, onClose, title, eyebrow, subtitle, children, size = 'md' }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const widthClass = size === 'lg' ? 'max-w-2xl' : 'max-w-xl';

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
            className={`relative ${widthClass} w-full max-h-[90vh] overflow-y-auto rounded-3xl p-7 lg:p-9 shadow-soft border border-white/10`}
            style={{ background: 'linear-gradient(180deg, #0E1740, #070C25)' }}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {eyebrow && (
              <div className="text-xs uppercase tracking-[0.22em] text-ink-dim mb-2">{eyebrow}</div>
            )}
            {title && <h3 className="font-display text-2xl font-bold mb-1">{title}</h3>}
            {subtitle && <p className="text-sm text-ink-dim mb-6">{subtitle}</p>}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
