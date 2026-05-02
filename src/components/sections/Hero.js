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

      {/* Modern Wave Container - Maximized to reach next section */}
      <div className="absolute bottom-[-100px] left-0 w-full h-[800px] pointer-events-none overflow-hidden opacity-50 z-20">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </div>

      <Container className="relative z-10 pb-52">
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
              16-17 Mayıs 2026'da İstinye Üniversitesi kampüsünde; 2 gün boyunca sürecek hackathon, workshoplar, ilham verici konuşmalar, renkli standlar, büyük ödüller ve sürpriz çekilişler seni bekliyor!
            </p>
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
          <div className="max-w-4xl mx-auto">
             <Countdown />
          </div>
        </RevealOnScroll>
      </Container>

      {/* Wave CSS & New Animations */}
      <style>{`
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background-size: 50% 100%;
          transform-origin: center bottom;
        }
        
        .wave1 {
          animation: wave-anim 20s linear infinite;
          z-index: 1000;
          opacity: 0.2;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" fill="%234285F4"><path d="M0 200 C400 100 400 300 800 200 C1200 100 1200 300 1600 200 L1600 400 L0 400 Z" /></svg>');
        }
        
        .wave2 {
          animation: wave-anim 15s linear infinite reverse;
          z-index: 999;
          opacity: 0.15;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" fill="%2334D399"><path d="M0 200 C400 300 400 100 800 200 C1200 300 1200 100 1600 200 L1600 400 L0 400 Z" /></svg>');
        }
        
        .wave3 {
          animation: wave-anim 10s linear infinite;
          z-index: 998;
          opacity: 0.1;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" fill="%238B5CF6"><path d="M0 200 C400 100 400 300 800 200 C1200 100 1200 300 1600 200 L1600 400 L0 400 Z" /></svg>');
        }
        
        .wave4 {
          animation: wave-anim 12s linear infinite reverse;
          z-index: 997;
          opacity: 0.12;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" fill="%2306B6D4"><path d="M0 200 C400 300 400 100 800 200 C1200 300 1200 100 1600 200 L1600 400 L0 400 Z" /></svg>');
        }

        @keyframes wave-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .hero-rainbow-static {
          background: linear-gradient(
            to right,
            #4285F4, #34A853, #FBBC05, #EA4335
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
