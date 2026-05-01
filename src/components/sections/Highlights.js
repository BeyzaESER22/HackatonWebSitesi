'use client';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { sponsors } from '@/data/sponsors';
import { COLORS } from '@/lib/constants';

export function Highlights() {
  const mainSponsors = sponsors.filter(s => s.size === 'main');
  const supportSponsors = sponsors.filter(s => s.size === 'support');

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

              {/* Sponsorlar Section - Otomatik Güncellenir */}
              <div className="pt-12 border-t border-white/10">
                <div className="text-center mb-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mb-2">Gücümüzü Onlardan Alıyoruz</div>
                  <h4 className="font-display text-2xl font-bold text-white">Sponsorlarımız</h4>
                </div>

                <div className="space-y-8">
                  {/* Main Sponsors */}
                  {mainSponsors.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-6">
                      {mainSponsors.map(s => (
                        <a 
                          key={s.id} 
                          href={s.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative bg-white rounded-2xl p-6 md:p-8 flex items-center justify-center w-full max-w-[320px] h-32 md:h-40 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                          <img src={s.logoUrl} alt={s.name} className="max-w-full max-h-full object-contain" />
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-500 text-[8px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Ana Sponsor</div>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Support Sponsors */}
                  {supportSponsors.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {supportSponsors.map(s => (
                        <a 
                          key={s.id} 
                          href={s.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white/95 rounded-xl p-4 flex items-center justify-center h-20 md:h-24 transition-all hover:bg-white hover:scale-105"
                        >
                          <img src={s.logoUrl} alt={s.name} className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
