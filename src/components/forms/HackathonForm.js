'use client';
import { useEffect, useState } from 'react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { LoaderInline } from '@/components/ui/Loader';
import { cn } from '@/lib/helpers';

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
        message: 'Kaydın başarıyla tamamlandı.'
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
    <form onSubmit={submit} noValidate className="space-y-10">
      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Kişisel Bilgiler</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adınız ve Soyadınız" error={errors.fullName} className={fieldClassName} required />
          </div>
          <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="Üniversiteniz" error={errors.university} className={fieldClassName} required />
          <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bölümünüz" error={errors.department} className={fieldClassName} required />
          <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresiniz.com" error={errors.email} className={fieldClassName} required />
          <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Katılım Bilgileri</h4>
        <div className="space-y-6">
          <Select label="Takım durumun nedir? *" name="teamStatus" value={form.teamStatus} onChange={updateTeamStatus} error={errors.teamStatus} className={cn(fieldClassName, 'pr-12')} required>
            <option value="">Seçiniz...</option>
            <option value="has_team">Evet, bir takımım var</option>
            <option value="will_form">Hayır, bir takımım yok (Eşleşmek istiyorum)</option>
            <option value="individual">Bireysel olarak katılacağım</option>
          </Select>

          {form.teamStatus === 'has_team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
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
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Proje</h4>
        <div className="space-y-4">
          <p className="text-xs text-white/50 leading-relaxed italic">
            Lütfen projenizin <strong className="text-white/80">"Toplum Yararına Yapay Zeka"</strong> temasının alt kategorilerinden (Eğitim, Sağlık, Çevre vb.) birine odaklandığından emin olun. Tüm başvurular jüri ve teknik ekip tarafından ön incelemeden geçirilecektir.
          </p>
          <Textarea
            label="Proje Fikri (Opsiyonel)"
            name="projectIdea"
            rows={4}
            value={form.projectIdea}
            onChange={update('projectIdea')}
            placeholder="Aklındaki proje fikrini kısaca anlatabilirsin."
            error={errors.projectIdea}
            className={cn(fieldClassName, 'min-h-[120px] resize-none')}
          />
        </div>
      </div>

      <div className="pt-6 space-y-6">
        <p className="text-[10px] text-ink-dim leading-relaxed text-center px-4">
          Başvurunuzu tamamlayarak etkinlik <a href="/hackfest26-kurallar.pdf" target="_blank" className="text-white underline underline-offset-2 hover:text-primary transition-colors">katılım kurallarını</a>, KVKK metnini ve davranış kurallarını kabul etmiş sayılırsınız.
        </p>
        <Button type="submit" className="w-full py-5 text-xl font-black shadow-xl shadow-primary/20 rounded-2xl transition-transform hover:scale-[1.01]" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
          {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'BAŞVURUYU TAMAMLA'}
        </Button>
      </div>
    </form>
  );
}
