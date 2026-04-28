'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const colorMap = {
  success: { ring: 'rgba(52,168,83,.2)',  stroke: '#34A853' },
  error:   { ring: 'rgba(234,67,53,.2)',  stroke: '#EA4335' },
  info:    { ring: 'rgba(66,133,244,.2)', stroke: '#4285F4' }
};

export function Toast() {
  const { toast } = useApp();
  const c = colorMap[toast?.type] || colorMap.success;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-[200] hf-glass px-6 py-4 flex items-center gap-3 -translate-x-1/2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: c.ring }}>
            {toast.type === 'error' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l5 5L20 7" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div>
            <div className="font-semibold text-sm">{toast.title}</div>
            {toast.message && <div className="text-xs text-ink-dim">{toast.message}</div>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
