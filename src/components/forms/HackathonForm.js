'use client';
import { useEffect, useState } from 'react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { LoaderInline } from '@/components/ui/Loader';
import { cn } from '@/lib/helpers';
import { SITE } from '@/lib/constants';

const DRAFT_KEY = 'hf26_hackathon_form_draft';
const SUBMISSION_KEY_STORAGE = 'hf26_hackathon_submission_key';

const initial = {
  fullName: '', university: '', department: '', email: '',
  phone: '', teamStatus: '', teamSize: '', teammatesApplied: '', 
  source: '', projectIdea: '', website: ''
};

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `sub_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function HackathonForm({ onSuccess }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const { showToast } = useApp();

  const fieldClassName =
    'rounded-2xl border-white/10 bg-white/[0.05] px-6 py-4 text-lg text-white placeholder:text-[#7D87AF] focus:border-primary/50 focus:bg-white/[0.08] transition-all duration-300 w-full shadow-inner';

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

  const submit = async (e) => {
    e.preventDefault();
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
        if (json.fieldErrors) setErrors(json.fieldErrors);
        showToast({
          type: 'error',
          title: 'Form gönderilemedi',
          message: json.message || 'Lütfen alanları kontrol edin.'
        });
        return;
      }
      const nextSubmissionId = createSubmissionId();
      try {
        window.localStorage.removeItem(DRAFT_KEY);
        window.localStorage.setItem(SUBMISSION_KEY_STORAGE, nextSubmissionId);
      } catch {}
      setSubmissionId(nextSubmissionId);
      setForm(initial);
      showToast({
        title: 'Başvurun alındı!',
        message: 'Kaydın başarıyla tamamlandı. WhatsApp topluluğunda görüşmek üzere!'
      });
      onSuccess?.();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Bir hata oluştu',
        message: 'Bağlantı sorunu yaşandı.'
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-navy-900 relative overflow-hidden">
      
      {/* SOL PANEL: Bilgi ve Duyuru (Sıkıştırılmış & Açık Renk Teması) */}
      <aside className="w-full lg:w-[320px] xl:w-[400px] shrink-0 bg-[#f4f2eb] p-10 lg:p-12 lg:h-screen lg:sticky lg:top-0 overflow-y-auto border-r border-black/10">
        <div className="space-y-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-black/60 mb-6 border border-black/5">
              Etkinlik Detayı
            </div>
            <h2 className="font-display text-4xl font-black leading-tight text-navy-950">
              HackFest&apos;26 <br/>
              <span className="text-primary font-black">AI Edition</span>
            </h2>
          </div>

          <div className="space-y-10">
            <InfoItemDark icon="📍" title="Fiziksel">
              <p className="text-red-600 font-bold text-sm leading-relaxed">
                Bu etkinlik online DEĞİLDİR. İstinye Üniversitesi kampüsünde fiziksel katılım gereklidir.
              </p>
            </InfoItemDark>

            <InfoItemDark icon="💡" title="Tema">
              <p className="text-sm leading-relaxed text-black/70 font-medium">Toplum yararına (sağlık, eğitim, çevre vb.) yapay zeka projeleri.</p>
            </InfoItemDark>

            <InfoItemDark icon="🔗" title="WhatsApp">
              <p className="text-sm leading-relaxed text-black/70 font-medium">Tüm mentorluk ve takım eşleşme süreçleri WhatsApp üzerinden yürütülür.</p>
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-black text-white shadow-xl shadow-green-500/20 transition-transform hover:scale-[1.02] active:scale-95"
              >
                Gruba Katıl
              </a>
            </InfoItemDark>
          </div>
        </div>
      </aside>

      {/* SAĞ PANEL: Genişletilmiş Form Alanı */}
      <main className="flex-1 w-full p-6 sm:p-12 lg:p-20 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={submit} noValidate className="space-y-20">
            <FormSection title="Kişisel Bilgiler">
              <div className="space-y-10">
                <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adınız ve Soyadınız" error={errors.fullName} className={fieldClassName} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="Üniversiteniz" error={errors.university} className={fieldClassName} required />
                  <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bölümünüz" error={errors.department} className={fieldClassName} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresiniz.com" error={errors.email} className={fieldClassName} required />
                  <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
                </div>
              </div>
            </FormSection>

            <FormSection title="Katılım ve Takım">
              <div className="space-y-10">
                <Select label="Takım durumun nedir? *" name="teamStatus" value={form.teamStatus} onChange={updateTeamStatus} error={errors.teamStatus} className={cn(fieldClassName, 'pr-12')} required>
                  <option value="">Seçiniz...</option>
                  <option value="has_team">Evet, bir takımım var</option>
                  <option value="will_form">Hayır, bir takımım yok (Eşleşmek istiyorum)</option>
                  <option value="individual">Bireysel olarak katılacağım</option>
                </Select>

                {form.teamStatus === 'has_team' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in slide-in-from-top-6 duration-500">
                    <Select label="Takımda kaç kişisiniz? *" name="teamSize" value={form.teamSize} onChange={update('teamSize')} error={errors.teamSize} className={cn(fieldClassName, 'pr-12')} required>
                      <option value="">Seçiniz...</option>
                      <option value="2">2 kişi</option>
                      <option value="3">3 kişi</option>
                      <option value="4">4 kişi</option>
                      <option value="5">5 kişi</option>
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
            </FormSection>

            <FormSection title="Proje Fikri">
              <div className="space-y-6">
                <Textarea
                  label="Aklındaki Proje (Opsiyonel)"
                  name="projectIdea"
                  rows={6}
                  value={form.projectIdea}
                  onChange={update('projectIdea')}
                  placeholder="Hangi sosyal probleme AI ile çözüm üretmek istersin?"
                  error={errors.projectIdea}
                  className={cn(fieldClassName, 'min-h-[200px] resize-none')}
                />
              </div>
            </FormSection>

            <div className="pt-12">
              <Button type="submit" className="w-full py-7 text-2xl font-black shadow-2xl shadow-primary/30 rounded-[2rem] transition-transform hover:scale-[1.01]" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
                {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'BAŞVURUYU TAMAMLA'}
              </Button>
              <p className="mt-8 text-center text-xs text-ink-mute leading-relaxed max-w-lg mx-auto uppercase tracking-widest opacity-60">
                Fiziksel katılım şartını kabul etmiş sayılırsınız.
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function InfoItemDark({ icon, title, children }) {
  return (
    <div className="flex gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/5 text-2xl shadow-sm border border-black/5">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-[10px] font-black text-black/40 tracking-[0.2em] uppercase">{title}</div>
        <div className="text-sm font-medium leading-relaxed text-black/80">{children}</div>
      </div>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-8 mb-12">
        <h3 className="text-2xl font-black text-white tracking-tighter shrink-0 uppercase italic">{title}</h3>
        <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent"></div>
      </div>
      {children}
    </div>
  );
}
