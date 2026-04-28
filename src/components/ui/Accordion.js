'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function Accordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className="hf-glass overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg font-semibold pr-4">{item.q}</span>
              <span
                className={`shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xl transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-ink-dim leading-relaxed">{item.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
