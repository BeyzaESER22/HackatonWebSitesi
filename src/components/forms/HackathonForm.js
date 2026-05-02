'use client';
import { useEffect, useState } from 'react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { LoaderInline } from '@/components/ui/Loader';
import { cn } from '@/lib/helpers';
import { categories } from '@/data/problems';

const DRAFT_KEY = 'hf26_hackathon_form_draft';
const SUBMISSION_KEY_STORAGE = 'hf26_hackathon_submission_key';

const initial = {
  fullName: '', university: '', department: '', grade: '', email: '',
  phone: '', teamStatus: '', teamSize: '', teammatesApplied: '', 
  source: '', projectIdea: '', category: '', website: ''
};

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function HackathonForm({ onSuccess }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const { showToast } = useApp();

  const fieldClassName =
    'rounded-2xl border-white/10 bg-white/[0.05] px-5 py-3.5 text-base text-white placeholder:text-[#7D87AF] focus:border-primary/50 focus:bg-white/[0.08] transition-all duration-300 w-full';

  const update = (k) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [k]: value }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  const updateTeamStatus = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      teamStatus: value,
      teamSize: value === 'has_team' ? prev.teamSize : '',
      teammatesApplied: value === 'has_team' ? prev.teammatesApplied : ''
    }));
    setErrors((prev) => ({
      ...prev,
      teamStatus: undefined,
      teamSize: undefined,
      teammatesApplied: undefined
    }));
  };

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        const merged = { ...initial, ...parsed };
        setForm(merged);
      }
      const savedSubmissionId = window.localStorage.getItem(SUBMISSION_KEY_STORAGE);
      const nextSubmissionId = savedSubmissionId || createSubmissionId();
      setSubmissionId(nextSubmissionId);
      if (!savedSubmissionId) {
        window.localStorage.setItem(SUBMISSION_KEY_STORAGE, nextSubmissionId);
      }
    } catch {
      setSubmissionId(createSubmissionId());
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  const validateStep = (s) => {
    const newErrors = {};
    if (s === 1) {
      if (!form.fullName) newErrors.fullName = 'Ad soyad gerekli';
      if (!form.university) newErrors.university = 'Üniversite gerekli';
      if (!form.department) newErrors.department = 'Bölüm gerekli';
      if (!form.grade) newErrors.grade = 'Sınıf seçiniz';
      if (!form.email || !form.email.includes('@')) newErrors.email = 'Geçerli e-posta gerekli';
      if (!form.phone || form.phone.length < 10) newErrors.phone = 'Telefon gerekli';
    } else if (s === 2) {
      if (!form.teamStatus) newErrors.teamStatus = 'Takım durumu seçiniz';
      if (form.teamStatus === 'has_team' && !form.teamSize) newErrors.teamSize = 'Kişi sayısı seçiniz';
      if (form.teamStatus === 'has_team' && !form.teammatesApplied) newErrors.teammatesApplied = 'Başvuru durumu seçiniz';
      if (!form.source) newErrors.source = 'Bu alan gerekli';
    } else if (s === 3) {
      if (!form.category) newErrors.category = 'Kategori seçiniz';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (e, retryCount = 0) => {
    if (e) e.preventDefault();
    if (!validateStep(3)) return;

    setBusy(true);
    setErrors({});
    
    try {
      const res = await fetch('/api/hackathon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          clientSubmissionId: submissionId || createSubmissionId()
        })
      });
      
      const json = await res.json();
      
      if (!res.ok) {
        if (res.status === 429) {
          showToast({ type: 'error', title: 'Biraz bekle', message: json.message });
          setBusy(false);
          return;
        }
        if (json.fieldErrors) setErrors(json.fieldErrors);
        showToast({ type: 'error', title: 'Form gönderilemedi', message: json.message || 'Lütfen alanları kontrol edin.' });
        setBusy(false);
        return;
      }

      const nextSubmissionId = createSubmissionId();
      try {
        window.localStorage.removeItem(DRAFT_KEY);
        window.localStorage.setItem(SUBMISSION_KEY_STORAGE, nextSubmissionId);
      } catch {}
      setSubmissionId(nextSubmissionId);
      setForm(initial);
      setStep(1);
      showToast({ title: 'Başvurun alındı!', message: 'Kaydın başarıyla tamamlandı.' });
      onSuccess?.();
    } catch (err) {
      if (retryCount < 2) {
        const delay = (retryCount + 1) * 2000;
        showToast({ type: 'info', title: 'Bağlantı sorunu', message: `Tekrar deneniyor... (${retryCount + 1}/2)` });
        setTimeout(() => submit(null, retryCount + 1), delay);
      } else {
        showToast({ type: 'error', title: 'Gönderim başarısız', message: 'Bağlantı sorunu yaşandı.' });
        setBusy(false);
      }
    }
  };

  const steps = [
    { n: 1, title: 'Kişisel' },
    { n: 2, title: 'Katılım' },
    { n: 3, title: 'Proje' }
  ];

  return (
    <div className="space-y-8">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-hf-gradient -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        {steps.map((s) => (
          <div key={s.n} className="relative z-10 flex flex-col items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
              step >= s.n ? "bg-[#05071A] border-primary text-white scale-110 shadow-lg shadow-primary/20" : "bg-[#05071A] border-white/10 text-white/30"
            )}>
              {step > s.n ? '✓' : s.n}
            </div>
            <span className={cn(
              "text-[10px] uppercase tracking-widest font-bold mt-2",
              step >= s.n ? "text-white" : "text-white/20"
            )}>{s.title}</span>
          </div>
        ))}
      </div>

      <form onSubmit={(e) => submit(e)} noValidate className="space-y-10">
        <div style={{ position: 'absolute', left: '-9999px', top: '0', opacity: 0, zIndex: -1 }} aria-hidden="true">
          <input type="text" name="website" tabIndex="-1" value={form.website || ''} onChange={update('website')} autoComplete="off" />
        </div>

        {/* STEP 1: PERSONAL */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              <h4 className="text-xl font-bold hf-text-gradient">Kişisel Bilgiler</h4>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adınız ve Soyadınız" error={errors.fullName} className={fieldClassName} required />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="Üniversiteniz" error={errors.university} className={fieldClassName} required />
                <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bölümünüz" error={errors.department} className={fieldClassName} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select label="Sınıf *" name="grade" value={form.grade} onChange={update('grade')} error={errors.grade} className={cn(fieldClassName, 'pr-12')} required>
                  <option value="">Seçiniz...</option>
                  <option value="prep">Hazırlık</option>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}. Sınıf</option>)}
                </Select>
                <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresiniz.com" error={errors.email} className={fieldClassName} required />
              </div>

              <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
            </div>
            
            <Button type="button" onClick={nextStep} className="w-full py-5 text-lg font-bold rounded-2xl" iconRight={<ArrowRightIcon />}>
              SONRAKİ ADIM
            </Button>
          </div>
        )}

        {/* STEP 2: PARTICIPATION */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4">
              <span className="w-2 h-8 bg-green-500 rounded-full"></span>
              <h4 className="text-xl font-bold hf-text-gradient">Katılım Bilgileri</h4>
            </div>

            <div className="space-y-6">
              <Select label="Takım durumun nedir? *" name="teamStatus" value={form.teamStatus} onChange={updateTeamStatus} error={errors.teamStatus} className={cn(fieldClassName, 'pr-12')} required>
                <option value="">Seçiniz...</option>
                <option value="has_team">Evet, bir takımım var</option>
                <option value="will_form">Hayır, bir takımım yok (Eşleşmek istiyorum)</option>
                <option value="individual">Bireysel olarak katılacağım</option>
              </Select>

              {form.teamStatus === 'has_team' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 animate-in zoom-in-95 duration-300">
                  <Select label="Takımda kaç kişisiniz? *" name="teamSize" value={form.teamSize} onChange={update('teamSize')} error={errors.teamSize} className={cn(fieldClassName, 'pr-12')} required>
                    <option value="">Seçiniz...</option>
                    {[2,3,4,5].map(n => <option key={n} value={n}>{n} kişi</option>)}
                  </Select>
                  <Select label="Arkadaşlarınız başvurdu mu? *" name="teammatesApplied" value={form.teammatesApplied} onChange={update('teammatesApplied')} error={errors.teammatesApplied} className={cn(fieldClassName, 'pr-12')} required>
                    <option value="">Seçiniz...</option>
                    <option value="yes">Evet, hepimiz başvurduk</option>
                    <option value="no">Henüz başvurmadılar</option>
                    <option value="waiting">Onların başvurmasını bekliyorum</option>
                  </Select>
                </div>
              )}

              <Select label="Bizi nereden duydunuz? *" name="source" value={form.source} onChange={update('source')} error={errors.source} className={cn(fieldClassName, 'pr-12')} required>
                <option value="">Seçiniz...</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="club">Üniversite Kulübü</option>
                <option value="whatsapp">WhatsApp Grupları</option>
                <option value="friend">Arkadaş Tavsiyesi</option>
                <option value="other">Diğer</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="ghost" onClick={prevStep} className="py-5 rounded-2xl">GERİ</Button>
              <Button type="button" onClick={nextStep} className="py-5 rounded-2xl" iconRight={<ArrowRightIcon />}>DEVAM ET</Button>
            </div>
          </div>
        )}

        {/* STEP 3: PROJECT */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4">
              <span className="w-2 h-8 bg-yellow-500 rounded-full"></span>
              <h4 className="text-xl font-bold hf-text-gradient">Proje Bilgileri</h4>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex gap-4">
                <div className="text-yellow-500 text-xl font-bold shrink-0">!</div>
                <div className="text-sm leading-relaxed text-white/60">
                  <strong className="text-white">KRİTİK NOT:</strong> Kategorilerden en az birini seçmeniz zorunludur. Projenizin seçtiğiniz temanın hedefleriyle uyumlu olması değerlendirmede kritik rol oynar.
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-xs text-white/40 uppercase tracking-widest font-bold ml-1">Kategori Seçimi *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, category: cat.id }))}
                      className={cn(
                        "p-4 rounded-2xl border transition-all text-left flex flex-col gap-2 group relative",
                        form.category === cat.id 
                          ? "bg-white/10 border-white/40 shadow-lg shadow-white/5" 
                          : "bg-white/[0.03] border-white/5 hover:border-white/20"
                      )}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-tighter leading-tight",
                        form.category === cat.id ? "text-white" : "text-white/40 group-hover:text-white/60"
                      )}>{cat.title}</span>
                      {form.category === cat.id && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
                {errors.category && <p className="text-google-red text-xs mt-1 ml-1">— {errors.category}</p>}
              </div>

              <Textarea
                label="Proje Fikri (Opsiyonel)"
                name="projectIdea"
                rows={4}
                value={form.projectIdea}
                onChange={update('projectIdea')}
                placeholder="Aklındaki proje fikrini kısaca anlatabilirsin."
                error={errors.projectIdea}
                className={cn(fieldClassName, 'min-h-[140px] resize-none')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="ghost" onClick={prevStep} className="py-5 rounded-2xl" disabled={busy}>GERİ</Button>
              <Button type="submit" className="py-5 text-xl font-black rounded-2xl" disabled={busy}>
                {busy ? <LoaderInline>GÖNDERİLİYOR...</LoaderInline> : 'BAŞVURUYU TAMAMLA'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
