'use client';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Accordion } from '@/components/ui/Accordion';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { sampleProjectId } from '@/data/projects';
import { COLORS } from '@/lib/constants';
import { useApp } from '@/context/AppContext';
import { ruleCategories } from '@/data/rules';

const themes = [
  { color: COLORS.blue,   icon: '📚', title: 'Eğitim',          desc: 'Erişilebilir öğrenme araçları, kişiselleştirilmiş içerik, dezavantajlı bölgelere ulaşan platformlar.' },
  { color: COLORS.red,    icon: '🏥', title: 'Sağlık',           desc: 'Erken tanı, hasta-takip sistemleri, kırsal sağlık erişimi, mental sağlık asistanları.' },
  { color: COLORS.yellow, icon: '🌪️', title: 'Afet Yönetimi',     desc: 'Erken uyarı sistemleri, afet sonrası iletişim, kayıp kişi takibi, kaynak dağıtımı.' },
  { color: COLORS.green,  icon: '♿', title: 'Erişilebilirlik',    desc: 'Görme/işitme engelliler için araçlar, çeviri sistemleri, kapsayıcı arayüzler.' },
  { color: '#06B6D4',     icon: '🌱', title: 'Sürdürülebilirlik', desc: 'Karbon takibi, geri dönüşüm optimizasyonu, enerji verimliliği, biyoçeşitlilik analizi.' },
  { color: '#8B5CF6',     icon: '✨', title: 'Diğer',             desc: 'Toplum yararına çalışan ve başka bir kategoriye sığmayan yaratıcı çözümler.' }
];

const judging = [
  { weight: '30%', title: 'Toplumsal Etki',     desc: 'Hangi probleme dokunuyor? Kaç kişiye fayda sağlayabilir?' },
  { weight: '25%', title: 'Teknik Yetkinlik',   desc: 'AI/ML kullanımı, kod kalitesi, mimari kararlar.' },
  { weight: '20%', title: 'Yenilikçilik',       desc: 'Mevcut çözümlerden farkı, özgün yaklaşımı.' },
  { weight: '15%', title: 'Sunum & Demo',       desc: '5 dakikalık pitch, ürünün canlı çalışması.' },
  { weight: '10%', title: 'Tamamlanmışlık',     desc: 'Çalışan prototip, test edilebilirlik.' }
];

