'use client';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Countdown } from '@/components/ui/Countdown';
import { GradientGlow } from '@/components/effects/GradientGlow';
import { ParticlesBg } from '@/components/effects/ParticlesBg';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { COLORS, SITE } from '@/lib/constants';
import { useApp } from '@/context/AppContext';

export function Hero() {
  const { openModal } = useApp();

  return (
    <section id="top" className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
      <GradientGlow />
      <ParticlesBg />

      <Container className="relative z-10">
        <RevealOnScroll>
          <div className="flex justify-center mb-8">
            <Badge dotColor={COLORS.green}>{SITE.organizer}</Badge>
          </div>
        </RevealOnScroll>

        {/* === MAIN HERO TITLE === */}
        <RevealOnScroll delay={0.1}>
          <h1
            className="font-brush text-center font-normal mb-2 select-none"
            style={{
              fontSize: 'clamp(3.5rem, 13vw, 11rem)',
              lineHeight: 0.95,
              letterSpacing: '0.01em'
            }}
            aria-label="HackFest '26 AI"
          >
            <span className="text-white/95 inline-block mr-2 lg:mr-4" style={{ fontWeight: 400 }}>
              {'{'}
            </span>
            <span className="hero-rainbow inline-block">HackFest</span>
            <span className="text-white/95 inline-block ml-2 lg:ml-4" style={{ fontWeight: 400 }}>
              {'}'}
            </span>
          </h1>
        </RevealOnScroll>

        {/* === '26 + <AI/> line === */}
        <RevealOnScroll delay={0.18}>
          <div className="flex items-center justify-center gap-6 mb-10">
            <span className="font-brush text-3xl md:text-4xl" style={{ color: '#5EEAD4' }}>
              {"'"}26
            </span>
            <span className="font-mono text-base md:text-lg" style={{ color: '#5EEAD4' }}>
              {'<AI/>'}
            </span>
          </div>
        </RevealOnScroll>

        {/* === KODLA · YARAT · DENEYİMLE === */}
        <RevealOnScroll delay={0.25}>
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-10 text-xs md:text-sm tracking-[0.4em] uppercase text-ink-dim font-medium">
            <span>Kodla</span>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: COLORS.blue }} />
            <span>Yarat</span>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: COLORS.red }} />
            <span>Deneyimle</span>
          </div>
        </RevealOnScroll>

        {/* === Tagline === */}
        <RevealOnScroll delay={0.32}>
          <p className="text-center text-base md:text-lg text-ink-dim max-w-2xl mx-auto mb-12">
            16-17 Mayıs 2026 İstinye Üniversitesi Kampüsünde 2 gün sürecek hackathon, ilham veren konuşmalar ve büyük ödüller seni bekliyor.
          </p>
        </RevealOnScroll>

        {/* === CTAs === */}
        <RevealOnScroll delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button onClick={() => openModal('hack')} iconRight={<ArrowRightIcon />}>
              Hackathona Başvur
            </Button>
            <Button as="a" href="#program" variant="ghost"
              iconLeft={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>}>
              Etkinlik Programı
            </Button>
          </div>
        </RevealOnScroll>

        {/* === Countdown === */}
        <RevealOnScroll delay={0.48}>
          <div className="max-w-3xl mx-auto">
            <Countdown />
          </div>
        </RevealOnScroll>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <a href="#highlights" className="flex flex-col items-center gap-2 text-ink-dim text-xs uppercase tracking-[0.2em] hover:text-white transition">
            Aşağı kaydır
            <span className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
          </a>
        </div>
      </Container>

      {/* Inline rainbow gradient class — kept here so it stays paired with this component */}
      <style>{`
        .hero-rainbow {
          background: linear-gradient(
            90deg,
            #EF4444 0%,
            #F97316 18%,
            #EAB308 36%,
            #22C55E 54%,
            #3B82F6 76%,
            #8B5CF6 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 6px 24px rgba(99,102,241,.25));
        }
      `}</style>
    </section>
  );
}
