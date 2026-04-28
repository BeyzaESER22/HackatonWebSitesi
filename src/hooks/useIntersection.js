'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * useIntersection — fires once an element enters viewport.
 * Returns [ref, hasIntersected].
 */
export function useIntersection({ threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && seen)) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            setSeen(true);
            if (once) obs.unobserve(en.target);
          } else if (!once) {
            setSeen(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once, seen]);

  return [ref, seen];
}
