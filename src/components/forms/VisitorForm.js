'use client';
import { useState } from 'react';
import { Input, Select } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { LoaderInline } from '@/components/ui/Loader';
import { cn } from '@/lib/helpers';

const initial = {
  fullName: '',
  email: '',
  phone: '',
  university: '',
  daysAttending: '',
  participationType: ''
};

export function VisitorForm({ onSuccess }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const { showToast } = useApp();

  const fieldClassName =
    'rounded-2xl border-white/10 bg-white/[0.05] px-5 py-3.5 text-base text-white placeholder:text-[#7D87AF] focus:border-primary/50 focus:bg-white/[0.08] transition-all duration-300 w-full';

  const update = (k) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [k]: value }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  const submit = async (e) => {
    if (e) e.preventDefault();
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
        showToast({
          type: 'error',
          title: 'Form gönderilemedi',
          message: json.message || 'Lütfen alanları kontrol edin.'
        });
        setBusy(false);
        return;
      }

      setForm(initial);
      showToast({
        title: 'Kaydın alındı!',
        message: 'Ziyaretçi kaydın başarıyla oluşturuldu.'
      });
      onSuccess?.();
    } catch (err) {
      showToast({
        type: 'error',
        title: 'Gönderim başarısız',
        message: 'Bağlantı sorunu yaşandı. Lütfen internetini kontrol et.'
      });
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Kişisel Bilgiler</h4>
        <div className="grid grid-cols-1 gap-6">
          <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adınız ve Soyadınız" error={errors.fullName} className={fieldClassName} required />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresiniz.com" error={errors.email} className={fieldClassName} required />
            <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
          </div>

          <Input label="Üniversite / Kurum (Opsiyonel)" name="university" value={form.university} onChange={update('university')} placeholder="Okulunuz veya Kurumunuz" error={errors.university} className={fieldClassName} />
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">Etkinlik Katılımı</h4>
        <div className="space-y-6">
          <Select label="Hangi günler katılacaksınız? *" name="daysAttending" value={form.daysAttending} onChange={update('daysAttending')} error={errors.daysAttending} className={cn(fieldClassName, 'pr-12')} required>
            <option value="">Seçiniz...</option>
            <option value="day_1">Sadece 1. Gün (16 Mayıs)</option>
            <option value="day_2">Sadece 2. Gün (17 Mayıs)</option>
            <option value="both">İki Gün de Katılacağım</option>
          </Select>

          <Select label="En çok hangi etkinliklerle ilgileniyorsunuz? *" name="participationType" value={form.participationType} onChange={update('participationType')} error={errors.participationType} className={cn(fieldClassName, 'pr-12')} required>
            <option value="">Seçiniz...</option>
            <option value="talks">Seminerler / Konuşmalar</option>
            <option value="workshops">Atölyeler (Workshops)</option>
            <option value="stands">Sponsor Stantları / Fuaye</option>
            <option value="demo_day">Hackathon Demo Day (2. Gün)</option>
            <option value="all">Tümü (Genel Katılım)</option>
          </Select>
        </div>
      </div>

      <div className="pt-6 space-y-6">
        <p className="text-[10px] text-ink-dim leading-relaxed text-center px-4">
          Kayıt olarak etkinlik alanında bulunacağınız sürece <a href="/hackfest26-kurallar.pdf" target="_blank" className="text-white underline underline-offset-2 hover:text-primary transition-colors">davranış kurallarına</a> uymayı kabul etmiş sayılırsınız.
        </p>
        <Button type="submit" className="w-full py-5 text-xl font-black shadow-xl shadow-primary/20 rounded-2xl transition-transform hover:scale-[1.01]" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
          {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'ZİYARETÇİ KAYDINI TAMAMLA'}
        </Button>
      </div>
    </form>
  );
}
