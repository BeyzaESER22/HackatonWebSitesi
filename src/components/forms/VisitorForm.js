'use client';
import { useState } from 'react';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { LoaderInline } from '@/components/ui/Loader';
import { cn } from '@/lib/helpers';

const initial = {
  fullName: '',
  email: '',
  phone: '',
  university: '',
  visitorProfile: '',
  daysAttending: '',
  interests: [],
  aiExperience: '',
  kvkkNoticeAccepted: false,
  eventContactAccepted: false,
  rulesAccepted: false,
  website: ''
};

const interestOptions = [
  {
    value: 'workshops',
    title: 'Workshoplar',
    description: 'Uygulamalı oturumlar, AI araçları ve teknik mini eğitimler.'
  },
  {
    value: 'panels',
    title: 'Paneller',
    description: 'Sektör, girişimcilik, kariyer ve toplumsal etki oturumları.'
  },
  {
    value: 'stands',
    title: 'Standlar',
    description: 'Sponsor, topluluk ve partner alanlarıyla tanışma.'
  }
];

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

  const updateCheckbox = (k) => (e) => {
    const checked = e.target.checked;
    setForm((prev) => ({ ...prev, [k]: checked }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  const updateParking = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      parkingNeeded: value,
      licensePlate: value === 'yes' ? prev.licensePlate : ''
    }));
    setErrors((prev) => ({
      ...prev,
      parkingNeeded: undefined,
      licensePlate: undefined
    }));
  };

  const toggleInterest = (value) => {
    setForm((prev) => {
      const exists = prev.interests.includes(value);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((item) => item !== value)
          : [...prev.interests, value]
      };
    });
    setErrors((prev) => (prev.interests ? { ...prev, interests: undefined } : prev));
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
          <div style={{ position: 'absolute', left: '-9999px', top: '0', opacity: 0, zIndex: -1 }} aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex="-1"
              value={form.website || ''}
              onChange={update('website')}
              autoComplete="off"
            />
          </div>

          <Input label="Ad Soyad *" name="fullName" value={form.fullName} onChange={update('fullName')} placeholder="Adınız ve Soyadınız" error={errors.fullName} className={fieldClassName} required />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input type="email" label="E-posta *" name="email" value={form.email} onChange={update('email')} placeholder="eposta@adresiniz.com" error={errors.email} className={fieldClassName} required />
            <Input type="tel" label="Telefon *" name="phone" value={form.phone} onChange={update('phone')} placeholder="05XX XXX XX XX" error={errors.phone} className={fieldClassName} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Üniversite / Kurum (Opsiyonel)" name="university" value={form.university} onChange={update('university')} placeholder="Okulunuz veya kurumunuz" error={errors.university} className={fieldClassName} />
            <Select label="Ziyaretçi profiliniz *" name="visitorProfile" value={form.visitorProfile} onChange={update('visitorProfile')} error={errors.visitorProfile} className={cn(fieldClassName, 'pr-12')} required>
              <option value="">Seçiniz...</option>
              <option value="student">Öğrenci</option>
              <option value="academic">Akademisyen / Eğitmen</option>
              <option value="professional">Profesyonel / Sektör Temsilcisi</option>
              <option value="entrepreneur">Girişimci</option>
              <option value="sponsor">Sponsor / Partner Temsilcisi</option>
              <option value="other">Diğer</option>
            </Select>
          </div>
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

          <Select label="AI / teknoloji deneyim seviyeniz *" name="aiExperience" value={form.aiExperience} onChange={update('aiExperience')} error={errors.aiExperience} className={cn(fieldClassName, 'pr-12')} required>
            <option value="">Seçiniz...</option>
            <option value="beginner">Başlangıç</option>
            <option value="intermediate">Orta seviye</option>
            <option value="advanced">İleri seviye</option>
            <option value="not_sure">Emin değilim</option>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">İlgi Alanları</h4>
          <p className="mt-3 text-xs text-ink-dim leading-relaxed">
            Katılmak istediğiniz alanları seçin. Workshop kapasitesi, panel salon planlaması ve stand alanı akışı bu bilgilerle düzenlenecektir.
          </p>
          {errors.interests && <p className="mt-2 text-xs text-google-red">{errors.interests}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {interestOptions.map((option) => (
            <InterestCheckbox
              key={option.value}
              option={option}
              checked={form.interests.includes(option.value)}
              onChange={() => toggleInterest(option.value)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] border-l-2 border-primary pl-4">KVKK ve Katılım Onayları</h4>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 space-y-5">
          <div className="space-y-4 text-xs md:text-sm text-ink-dim leading-relaxed">
            <p>
              Ziyaretçi kaydı kapsamında paylaştığınız kişisel veriler; Build with AI Hackathon workshop, panel, stand ve genel ziyaretçi akışının planlanması, etkinlik kapasite yönetimi, güvenlik/kampüs giriş süreçleri ve etkinlik iletişiminin yürütülmesi amacıyla 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında işlenecektir.
            </p>
            <p>
              Bu form aracılığıyla ad-soyad, e-posta, telefon, üniversite/kurum, ziyaretçi profili, katılım günü, ilgi alanları ve AI/teknoloji deneyim seviyesi toplanabilir. Verileriniz yalnızca etkinlik organizasyonu için gerekli süre boyunca saklanır.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <ConsentCheckbox name="kvkkNoticeAccepted" checked={form.kvkkNoticeAccepted} onChange={updateCheckbox('kvkkNoticeAccepted')} error={errors.kvkkNoticeAccepted}>
              Kişisel verilerimin ziyaretçi kayıt süreci, etkinlik planlaması, güvenlik/kampüs giriş işlemleri ve gerekli iletişim süreçleri için işleneceği konusunda bilgilendirildim.
            </ConsentCheckbox>
            <ConsentCheckbox name="eventContactAccepted" checked={form.eventContactAccepted} onChange={updateCheckbox('eventContactAccepted')} error={errors.eventContactAccepted}>
              Etkinlik öncesi ve etkinlik süresince workshop, panel, stand, program değişikliği ve operasyonel bilgilendirmelerin tarafıma iletilebileceğini kabul ediyorum.
            </ConsentCheckbox>
            <ConsentCheckbox name="rulesAccepted" checked={form.rulesAccepted} onChange={updateCheckbox('rulesAccepted')} error={errors.rulesAccepted}>
              Etkinlik alanında bulunduğum süre boyunca <a href="/hackfest26-kurallar.pdf" target="_blank" className="text-white underline underline-offset-2 hover:text-primary transition-colors">davranış kurallarına</a> ve organizasyon yönlendirmelerine uymayı kabul ediyorum.
            </ConsentCheckbox>
          </div>
        </div>
      </div>

      <div className="pt-6 space-y-6">
        <p className="text-[10px] text-ink-dim leading-relaxed text-center px-4">
          Kayıt formu workshop, panel ve stand alanlarında kapasite planlaması için kullanılacaktır; bazı oturumlarda kontenjan sınırlaması uygulanabilir.
        </p>
        <Button type="submit" className="w-full py-5 text-xl font-black shadow-xl shadow-primary/20 rounded-2xl transition-transform hover:scale-[1.01]" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
          {busy ? <LoaderInline>Gönderiliyor...</LoaderInline> : 'ZİYARETÇİ KAYDINI TAMAMLA'}
        </Button>
      </div>
    </form>
  );
}

function InterestCheckbox({ option, checked, onChange }) {
  return (
    <label
      className={cn(
        'flex gap-3 rounded-2xl border p-4 cursor-pointer transition-all duration-200',
        checked
          ? 'border-primary/60 bg-primary/10 text-white'
          : 'border-white/10 bg-white/[0.03] text-ink-dim hover:border-white/20 hover:bg-white/[0.05]'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-primary"
      />
      <span>
        <span className="block text-sm font-bold text-white">{option.title}</span>
        <span className="mt-1 block text-xs leading-relaxed">{option.description}</span>
      </span>
    </label>
  );
}

function ConsentCheckbox({ name, checked, onChange, error, children }) {
  return (
    <label
      htmlFor={name}
      className={cn(
        'flex gap-3 rounded-xl border bg-white/[0.025] p-4 text-xs leading-relaxed text-ink-dim transition-colors',
        error ? 'border-google-red/60' : 'border-white/10 hover:border-white/20'
      )}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/10 accent-primary"
        required
      />
      <span>
        {children}
        {error && <span className="mt-2 block text-google-red">{error}</span>}
      </span>
    </label>
  );
}
