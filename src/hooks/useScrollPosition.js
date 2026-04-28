'use client';
import { useEffect, useState } from 'react';

export function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY;
      setY(next);
      setScrolled(next > 30);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { y, scrolled };
}
