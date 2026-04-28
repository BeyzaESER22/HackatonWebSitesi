'use client';
import { useEffect, useState, useCallback } from 'react';

export function useModal(initial = false) {
  const [open, setOpen] = useState(initial);

  const openModal  = useCallback(() => setOpen(true),  []);
  const closeModal = useCallback(() => setOpen(false), []);
  const toggle     = useCallback(() => setOpen(o => !o), []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeModal]);

  return { open, openModal, closeModal, toggle };
}
