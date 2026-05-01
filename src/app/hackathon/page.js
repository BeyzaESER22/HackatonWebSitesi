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

import { categories } from '@/data/problems';

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
          <div className="space-y-6 max-w-4xl">
            <p className="text-ink-dim text-xl leading-relaxed">
              HackFest'26 AI Hackathon’una hoş geldin! Bu maratonda temel amacımız; yapay zekayı toplum yararına kullanarak gerçek dünya problemlerine yenilikçi çözümler üretmek. İster bireysel, ister takımınla katıl; 2 gün boyunca sınırları zorlayacağın bir yarışma seni bekliyor.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-ink-dim text-xl">
              <span>Etkinliğin saatlik akışına bakmak istersen program bölümünü inceleyebilirsin:</span>
              <Button as={Link} href="/schedule" variant="ghost" size="sm" className="w-fit" iconRight={<ArrowRightIcon />}>
                Programı İncele
              </Button>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-6 text-ink-dim text-xl leading-relaxed">
              <p>
                <strong className="text-white font-bold">📍 Konum ve Saat:</strong> Etkinliğimiz 16-17 Mayıs tarihlerinde saat 09:00'da, İstinye Üniversitesi Vadi Kampüsü <span className="text-white font-bold">ANK 110 (1. Kat)</span> salonunda başlayacaktır. <br />
                <span className="text-lg">(Adres: Hamidiye Mah., Selçuklu Cad., No:4, 34408 Kağıthane/İstanbul)</span>
              </p>
              <p>
                <strong className="text-white font-bold">💻 Hazırlık:</strong> Kendi bilgisayarını getirmeyi unutma. Ayrıca sana ileteceğimiz link üzerinden <strong className="text-white font-bold">Google Cloud kredilerini</strong> tanımlayarak Vertex AI gibi araçlardan yararlanabilirsin.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Kategoriler ve Problem Havuzu */}
      <section className="mb-24 scroll-mt-32" id="problems">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <SectionTitle 
                eyebrow="Yarışma Alanları" 
                title="Kategoriler ve" 
                gradient="Problem Havuzu" 
                align="left" 
                className="!mb-0" 
              />
              <Button 
                as="a" 
                href="/hackfest26-kurallar.pdf" 
                download 
                variant="ghost" 
                iconRight={<ArrowRightIcon />}
                className="shrink-0"
              >
                Resmi Şartname ve Detaylar (PDF)
              </Button>
            </div>
          </RevealOnScroll>

          {/* Önemli Not */}
          <RevealOnScroll>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
              <div className="flex gap-4">
                <div className="text-yellow-500 text-xl font-bold shrink-0">!</div>
                <div className="text-sm leading-relaxed text-ink-dim">
                  <strong className="text-white">ÖNEMLİ NOT:</strong> Takımların aşağıda listelenen <span className="text-white font-bold">ana kategorilerden en az birini</span> seçmesi zorunludur. Kategoriler altındaki "Problem İfadeleri" ve sağlanan "GitHub Veri Setleri" <span className="text-white">isteğe bağlıdır</span>; katılımcılar kendi veri setlerini oluşturabilir veya farklı alt temalar üzerinde çalışabilirler.
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="space-y-10">
            {categories.map((cat, idx) => (
              <RevealOnScroll key={cat.id} delay={idx * 0.1}>
                <div className="group hf-glass border-white/5 rounded-3xl overflow-hidden">
                  <div className="p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10 pb-8 border-b border-white/5">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                          style={{ background: `${cat.color}26`, border: `1px solid ${cat.color}4D` }}>
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="font-display text-2xl lg:text-3xl font-bold mb-1" style={{ color: cat.color }}>{cat.title}</h3>
                          <span className="text-xs uppercase tracking-widest text-ink-dim font-bold">Zorunlu Seçim Alanı</span>
                        </div>
                      </div>
                      <Button as="a" href={cat.githubUrl} target="_blank" variant="ghost" size="sm" className="w-fit self-start lg:self-center">
                        GitHub Veri Setlerine Git
                      </Button>
                    </div>

                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {cat.problems.map((prob, pIdx) => (
                        <Card key={pIdx} className="!p-6 !bg-white/0 !border-white/5 hover:!border-white/10 transition-colors">
                          <h4 className="font-display text-lg font-bold mb-4 text-white leading-tight">{prob.title}</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-ink-dim font-bold mb-1">Mevcut Durum</div>
                              <p className="text-sm text-ink-dim leading-relaxed">{prob.current}</p>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-green-500 font-bold mb-1">Öngörülen Gelecek</div>
                              <p className="text-sm text-ink-dim leading-relaxed">{prob.future}</p>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-blue-500 font-bold mb-1">Önem</div>
                              <p className="text-sm text-ink-dim leading-relaxed italic">{prob.importance}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
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
