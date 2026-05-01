'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="xl:hidden absolute top-full left-0 right-0 hf-nav-blur border-t border-white/5"
        >
          <div className="px-6 py-6 flex flex-col gap-4 text-sm">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="hover:text-white text-ink-dim transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
              <Button as={Link} href="/register" onClick={onClose} className="justify-center">
                Hackathon'a Katıl
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
