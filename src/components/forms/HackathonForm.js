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
  phone: '', teamStatus: '', teamSize: '', projectIdea: '', website: '',
  referralSource: '', teammatesApplied: ''
};

const PROJECT_THEMES = [
  'Eğitimde AI',
  'Sağlık & Erişilebilirlik',
  'Afet Yönetimi',
  'Sürdürülebilirlik',
  'Engelliler için AI',
  'Sosyal Yardım'
];

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

  const insertProjectTheme = (theme) => {
    setForm((prev) => {
      const current = (prev.projectIdea || '').trim();
      const prefix = current.length > 0 ? `${current}\n\n` : '';
      const next = `${prefix}${theme}: `;
      return { ...prev, projectIdea: next.slice(0, 800) };
    });
    setErrors((prev) => (prev.projectIdea ? { ...prev, projectIdea: undefined } : prev));
  };

  return (
    <form onSubmit={submit} noValidate>
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-google-blue/30 bg-google-blue/[0.08] px-4 py-3 text-sm text-white">
        <span className="text-base" aria-hidden="true">📍</span>
        <span className="font-semibold">Yüz yüze etkinlik —</span>
        <span className="text-ink-dim">
          {SITE.location.full}, {SITE.eventDates}. Online katılım <span className="font-semibold text-white">yoktur</span>.
        </span>
      </div>

      <a
        href={SITE.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-google-green/40 bg-google-green/[0.10] px-4 py-3 text-sm text-white transition hover:border-google-green/70 hover:bg-google-green/[0.18]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-google-green/20 text-base" aria-hidden="true">
            💬
          </span>
          <div>
            <div className="font-semibold leading-tight">WhatsApp topluluğuna katıl</div>
            <div className="mt-0.5 text-xs text-ink-dim">
              Tüm bilgi paylaşımı, duyuru ve takım eşleştirme buradan yapılacak.
            </div>
          </div>
        </div>
        <span className="text-base font-semibold text-google-green" aria-hidden="true">↗</span>
      </a>

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
        {form.teamStatus === 'has_team' && (
          <div className="col-span-2">
            <Select
              label="Takım arkadaşların da başvurdu mu? (opsiyonel)"
              name="teammatesApplied"
              value={form.teammatesApplied}
              onChange={update('teammatesApplied')}
              error={errors.teammatesApplied}
              className={cn(fieldClassName, 'pr-10')}
            >
              <option value="">Seçiniz...</option>
              <option value="all">Tümü başvurdu</option>
              <option value="some">Bir kısmı başvurdu, gerisi başvuracak</option>
              <option value="none">Henüz hiçbiri başvurmadı</option>
              <option value="unsure">Emin değilim</option>
            </Select>
            <p className="mt-2 text-xs text-ink-dim">
              Takımın tamamının ayrı ayrı başvurması gerekiyor. Eksik kalan arkadaşlarına
              WhatsApp topluluğundan da ulaşabilirsin.
            </p>
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
            placeholder="Tema: Toplum yararına yapay zeka. Çözmek istediğin sosyal problemi ve önerdiğin AI yaklaşımını kısaca yaz..."
            error={errors.projectIdea}
            className={cn(fieldClassName, 'min-h-[144px]')}
          />
          <div className="mt-2.5">
            <div className="mb-1.5 text-[11px] uppercase tracking-[0.18em] text-ink-dim">
              Tema önerileri (tıklayarak başlat)
            </div>
            <div className="flex flex-wrap gap-2">
              {PROJECT_THEMES.map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => insertProjectTheme(theme)}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-ink-dim transition hover:border-[#7C8BFF]/60 hover:bg-[#7C8BFF]/10 hover:text-white"
                >
                  + {theme}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-dim">
              HackFest&apos;26 teması <span className="font-semibold text-white">Toplum Yararına Yapay Zeka</span> —
              fikrin bu temayla uyumlu olmalı (eğitim, sağlık, erişilebilirlik, afet, sürdürülebilirlik vb.).
            </p>
          </div>
        </div>
        <div className="col-span-2">
          <Select
            label="Bizi nereden duydun? (opsiyonel)"
            name="referralSource"
            value={form.referralSource}
            onChange={update('referralSource')}
            error={errors.referralSource}
            className={cn(fieldClassName, 'pr-10')}
          >
            <option value="">Seçiniz...</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="twitter">X (Twitter)</option>
            <option value="linkedin">LinkedIn</option>
            <option value="friend">Bir arkadaşımdan</option>
            <option value="university">Üniversite duyurusu / GDG topluluğu</option>
            <option value="email">E-posta / Bülten</option>
            <option value="poster">Afiş / Stand</option>
            <option value="other">Diğer</option>
          </Select>
        </div>
      </div>

      <Button type="submit" className="mt-4 w-full py-3.5 text-base" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
        {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'Başvuruyu Gönder'}
      </Button>
      <p className="mt-3 text-center text-xs leading-relaxed text-ink-dim">
        Başvuru yaptıktan sonra duyuruları kaçırmamak için yukarıdaki <span className="font-semibold text-white">WhatsApp topluluğuna</span> da katılmayı unutma.
      </p>
      <p className="mt-2 text-center text-[11px] text-ink-dim">
        Form verileri gönderim öncesinde cihazında taslak olarak saklanır.
      </p>
    </form>
  );
}
