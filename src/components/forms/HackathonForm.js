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
    'rounded-2xl border-white/10 bg-white/[0.05] px-4 py-3.5 text-base text-white placeholder:text-[#7D87AF] focus:border-[#7C8BFF] focus:bg-white/[0.08] transition-all duration-200';

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
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Sol Panel: Bilgi Kartı */}
        <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
            {/* Dekoratif Işık */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-[80px]"></div>
            
            <div className="relative z-10 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></span>
                  Etkinlik Bilgisi
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white">
                  HackFest&apos;26 AI Hackathon
                </h2>
              </div>

              <div className="space-y-6">
                <InfoItem icon="📍" title="Fiziksel Katılım">
                  <p className="text-red-400 font-bold">
                    Bu etkinlik online değildir. Katılım İstinye Üniversitesi kampüsünde fiziksel olarak sağlanacaktır.
                  </p>
                </InfoItem>

                <InfoItem icon="💡" title="Proje Teması">
                  <p>Toplum yararına (sağlık, eğitim, çevre vb.) yapay zeka çözümleri geliştirin.</p>
                </InfoItem>

                <InfoItem icon="📅" title="Detaylı Bilgi">
                  <p>
                    Kurallar ve ödüller için{' '}
                    <a href="#hackathon" className="text-primary hover:underline underline-offset-4">Hackathon</a>{' '}
                    bölümünü inceleyebilirsiniz.
                  </p>
                </InfoItem>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="text-xs font-semibold text-ink-dim uppercase tracking-wider mb-4">Resmi Duyuru Kanalı</div>
                <a
                  href={SITE.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 shadow-[0_10px_40px_-10px_rgba(37,211,102,0.4)]"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Grubu
                  </div>
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Panel: Form */}
        <div className="flex-1 w-full max-w-2xl">
          <form onSubmit={submit} noValidate className="space-y-8">
            <FormSection title="Kişisel Bilgiler">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adın ve soyadın" error={errors.fullName} className={fieldClassName} required />
                </div>
                <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="Hangi üniversitedesin?" error={errors.university} className={fieldClassName} required />
                <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bölümün nedir?" error={errors.department} className={fieldClassName} required />
                <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresin.com" error={errors.email} className={fieldClassName} required />
                <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
              </div>
            </FormSection>

            <FormSection title="Takım ve Katılım">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <Select label="Takım durumun nedir? *" name="teamStatus" value={form.teamStatus} onChange={updateTeamStatus} error={errors.teamStatus} className={cn(fieldClassName, 'pr-10')} required>
                    <option value="">Seçiniz...</option>
                    <option value="has_team">Evet, takımım var</option>
                    <option value="will_form">Hayır, takımım yok (Eşleşmek istiyorum)</option>
                    <option value="individual">Bireysel katılacağım</option>
                  </Select>
                </div>

                {form.teamStatus === 'has_team' && (
                  <>
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
                  </>
                )}

                <div className="md:col-span-2">
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
              </div>
            </FormSection>

            <FormSection title="Proje ve Fikir">
              <Textarea
                label="Proje Fikrin veya İlgi Alanın (Opsiyonel)"
                name="projectIdea"
                rows={4}
                value={form.projectIdea}
                onChange={update('projectIdea')}
                placeholder="Hangi sosyal probleme AI ile çözüm üretmek istersin? (Örn: Sağlıkta erişilebilirlik, çevre kirliliği tespiti vb.)"
                error={errors.projectIdea}
                className={cn(fieldClassName, 'min-h-[140px]')}
              />
              <p className="mt-3 text-xs text-ink-dim italic leading-relaxed">
                💡 İpucu: Proje fikriniz hazır değilse, ilgilendiğiniz teknik alanları (örn: Computer Vision, LLMs) yazabilirsiniz.
              </p>
            </FormSection>

            <div className="pt-4">
              <Button type="submit" className="w-full py-5 text-lg font-bold shadow-xl shadow-primary/20" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
                {busy ? <LoaderInline>Başvurunuz İşleniyor...</LoaderInline> : 'Hackathon Başvurusunu Tamamla'}
              </Button>
              <p className="mt-6 text-center text-xs text-ink-dim leading-relaxed px-4">
                Başvurarak etkinlik kurallarını, KVKK şartlarını ve fiziksel katılım gerekliliğini kabul etmiş sayılırsın.
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
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-xl shadow-inner border border-white/5">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-sm font-bold text-white tracking-wide">{title}</div>
        <div className="text-xs leading-relaxed text-ink-dim">{children}</div>
      </div>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-bold text-white tracking-tight shrink-0">{title}</h3>
        <div className="h-px w-full bg-gradient-to-right from-white/10 to-transparent"></div>
      </div>
      {children}
    </div>
  );
}
