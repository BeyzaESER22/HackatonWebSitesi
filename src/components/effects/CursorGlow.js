'use client';
import { useEffect, useRef, useState } from 'react';

export function CursorGlow() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) { setEnabled(false); return; }

    const onMove = (e) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 transition-transform duration-150 ease-out"
      style={{
        width: 400,
        height: 400,
        background:
          'radial-gradient(circle, rgba(66,133,244,.10) 0%, rgba(66,133,244,0) 60%)',
        filter: 'blur(20px)'
      }}
    />
  );
}