export default function HackathonInfoPage() {
  const { openModal } = useApp();

  return (
    <div className="pt-36 pb-24 lg:pt-44 lg:pb-32">
      {/* Hero */}
      <section className="mb-20">
        <Container>
          <Badge dotColor={COLORS.green} className="mb-6">Hackathon · 16-17 Mayıs 2026</Badge>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
           <span className="hf-text-gradient">Yapay zeka</span> kullanarak toplumsal sorunlara çözüm üret.
          </h1>
          <p className="text-ink-dim text-xl max-w-3xl mb-10 leading-relaxed">
            HackFest'26 AI Hackathon’una hoş geldin! Bu maratonda temel amacımız; yapay zekayı toplum yararına kullanarak gerçek dünya problemlerine yenilikçi çözümler üretmek. İster bireysel, ister takımınla katıl; 2 gün boyunca sınırları zorlayacağın bir yarışma seni bekliyor.
          </p>

          {/* Bilgilendirme Kartları */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="!p-6 border-blue-500/20 bg-blue-500/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl shrink-0">🎤</div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">Festival (İlham)</h3>
                  <p className="text-ink-dim text-sm mb-4 leading-relaxed">
                    Uzman isimleri ve ilham dolu festival içeriğini keşfetmek için konuşmacılarımızı inceleyebilirsin.
                  </p>
                  <Button as={Link} href="/speakers" variant="ghost" size="sm" iconRight={<ArrowRightIcon />}>
                    Konuşmacıları Gör
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="!p-6 border-purple-500/20 bg-purple-500/5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-xl shrink-0">📅</div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">Program (Akış)</h3>
                  <p className="text-ink-dim text-sm mb-4 leading-relaxed">
                    Etkinliğin saatlik akışını ve tüm detayları program sayfamızdan detaylıca takip edebilirsin.
                  </p>
                  <Button as={Link} href="/schedule" variant="ghost" size="sm" iconRight={<ArrowRightIcon />}>
                    Programı İncele
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Lojistik ve Hazırlık */}
          <div className="hf-glass p-8 rounded-2xl mb-12 border-white/5">
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="text-ink-dim uppercase tracking-wider font-bold mb-3 text-[10px]">📍 Konum ve Saat</div>
                <p className="font-medium">16-17 Mayıs, 09:00 Başlangıç</p>
                <p className="text-ink-dim mt-1">Vadi Kampüsü, <span className="text-white font-bold">ANK 110 (1. Kat)</span></p>
                <p className="text-[11px] text-ink-dim mt-2 leading-tight">Hamidiye Mah. Selçuklu Cad. No:4, Kağıthane/İst.</p>
              </div>
              <div>
                <div className="text-ink-dim uppercase tracking-wider font-bold mb-3 text-[10px]">💻 Hazırlık</div>
                <p className="font-medium">Kendi bilgisayarını getirmelisin.</p>
                <p className="text-ink-dim mt-1">Geliştirme süreci için gerekli donanım ve yazılımların hazır olduğundan emin ol.</p>
              </div>
              <div>
                <div className="text-ink-dim uppercase tracking-wider font-bold mb-3 text-[10px]">☁️ Google Cloud</div>
                <p className="font-medium">Kredilerini Tanımlamayı Unutma!</p>
                <p className="text-ink-dim mt-1 leading-relaxed">
                  Sana ileteceğimiz link üzerinden Google Cloud kredilerini tanımlayarak Vertex AI ve diğer araçları ücretsiz kullanabilirsin.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button onClick={() => openModal('hack')} iconRight={<ArrowRightIcon />} className="w-full sm:w-auto">
              Hackathon'a Başvur
            </Button>
            <div className="text-ink-dim text-sm flex items-center gap-2">
              <span className="animate-bounce">↓</span> Detaylar için aşağı kaydır
            </div>
          </div>
        </Container>
      </section>

      {/* Temalar */}
      <section className="mb-24">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Temalar" title="Hangi alanda" gradient="çalışabilirsin?" align="left" className="mb-10" />
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {themes.map((t, i) => (
              <RevealOnScroll key={t.title} delay={(i % 3) * 0.07}>
                <Card hover className="h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl"
                    style={{ background: `${t.color}26`, border: `1px solid ${t.color}4D` }}>
                    {t.icon}
                  </div>
                  <div className="font-display text-xl font-semibold mb-2" style={{ color: t.color }}>{t.title}</div>
                  <div className="text-ink-dim text-sm leading-relaxed">{t.desc}</div>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Jüri kriterleri */}
      <section className="mb-24">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Değerlendirme" title="Jüri" gradient="kriterleri." align="left" className="mb-10" />
          </RevealOnScroll>

          <div className="space-y-3">
            {judging.map((j, i) => (
              <RevealOnScroll key={j.title} delay={i * 0.05}>
                <Card className="!p-6">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3 sm:col-span-2">
                      <div className="font-display text-3xl font-bold hf-text-gradient">{j.weight}</div>
                    </div>
                    <div className="col-span-9 sm:col-span-10">
                      <div className="font-display text-lg font-semibold mb-1">{j.title}</div>
                      <div className="text-ink-dim text-sm">{j.desc}</div>
                    </div>
                  </div>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Ödüller */}
      <section className="mb-24">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Ödüller" title="Kazananları" gradient="neler bekliyor?" align="left" className="mb-10" />
          </RevealOnScroll>

          <RevealOnScroll>
            <Card className="!p-10 text-center"
              style={{ background: 'linear-gradient(120deg, rgba(66,133,244,.08), rgba(251,188,5,.08))' }}>
              <div className="text-6xl mb-4">🏆</div>
              <div className="font-display text-2xl md:text-3xl font-bold mb-3">Ödüller yakında açıklanacak</div>
              <p className="text-ink-dim max-w-xl mx-auto">
                Donanım ödülleri, bulut kredileri, kariyer fırsatları ve sürpriz hediyeler dahil ödül havuzunun detayları
                önümüzdeki haftalarda paylaşılacaktır. Sosyal medya hesaplarımızı takip ederek güncellemelerden haberdar olabilirsiniz.
              </p>
            </Card>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Kurallar */}
      <section className="mb-24">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Kurallar" title="Yarışma" gradient="kuralları." align="left" className="mb-6" />
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <p className="text-ink-dim max-w-2xl leading-relaxed">
                Tüm katılımcıların okuması ve kabul etmesi gereken kurallar. Aşağıdaki kategorilerin her birine tıklayarak detayları görebilir, Yarışma kurallarının tamamı resmi PDF dokümanında yer almaktadır. Başvuru formunu ileten her katılımcı, bu dokümandaki şartları okumuş ve onaylamış kabul edilir. Kuralların takibi ve uygulanması katılımcının yükümlülüğündedir.
              </p>
              <Button
                as="a"
                href="/hackfest26-kurallar.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                iconRight={<ArrowRightIcon />}
              >
                PDF olarak indir
              </Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <Accordion
              items={ruleCategories.map((cat) => ({
                q: (
                  <span className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                      style={{ background: `${cat.color}26`, border: `1px solid ${cat.color}4D` }}
                    >
                      {cat.icon}
                    </span>
                    <span style={{ color: cat.color }}>{cat.title}</span>
                  </span>
                ),
                a: (
                  <ol className="space-y-3">
                    {cat.items.map((it, i) => (
                      <li key={i} className="flex gap-4">
                        <span
                          className="font-display font-bold text-lg shrink-0"
                          style={{ color: cat.color, minWidth: '1.75rem' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-relaxed">{it}</span>
                      </li>
                    ))}
                  </ol>
                )
              }))}
            />
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="text-ink-dim text-xs mt-6 text-center">
              Doküman v1.0 — son güncelleme 1 Mayıs 2026. Sorularınız için: <a href="mailto:gdg@istinye.edu.tr" className="hf-text-gradient font-semibold">gdg@istinye.edu.tr</a>
            </p>
          </RevealOnScroll>
        </Container>
      </section>
    </div>
  );
}
