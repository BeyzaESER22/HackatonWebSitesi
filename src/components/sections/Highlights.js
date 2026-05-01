'use client';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
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
    <section id="highlights" className="relative z-10 py-24 lg:py-32 overflow-hidden">
      {/* Arkaplan dekorasyonları */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <RevealOnScroll>
          <SectionTitle
            eyebrow="HackFest'26 Deneyimi"
            title="Bir Hackathon'dan"
            gradient="Çok Daha Fazlası!"
            className="mb-8"
          />
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-ink-dim text-xl leading-relaxed">
              HackFest'26 sadece kod yazılan bir maraton değil; yapay zekanın kalbinde 2 gün sürecek dev bir festival! İster yarışmaya katıl, ister eğitimlerle kendini geliştir, istersen de eğlenceli standlarda vakit geçir.
            </p>
          </div>
        </RevealOnScroll>

        {/* 3 Ana Bölüm Kartları */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {/* 1. Hackathon */}
          <RevealOnScroll delay={0.1}>
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-full bg-[#0A0A0B] border border-white/10 rounded-3xl p-8 flex flex-col">
                <div className="text-4xl mb-6">🚀</div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">Efsanevi AI Hackathon</h3>
                <p className="text-ink-dim leading-relaxed mb-8 flex-grow">
                  24 saat sürecek kesintisiz bir maraton! Takımını kur, toplumsal sorunlara yapay zeka ile çözüm üret. Dev ödüller seni bekliyor.
                </p>
                <Button as={Link} href="/hackathon" size="sm" className="w-full" iconRight={<ArrowRightIcon />}>
                  Hackathon'u İncele
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          {/* 2. Festival & Workshop */}
          <RevealOnScroll delay={0.2}>
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-full bg-[#0A0A0B] border border-white/10 rounded-3xl p-8 flex flex-col">
                <div className="text-4xl mb-6">🎙️</div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">Workshop & Talks</h3>
                <p className="text-ink-dim leading-relaxed mb-8 flex-grow">
                  Yarışmaya katılmasan da buradasın! Sektör devlerinden yapay zeka eğitimleri al, vizyonunu genişlet. Tamamen AI odaklı teknik seanslar seni bekliyor.
                </p>
                <div className="space-y-4">
                  <Button as={Link} href="/speakers" variant="ghost" size="sm" className="w-full border-purple-500/20 hover:bg-purple-500/10" iconRight={<ArrowRightIcon />}>
                    Konuşmacıları Gör
                  </Button>
                  <div className="text-[10px] text-center font-bold uppercase tracking-[0.2em] text-purple-400/60">Herkes Katılabilir</div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* 3. Deneyim Alanı */}
          <RevealOnScroll delay={0.3}>
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-full bg-[#0A0A0B] border border-white/10 rounded-3xl p-8 flex flex-col">
                <div className="text-4xl mb-6">🎪</div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">Kulüp Standları & Fun</h3>
                <p className="text-ink-dim leading-relaxed mb-8 flex-grow">
                  Okulun en aktif kulüpleriyle tanış, standlarda eğlen ve networking yap. Festival ruhunu sonuna kadar hisset!
                </p>
                <div className="mt-auto bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl">
                  <p className="text-xs font-bold text-yellow-500 uppercase tracking-tight">🔥 SÜPRİZ ÇEKİLİŞ!</p>
                  <p className="text-white text-xs mt-1">Konuşmacı ve Workshoplara katılan herkes çekilişe dahil (Evet, hackathoncular da!).</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Klasik Highlight Kartları (Zaman, Ödül vb.) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 opacity-80">
          {highlights.map((h, i) => (
            <RevealOnScroll key={h.id} delay={i * 0.08}>
              <Card hover className="!bg-transparent border-white/5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${h.accent}1A`, border: `1px solid ${h.accent}33` }}
                >
                  {iconMap[h.iconKey]?.(h.accent)}
                </div>
                <div className="font-display text-xl font-bold mb-1">{h.title}</div>
                <div className="text-ink-dim text-xs">{h.desc}</div>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
