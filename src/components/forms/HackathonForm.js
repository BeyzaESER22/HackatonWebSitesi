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
    'rounded-2xl border-white/10 bg-white/[0.04] px-5 py-4 text-base text-white placeholder:text-[#7D87AF] focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300 shadow-sm';

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
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Sol Panel: Bilgi Kartı */}
        <div className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-12">
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.02] p-10 shadow-2xl backdrop-blur-sm">
            {/* Dekoratif Işık Efekti */}
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-[100px]"></div>
            
            <div className="relative z-10 space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                  Hackathon
                </div>
                <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-white">
                  HackFest&apos;26 <br/><span className="text-primary/90">AI Edition</span>
                </h2>
              </div>

              <div className="space-y-8">
                <InfoItem icon="📍" title="Fiziksel Katılım">
                  <p className="text-red-400 font-bold text-sm leading-relaxed">
                    Bu etkinlik online değildir. Katılım İstinye Üniversitesi kampüsünde fiziksel olarak sağlanacaktır.
                  </p>
                </InfoItem>

                <InfoItem icon="💡" title="Proje Teması">
                  <p className="text-sm leading-relaxed text-ink-dim">Toplum yararına (sağlık, eğitim, çevre vb.) yapay zeka çözümleri geliştirin.</p>
                </InfoItem>

                <InfoItem icon="📅" title="Detaylar">
                  <p className="text-sm leading-relaxed text-ink-dim">
                    Ödüller ve kurallar için{' '}
                    <a href="#hackathon" className="text-primary hover:underline underline-offset-4 font-semibold transition-colors">sayfayı incele</a>.
                  </p>
                </InfoItem>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="text-[10px] font-bold text-ink-mute uppercase tracking-[0.2em] mb-4">İletişim & Duyuru</div>
                <a
                  href={SITE.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-[#25D366] px-8 py-5 text-base font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_15px_40px_-10px_rgba(37,211,102,0.4)]"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </div>
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Panel: Form */}
        <div className="flex-1 w-full max-w-2xl py-2">
          <form onSubmit={submit} noValidate className="space-y-14">
            <FormSection title="Kişisel Bilgiler">
              <div className="flex flex-col gap-7">
                <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adın ve soyadın" error={errors.fullName} className={fieldClassName} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="Üniversiteniz" error={errors.university} className={fieldClassName} required />
                  <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bölümünüz" error={errors.department} className={fieldClassName} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresin.com" error={errors.email} className={fieldClassName} required />
                  <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
                </div>
              </div>
            </FormSection>

            <FormSection title="Katılım ve Takım">
              <div className="flex flex-col gap-7">
                <Select label="Takım durumun nedir? *" name="teamStatus" value={form.teamStatus} onChange={updateTeamStatus} error={errors.teamStatus} className={cn(fieldClassName, 'pr-10')} required>
                  <option value="">Seçiniz...</option>
                  <option value="has_team">Evet, takımım var</option>
                  <option value="will_form">Hayır, takımım yok (Eşleşmek istiyorum)</option>
                  <option value="individual">Bireysel katılacağım</option>
                </Select>

                {form.teamStatus === 'has_team' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7 animate-in fade-in slide-in-from-top-4 duration-500">
                    <Select label="Takımda kaç kişisiniz? *" name="teamSize" value={form.teamSize} onChange={update('teamSize')} error={errors.teamSize} className={cn(fieldClassName, 'pr-10')} required>
                      <option value="">Seçiniz...</option>
                      <option value="2">2 kişi</option>
                      <option value="3">3 kişi</option>
                      <option value="4">4 kişi</option>
                      <option value="5">5 kişi</option>
                    </Select>
                    <Select label="Arkadaşlarınız başvurdu mu? *" name="teammatesApplied" value={form.teammatesApplied} onChange={update('teammatesApplied')} error={errors.teammatesApplied} className={cn(fieldClassName, 'pr-10')} required>
                      <option value="">Seçiniz...</option>
                      <option value="yes">Evet, hepimiz başvurduk</option>
                      <option value="no">Henüz başvurmadılar</option>
                      <option value="waiting">Onların başvurusunu bekliyorum</option>
                    </Select>
                  </div>
                )}

                <Select label="Bizi nereden duydunuz? *" name="source" value={form.source} onChange={update('source')} error={errors.source} className={cn(fieldClassName, 'pr-10')} required>
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
              <div className="flex flex-col gap-4">
                <Textarea
                  label="Proje Fikrin veya İlgi Alanın (Opsiyonel)"
                  name="projectIdea"
                  rows={5}
                  value={form.projectIdea}
                  onChange={update('projectIdea')}
                  placeholder="Hangi sosyal probleme AI ile çözüm üretmek istersin? (Örn: Sağlıkta erişilebilirlik, sürdürülebilirlik vb.)"
                  error={errors.projectIdea}
                  className={cn(fieldClassName, 'min-h-[160px] resize-none')}
                />
                <p className="text-[11px] text-ink-mute italic leading-relaxed px-1">
                  💡 İpucu: Proje fikriniz hazır değilse, ilgilendiğiniz teknik alanları (Computer Vision, NLP vb.) yazabilirsiniz.
                </p>
              </div>
            </FormSection>

            <div className="pt-10">
              <Button type="submit" className="w-full py-6 text-xl font-black shadow-2xl shadow-primary/25 rounded-3xl" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
                {busy ? <LoaderInline>Başvurunuz Gönderiliyor...</LoaderInline> : 'Başvuruyu Tamamla'}
              </Button>
              <p className="mt-8 text-center text-xs text-ink-mute leading-relaxed max-w-sm mx-auto">
                Göndererek etkinlik kurallarını, KVKK şartlarını ve fiziksel katılım gerekliliğini onaylamış sayılırsın.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, title, children }) {
  return (
    <div className="flex gap-5 group">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-white/[0.04] text-2xl shadow-inner border border-white/10 transition-colors group-hover:bg-white/[0.08]">
        {icon}
      </div>
      <div className="space-y-1.5">
        <div className="text-sm font-black text-white tracking-widest uppercase">{title}</div>
        <div className="text-xs leading-relaxed text-ink-dim/90">{children}</div>
      </div>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-6 mb-8">
        <h3 className="text-xl font-black text-white tracking-tight shrink-0 uppercase">{title}</h3>
        <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent"></div>
      </div>
      {children}
    </div>
  );
}
