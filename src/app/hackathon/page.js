'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Accordion } from '@/components/ui/Accordion';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { Modal } from '@/components/ui/Modal';
import { COLORS } from '@/lib/constants';
import { useApp } from '@/context/AppContext';
import { ruleCategories } from '@/data/rules';
import { categories } from '@/data/problems';

const judging = [
  { weight: '30%', title: 'Toplumsal Etki',     desc: 'Hangi probleme dokunuyor? Kaç kişiye fayda sağlayabilir?' },
  { weight: '25%', title: 'Teknik Yetkinlik',   desc: 'AI/ML kullanımı, kod kalitesi, mimari kararlar.' },
  { weight: '20%', title: 'Yenilikçilik',       desc: 'Mevcut çözümlerden farkı, özgün yaklaşımı.' },
  { weight: '15%', title: 'Sunum & Demo',       desc: '5 dakikalık pitch, ürünün canlı çalışması.' },
  { weight: '10%', title: 'Tamamlanmışlık',     desc: 'Çalışan prototip, test edilebilirlik.' }
];

export default function HackathonInfoPage() {
  const { openModal, activeModal, modalData, closeModal, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeProblem, setActiveProblem] = useState(null);
  const [userSelectedProblem, setUserSelectedProblem] = useState(null);

  // Load selected problem from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedProblem');
    if (saved) setUserSelectedProblem(JSON.parse(saved));
  }, []);

  const handleSelectProblem = (problem) => {
    localStorage.setItem('selectedProblem', JSON.stringify(problem));
    setUserSelectedProblem(problem);
    showToast({ title: 'Problem Seçildi', message: `${problem.title} projenize başarıyla eklendi.` });
  };

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
          </div>
        </Container>
      </section>

      {/* Problem Havuzu Engine */}
      <section className="mb-24 scroll-mt-32" id="problems">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <SectionTitle eyebrow="Browse Problems" title="Problem" gradient="Havuzu" align="left" className="!mb-0" />
              <Button as="a" href="/hackfest26-kurallar.pdf" download variant="ghost" iconRight={<ArrowRightIcon />}>
                Şartnameyi İndir (PDF)
              </Button>
            </div>
          </RevealOnScroll>

          {/* User Selection Banner */}
          {userSelectedProblem && (
            <RevealOnScroll>
              <div className="mb-12 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🔥</div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-green-500 mb-1">Seçili Projen</p>
                    <h4 className="text-lg font-bold text-white">{userSelectedProblem.title}</h4>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button size="sm" onClick={() => setActiveProblem(userSelectedProblem)}>Starter Kit'i Gör</Button>
                  <Button size="sm" variant="ghost" onClick={() => {
                    localStorage.removeItem('selectedProblem');
                    setUserSelectedProblem(null);
                  }}>Seçimi İptal Et</Button>
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Mandatory Selection Banner */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
            <div className="flex gap-4">
              <div className="text-yellow-500 text-xl font-bold shrink-0">!</div>
              <div className="text-sm leading-relaxed text-ink-dim">
                <strong className="text-white">KRİTİK NOT:</strong> Takımların listedeki <span className="text-white font-bold underline">kategorilerden en az birini</span> seçmesi zorunludur. Belirlenen spesifik bir problemi seçmek isteğe bağlıdır; ancak profesyonel değerlendirme için listedeki taskları rehber almanız önerilir.
              </div>
            </div>
          </div>

          {/* Browse -> Categories Grid */}
          {!selectedCategory ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, idx) => (
                <RevealOnScroll key={cat.id} delay={idx * 0.05}>
                  <Card 
                    hover 
                    onClick={() => setSelectedCategory(cat)}
                    className="cursor-pointer group h-full flex flex-col"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6"
                      style={{ background: `${cat.color}26`, border: `1px solid ${cat.color}4D` }}>
                      {cat.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3" style={{ color: cat.color }}>{cat.title}</h3>
                    <p className="text-ink-dim text-sm mb-6 flex-grow">{cat.description}</p>
                    <div className="text-xs font-bold uppercase tracking-widest text-ink-dim group-hover:text-white transition-colors">
                      {cat.problems.length} Problem Mevcut →
                    </div>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            /* Select -> Problem List within Category */
            <div className="space-y-8">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-sm font-bold text-ink-dim hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
              >
                ← Kategorilere Geri Dön
              </button>
              
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-4xl shrink-0"
                  style={{ background: `${selectedCategory.color}26`, border: `2px solid ${selectedCategory.color}4D` }}>
                  {selectedCategory.icon}
                </div>
                <div>
                  <h2 className="font-display text-4xl font-bold" style={{ color: selectedCategory.color }}>{selectedCategory.title}</h2>
                  <p className="text-ink-dim mt-2">{selectedCategory.description}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {selectedCategory.problems.map((prob, idx) => (
                  <RevealOnScroll key={prob.id} delay={idx * 0.05}>
                    <div 
                      onClick={() => setActiveProblem(prob)}
                      className="group hf-glass border-white/5 hover:border-white/20 p-6 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-mono font-bold text-ink-dim group-hover:text-white transition-colors">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <h4 className="font-display text-xl font-bold text-white group-hover:hf-text-gradient transition-all">{prob.title}</h4>
                      </div>
                      <div className="text-sm font-bold text-ink-dim group-hover:text-white transition-colors">Detayları Gör →</div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Expand -> Problem Detail Modal (Codex View) */}
      <Modal 
        isOpen={!!activeProblem} 
        onClose={() => setActiveProblem(null)}
        title="Problem Teknik Spesifikasyonu"
        className="max-w-4xl"
      >
        {activeProblem && (
          <div className="space-y-8 py-4">
            <div className="pb-6 border-b border-white/5">
              <h3 className="font-display text-3xl font-bold hf-text-gradient mb-4">{activeProblem.title}</h3>
              <p className="text-ink-dim leading-relaxed">{activeProblem.task}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Codex Metadata */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-blue-400">Input (Datasets & Sources)</div>
                  <ul className="space-y-2">
                    {activeProblem.input.map((item, i) => (
                      <li key={i} className="text-sm text-ink-dim flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-green-400">Expected Output</div>
                  <ul className="space-y-2">
                    {activeProblem.output.map((item, i) => (
                      <li key={i} className="text-sm text-ink-dim flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/50"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Build & Evaluation */}
              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-yellow-400">Evaluation Metrics</div>
                  <ul className="space-y-2">
                    {activeProblem.evaluation.map((item, i) => (
                      <li key={i} className="text-sm text-ink-dim flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      handleSelectProblem(activeProblem);
                      setActiveProblem(null);
                    }}
                  >
                    Bu Problemi Seç (Use This Problem)
                  </Button>
                  <Button 
                    as="a" 
                    href={activeProblem.githubUrl} 
                    target="_blank" 
                    variant="ghost" 
                    className="w-full"
                  >
                    Starter Kit'i GitHub'da Gör
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Jüri ve Diğer Kısımlar (Existing) */}
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

      {/* Kurallar ve Accordion (Existing) */}
      <section className="mb-24">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Kurallar" title="Yarışma" gradient="kuralları." align="left" className="mb-6" />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <p className="text-ink-dim max-w-2xl leading-relaxed">
                Tüm katılımcıların okuması ve kabul etmesi gereken kurallar. Aşağıdaki kategorilerin her birine tıklayarak detayları görebilir, Yarışma kurallarının tamamı resmi PDF dokümanında yer almaktadır.
              </p>
              <Button as="a" href="/hackfest26-kurallar.pdf" download variant="ghost" iconRight={<ArrowRightIcon />}>
                PDF olarak indir
              </Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <Accordion
              items={ruleCategories.map((cat) => ({
                q: (
                  <span className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: `${cat.color}26`, border: `1px solid ${cat.color}4D` }}>{cat.icon}</span>
                    <span style={{ color: cat.color }}>{cat.title}</span>
                  </span>
                ),
                a: (
                  <ol className="space-y-3">
                    {cat.items.map((it, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="font-display font-bold text-lg shrink-0" style={{ color: cat.color, minWidth: '1.75rem' }}>{String(i + 1).padStart(2, '0')}</span>
                        <span className="leading-relaxed">{it}</span>
                      </li>
                    ))}
                  </ol>
                )
              }))}
            />
          </RevealOnScroll>
        </Container>
      </section>
    </div>
  );
}
