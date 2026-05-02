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
import Link from 'next/link';

export function Hero() {
  const { openModal } = useApp();

  return (
    <section id="top" className="relative pt-32 pb-0">
      {/* Dynamic Background Elements */}
      <GradientGlow />
      <ParticlesBg />
      
      {/* Floating Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Wave Container — extends below hero into highlights */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10" style={{ height: '420px' }}>
        <div className="wave wave1" />
        <div className="wave wave2" />
        <div className="wave wave3" />
        <div className="wave wave4" />
      </div>

      <Container className="relative z-10 pb-36 md:pb-44">
        <RevealOnScroll>
          <div className="flex justify-center mb-8">
            <Badge dotColor={COLORS.green} className="bg-white/5 border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(52,168,83,0.15)]">
              {SITE.organizer}
            </Badge>
          </div>
        </RevealOnScroll>

        {/* === MAIN HERO TITLE === */}
        <RevealOnScroll delay={0.1}>
          <div className="relative inline-block w-full text-center">
            <h1
              className="font-brush text-center font-normal mb-2 select-none relative z-10"
              style={{
                fontSize: 'clamp(3.5rem, 13vw, 11rem)',
                lineHeight: 0.95,
                letterSpacing: '0.01em'
              }}
              aria-label="HackFest '26 AI"
            >
              <span className="text-white/20 inline-block mr-2 lg:mr-4" style={{ fontWeight: 400 }}>
                {'{'}
              </span>
              <span className="hero-rainbow-static inline-block">HackFest</span>
              <span className="text-white/20 inline-block ml-2 lg:ml-4" style={{ fontWeight: 400 }}>
                {'}'}
              </span>
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[100px] rounded-full -z-10" />
          </div>
        </RevealOnScroll>

        {/* === '26 line === */}
        <RevealOnScroll delay={0.18}>
          <div className="flex items-center justify-center gap-6 mb-12">
            <span className="font-mono text-2xl md:text-3xl font-bold tracking-[0.3em] text-emerald-400">
              2026
            </span>
          </div>
        </RevealOnScroll>

        {/* === Tagline === */}
        <RevealOnScroll delay={0.32}>
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-medium">
              16-17 Mayıs 2026'da İstinye Üniversitesi Vadi kampüsünde; 2 gün boyunca sürecek hackathon, workshoplar, ilham verici konuşmalar, renkli standlar, büyük ödüller ve sürpriz çekilişler seni bekliyor!
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm font-mono tracking-[0.4em] uppercase">
              <span className="hero-rainbow-static opacity-80">Kodla</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="hero-rainbow-static opacity-80">Yarat</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="hero-rainbow-static opacity-80">Deneyimle</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* === CTAs === */}
        <RevealOnScroll delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <Button onClick={() => openModal('hack')} size="xl" className="px-12 h-16 text-lg rounded-2xl bg-white text-black hover:bg-emerald-400 hover:text-black transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] border-none" iconRight={<ArrowRightIcon />}>
              HACKATHON
            </Button>
            <Button as={Link} href="/speakers" variant="ghost" size="xl" className="px-12 h-16 text-lg rounded-2xl border-white/10 hover:bg-white/5 backdrop-blur-md text-white">
              KONUŞMACILAR
            </Button>
          </div>
        </RevealOnScroll>

        {/* === Countdown === */}
        <RevealOnScroll delay={0.48}>
          <div className="max-w-4xl mx-auto relative group">
             {/* Reflection/Glow Effect under Countdown */}
             <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-emerald-500/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent shadow-[0_0_20px_rgba(52,168,83,0.3)]" />
             
             <Countdown />
          </div>
        </RevealOnScroll>
      </Container>

      {/* 🌫️ Bottom Gradient — waves show in middle band, hard-fade at very bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20" style={{height:'320px', background:'linear-gradient(to top, #05071A 0%, #05071A 12%, rgba(5,7,26,0.5) 40%, transparent 100%)'}} />

      <style>{`
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background-repeat: repeat-x;
          background-size: 50% 100%;
          transform-origin: center bottom;
        }
        .wave1 {
          animation: wave-anim 20s linear infinite;
          opacity: 0.25;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 420" fill="%234285F4"><path d="M0 210 C400 105 400 315 800 210 C1200 105 1200 315 1600 210 L1600 420 L0 420 Z" /></svg>');
        }
        .wave2 {
          animation: wave-anim 15s linear infinite reverse;
          opacity: 0.18;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 420" fill="%2334D399"><path d="M0 210 C400 315 400 105 800 210 C1200 315 1200 105 1600 210 L1600 420 L0 420 Z" /></svg>');
        }
        .wave3 {
          animation: wave-anim 10s linear infinite;
          opacity: 0.12;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 420" fill="%238B5CF6"><path d="M0 210 C400 105 400 315 800 210 C1200 105 1200 315 1600 210 L1600 420 L0 420 Z" /></svg>');
        }
        .wave4 {
          animation: wave-anim 25s linear infinite reverse;
          opacity: 0.14;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 420" fill="%2306B6D4"><path d="M0 210 C400 315 400 105 800 210 C1200 315 1200 105 1600 210 L1600 420 L0 420 Z" /></svg>');
        }
        @keyframes wave-anim {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-rainbow-static {
          background: linear-gradient(to right, #4285F4, #34A853, #FBBC05, #EA4335);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
