'use client';
import { COLORS } from '@/lib/constants';

/**
 * GradientGlow — drops floating glowing orbs behind a section.
 * Place inside a `position: relative` parent.
 */
export function GradientGlow({ orbs }) {
  const set = orbs || [
    { color: COLORS.blue,  size: 520, x: '-120px', y: '80px',  opacity: 0.55, delay: '0s' },
    { color: COLORS.red,   size: 420, right: '-100px', y: '200px', opacity: 0.4, delay: '-3s' },
    { color: COLORS.green, size: 380, x: '30%',  bottom: '-120px', opacity: 0.35, delay: '-7s' }
  ];

  return (
    <>
      {set.map((o, i) => (
        <div
          key={i}
          className="hf-orb animate-float"
          style={{
            width: o.size, height: o.size,
            background: o.color,
            opacity: o.opacity ?? 0.5,
            left: o.x, right: o.right,
            top: o.y, bottom: o.bottom,
            animationDelay: o.delay
          }}
        />
      ))}
    </>
  );
}
