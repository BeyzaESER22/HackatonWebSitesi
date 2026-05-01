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
    <section id="top" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#05071A]">
      {/* Dynamic Background Elements */}
      <GradientGlow />
      <ParticlesBg />
      
      {/* Floating Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <RevealOnScroll>
          <div className="flex justify-center mb-8">
            <Badge dotColor={COLORS.green} className="bg-white/5 border-white/10 backdrop-blur-md">
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
              <span className="text-white/95 inline-block mr-2 lg:mr-4 opacity-50" style={{ fontWeight: 400 }}>
                {'{'}
              </span>
              <span className="hero-rainbow-animate inline-block">HackFest</span>
              <span className="text-white/95 inline-block ml-2 lg:ml-4 opacity-50" style={{ fontWeight: 400 }}>
                {'}'}
              </span>
            </h1>
            {/* Glow effect behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-3xl rounded-full opacity-50 -z-10" />
          </div>
        </RevealOnScroll>

        {/* === '26 + <AI/> line === */}
        <RevealOnScroll delay={0.18}>
          <div className="flex items-center justify-center gap-6 mb-10">
            <span className="font-brush text-3xl md:text-4xl animate-pulse" style={{ color: '#5EEAD4' }}>
              {"'"}26
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#5EEAD4]/50 to-transparent" />
            <span className="font-mono text-base md:text-lg tracking-widest" style={{ color: '#5EEAD4' }}>
              {'<AI/>'}
            </span>
          </div>
        </RevealOnScroll>

        {/* === KODLA · YARAT · DENEYİMLE === */}
        <RevealOnScroll delay={0.25}>
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 text-xs md:text-sm tracking-[0.5em] uppercase text-white/70 font-bold">
            <span className="hover:text-white transition-colors cursor-default">Kodla</span>
            <span className="w-2 h-2 rounded-full hf-pulse-dot shadow-[0_0_10px_rgba(66,133,244,0.8)]" style={{ background: COLORS.blue }} />
            <span className="hover:text-white transition-colors cursor-default">Yarat</span>
            <span className="w-2 h-2 rounded-full hf-pulse-dot shadow-[0_0_10px_rgba(234,67,53,0.8)]" style={{ background: COLORS.red, animationDelay: '0.5s' }} />
            <span className="hover:text-white transition-colors cursor-default">Deneyimle</span>
          </div>
        </RevealOnScroll>

        {/* === Tagline === */}
        <RevealOnScroll delay={0.32}>
          <div className="max-w-2xl mx-auto mb-14 text-center">
            <p className="text-base md:text-xl text-ink-dim leading-relaxed mb-4">
              16-17 Mayıs 2026 İstinye Üniversitesi Kampüsünde 2 gün sürecek hackathon, ilham veren konuşmalar ve büyük ödüller seni bekliyor.
            </p>
            <div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-cyan-400/80">
              <span className="w-8 h-px bg-cyan-400/30" />
              AI · TOPLUM YARARINA
              <span className="w-8 h-px bg-cyan-400/30" />
            </div>
          </div>
        </RevealOnScroll>

        {/* === CTAs === */}
        <RevealOnScroll delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
            <Button onClick={() => openModal('hack')} size="lg" className="px-10 h-14 text-base shadow-[0_0_30px_rgba(66,133,244,0.3)]" iconRight={<ArrowRightIcon />}>
              HACKATHON
            </Button>
            <Button as={Link} href="/speakers" variant="ghost" size="lg" className="px-10 h-14 text-base border-white/10 hover:bg-white/5 backdrop-blur-sm">
              KONUŞMACI ETKİNLİKLERİ
            </Button>
          </div>
        </RevealOnScroll>

        {/* === Countdown === */}
        <RevealOnScroll delay={0.48}>
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-red-500/10 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-[32px] p-2">
               <div className="text-[10px] text-center font-bold uppercase tracking-[0.4em] text-ink-dim pt-6 pb-2">Etkinliğe Kalan Süre</div>
               <Countdown />
            </div>
          </div>
        </RevealOnScroll>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-20">
          <a href="#highlights" className="flex flex-col items-center gap-3 group">
            <span className="text-ink-dim text-[10px] font-bold uppercase tracking-[0.3em] group-hover:text-white transition-colors">Aşağı kaydır</span>
            <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-scroll-line" />
            </div>
          </a>
        </div>
      </Container>

      {/* Hero Specific Animations */}
      <style>{`
        @keyframes hero-rainbow-move {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .hero-rainbow-animate {
          background: linear-gradient(
            90deg,
            #EF4444, #F97316, #EAB308, #22C55E, #3B82F6, #8B5CF6, #EF4444
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: hero-rainbow-move 8s linear infinite;
          filter: drop-shadow(0 0 20px rgba(66,133,244,0.15));
        }

        .animate-scroll-line {
          animation: scroll-line 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </section>
  );
}
