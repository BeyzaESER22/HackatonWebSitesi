'use client';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { sampleProjectId } from '@/data/projects';
import { COLORS } from '@/lib/constants';
import { useApp } from '@/context/AppContext';

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

const rules = [
  'Takımlar 1-5 kişiden oluşur. Bireysel katılım da mümkündür.',
  'Tüm kod etkinlik süresince yazılmalıdır. Hazır şablonlar (boilerplate) ve açık kaynak kütüphaneler kullanılabilir.',
  'AI / ML araçları (Gemini API, OpenAI, vb.) kullanımı serbesttir; jüri değerlendirmesinde kullanılan modeller ve veri kaynakları açıkça belirtilmelidir.',
  'Etkinlik öncesi yazılmış tam ürünlerin sergilenmesi yasaktır. Önceden hazırlanmış parçalar (UI kit, boilerplate) için kaynak referansı zorunludur.',
  'Demo Day\'de 5 dakika pitch + 3 dakika soru-cevap formatı uygulanacaktır.',
  'Etik kurallara uymayan, ayrımcılık veya zarar içeren projeler diskalifiye edilir.'
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
            HackFest'26 AI Hackathon'unda, gerçek dünya problemlerine yapay zeka ile çözüm üretmek üzere 2 gün boyunca takımınla yarışırsın. Mentorlar, workshoplar, jüri sunumları ve büyük ödüllerle dolu bir maraton.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => openModal('hack')} iconRight={<ArrowRightIcon />}>Hackathon'a Başvur</Button>
            <Button as={Link} href={`/projects/${sampleProjectId}`} variant="ghost">
              Örnek Projeyi İncele
            </Button>
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
            <SectionTitle eyebrow="Kurallar" title="Yarışma" gradient="kuralları." align="left" className="mb-10" />
          </RevealOnScroll>

          <RevealOnScroll>
            <Card className="!p-7 lg:!p-9">
              <ol className="space-y-4 text-ink-dim">
                {rules.map((r, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display font-bold text-2xl shrink-0 hf-text-gradient" style={{ minWidth: '2rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section>
        <Container>
          <RevealOnScroll>
            <Card className="!p-10 lg:!p-14 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(66,133,244,.12), rgba(234,67,53,.10))' }}>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Hazır mısın?</h2>
              <p className="text-ink-dim mb-8 max-w-xl mx-auto">
                Kontenjan dolmadan başvurunu tamamla. Etkinliğin son halini takip etmek için bizi sosyal medyada takip etmeyi unutma.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={() => openModal('hack')} iconRight={<ArrowRightIcon />}>Hackathon'a Başvur</Button>
                <Button as={Link} href={`/projects/${sampleProjectId}`} variant="ghost">Örnek Proje</Button>
              </div>
            </Card>
          </RevealOnScroll>
        </Container>
      </section>
    </div>
  );
}
