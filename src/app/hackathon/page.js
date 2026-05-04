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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <SectionTitle eyebrow="Browse Problems" title="Problem" gradient="Havuzu" align="left" className="!mb-0" />
              <Button as="a" href="/hackfest26-kurallar.pdf" download variant="ghost" iconRight={<ArrowRightIcon />}>
                Şartnameyi İndir (PDF)
              </Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="max-w-4xl mb-12 space-y-4">
              <p className="text-ink-dim text-base md:text-lg leading-relaxed">
                HackFest&apos;26 için <span className="text-white font-semibold">10 farklı tematik kategori</span> belirledik. Her kategori; gerçek dünya verileriyle çalışan örnek problemler, beklenen çıktılar ve değerlendirme metrikleri içeriyor. Önce sana en anlamlı gelen kategoriyi seç, sonra çözmek istediğin problemi keşfet.
              </p>
              <p className="text-xs md:text-sm text-primary leading-relaxed">
                <strong className="text-white">İpucu:</strong> Kategori seçimi zorunlu, ancak listelenen problemler yalnızca esin kaynağıdır. Kendi probleminle de katılabilir, dilersen bir kategoriden başka bir kategoriye köprü kuran melez bir çözüm üretebilirsin.
              </p>
            </div>
          </RevealOnScroll>

          {userSelectedProblem && (
            <RevealOnScroll>
              <div className="mb-12 p-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-8 rounded-full shrink-0 bg-green-500" />
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-green-500 mb-1">Seçili Problem</p>
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

          {!selectedCategory ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, idx) => (
                <RevealOnScroll key={cat.id} delay={idx * 0.05}>
                  <Card hover onClick={() => setSelectedCategory(cat)} className="cursor-pointer group h-full flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <span className="text-3xl leading-none" aria-hidden>{cat.icon}</span>
                      <div className="w-5 h-0.5 rounded-full mt-3" style={{ background: cat.color }} />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3" style={{ color: cat.color }}>{cat.title}</h3>
                    {cat.tagline && (
                      <p className="text-white text-sm font-medium mb-3 leading-snug">{cat.tagline}</p>
                    )}
                    <p className="text-ink-dim text-xs mb-6 leading-relaxed flex-grow">{cat.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-dim group-hover:text-white transition-colors">{cat.problems.length} Örnek Problem</div>
                      <div className="text-xs font-bold text-ink-dim group-hover:text-white transition-colors">Keşfet →</div>
                    </div>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              <button onClick={() => setSelectedCategory(null)} className="text-sm font-bold text-ink-dim hover:text-white transition-colors mb-4 inline-flex items-center gap-2">← Kategorilere Geri Dön</button>

              {/* Kategori Hero */}
              <div className="flex items-start gap-5 mb-2">
                <div className="text-5xl shrink-0 leading-none mt-1" aria-hidden>{selectedCategory.icon}</div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 rounded-full shrink-0" style={{ background: selectedCategory.color }} />
                    <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: selectedCategory.color }}>{selectedCategory.title}</h2>
                  </div>
                  {selectedCategory.tagline && (
                    <p className="text-lg md:text-xl text-white font-medium leading-snug max-w-3xl mt-3">{selectedCategory.tagline}</p>
                  )}
                </div>
              </div>

              {/* Tema + Neden Önemli kartları */}
              {(selectedCategory.theme || selectedCategory.whyMatters) && (
                <div className="grid lg:grid-cols-3 gap-6 mb-10">
                  {selectedCategory.theme && (
                    <div className="lg:col-span-2 hf-glass border-white/5 p-8 rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: selectedCategory.color }}>Bu Kategoride Ne Var?</p>
                      <p className="text-ink-dim leading-relaxed text-base">{selectedCategory.theme}</p>
                      {selectedCategory.keyTopics && selectedCategory.keyTopics.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-white/5">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Odak Konular</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedCategory.keyTopics.map((topic) => (
                              <span
                                key={topic}
                                className="text-xs font-medium px-3 py-1.5 rounded-full border"
                                style={{
                                  borderColor: `${selectedCategory.color}40`,
                                  color: selectedCategory.color,
                                  backgroundColor: `${selectedCategory.color}10`
                                }}
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedCategory.whyMatters && selectedCategory.whyMatters.length > 0 && (
                    <div className="hf-glass border-white/5 p-8 rounded-2xl">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-5" style={{ color: selectedCategory.color }}>Neden Önemli?</p>
                      <ul className="space-y-4">
                        {selectedCategory.whyMatters.map((point, idx) => (
                          <li key={idx} className="text-sm text-ink-dim leading-relaxed flex gap-3">
                            <span className="font-display font-bold tabular-nums shrink-0" style={{ color: selectedCategory.color }}>0{idx + 1}</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Örnek Problemler başlığı */}
              <div className="flex items-center gap-4 pt-4 mb-2">
                <div className="h-px flex-grow" style={{ background: `linear-gradient(to right, ${selectedCategory.color}55, transparent)` }} />
                <h3 className="text-[11px] font-black uppercase tracking-[0.25em] shrink-0" style={{ color: selectedCategory.color }}>
                  Örnek Problemler · {selectedCategory.problems.length} Adet
                </h3>
                <div className="h-px flex-grow" style={{ background: `linear-gradient(to left, ${selectedCategory.color}55, transparent)` }} />
              </div>
              <p className="text-xs text-ink-dim text-center max-w-2xl mx-auto mb-6">
                Aşağıdaki problemler ilham vermek için derlenmiştir. Detayları görmek ve takımına problem seçmek için tıkla.
              </p>

              <div className="grid gap-4">
                {selectedCategory.problems.map((prob, idx) => (
                  <RevealOnScroll key={prob.id} delay={idx * 0.05}>
                    <div onClick={() => setActiveProblem(prob)} className="group hf-glass border-white/5 hover:border-white/20 p-6 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6 flex-grow min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-mono font-bold text-ink-dim group-hover:text-white transition-colors shrink-0" style={{ borderColor: selectedCategory.color }}>{String(idx + 1).padStart(2, '0')}</div>
                        <div className="min-w-0">
                          <h4 className="font-display text-lg md:text-xl font-bold text-white group-hover:hf-text-gradient transition-all truncate">{prob.title}</h4>
                          {prob.task && (
                            <p className="text-xs text-ink-dim leading-snug mt-1 line-clamp-2">{prob.task}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-ink-dim group-hover:text-white transition-colors shrink-0 hidden sm:block">Detayları Gör →</div>
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
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
              <SectionTitle eyebrow="Değerlendirme" title="Jüri" gradient="Kriterleri" align="left" className="!mb-0" />
              <Button as="a" href="/hackfest26-kurallar.pdf" download variant="ghost" iconRight={<ArrowRightIcon />}>
                Detaylı Şartnameyi İncele (PDF)
              </Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="text-ink-dim max-w-3xl leading-relaxed mb-12 text-sm md:text-base">
              Toplam <span className="text-white font-semibold">100 puan + 15 bonus puan</span> üzerinden değerlendirilirsin. Aşağıda kriterlerin başlığı ve ağırlığı yer alır; her kriterin alt rubriği, puanlama bandı ve örnek hesaplamalar için <span className="text-white font-semibold">PDF Şartnameyi</span> incelemelisin.
            </p>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-8 bg-hf-gradient rounded-full"></span>
                <h4 className="font-display text-xl font-bold">Ana Kriterler · Toplam 100 Puan</h4>
              </div>
              <div className="space-y-3">
                {judgingCriteria.map((c, i) => (
                  <RevealOnScroll key={c.title} delay={i * 0.04}>
                    <Card className="!p-5 border-white/5 bg-white/[0.02]">
                      <div className="flex gap-5 items-center">
                        <div className="font-display text-2xl md:text-3xl font-black hf-text-gradient shrink-0 w-16 text-center">%{c.weight}</div>
                        <div className="flex-grow min-w-0">
                          <h5 className="font-display text-base md:text-lg font-bold text-white">{c.title}</h5>
                          <p className="text-ink-dim text-xs mt-1 leading-snug">{c.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                <h4 className="font-display text-xl font-bold">Bonus Puanlar · +15</h4>
              </div>
              <div className="space-y-3">
                {bonusPoints.map((b, i) => (
                  <RevealOnScroll key={b.title} delay={i * 0.05}>
                    <Card className="!p-5 border-green-500/10 bg-green-500/5">
                      <div className="flex gap-5 items-start">
                        <div className="font-display text-2xl md:text-3xl font-bold text-green-500 shrink-0 w-16 text-center">{b.points}</div>
                        <div className="min-w-0">
                          <h5 className="font-display text-base md:text-lg font-bold text-white mb-1">{b.title}</h5>
                          <p className="text-ink-dim text-xs leading-relaxed">{b.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </RevealOnScroll>
                ))}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <p className="text-xs text-ink-dim leading-relaxed">
                    <strong className="text-white">Not:</strong> HackFest&apos;26&apos;da odak <span className="text-white font-semibold">mühendislik kalitesidir</span>. AI araçlarının kullanımına izin veriyor; ancak halüsinasyon, gizlilik, deterministiklik ve performans kararlarına bilinçli yaklaştığını jüri arar.
                  </p>
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
            <SectionTitle eyebrow="Sunum Rehberi" title="Nasıl" gradient="Pitch Edilir?" align="left" className="mb-6" />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="max-w-4xl mb-12 space-y-3">
              <p className="text-ink-dim text-base md:text-lg leading-relaxed">
                <span className="text-white font-semibold">5 dakika sunum + 3 dakika soru-cevap</span>. Aşağıdaki 6 adım, profesyonel hackathonlarda kullanılan klasik pitch akışıdır. Her adım için süre, hedef, ana sorular ve odak/risk uyarıları yer alıyor.
              </p>
              <p className="text-xs md:text-sm text-primary leading-relaxed">
                <strong className="text-white">İpucu:</strong> Süre tablosunu sunum öncesi prova ederken kronometreyle test edin; ortalama bir takım %30 daha uzun sürer.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pitchGuide.map((step, i) => (
              <RevealOnScroll key={step.title} delay={i * 0.08}>
                <Card className="h-full flex flex-col !p-0 overflow-hidden border-white/5">
                  <div className="p-5 bg-white/[0.03] border-b border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary tabular-nums">{step.time}</span>
                    <div className="w-8 h-8 rounded-full bg-[#05071A] border border-white/10 flex items-center justify-center font-display font-bold text-xs">{i + 1}</div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h4 className="text-xl font-bold text-white mb-1 leading-tight">{step.title}</h4>
                    <p className="text-[10px] font-bold text-ink-dim uppercase tracking-widest mb-5">Hedef · {step.goal}</p>
                    <ul className="space-y-2.5 mb-5">
                      {step.answers.map((ans, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-ink-dim flex gap-2.5 leading-snug">
                          <span className="text-primary font-bold shrink-0">?</span>
                          <span>{ans}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2 mt-auto">
                      {step.focus && (
                        <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                          <p className="text-[11px] leading-relaxed flex items-start gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                            <span><span className="text-green-500 font-bold">ODAK:</span> <span className="text-ink-dim">{step.focus}</span></span>
                          </p>
                        </div>
                      )}
                      {step.avoid && (
                        <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                          <p className="text-[11px] leading-relaxed flex items-start gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                            <span><span className="text-red-400 font-bold">KAÇININ:</span> <span className="text-ink-dim">{step.avoid}</span></span>
                          </p>
                        </div>
                      )}
                      {step.proTip && (
                        <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                          <p className="text-[11px] leading-relaxed flex items-start gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 mt-0.5 shrink-0"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                            <span><span className="text-blue-400 font-bold">PRO İPUCU:</span> <span className="text-ink-dim">{step.proTip}</span></span>
                          </p>
                        </div>
                      )}
                      {step.fallback && (
                        <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                          <p className="text-[11px] leading-relaxed flex items-start gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mt-0.5 shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <span><span className="text-yellow-500 font-bold">YEDEK PLAN:</span> <span className="text-ink-dim">{step.fallback}</span></span>
                          </p>
                        </div>
                      )}
                    </div>
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
            <SectionTitle eyebrow="Format" title="Sunum" gradient="Yöntemleri" align="left" className="mb-6" />
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-ink-dim max-w-3xl leading-relaxed mb-12 text-sm md:text-base">
              Pitch için kullanabileceğin <span className="text-white font-semibold">üç tipik format</span>. Hiçbiri diğerinden üstün değildir; takımın gücüne, ürünün olgunluğuna ve hikâyenin doğasına göre seçim yap.
            </p>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentationMethods.map((method, i) => (
              <RevealOnScroll key={method.id} delay={i * 0.08}>
                <Card className="h-full flex flex-col !p-0 border-white/5 bg-white/[0.02] overflow-hidden">
                  <div className="p-6 border-b border-white/5">
                    <h4 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">{method.title}</h4>
                    {method.tagline && (
                      <p className="text-sm text-primary font-medium leading-snug">{method.tagline}</p>
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col gap-5">
                    {method.description && (
                      <p className="text-xs md:text-sm text-ink-dim leading-relaxed">{method.description}</p>
                    )}

                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">Sunum Akışı (5 dk)</p>
                      <ul className="space-y-2">
                        {method.flow.map((f, idx) => (
                          <li key={idx} className="text-xs text-ink-dim flex gap-2.5 leading-snug">
                            <span className="text-white/30 shrink-0 mt-0.5">▸</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {method.bestFor && method.bestFor.length > 0 && (
                      <div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">Hangi Takıma Uygun?</p>
                        <div className="flex flex-wrap gap-2">
                          {method.bestFor.map((tag) => (
                            <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 text-ink-dim bg-white/[0.02]">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                      <p className="text-[11px] leading-relaxed flex items-start gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                        <span><span className="text-primary font-bold">Avantaj:</span> <span className="text-ink-dim">{method.advantage}</span></span>
                      </p>
                      {method.risk && (
                        <p className="text-[11px] leading-relaxed flex items-start gap-1.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mt-0.5 shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                          <span><span className="text-red-400 font-bold">Risk:</span> <span className="text-ink-dim">{method.risk}</span></span>
                        </p>
                      )}
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
                q: (<span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.color }} /><span style={{ color: cat.color }}>{cat.title}</span></span>),
                a: (<ol className="space-y-3">{cat.items.map((it, i) => (<li key={i} className="flex gap-4"><span className="font-display font-bold text-sm shrink-0 tabular-nums" style={{ color: cat.color, minWidth: '1.75rem' }}>{String(i + 1).padStart(2, '0')}</span><span className="leading-relaxed text-ink-dim text-sm">{it}</span></li>))}</ol>)
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
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                  <p className="text-[11px] leading-relaxed text-blue-300">
                    <strong className="text-white">Teknik Not:</strong> Veri seti ham/temizlenmiş haldedir. Jürinin beklentisi, bu veriyi modele sokmadan önce yapacağınız <strong>ön işleme (preprocessing)</strong> ve <strong>mühendislik</strong> kararlarıdır.
                  </p>
                </div>
                <div className="space-y-3"><div className="text-[10px] uppercase tracking-widest font-bold text-yellow-400">Evaluation Metrics</div><ul className="space-y-2">{activeProblem.evaluation.map((item, i) => (
                      <li key={i} className="text-sm text-ink-dim flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50"></span>
                        {item}
                      </li>
                    ))}</ul></div>
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <Button className="w-full" onClick={() => { handleSelectProblem(activeProblem); setActiveProblem(null); }}>Bu Problemi Seç</Button>
                  <Button as="a" href={activeProblem.datasetUrl} target="_blank" variant="ghost" className="w-full text-xs border-blue-500/30 text-blue-400">Veri Setini İncele</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
