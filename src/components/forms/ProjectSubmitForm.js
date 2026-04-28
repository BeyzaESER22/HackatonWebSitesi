'use client';
import { useState } from 'react';
import { Input, Select, Textarea, FileInput } from '@/components/ui/Input';
import { Button, ArrowRightIcon } from '@/components/ui/Button';
import { LoaderInline } from '@/components/ui/Loader';
import { useApp } from '@/context/AppContext';
import { PROJECT_CATEGORIES, UPLOAD_LIMITS } from '@/lib/constants';

const initial = {
  title: '', category: '', shortDescription: '', longDescription: '',
  teamName: '', teamMembers: '', techStack: '',
  contactEmail: '', githubUrl: '', demoUrl: ''
};

export function ProjectSubmitForm({ onSuccess }) {
  const [form, setForm] = useState(initial);
  const [image, setImage] = useState(null);
  const [packageFile, setPackageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const { showToast } = useApp();

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!image) {
      showToast({ type: 'error', title: 'Görsel zorunlu', message: 'Lütfen projenin ekran görüntüsünü ekleyin.' });
      return;
    }

    setBusy(true);
    setErrors({});

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('image', image);
      if (packageFile) fd.append('package', packageFile);

      const res = await fetch('/api/projects', { method: 'POST', body: fd });
      const json = await res.json();

      if (!res.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        showToast({
          type: 'error',
          title: 'Gönderim başarısız',
          message: json.message || 'Lütfen alanları kontrol edin.'
        });
        return;
      }

      showToast({
        title: 'Projen alındı!',
        message: 'Onay sonrası galeride yer alacak.'
      });
      setForm(initial); setImage(null); setPackageFile(null);
      onSuccess?.(json.project);
    } catch (err) {
      showToast({ type: 'error', title: 'Bir hata oluştu', message: 'Bağlantını kontrol et.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-1">
      <h3 className="font-display text-lg font-semibold mb-3 text-ink">Proje bilgileri</h3>

      <Input label="Proje Adı *" name="title" value={form.title} onChange={update('title')} placeholder="Örn: MedAI" error={errors.title} required />

      <Select label="Kategori *" name="category" value={form.category} onChange={update('category')} error={errors.category} required>
        <option value="">Seçiniz...</option>
        {PROJECT_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
      </Select>

      <Input label="Kısa Açıklama (200 karakter) *" name="shortDescription" value={form.shortDescription} onChange={update('shortDescription')} placeholder="Projeni tek cümleyle özetle" error={errors.shortDescription} maxLength={200} required />

      <Textarea label="Detaylı Açıklama *" name="longDescription" rows={4} value={form.longDescription} onChange={update('longDescription')} placeholder="Hangi problemi çözüyor? Nasıl çalışıyor? Hangi etkiyi yaratıyor?" error={errors.longDescription} required />

      <h3 className="font-display text-lg font-semibold mt-6 mb-3 text-ink">Ekip</h3>

      <Input label="Takım Adı *" name="teamName" value={form.teamName} onChange={update('teamName')} placeholder="Örn: Team Aurora" error={errors.teamName} required />

      <Textarea label="Ekip Üyeleri *" name="teamMembers" rows={3} value={form.teamMembers} onChange={update('teamMembers')} placeholder="Eda Yılmaz - ML Engineer - İstinye Üniversitesi&#10;Mert Kara - Backend - Boğaziçi Üniversitesi" error={errors.teamMembers} required />

      <h3 className="font-display text-lg font-semibold mt-6 mb-3 text-ink">Teknoloji & Linkler</h3>

      <Input label="Tech Stack *" name="techStack" value={form.techStack} onChange={update('techStack')} placeholder="Gemini API, Next.js, FastAPI, PostgreSQL" error={errors.techStack} required />

      <Input type="email" label="İletişim E-posta *" name="contactEmail" value={form.contactEmail} onChange={update('contactEmail')} placeholder="takim@example.com" error={errors.contactEmail} required />

      <Input type="url" label="GitHub URL (opsiyonel)" name="githubUrl" value={form.githubUrl} onChange={update('githubUrl')} placeholder="https://github.com/takim/proje" error={errors.githubUrl} />

      <Input type="url" label="Demo URL (opsiyonel)" name="demoUrl" value={form.demoUrl} onChange={update('demoUrl')} placeholder="https://demo.proje.com" error={errors.demoUrl} />

      <h3 className="font-display text-lg font-semibold mt-6 mb-3 text-ink">Dosyalar</h3>

      <FileInput
        label="Ekran Görüntüsü / Kapak Görseli *"
        name="image"
        accept={UPLOAD_LIMITS.projectImage.types.join(',')}
        maxBytes={UPLOAD_LIMITS.projectImage.maxBytes}
        hint="JPG, PNG veya WebP — max 5MB"
        file={image}
        onFile={setImage}
      />

      <FileInput
        label="Proje Paketi (opsiyonel — ZIP/TAR)"
        name="package"
        accept=".zip,.tar,.gz,application/zip,application/x-zip-compressed,application/x-tar,application/gzip"
        maxBytes={UPLOAD_LIMITS.projectFile.maxBytes}
        hint="ZIP veya TAR.GZ — max 50MB. Repo varsa zorunlu değil."
        file={packageFile}
        onFile={setPackageFile}
      />

      <Button type="submit" className="w-full mt-4" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
        {busy ? <LoaderInline>Yükleniyor...</LoaderInline> : 'Projeyi Gönder'}
      </Button>
      <p className="text-[11px] text-ink-dim text-center mt-3">
        Başvuru onayından sonra galeri sayfasında yer alacaktır.
      </p>
    </form>
  );
}
