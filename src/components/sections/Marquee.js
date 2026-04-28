'use client';
import { COLORS } from '@/lib/constants';

/**
 * Marquee — Sticker rozetler + ana metin döner.
 *
 * Tasarım: Google marka renklerinde 4 farklı sticker (4 köşeli rotated
 * kareler — site logosunun mini hali) ve aralarına geçen "HACKATHON ·
 * KONUŞMACI ETKİNLİKLERİ" metni.
 */

const Sticker = ({ size = 32, rotate = 0 }) => (
  <span
    aria-hidden="true"
    className="inline-flex shrink-0"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <span
      className="relative grid grid-cols-2 grid-rows-2 gap-[3px] rotate-45"
      style={{ width: size, height: size }}
    >
      <span className="rounded-tl-md" style={{ background: COLORS.blue }} />
      <span className="rounded-tr-md" style={{ background: COLORS.red }} />
      <span className="rounded-bl-md" style={{ background: COLORS.green }} />
      <span className="rounded-br-md" style={{ background: COLORS.yellow }} />
    </span>
  </span>
);

const Sparkle = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={color} aria-hidden="true" className="shrink-0">
    <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
  </svg>
);

export function Marquee() {
  return (
    <section className="relative z-10 py-6 border-y border-white/5 bg-white/[.015] overflow-hidden">
      <div className="hf-marquee no-scrollbar">
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}

function Track({ ariaHidden }) {
  // Each "block" is sticker — text — sparkle — text pattern, repeated
  return (
    <div
      className="hf-marquee-track flex items-center font-display text-2xl md:text-3xl font-semibold text-ink-dim"
      aria-hidden={ariaHidden}
    >
      <Block />
      <Block />
      <Block />
      <Block />
    </div>
  );
}

function Block() {
  return (
    <>
      <Sticker rotate={-8} />
      <span className="text-white">HACKATHON</span>
      <Sparkle color={COLORS.blue} />
      <span className="text-ink-dim">KONUŞMACI ETKİNLİKLERİ</span>
      <Sticker rotate={6} />
      <span className="text-white">AI · TOPLUM YARARINA</span>
      <Sparkle color={COLORS.yellow} />
      <span className="text-ink-dim">16-17 MAYIS 2026</span>
    </>
  );
}
