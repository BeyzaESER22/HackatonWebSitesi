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
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showToast } = useApp();

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max width/height for optimization
          const MAX_SIZE = 1600;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          }, 'image/jpeg', 0.8); // 80% quality
        };
      };
    });
  };

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e, retryCount = 0) => {
    if (e) e.preventDefault();
    if (!image) {
      showToast({ type: 'error', title: 'Görsel zorunlu', message: 'Lütfen projenin ekran görüntüsünü ekleyin.' });
      return;
    }

    setBusy(true);
    setErrors({});
    setUploadProgress(10); // Start progress

    try {
      // Step 1: Compress image
      const finalImage = image.size > 1024 * 1024 ? await compressImage(image) : image;
      setUploadProgress(30);

      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('image', finalImage);

      // Simulation of progress since fetch doesn't support upload progress out of box 
      // without XHR, but we can do a tiered progress for UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => prev < 90 ? prev + 5 : prev);
      }, 400);

      const res = await fetch('/api/projects', { method: 'POST', body: fd });
      clearInterval(progressInterval);
      setUploadProgress(100);

      const json = await res.json();

      if (!res.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        showToast({
          type: 'error',
          title: 'Gönderim başarısız',
          message: json.message || 'Lütfen alanları kontrol edin.'
        });
        setBusy(false);
        setUploadProgress(0);
        return;
      }

      showToast({ title: 'Projen alındı!', message: 'Onay sonrası galeride yer alacak.' });
      setForm(initial); setImage(null);
      setUploadProgress(0);
      onSuccess?.(json.project);
    } catch (err) {
      if (retryCount < 2) {
        setUploadProgress(prev => prev - 10);
        setTimeout(() => submit(null, retryCount + 1), 2000);
      } else {
        showToast({ type: 'error', title: 'Bir hata oluştu', message: 'Bağlantını kontrol et.' });
        setBusy(false);
        setUploadProgress(0);
      }
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-1">
      <h3 className="font-display text-lg font-semibold mb-3 text-ink">Proje bilgileri</h3>
      <p className="text-[11px] text-ink-dim italic mb-4">
        Gönderdiğiniz projenin <strong>"Toplum Yararına Yapay Zeka"</strong> temasıyla uyumlu olması gerektiğini hatırlatmak isteriz.
      </p>

      <Input label="Proje Adı *" name="title" value={form.title} onChange={update('title')} placeholder="Örn: MedAI" error={errors.title} required />

      <Select label="Kategori *" name="category" value={form.category} onChange={update('category')} error={errors.category} required>
        <option value="">Seçiniz...</option>
        {PROJECT_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
      </Select>

      <Input label="Kısa Açıklama (200 karakter) *" name="shortDescription" value={form.shortDescription} onChange={update('shortDescription')} placeholder="Projeni tek cümleyle özetle" error={errors.shortDescription} maxLength={200} required />

      <Textarea 
        label="Detaylı Açıklama *" 
        name="longDescription" 
        rows={6} 
        value={form.longDescription} 
        onChange={update('longDescription')} 
        placeholder="Proje neden yapıldı? Hangi spesifik problemi çözüyor? Toplum için nasıl bir değer yaratıyor ve teknik olarak nasıl çalışıyor?" 
        error={errors.longDescription} 
        required 
      />
      <p className="text-[10px] text-ink-dim -mt-3 mb-4 leading-relaxed">
        <strong>İpucu:</strong> Jürimiz bu alanı değerlendirirken projenin <strong>"Neden yapıldığını"</strong> ve <strong>"Nasıl bir toplumsal değer yarattığını"</strong> öncelikli olarak inceleyecektir. Lütfen bu iki noktayı net bir şekilde açıklayın.
      </p>

      <h3 className="font-display text-lg font-semibold mt-6 mb-3 text-ink">Ekip</h3>

      <Input label="Takım Adı *" name="teamName" value={form.teamName} onChange={update('teamName')} placeholder="Örn: Team Aurora" error={errors.teamName} required />

      <Textarea label="Ekip Üyeleri *" name="teamMembers" rows={3} value={form.teamMembers} onChange={update('teamMembers')} placeholder="Eda Yılmaz - ML Engineer - İstinye Üniversitesi&#10;Mert Kara - Backend - Boğaziçi Üniversitesi" error={errors.teamMembers} required />

      <h3 className="font-display text-lg font-semibold mt-6 mb-3 text-ink">Teknoloji & Linkler</h3>

      <Input 
        label="Tech Stack *" 
        name="techStack" 
        value={form.techStack} 
        onChange={update('techStack')} 
        placeholder="AI: Gemini API, Frontend: Next.js, Backend: FastAPI, Database: PostgreSQL" 
        error={errors.techStack} 
        required 
      />
      <p className="text-[10px] text-ink-dim -mt-3 mb-4 leading-relaxed">
        Hangi teknolojiyi projenin hangi bölümünde kullandığınızı belirtin (Örn: AI: ..., Backend: ...).
      </p>

      <Input type="email" label="İletişim E-posta *" name="contactEmail" value={form.contactEmail} onChange={update('contactEmail')} placeholder="takim@example.com" error={errors.contactEmail} required />
      <p className="text-[10px] text-ink-dim -mt-3 mb-4 leading-relaxed">
        Takımlar için üyelerden herhangi birinin mail adresinin eklenmesi yeterlidir.
      </p>

      <Input type="url" label="GitHub URL *" name="githubUrl" value={form.githubUrl} onChange={update('githubUrl')} placeholder="https://github.com/takim/proje" error={errors.githubUrl} required />

      <Input type="url" label="Demo URL (opsiyonel)" name="demoUrl" value={form.demoUrl} onChange={update('demoUrl')} placeholder="https://demo.proje.com" error={errors.demoUrl} />
      <p className="text-[10px] text-ink-dim -mt-3 mb-4 leading-relaxed">
        Projenizin canlı çalışan versiyonuna, online prototipine veya video sunumuna (Drive/YouTube) ait linki paylaşabilirsiniz.
      </p>

      <h3 className="font-display text-lg font-semibold mt-6 mb-3 text-ink">Görsel</h3>

      <FileInput
        label="Ekran Görüntüsü / Kapak Görseli *"
        name="image"
        accept={UPLOAD_LIMITS.projectImage.types.join(',')}
        maxBytes={UPLOAD_LIMITS.projectImage.maxBytes}
        hint="JPG, PNG veya WebP — max 5MB"
        file={image}
        onFile={setImage}
      />

      <Button type="submit" className="w-full mt-4 overflow-hidden relative" disabled={busy} iconRight={!busy && <ArrowRightIcon />}>
        {busy ? (
          <>
            <div 
              className="absolute inset-0 bg-white/10 transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <span className="relative z-10">
              {uploadProgress < 30 ? 'Görsel Hazırlanıyor...' : `Yükleniyor %${uploadProgress}`}
            </span>
          </>
        ) : 'Projeyi Gönder'}
      </Button>
      <p className="text-[11px] text-ink-dim text-center mt-3">
        Başvuru onayından sonra galeri sayfasında yer alacaktır.
      </p>
    </form>
  );
}
