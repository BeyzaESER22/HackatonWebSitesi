'use client';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { sponsors } from '@/data/sponsors';
import { COLORS } from '@/lib/constants';
import { useApp } from '@/context/AppContext';

const bullets = [
  { color: COLORS.blue,   bold: 'Takım veya bireysel katılım', tail: ' — 1-5 kişilik gruplar.' },
  { color: COLORS.red,    bold: 'Mentor desteği',              tail: ' — Sektör profesyonelleri süreç boyunca yanınızda olacak.' },
  { color: COLORS.yellow, bold: 'Jüri değerlendirmesi',         tail: ' — 100 ana puan + 25 bonus seçeneği.' },
  { color: COLORS.green,  bold: 'Final sunumu & Demo Day',      tail: ' — Projeni jürinin önünde sahneye taşı.' },
  { color: '#8B5CF6',     bold: 'Büyük ödüller',                tail: '' }
];

export function Highlights() {
  const { openModal } = useApp();
  
  // Duplicated list for seamless marquee effect
  const marqueeSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section id="highlights" className="relative z-30 pt-0 pb-12 lg:pb-20">
      
      {/* 🌊 Dual Wave Aesthetic Separator (Top & Bottom Waves) */}
      <div className="relative w-full h-32 md:h-48 overflow-hidden pointer-events-none mb-4 lg:mb-8">
        <div className="absolute inset-0 z-10 opacity-30">
          <div className="dual-wave dw1"></div>
          <div className="dual-wave dw2"></div>
          <div className="dual-wave dw3"></div>
        </div>
      </div>

      <Container>
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[40px] p-8 md:p-12 lg:p-16"
            style={{
              background:
                'radial-gradient(1000px 500px at 0% 0%, rgba(66,133,244,.15), transparent 70%),' +
                'radial-gradient(1000px 500px at 100% 100%, rgba(234,67,53,.15), transparent 70%),' +
                'linear-gradient(135deg, #0A0F2D, #05071A)',
              border: '1px solid rgba(255,255,255,.08)'
            }}
          >
            {/* Grid Overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px),' +
                  'linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 90%)'
              }}
            />

            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] g-word">
                  <span className="b">E</span><span className="r">t</span><span className="y">k</span><span className="g">i</span>
                  <span className="b">n</span><span className="r">l</span><span className="y">i</span><span className="g">ğ</span>
                  <span className="b">i</span><span className="r">m</span><span className="y">i</span><span className="g">z</span>
                  <span className="b">i</span>
                  <span className="block hf-text-gradient mt-2 font-display uppercase tracking-tight">Tanıyalım</span>
                </h2>
              </div>

              {/* Layout Restructure: 1 Large on Top, 2 Squares Below */}
              <div className="flex flex-col gap-6 mb-12">
                {/* 1. Large Rectangular Card (Hackathon) */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-14 flex flex-col hover:bg-white/[0.07] transition-all group w-full overflow-hidden relative">
                  <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-7 text-left">
                      <div className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 mb-4">HACKATHON</div>
                      <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Toplum yararına çalışan <span className="hf-text-gradient">yapay zeka</span> üret.
                      </h3>
                      <p className="text-ink-dim text-lg mb-10 leading-relaxed max-w-xl">
                        Eğitim, sağlık, afet yönetimi, erişilebilirlik ve sürdürülebilirlik gibi alanlarda gerçek dünya problemlerine yapay zeka ile çözüm geliştir. Tek başına ya da takımınla — sınır senin hayal gücün.
                      </p>
                      <ul className="space-y-4 mb-10">
                        {bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${b.color}33` }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12l5 5L20 7" stroke={b.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span><span className="text-white font-medium">{b.bold}</span>{b.tail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => openModal('hack')} size="lg" className="px-8" iconRight={<ArrowRightIcon />}>
                          Şimdi Başvur
                        </Button>
                        <Button as={Link} href="/hackathon" variant="ghost" size="lg" className="px-8 border-white/10 hover:bg-white/5">
                          Hackathon Hakkında Bilgi Al
                        </Button>
                      </div>
                    </div>
                    <div className="lg:col-span-5 relative">
                      <TerminalCard />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/[0.08] transition-all group min-h-[320px]">
                    <h3 className="font-display text-2xl font-bold text-white mb-4">Workshop & Talks</h3>
                    <p className="text-ink-dim leading-relaxed mb-8 flex-grow text-sm">
                      Yarışmaya katılmasan da buradasın! yapay zeka eğitimleri al, vizyonunu genişlet. Tamamen AI odaklı teknik seanslar seni bekliyor.
                    </p>
                    <div className="space-y-4">
                      <Button as={Link} href="/speakers" variant="ghost" size="sm" className="w-full border-white/10 hover:bg-white/10" iconRight={<ArrowRightIcon />}>
                        Konuşmacıları Gör
                      </Button>
                      <div className="text-[10px] text-center font-bold uppercase tracking-[0.2em] text-white/40">Herkes Katılabilir</div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/[0.08] transition-all group min-h-[320px]">
                    <h3 className="font-display text-2xl font-bold text-white mb-4">Kulüp Standları</h3>
                    <div className="flex-grow"></div>
                    <div className="mt-auto">
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">SOSYAL ETKİLEŞİM ALANI</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Büyük Çekiliş Banner */}
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                <div className="flex-grow text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                    Sürpriz Çekiliş
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Festival Boyunca Şans Seninle! 🎁</h3>
                  <p className="text-ink-dim text-sm max-w-2xl leading-relaxed">
                    Etkinliğin üç kısmından (Hackathon, Workshop veya Standlar) herhangi birine katılanlar gün sonundaki büyük çekilişe dahil olma şansı yakalar. 
                    <span className="text-white font-semibold"> Katılım otomatik değildir; çekilişe dahil olmak için etkinlik alanındaki QR kodları okutmanız gerekmektedir.</span>
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center">
                  <div className="text-4xl mb-2 animate-bounce">🎟️</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-ink-dim">QR Kodunu Okut</div>
                </div>
              </div>

              {/* Sponsorlar Section - SEAMLESS HORIZONTAL MARQUEE WITH ORBITAL FLOAT */}
              <div className="pt-12 border-t border-white/10">
                <div className="text-center mb-16">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mb-2">Gücümüzü Onlardan Alıyoruz</div>
                  <h4 className="font-display text-2xl font-bold text-white">Sponsorlarımız</h4>
                </div>

                <div className="relative h-40 flex items-center overflow-hidden">
                  <div className="flex flex-row items-center gap-20 animate-marquee-sponsors whitespace-nowrap">
                    {marqueeSponsors.map((s, idx) => (
                      <div 
                        key={`${s.id}-${idx}`}
                        className="flex-shrink-0"
                        style={{
                          animation: `orbital-float ${6 + (idx % 4)}s ease-in-out infinite`,
                          animationDelay: `${idx * 0.4}s`
                        }}
                      >
                        <a 
                          href={s.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative flex flex-col items-center justify-center transition-all duration-500 hover:scale-125"
                        >
                          <div className="w-28 md:w-44 h-16 md:h-20 flex items-center justify-center">
                            <img 
                              src={s.logoUrl} 
                              alt={s.name} 
                              className={`max-w-full max-h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500 ${s.size === 'main' ? 'scale-125 opacity-100' : 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100'}`} 
                            />
                          </div>
                          {s.size === 'main' && (
                            <div className="mt-2 text-[7px] font-black text-emerald-400 uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                              Ana Sponsor
                            </div>
                          )}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>

      <style>{`
        /* Dual Wave Styles */
        .dual-wave {
          position: absolute;
          width: 200%;
          height: 100%;
          background-repeat: repeat-x;
          background-position: 0 bottom, 0 top;
          transform-origin: center;
        }
        
        .dw1 {
          animation: dw-anim 15s linear infinite;
          background-image: 
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 200" fill="%2334D399"><path d="M0 100 C400 50 400 150 800 100 C1200 50 1200 150 1600 100 L1600 200 L0 200 Z" opacity="0.4"/></svg>'),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 200" fill="%2334D399"><path d="M0 100 C400 150 400 50 800 100 C1200 150 1200 50 1600 100 L1600 0 L0 0 Z" opacity="0.4"/></svg>');
        }
        
        .dw2 {
          animation: dw-anim 20s linear infinite reverse;
          background-image: 
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 200" fill="%234285F4"><path d="M0 100 C400 150 400 50 800 100 C1200 150 1200 50 1600 100 L1600 200 L0 200 Z" opacity="0.2"/></svg>'),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 200" fill="%234285F4"><path d="M0 100 C400 50 400 150 800 100 C1200 50 1200 150 1600 100 L1600 0 L0 0 Z" opacity="0.2"/></svg>');
        }

        .dw3 {
          animation: dw-anim 12s linear infinite;
          background-image: 
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 200" fill="%238B5CF6"><path d="M0 100 C400 80 400 120 800 100 C1200 80 1200 120 1600 100 L1600 200 L0 200 Z" opacity="0.1"/></svg>'),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 200" fill="%238B5CF6"><path d="M0 100 C400 120 400 80 800 100 C1200 120 1200 80 1600 100 L1600 0 L0 0 Z" opacity="0.1"/></svg>');
        }

        @keyframes dw-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-sponsors {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-sponsors {
          animation: marquee-sponsors 40s linear infinite;
        }
        @keyframes orbital-float {
          0% { transform: translate(0, 0); }
          25% { transform: translate(8px, -12px); }
          50% { transform: translate(0, -20px); }
          75% { transform: translate(-8px, -12px); }
          100% { transform: translate(0, 0); }
        }
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
          animation: wave-anim 25s linear infinite;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" fill="%234285F4"><path d="M0 200 C400 100 400 300 800 200 C1200 100 1200 300 1600 200 L1600 400 L0 400 Z" opacity="0.1"/></svg>');
        }
        .wave2 {
          animation: wave-anim 20s linear infinite reverse;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 400" fill="%2334D399"><path d="M0 200 C400 300 400 100 800 200 C1200 300 1200 100 1600 200 L1600 400 L0 400 Z" opacity="0.05"/></svg>');
        }
        @keyframes wave-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function TerminalCard() {
  return (
    <div className="hf-glass overflow-hidden relative shadow-2xl">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/[.02]">
        <span className="w-3 h-3 rounded-full bg-google-red" />
        <span className="w-3 h-3 rounded-full bg-google-yellow" />
        <span className="w-3 h-3 rounded-full bg-google-green" />
        <span className="ml-3 font-mono text-[10px] text-ink-dim">~/hackfest26/team_alpha</span>
      </div>
      <div className="p-6 font-mono text-xs md:text-sm leading-relaxed">
        <div className="text-ink-dim"><span style={{ color: COLORS.green }}>$</span> python deploy.py --mission "for_society"</div>
        <div className="mt-3"><span style={{ color: COLORS.yellow }}>→</span> loading datasets...</div>
        <div><span style={{ color: COLORS.yellow }}>→</span> training neural network...</div>
        <div><span style={{ color: COLORS.yellow }}>→</span> evaluating social impact...</div>
        <div className="mt-3"><span style={{ color: COLORS.green }}>✓</span> accuracy: 94.7%</div>
        <div><span style={{ color: COLORS.green }}>✓</span> bias_audit: passed</div>
        <div><span style={{ color: COLORS.green }}>✓</span> impact_score: <span style={{ color: COLORS.blue }}>9.2/10</span></div>
        <div className="mt-4 p-3 rounded-lg" style={{ background: 'linear-gradient(120deg, rgba(66,133,244,.12), rgba(234,67,53,.12))' }}>
          <div className="text-white font-bold">🎯 Mission deployed.</div>
          <div className="text-ink-dim text-[10px] mt-1">Education accessibility +37% improved.</div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span style={{ color: COLORS.green }}>$</span>
          <span className="inline-block w-2 h-4 bg-white hf-caret" />
        </div>
      </div>
    </div>
  );
}
