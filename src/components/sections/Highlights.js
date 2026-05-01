'use client';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { highlights } from '@/data/highlights';
import { COLORS } from '@/lib/constants';

const iconMap = {
  clock:  (c) => (<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>),
  spark:  (c) => (<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth="2"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" /></svg>),
  stage:  (c) => (<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth="2"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" strokeLinejoin="round" /></svg>),
  trophy: (c) => (<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={c} strokeWidth="2"><path d="M12 15a4 4 0 0 0 4-4V3H8v8a4 4 0 0 0 4 4zM8 21h8M12 15v6M5 7H3v4a3 3 0 0 0 3 3M19 7h2v4a3 3 0 0 1-3 3" strokeLinejoin="round" /></svg>)
};

export function Highlights() {
  return (
    <section id="highlights" className="relative z-10 py-12 lg:py-20">
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

              {/* 3 Ana Bölüm Kartları */}
              <div className="grid lg:grid-cols-3 gap-6 mb-12">
                {/* 1. Hackathon */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/[0.08] transition-all group">
                  <h3 className="font-display text-2xl font-bold text-white mb-4">Efsanevi AI Hackathon</h3>
                  <p className="text-ink-dim leading-relaxed mb-8 flex-grow text-sm">
                    24 saat sürecek kesintisiz bir maraton! Takımını kur, google studio kredilerini tanımla, toplumsal sorunlara yapay zeka ile çözüm üret. Yarışmayı kazan ödüller seni bekliyor. Bilgisayarını getirmeyi unutma.
                  </p>
                  <Button as={Link} href="/hackathon" size="sm" className="w-full" iconRight={<ArrowRightIcon />}>
                    Hackathon'u İncele
                  </Button>
                </div>

                {/* 2. Festival & Workshop */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/[0.08] transition-all group">
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

                {/* 3. Deneyim Alanı */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/[0.08] transition-all group">
                  <h3 className="font-display text-2xl font-bold text-white mb-4">Kulüp Standları</h3>
                  <p className="text-ink-dim leading-relaxed mb-8 flex-grow text-sm">
                    Okulun en aktif kulüpleriyle tanış, standlarda eğlen ve networking yap. Festival ruhunu sonuna kadar hisset!
                  </p>
                </div>
              </div>

              {/* Büyük Çekiliş Banner */}
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
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
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
