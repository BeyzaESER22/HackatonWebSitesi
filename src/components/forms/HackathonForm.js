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
  phone: '', teamStatus: '', teamSize: '', projectIdea: '', website: ''
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
      teamSize: value === 'has_team' ? prev.teamSize : ''
    }));
    setErrors((prev) => ({
      ...prev,
      teamStatus: undefined,
      teamSize: undefined
    }));
  };

  useEffect(() => {
    try {
      const savedDraft = window.localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setForm((prev) => ({ ...prev, ...parsed }));
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
        message: json.message || (
          json.duplicate
            ? 'Aynı başvurunun tekrarını algıladık; mevcut kaydın korundu. WhatsApp topluluğuna da katılmayı unutma.'
            : 'Başvurun güvenli şekilde kaydedildi. WhatsApp topluluğuna da katılmayı unutma.'
        )
      });
      onSuccess?.();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Bir hata oluştu',
        message: 'Bağlantı sorunu yaşandı. Form verileri cihazında tutuldu; tekrar deneyebilirsin.'
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="col-span-2">
          <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adın ve soyadın" error={errors.fullName} className={fieldClassName} required />
        </div>
        <div className="col-span-2 hidden" aria-hidden="true">
          <Input
            label="Web Sitesi"
            name="website"
            value={form.website}
            onChange={update('website')}
            placeholder="Boş bırakın"
            tabIndex={-1}
            autoComplete="off"
          />
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
            label="Takımın var mı? *"
            name="teamStatus"
            value={form.teamStatus}
            onChange={updateTeamStatus}
            error={errors.teamStatus}
            className={cn(fieldClassName, 'pr-10')}
            required
          >
            <option value="">Seçiniz...</option>
            <option value="has_team">Evet, takımım var</option>
            <option value="will_form">Hayır, takımım yok</option>
            <option value="individual">Bireysel katılacağım</option>
          </Select>
        </div>
        {form.teamStatus === 'has_team' && (
          <div className="col-span-2 sm:col-span-1">
            <Select
              label="Takımda kaç kişi varsınız? *"
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
        )}
        {form.teamStatus === 'will_form' && (
          <div className="col-span-2">
            <div className="rounded-2xl border border-[#4F5D93]/70 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-ink-dim">
              Takımı olmayan katılımcıları etkinlik günü ilgi alanları, becerileri ve proje
              beklentilerine göre uygun ekiplerle bir araya getireceğiz.
            </div>
          </div>
        )}
        <div className="col-span-2">
          <Textarea
            label="Proje Fikrin (opsiyonel)"
            name="projectIdea"
            rows={4}
            value={form.projectIdea}
            onChange={update('projectIdea')}
            placeholder="Aklındaki AI fikri ya da çözmek istediğin sosyal problemi kısaca yaz..."
            error={errors.projectIdea}
            className={cn(fieldClassName, 'min-h-[144px]')}
          />
        </div>
      </div>

      <Button type="submit" className="mt-3 w-full py-3.5 text-base" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
        {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'Başvuruyu Gönder'}
      </Button>
      <a
        href={SITE.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
      >
        WhatsApp Topluluğuna Katıl
      </a>
      <p className="mt-3 text-center text-xs leading-relaxed text-ink-dim">
        Başvuru yaptıktan sonra duyuruları kaçırmamak için WhatsApp topluluğuna da katılmanı öneririz.
      </p>
      <p className="mt-3 text-center text-[11px] text-ink-dim">
        Form verileri gönderim öncesinde cihazında taslak olarak saklanır.
      </p>
    </form>
  );
}
