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
    'rounded-2xl border-white/10 bg-white/[0.05] px-4 py-3 text-base text-white placeholder:text-[#7D87AF] focus:border-[#7C8BFF] focus:bg-white/[0.08]';

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
        message: json.message || 'Başvurun kaydedildi. WhatsApp topluluğuna katılmayı unutma!'
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
    <div className="grid gap-8 lg:grid-cols-12">
      {/* Sol Panel: Bilgi ve Duyuru */}
      <div className="lg:col-span-5 lg:pr-6">
        <div className="sticky top-8 space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Önemli Bilgilendirme
            </div>
            
            <h2 className="mt-4 font-display text-2xl font-bold text-white">HackFest&apos;26 AI Hackathon</h2>
            
            <div className="mt-6 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">📍</div>
                <div>
                  <div className="font-semibold text-white">Fiziksel Etkinlik</div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim text-red-400 font-bold">
                    Bu etkinlik online DEĞİLDİR. Katılımın fiziksel olarak sağlanması gerekmektedir.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">💡</div>
                <div>
                  <div className="font-semibold text-white">Tema: Toplum Yararına Yapay Zeka</div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim">
                    Eğitim, sağlık, çevre veya erişilebilirlik gibi alanlarda fark yaratacak AI projeleri geliştirmenizi bekliyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">🔗</div>
                <div>
                  <div className="font-semibold text-white">Hackathon Detayları</div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim">
                    Etkinlik akışı, ödüller ve kurallar hakkında detaylı bilgi için sayfanın üst kısmındaki{' '}
                    <a href="#hackathon" className="text-primary underline underline-offset-4 decoration-primary/30">Hackathon</a>{' '}
                    bölümünü ziyaret edebilirsin.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="text-sm font-semibold text-white mb-3">Resmi İletişim Kanalı</div>
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-bold text-white shadow-[0_8px_30px_rgb(37,211,102,0.2)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Grubuna Katıl
              </a>
              <p className="mt-3 text-xs text-ink-dim leading-relaxed">
                Tüm duyurular, mentor desteği ve takım eşleşmeleri bu grup üzerinden yönetilecektir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ Panel: Form */}
      <div className="lg:col-span-7">
        <form onSubmit={submit} noValidate className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="col-span-2">
              <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adın ve soyadın" error={errors.fullName} className={fieldClassName} required />
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="İstinye Üniversitesi" error={errors.university} className={fieldClassName} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bilgisayar Mühendisliği" error={errors.department} className={fieldClassName} required />
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="ornek@mail.com" error={errors.email} className={fieldClassName} required />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="+90 5XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
            </div>

            <div className="col-span-2">
              <Select
                label="Takım durumun nedir? *"
                name="teamStatus"
                value={form.teamStatus}
                onChange={updateTeamStatus}
                error={errors.teamStatus}
                className={cn(fieldClassName, 'pr-10')}
                required
              >
                <option value="">Seçiniz...</option>
                <option value="has_team">Evet, takımım var</option>
                <option value="will_form">Hayır, takımım yok (Eşleşmek istiyorum)</option>
                <option value="individual">Bireysel katılacağım</option>
              </Select>
            </div>

            {form.teamStatus === 'has_team' && (
              <>
                <div className="col-span-2 sm:col-span-1">
                  <Select
                    label="Takımda kaç kişisiniz? *"
                    name="teamSize"
                    value={form.teamSize}
                    onChange={update('teamSize')}
                    error={errors.teamSize}
                    className={cn(fieldClassName, 'pr-10')}
                    required
                  >
                    <option value="">Seçiniz...</option>
                    <option value="2">2 kişi</option>
                    <option value="3">3 kişi</option>
                    <option value="4">4 kişi</option>
                    <option value="5">5 kişi</option>
                  </Select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Select
                    label="Arkadaşlarınız başvurdu mu? *"
                    name="teammatesApplied"
                    value={form.teammatesApplied}
                    onChange={update('teammatesApplied')}
                    error={errors.teammatesApplied}
                    className={cn(fieldClassName, 'pr-10')}
                    required
                  >
                    <option value="">Seçiniz...</option>
                    <option value="yes">Evet, hepimiz başvurduk</option>
                    <option value="no">Henüz başvurmadılar</option>
                    <option value="waiting">Başvuru yapmalarını bekliyorum</option>
                  </Select>
                </div>
              </>
            )}

            <div className="col-span-2">
              <Input 
                label="Bizi nereden duydunuz? *" 
                name="source" 
                value={form.source} 
                onChange={update('source')} 
                placeholder="Instagram, LinkedIn, Okul kulübü vb." 
                error={errors.source} 
                className={fieldClassName} 
                required 
              />
            </div>

            <div className="col-span-2">
              <Textarea
                label="Proje Fikrin veya İlgi Alanın (Opsiyonel)"
                name="projectIdea"
                rows={4}
                value={form.projectIdea}
                onChange={update('projectIdea')}
                placeholder="Aklında bir fikir var mı? Hangi sosyal probleme AI ile çözüm üretmek istersin? (Örn: Sağlıkta erişilebilirlik, çevre kirliliği tespiti vb.)"
                error={errors.projectIdea}
                className={cn(fieldClassName, 'min-h-[120px]')}
              />
              <p className="mt-2 text-[11px] text-ink-dim italic">
                💡 İpucu: Proje fikriniz hazır değilse, ilgi duyduğunuz alanları (örn: Computer Vision, NLP) yazabilirsiniz.
              </p>
            </div>
          </div>

          <Button type="submit" className="mt-4 w-full py-4 text-base font-bold" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
            {busy ? <LoaderInline>Başvuru İşleniyor...</LoaderInline> : 'Hackathon Başvurusunu Tamamla'}
          </Button>

          <p className="text-center text-[11px] text-ink-dim">
            Başvurarak etkinlik kurallarını ve fiziksel katılım şartını kabul etmiş sayılırsın.
          </p>
        </form>
      </div>
    </div>
  );
}
