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
import { judgingCriteria, pitchGuide, presentationMethods, bonusPoints } from '@/data/judging';

const journeySteps = [
  { 
    id: 1, 
    title: 'Başvuru', 
    desc: 'Hackathon maratonuna kaydını yap, yerini ayırt. Başvurular 16 Mayıs 07:59’da kapanacaktır.', 
    link: '/register', 
    linkText: 'Kaydol →',
    note: 'Başvuru formu belirtilen saatte kapanır.' 
  },
  { 
    id: 2, 
    title: 'Kategori Seçimi', 
    desc: 'Sana rehberlik etmesi için kategorileri ve örnek problemleri (dataset dahil) listeledik.', 
    link: '#problems', 
    linkText: 'Havuzu Gör →',
    note: 'Kategori seçimi zorunlu, problemler ise sadece örnektir.' 
  },
  { 
    id: 3, 
    title: 'Hazırlık', 
    desc: 'Jüri kriterlerini ve kuralları oku. Web sitesi ve WhatsApp grubunu düzenli takip et.', 
    link: '#rules', 
    linkText: 'Kurallar →',
    note: 'Bu aşama kod yazma değil, maraton gününe hazırlıktır.' 
  },
  { 
    id: 4, 
    title: 'Geliştirme', 
    desc: '16-17 Mayıs tarihlerinde AI çözümünü inşa et. Google AI Studio kredi onayını almayı ve bilgisayarını getirmeyi unutma!', 
    link: '/schedule', 
    linkText: 'Program →',
    note: 'Projede kullanmak için Google AI Studio kredilerini talep et!'
  },
  { 
    id: 5, 
    title: 'Proje Teslimi', 
    desc: '17 Mayıs günü projeni Demo Day başvuru formu üzerinden sisteme yükle.', 
    link: '/projects/submit', 
    linkText: 'Teslim Et →',
    note: 'Ekip adına tek kişinin yüklemesi yeterlidir.' 
  },
  { 
    id: 6, 
    title: 'Final Pitch', 
    desc: 'Sunum formatını belirle ve senden beklenenleri "Pitch Rehberi" üzerinden incele.', 
    link: '#pitching', 
    linkText: 'Pitch Rehberi →',
    note: 'Hazırlığını sunum formatına göre yap.' 
  }
];

