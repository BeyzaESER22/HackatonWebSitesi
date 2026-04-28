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

        <RevealOnScroll delay={0.1}>
          <h1
            className="font-display text-center font-bold mb-8 g-word"
            style={{ fontSize: 'clamp(3rem, 11vw, 9.5rem)', lineHeight: 0.92, letterSpacing: '-0.045em' }}
          >
            <span className="b">H</span><span className="r">a</span><span className="y">c</span><span className="g">k</span>
            <span className="b">F</span><span className="r">e</span><span className="y">s</span><span className="g">t</span>
            <span className="text-white/90"> '26</span>
            <span className="block hf-text-gradient" style={{ fontSize: '.6em', letterSpacing: '-.02em', marginTop: '.1em' }}>AI</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <p className="text-center text-xl md:text-2xl text-ink-dim max-w-3xl mx-auto mb-4 font-light">
            Toplum Yararına Yapay Zeka ile <span className="text-white">Geleceği Kodla</span>.
          </p>
          <p className="text-center text-base text-ink-dim max-w-2xl mx-auto mb-12">
            16-17 Mayıs 2026 İstinye Üniversitesi Kampüsünde 2 gün sürecek hackathon, ilham veren konuşmalar ve büyük ödüller seni bekliyor.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
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

        <RevealOnScroll delay={0.4}>
          <div className="max-w-3xl mx-auto">
            <Countdown />
          </div>
        </RevealOnScroll>

        <div className="flex justify-center mt-16">
          <a href="#highlights" className="flex flex-col items-center gap-2 text-ink-dim text-xs uppercase tracking-[0.2em] hover:text-white transition">
            Aşağı kaydır
            <span className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
          </a>
        </div>
      </Container>
    </section>
  );
}
