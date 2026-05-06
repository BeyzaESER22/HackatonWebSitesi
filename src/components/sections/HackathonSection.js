'use client';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { useApp } from '@/context/AppContext';
import { COLORS } from '@/lib/constants';

const bullets = [
  { color: COLORS.blue,   bold: 'Takım veya bireysel katılım', tail: ' — 1-5 kişilik gruplar.' },
  { color: COLORS.red,    bold: 'Mentor desteği',              tail: ' — Sektör profesyonelleri süreç boyunca yanınızda olacak.' },
  { color: COLORS.yellow, bold: 'Jüri değerlendirmesi',         tail: ' — 100 ana puan + 25 bonus seçeneği.' },
  { color: COLORS.green,  bold: 'Final sunumu & Demo Day',      tail: ' — Projeni jürinin önünde sahneye taşı.' },
  { color: '#8B5CF6',     bold: 'Büyük ödüller',                tail: '' }
];

export function HackathonSection() {
  const { openModal } = useApp();

  return (
    <section id="hackathon" className="relative z-10 py-24 lg:py-32 border-t border-white/5">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <RevealOnScroll>
            <div className="text-xs uppercase tracking-[0.22em] text-ink-dim mb-3">Hackathon</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05]">
              Toplum yararına <span className="hf-text-gradient">yapay zeka ile</span> üret.
            </h2>
            <p className="text-ink-dim text-lg mb-8 leading-relaxed">
              Eğitimde Yenilik teması etrafında gerçek dünya problemlerine
              yapay zeka ile çözüm geliştir. Tek başına ya da takımınla — sınır senin hayal gücün.
            </p>

            <ul className="space-y-3 mb-9">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${b.color}33` }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke={b.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span><span className="text-white font-medium">{b.bold}</span>{b.tail}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => openModal('hack')} iconRight={<ArrowRightIcon />}>Şimdi Başvur</Button>
              <Button as={Link} href="/hackathon" variant="ghost">Hackathon Hakkında Bilgi Al</Button>
            </div>
          </RevealOnScroll>

          {/* Right: terminal */}
          <RevealOnScroll delay={0.15}>
            <TerminalCard />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

function TerminalCard() {
  return (
    <div className="hf-glass overflow-hidden relative">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[.02]">
        <span className="w-3 h-3 rounded-full bg-google-red" />
        <span className="w-3 h-3 rounded-full bg-google-yellow" />
        <span className="w-3 h-3 rounded-full bg-google-green" />
        <span className="ml-3 font-mono text-xs text-ink-dim">~/hackfest26/team_alpha</span>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed">
        <div className="text-ink-dim"><span style={{ color: COLORS.green }}>$</span> python deploy.py --mission "for_society"</div>
        <div className="mt-3"><span style={{ color: COLORS.yellow }}>→</span> loading datasets...</div>
        <div><span style={{ color: COLORS.yellow }}>→</span> training neural network...</div>
        <div><span style={{ color: COLORS.yellow }}>→</span> evaluating social impact...</div>
        <div className="mt-3"><span style={{ color: COLORS.green }}>✓</span> accuracy: 94.7%</div>
        <div><span style={{ color: COLORS.green }}>✓</span> bias_audit: passed</div>
        <div><span style={{ color: COLORS.green }}>✓</span> impact_score: <span style={{ color: COLORS.blue }}>9.2/10</span></div>
        <div className="mt-4 p-3 rounded-lg" style={{ background: 'linear-gradient(120deg, rgba(66,133,244,.12), rgba(234,67,53,.12))' }}>
          <div className="text-white font-bold">🎯 Mission deployed.</div>
          <div className="text-ink-dim text-xs mt-1">Education accessibility +37% improved.</div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span style={{ color: COLORS.green }}>$</span>
          <span className="inline-block w-2 h-4 bg-white hf-caret" />
        </div>
      </div>
    </div>
  );
}
