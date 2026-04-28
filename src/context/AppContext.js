'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [toast, setToast] = useState(null); // { title, message, type }
  const [activeModal, setActiveModal] = useState(null); // 'hack' | 'speaker' | null

  const showToast = useCallback((opts, durationMs = 3500) => {
    setToast({ type: 'success', ...opts });
    setTimeout(() => setToast(null), durationMs);
  }, []);

  const openModal  = useCallback((id) => setActiveModal(id), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const value = { toast, showToast, activeModal, openModal, closeModal };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>.');
  return ctx;
}
