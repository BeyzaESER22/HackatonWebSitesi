'use client';
import { useState } from 'react';
import { Input, Select } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { LoaderInline } from '@/components/ui/Loader';
import { useApp } from '@/context/AppContext';

const initial = {
  fullName: '',
  email: '',
  phone: '',
  university: '',
  participationType: '',
  daysAttending: ''
};

export function EventRegisterForm({ onSuccess }) {
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
      const res = await fetch('/api/attendees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        showToast({ type: 'error', title: 'Kayıt başarısız', message: json.message });
        return;
      }
      showToast({ title: 'Kaydın tamamlandı!', message: 'E-postana onay gönderildi.' });
      setForm(initial);
      onSuccess?.();
    } catch {
      showToast({ type: 'error', title: 'Bir hata oluştu' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <p className="text-sm text-ink-dim mb-6 leading-relaxed">
        Hackathon'a katılmıyor; sadece konuşmaları izlemek, atölyelere katılmak ya da
        sponsor stantlarını gezmek istiyorsanız aşağıdaki formu doldurun.
      </p>

      <Input label="Ad Soyad *"   name="fullName"   value={form.fullName}   onChange={update('fullName')}   placeholder="Adın ve soyadın" error={errors.fullName} required />
      <Input type="email" label="E-posta *"  name="email" value={form.email} onChange={update('email')} placeholder="ornek@mail.com" error={errors.email} required />
      <Input type="tel"   label="Telefon *"  name="phone" value={form.phone} onChange={update('phone')} placeholder="+90 5XX XXX XX XX" error={errors.phone} required />
      <Input label="Üniversite / Kurum"      name="university" value={form.university} onChange={update('university')} placeholder="İstinye Üniversitesi" error={errors.university} />

      <Select label="Hangi günlere katılmayı planlıyorsunuz? *"
        name="daysAttending" value={form.daysAttending} onChange={update('daysAttending')} error={errors.daysAttending} required>
        <option value="">Seçiniz...</option>
        <option value="day_1">Sadece 16 Mayıs (Cumartesi)</option>
        <option value="day_2">Sadece 17 Mayıs (Pazar)</option>
        <option value="both">Her iki gün</option>
      </Select>

      <Select label="Hangi etkinliklerle ilgileniyorsun? *"
        name="participationType" value={form.participationType} onChange={update('participationType')} error={errors.participationType} required>
        <option value="">Seçiniz...</option>
        <option value="talks">Konuşmalar / Keynote'lar</option>
        <option value="workshops">Workshop'lar</option>
        <option value="stands">Sponsor Stantları</option>
        <option value="demo_day">Demo Day &amp; Final Sunumları</option>
        <option value="all">Tümü</option>
      </Select>

      <div className="rounded-xl p-4 mb-2 border border-google-yellow/30 bg-google-yellow/[0.06]">
        <div className="text-xs uppercase tracking-[0.18em] text-google-yellow mb-1.5 font-semibold">🎁 Çekiliş & Ödüller</div>
        <p className="text-xs text-ink-dim leading-relaxed">
          Bu formu dolduran ziyaretçiler için etkinlik boyunca düzenleyeceğimiz çekilişe katılma hakkı kazanırsın.
          Ödüllerin detayları yakında paylaşılacak — etkinlik günü kayıt masasından <span className="text-white">QR kodunu okutmayı</span> unutma.
        </p>
      </div>

      <Button type="submit" className="w-full mt-4" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
        {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'Kaydımı Tamamla'}
      </Button>
    </form>
  );
}