export default function HackathonInfoPage() {
  const { openModal, activeModal, modalData, closeModal, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeProblem, setActiveProblem] = useState(null);
  const [userSelectedProblem, setUserSelectedProblem] = useState(null);

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

      {/* Hackathon Journey Stepper */}
      <section className="mb-32">
        <Container>
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-white/5 z-0"></div>
            
            <div className="flex overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 gap-8 lg:justify-between no-scrollbar">
              {journeySteps.map((step) => (
                <div key={step.id} className="flex-shrink-0 w-72 lg:w-48 relative z-10 group">
                  <div className="w-12 h-12 rounded-full bg-[#05071A] border-2 border-white/10 flex items-center justify-center font-display font-bold text-lg mb-6 group-hover:border-primary group-hover:text-primary transition-all duration-300 shadow-xl shadow-black">
                    {step.id}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-display text-lg font-bold text-white group-hover:hf-text-gradient transition-all">{step.title}</h4>
                    <p className="text-xs text-ink-dim leading-relaxed min-h-[4rem]">
                      {step.desc}
                    </p>
                    {step.note && (
                      <p className="text-[10px] text-primary italic leading-tight mb-2">
                        <strong>Unutma:</strong> {step.note}
                      </p>
                    )}
                    <Link 
                      href={step.link} 
                      className="inline-block text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
                    >
                      {step.linkText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Problem Havuzu Engine */}
      <section className="mb-32 scroll-mt-32" id="problems">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <SectionTitle eyebrow="Browse Problems" title="Problem" gradient="Havuzu" align="left" className="!mb-0" />
              <Button as="a" href="/hackfest26-kurallar.pdf" download variant="ghost" iconRight={<ArrowRightIcon />}>
                Şartnameyi İndir (PDF)
              </Button>
            </div>
          </RevealOnScroll>

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

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
            <div className="flex gap-4">
              <div className="text-yellow-500 text-xl font-bold shrink-0">!</div>
              <div className="text-sm leading-relaxed text-ink-dim">
                <strong className="text-white">KRİTİK NOT:</strong> Takımların listedeki <span className="text-white font-bold underline">kategorilerden en az birini</span> seçmesi zorunludur. Belirlenen spesifik bir problemi seçmek isteğe bağlıdır; ancak profesyonel değerlendirme için listedeki taskları rehber almanız önerilir.
              </div>
            </div>
          </div>

          {!selectedCategory ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, idx) => (
                <RevealOnScroll key={cat.id} delay={idx * 0.05}>
                  <Card hover onClick={() => setSelectedCategory(cat)} className="cursor-pointer group h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6" style={{ background: `${cat.color}26`, border: `1px solid ${cat.color}4D` }}>{cat.icon}</div>
                    <h3 className="font-display text-xl font-bold mb-3" style={{ color: cat.color }}>{cat.title}</h3>
                    <p className="text-ink-dim text-sm mb-6 flex-grow">{cat.description}</p>
                    <div className="text-xs font-bold uppercase tracking-widest text-ink-dim group-hover:text-white transition-colors">{cat.problems.length} Problem Mevcut →</div>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <button onClick={() => setSelectedCategory(null)} className="text-sm font-bold text-ink-dim hover:text-white transition-colors mb-4 inline-flex items-center gap-2">← Kategorilere Geri Dön</button>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-4xl shrink-0" style={{ background: `${selectedCategory.color}26`, border: `2px solid ${selectedCategory.color}4D` }}>{selectedCategory.icon}</div>
                <div>
                  <h2 className="font-display text-4xl font-bold" style={{ color: selectedCategory.color }}>{selectedCategory.title}</h2>
                  <p className="text-ink-dim mt-2">{selectedCategory.description}</p>
                </div>
              </div>
              <div className="grid gap-4">
                {selectedCategory.problems.map((prob, idx) => (
                  <RevealOnScroll key={prob.id} delay={idx * 0.05}>
                    <div onClick={() => setActiveProblem(prob)} className="group hf-glass border-white/5 hover:border-white/20 p-6 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-mono font-bold text-ink-dim group-hover:text-white transition-colors">{String(idx + 1).padStart(2, '0')}</div>
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

      {/* Evaluation Criteria Section */}
      <section className="mb-32 scroll-mt-32" id="judging">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Değerlendirme" title="Jüri" gradient="Kriterleri" align="left" className="mb-12" />
          </RevealOnScroll>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h4 className="font-display text-xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-hf-gradient rounded-full"></span>
                Ana Kriterler (100 Puan)
              </h4>
              <div className="space-y-4">
                {judgingCriteria.map((c, i) => (
                  <RevealOnScroll key={c.title} delay={i * 0.05}>
                    <Card className="!p-6 overflow-hidden group border-white/5 bg-white/[0.02]">
                      <div className="flex gap-6 items-start">
                        <div className="font-display text-3xl font-black hf-text-gradient shrink-0 w-16 text-center">%{c.weight}</div>
                        <div className="flex-grow">
                          <h4 className="font-display text-lg font-bold text-white mb-1">{c.title}</h4>
                          <p className="text-ink-dim text-xs mb-3 italic">{c.desc}</p>
                          <ul className="space-y-2 mb-4">
                            {c.subpoints.map((sub, idx) => (
                              <li key={idx} className="text-[11px] text-ink-dim flex gap-2"><span className="w-1 h-1 rounded-full bg-hf-gradient mt-1.5 shrink-0"></span>{sub}</li>
                            ))}
                          </ul>
                          {c.note && <div className="text-[9px] font-bold text-primary uppercase tracking-wider opacity-60">⚠️ {c.note}</div>}
                        </div>
                      </div>
                    </Card>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="font-display text-xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                Bonus Puanlar
              </h4>
              <div className="space-y-4">
                {bonusPoints.map((b, i) => (
                  <RevealOnScroll key={b.title} delay={i * 0.05}>
                    <Card className="!p-6 border-green-500/10 bg-green-500/5">
                      <div className="flex gap-6 items-start">
                        <div className="font-display text-3xl font-bold text-green-500 shrink-0 w-16 text-center">{b.points}</div>
                        <div>
                          <h4 className="font-display text-lg font-bold text-white mb-1">{b.title}</h4>
                          <p className="text-ink-dim text-xs leading-relaxed">{b.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </RevealOnScroll>
                ))}
                <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm text-ink-dim leading-relaxed"><strong className="text-white">Not:</strong> Bonus puanlar ana puanın üzerine eklenir. Teknik uygulama kalitesi değerlendirilirken sadece "çalışıyor mu" değil, "nasıl çalışıyor" sorusuna yanıt aranacaktır.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pitching Guide Section */}
      <section className="mb-32 scroll-mt-32" id="pitching">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Sunum Rehberi" title="Nasıl" gradient="Pitch Edilir?" align="left" className="mb-12" />
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pitchGuide.map((step, i) => (
              <RevealOnScroll key={step.title} delay={i * 0.1}>
                <Card className="h-full flex flex-col !p-0 overflow-hidden border-white/5">
                  <div className="p-6 bg-white/[0.03] border-b border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{step.time}</span>
                    <div className="w-8 h-8 rounded-full bg-[#05071A] border border-white/10 flex items-center justify-center font-display font-bold text-xs">{i + 1}</div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h4 className="text-xl font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-[10px] font-bold text-ink-dim uppercase tracking-widest mb-6">Hedef: {step.goal}</p>
                    <ul className="space-y-3 mb-6">
                      {step.answers.map((ans, idx) => (
                        <li key={idx} className="text-sm text-ink-dim flex gap-3"><span className="text-primary font-bold">?</span>{ans}</li>
                      ))}
                    </ul>
                    {step.focus && <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/10"><p className="text-[11px] font-bold text-green-500">🎯 ODAK: {step.focus}</p></div>}
                    {step.avoid && <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10"><p className="text-[11px] font-bold text-red-400">🚫 KAÇININ: {step.avoid}</p></div>}
                    {step.proTip && <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10"><p className="text-[11px] font-bold text-blue-400">💡 İYİ PRATİK: {step.proTip}</p></div>}
                    {step.fallback && <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10"><p className="text-[11px] font-bold text-yellow-500">⚠️ FALLBACK: {step.fallback}</p></div>}
                  </div>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Presentation Methods Section */}
      <section className="mb-32">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Format" title="Sunum" gradient="Yöntemleri" align="left" className="mb-12" />
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-8">
            {presentationMethods.map((method, i) => (
              <RevealOnScroll key={method.id} delay={i * 0.1}>
                <Card className="h-full border-white/5 bg-white/[0.02]">
                  <div className="mb-8">
                    <h4 className="text-2xl font-bold text-white">{method.title}</h4>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Sunum Akışı</p>
                      <ul className="space-y-2">
                        {method.flow.map((f, idx) => (
                          <li key={idx} className="text-sm text-ink-dim flex gap-3"><span className="text-white/20">•</span>{f}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[11px] leading-relaxed"><span className="text-primary font-bold">✅ AVANTAJ:</span> <span className="text-ink-dim">{method.advantage}</span></p>
                      {method.risk && <p className="text-[11px] leading-relaxed mt-2"><span className="text-red-400 font-bold">⚠️ RİSK:</span> <span className="text-ink-dim">{method.risk}</span></p>}
                    </div>
                  </div>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Rules and FAQ */}
      <section className="mb-24 scroll-mt-32" id="rules">
        <Container>
          <RevealOnScroll>
            <SectionTitle eyebrow="Kurallar" title="Yarışma" gradient="kuralları." align="left" className="mb-6" />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <p className="text-ink-dim max-w-2xl leading-relaxed">Tüm katılımcıların okuması ve kabul etmesi gereken kurallar. Aşağıdaki kategorilerin her birine tıklayarak detayları görebilirsiniz.</p>
              <Button as="a" href="/hackfest26-kurallar.pdf" download variant="ghost" iconRight={<ArrowRightIcon />}>PDF Şartnameyi İndir</Button>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <Accordion
              items={ruleCategories.map((cat) => ({
                q: (<span className="flex items-center gap-3"><span className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: `${cat.color}26`, border: `1px solid ${cat.color}4D` }}>{cat.icon}</span><span style={{ color: cat.color }}>{cat.title}</span></span>),
                a: (<ol className="space-y-3">{cat.items.map((it, i) => (<li key={i} className="flex gap-4"><span className="font-display font-bold text-lg shrink-0" style={{ color: cat.color, minWidth: '1.75rem' }}>{String(i + 1).padStart(2, '0')}</span><span className="leading-relaxed text-ink-dim">{it}</span></li>))}</ol>)
              }))}
            />
          </RevealOnScroll>
        </Container>
      </section>

      {/* Problem Detail Modal (Internal) */}
      <Modal open={!!activeProblem} onClose={() => setActiveProblem(null)} title="Problem Teknik Spesifikasyonu" panelClassName="max-w-4xl">
        {activeProblem && (
          <div className="space-y-8 py-4">
            <div className="pb-6 border-b border-white/5"><h3 className="font-display text-3xl font-bold hf-text-gradient mb-4">{activeProblem.title}</h3><p className="text-ink-dim leading-relaxed">{activeProblem.task}</p></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-3"><div className="text-[10px] uppercase tracking-widest font-bold text-blue-400">Input (Datasets & Sources)</div><ul className="space-y-2">{activeProblem.input.map((item, i) => (
                      <li key={i} className="text-sm text-ink-dim flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50"></span>
                        {item}
                      </li>
                    ))}</ul></div>
                <div className="space-y-3"><div className="text-[10px] uppercase tracking-widest font-bold text-green-400">Expected Output</div><ul className="space-y-2">{activeProblem.output.map((item, i) => (
                      <li key={i} className="text-sm text-ink-dim flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/50"></span>
                        {item}
                      </li>
                    ))}</ul></div>
              </div>
              <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-3"><div className="text-[10px] uppercase tracking-widest font-bold text-yellow-400">Evaluation Metrics</div><ul className="space-y-2">{activeProblem.evaluation.map((item, i) => (
                      <li key={i} className="text-sm text-ink-dim flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50"></span>
                        {item}
                      </li>
                    ))}</ul></div>
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <Button className="w-full" onClick={() => { handleSelectProblem(activeProblem); setActiveProblem(null); }}>Bu Problemi Seç</Button>
                  <Button as="a" href={activeProblem.githubUrl} target="_blank" variant="ghost" className="w-full">GitHub Starter Kit</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
