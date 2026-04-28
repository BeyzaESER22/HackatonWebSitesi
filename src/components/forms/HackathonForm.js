'use client';
import { useState } from 'react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { LoaderInline } from '@/components/ui/Loader';

const initial = {
  fullName: '', university: '', department: '', email: '',
  phone: '', teamStatus: '', projectIdea: ''
};

export function HackathonForm({ onSuccess }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const { showToast } = useApp();

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const res = await fetch('/api/hackathon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        showToast({ type: 'error', title: 'Form gönderilemedi', message: json.message || 'Lütfen alanları kontrol edin.' });
        return;
      }
      showToast({ title: 'Başvurun alındı!', message: 'E-postanı kontrol etmeyi unutma.' });
      setForm(initial);
      onSuccess?.();
    } catch (err) {
      showToast({ type: 'error', title: 'Bir hata oluştu', message: 'İnternet bağlantını kontrol et.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adın ve soyadın" error={errors.fullName} required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input label="Üniversite *" name="university" value={form.university} onChange={update('university')} placeholder="İstinye Üniversitesi" error={errors.university} required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input label="Bölüm *" name="department" value={form.department} onChange={update('department')} placeholder="Bilgisayar Mühendisliği" error={errors.department} required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="ornek@mail.com" error={errors.email} required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="+90 5XX XXX XX XX" error={errors.phone} required />
        </div>
        <div className="col-span-2">
          <Select label="Takımın var mı? *" name="teamStatus" value={form.teamStatus} onChange={update('teamStatus')} error={errors.teamStatus} required>
            <option value="">Seçiniz...</option>
            <option value="has_team">Evet, takımım hazır</option>
            <option value="will_form">Hayır, etkinlikte takım kuracağım</option>
            <option value="individual">Bireysel katılmak istiyorum</option>
          </Select>
        </div>
        <div className="col-span-2">
          <Textarea label="Proje Fikrin (opsiyonel)" name="projectIdea" rows={3} value={form.projectIdea} onChange={update('projectIdea')} placeholder="Aklındaki AI fikri ya da çözmek istediğin sosyal problem..." error={errors.projectIdea} />
        </div>
      </div>

      <Button type="submit" className="w-full mt-2" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
        {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'Başvuruyu Gönder'}
      </Button>
      <p className="text-[11px] text-ink-dim text-center mt-3">
        Başvurun 3 iş günü içinde e-posta ile yanıtlanır.
      </p>
    </form>
  );
}
