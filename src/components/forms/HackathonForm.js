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
    'rounded-2xl border-white/15 bg-white/[0.05] px-6 py-4 text-lg text-white placeholder:text-[#7D87AF] focus:border-primary/50 focus:bg-white/[0.08] transition-all duration-300 w-full shadow-inner';

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
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-10 w-full">
        
        {/* ÜST PANEL: Kompakt Bilgi Banner'ı */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-xl w-full">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[100px]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-white/10 pb-8 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                Önemli Bilgi
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black leading-tight text-white">
                HackFest&apos;26 <span className="text-primary/90">AI Edition</span>
              </h2>
            </div>

            <a
              href={SITE.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-[1.5rem] bg-[#25D366] px-6 py-4 text-sm font-black text-white transition-all hover:scale-[1.03] active:scale-95 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] shrink-0"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp'a Katıl
            </a>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <InfoItem icon="📍" title="Fiziksel Katılım">
              <span className="text-red-400 font-bold block mb-1">Bu etkinlik online DEĞİLDİR.</span>
              Katılım İstinye Üniversitesi kampüsünde fiziksel olarak sağlanacaktır.
            </InfoItem>
            <InfoItem icon="💡" title="Proje Teması">
              Eğitim, sağlık ve çevre gibi alanlarda toplum yararına yapay zeka çözümleri.
            </InfoItem>
            <InfoItem icon="🔗" title="Detaylar">
              Ödüller, mentorlar ve kurallar hakkında tüm detaylar üst menüde.
            </InfoItem>
          </div>
        </div>

        {/* ALT PANEL: Başvuru Formu */}
        <div className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-inner">
          <form onSubmit={submit} noValidate className="space-y-16">
            <FormSection title="Kişisel Bilgiler">
              <div className="space-y-8">
                <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adınız ve Soyadınız" error={errors.fullName} className={fieldClassName} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="Üniversiteniz" error={errors.university} className={fieldClassName} required />
                  <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bölümünüz" error={errors.department} className={fieldClassName} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresiniz.com" error={errors.email} className={fieldClassName} required />
                  <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
                </div>
              </div>
            </FormSection>

            <FormSection title="Katılım ve Takım">
              <div className="space-y-8">
                <Select label="Takım durumun nedir? *" name="teamStatus" value={form.teamStatus} onChange={updateTeamStatus} error={errors.teamStatus} className={cn(fieldClassName, 'pr-12')} required>
                  <option value="">Seçiniz...</option>
                  <option value="has_team">Evet, bir takımım var</option>
                  <option value="will_form">Hayır, bir takımım yok (Eşleşmek istiyorum)</option>
                  <option value="individual">Bireysel olarak katılacağım</option>
                </Select>

                {form.teamStatus === 'has_team' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-6 duration-500">
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

            <FormSection title="Proje Fikri ve İlgi Alanı">
              <div className="space-y-6">
                <Textarea
                  label="Aklındaki Proje veya Çözüm (Opsiyonel)"
                  name="projectIdea"
                  rows={5}
                  value={form.projectIdea}
                  onChange={update('projectIdea')}
                  placeholder="Hangi sosyal probleme AI ile çözüm üretmek istersin? Fikriniz henüz hazır değilse ilgi duyduğunuz alanları belirtebilirsiniz."
                  error={errors.projectIdea}
                  className={cn(fieldClassName, 'min-h-[160px] resize-none')}
                />
                <p className="text-sm text-ink-mute italic leading-relaxed px-3 border-l-2 border-primary/30">
                  💡 İpucu: Proje fikriniz yoksa bile çekinmeyin; etkinlik günü mentorlarımızla fikrinizi geliştirebilirsiniz.
                </p>
              </div>
            </FormSection>

            <div className="pt-8">
              <Button type="submit" className="w-full py-6 text-xl font-black shadow-2xl shadow-primary/30 rounded-[2rem] transition-transform hover:scale-[1.01]" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
                {busy ? <LoaderInline>Başvurunuz İşleniyor...</LoaderInline> : 'BAŞVURUYU TAMAMLA'}
              </Button>
              <p className="mt-6 text-center text-xs text-ink-mute leading-relaxed max-w-lg mx-auto">
                Bu formu göndererek etkinlik kurallarını, KVKK aydınlatma metnini ve fiziksel katılım şartını kabul etmiş sayılırsınız.
              </p>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}

// Yardımcı bileşenler formun alt paneline uyması için hafifçe güncellendi
function InfoItem({ icon, title, children }) {
  return (
    <div className="flex gap-4 group items-start">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl shadow-lg border border-white/20 transition-all group-hover:bg-white/15">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-xs font-black text-white tracking-[0.1em] uppercase">{title}</div>
        <div className="text-sm leading-relaxed text-ink-dim/90">{children}</div>
      </div>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-6 mb-8">
        <h3 className="text-xl font-black text-white tracking-tight shrink-0 uppercase italic">{title}</h3>
        <div className="h-px w-full bg-gradient-to-r from-white/30 to-transparent"></div>
      </div>
      {children}
    </div>
  );
}
