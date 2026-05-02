# HackFest'26 AI — Resmi Etkinlik Sitesi

> Google Developer Groups On Campus İstinye Üniversitesi
> 16-17 Mayıs 2026 · İstinye Üniversitesi Vadi Kampüsü · İstanbul

Premium, modern, production-ready bir etkinlik landing page'i — Next.js 14 (App Router) üzerinde Framer Motion animasyonları, Tailwind tasarım sistemi, dosya yükleme destekli API rotaları, canlı proje galerisi ve detaylı konuşmacı sayfalarıyla.

---

## 📋 Özellikler

### Etkinlik tarafı
- **Canlı geri sayım** — 16 Mayıs 2026 09:00 İstanbul saatine kilitli
- **Hackathon başvuru formu** — `/api/hackathon` üzerinden JSON store'a yazılır
- **Konuşmacı etkinliği / stand ziyaretçisi kaydı** — `/api/attendees`, çekilişe katılım dahil
- **Program akışı** — 16-17 Mayıs için tam timeline (şu an sadece açılış işaretli, gerisi TBA)
- **Konuşmacı detay sayfaları** — `/speakers/[id]` üzerinden oturum bilgileri (saat, salon, hedef kitle, açıklama)
- **Hackathon kapsamlı tanıtım** — `/hackathon` sayfası: temalar, jüri kriterleri, ödüller, kurallar
- **Ekip sayfası** — `/team` sayfası
- **Konuşmacılar / Sponsorlar / Ekip / Schedule / FAQ** — `src/data/` üzerinden kolay yönetilebilir

### İçerik yönetimi
- **Konuşmacı fotoğrafı yükleme** — Admin secret ile korumalı `/api/upload-speaker` endpoint'i. Yüklenen görseller `/public/uploads/speakers/` dizinine kaydedilir.
- **Yarışmacı proje yükleme** — Katılımcılar `/projects/submit` sayfasından proje başlığı, açıklaması, ekran görüntüsü, GitHub/demo linkleri ve ekip bilgileriyle başvuru gönderebilir. Görseller `/public/uploads/projects/images/`, opsiyonel proje dosyaları (.zip vb.) `/public/uploads/projects/files/` altına yazılır.
- **Onay mekanizması** — Tüm başvurular `pending` durumunda gelir, admin onayı sonrası galeriye yansır.
- **Şifre korumalı admin paneli** — `/admin` üzerinden hackathon başvurularını görüntüleme ve CSV export
- **Örnek proje (showcase)** — `src/data/projects.js` içinde hard-coded `sample-medai` projesi, etkinlik öncesi yarışmacılara örnek olarak gösterilir.
- **Örnek konuşmacı profili** — `src/data/speakers.js` içinde `sample-speaker`, konuşmacı detay sayfasının nasıl görüneceğini gösterir.

### Tasarım & UX
- Google brand renkleriyle dinamik tipografi
- Glassmorphism, animated gradient mesh, sticker rozetli marquee
- Framer Motion ile sayfa geçiş ve scroll-reveal animasyonları
- Mobile-first responsive
- Dark theme (premium event aesthetic)
- SEO meta + Open Graph + sitemap.xml + robots.txt

---

## 🚀 Hızlı Başlangıç

```bash
# 1) Bağımlılıkları kur
npm install

# 2) Local data store dosyalarını oluştur
npm run data:init

# 3) Environment dosyasını düzenle
# .env.example dosyasını referans alarak .env.local oluşturun.
# Özellikle ADMIN_UPLOAD_SECRET, ADMIN_PASSWORD ve ADMIN_SESSION_SECRET
# değerlerini doldurun.

# 4) Geliştirme sunucusunu başlat
npm run dev
```

`http://localhost:3000` adresinde site açılacaktır.

---

## 📂 Proje Yapısı

```
hackfest26-ai/
├── public/
│   ├── images/        → kalıcı görseller (logo, ikon, sabit speaker fotoğrafları)
│   └── uploads/       → kullanıcı yüklemeleri (gitignored)
│       ├── speakers/
│       └── projects/
├── src/
│   ├── app/
│   │   ├── /                 → Ana sayfa (Hero, Marquee, Highlights, Hackathon, Speakers, Schedule, FAQ, CTA, Contact)
│   │   ├── /hackathon        → Hackathon detay sayfası
│   │   ├── /speakers         → Konuşmacılar listesi
│   │   ├── /speakers/[id]    → Konuşmacı detayı (oturum bilgileri)
│   │   ├── /schedule         → Program akışı
│   │   ├── /sponsors         → Sponsorlar (büyük/orta/küçük, paket yok)
│   │   ├── /team             → Ekip
│   │   ├── /projects         → Proje galerisi (showcase + onaylı submission'lar)
│   │   ├── /projects/[id]    → Proje detayı
│   │   ├── /projects/submit  → Proje gönderim formu
│   │   ├── /register         → Hackathon başvuru formu
│   │   └── /api/             → 4 endpoint (hackathon, attendees, projects, upload-speaker)
│   ├── components/
│   │   ├── layout/    → Navbar, Footer, MobileMenu, Container, Logo
│   │   ├── sections/  → Hero, Marquee, Highlights, ...
│   │   ├── ui/        → Button, Card, Badge, Modal, Countdown, ProjectCard, ...
│   │   ├── forms/     → HackathonForm, EventRegisterForm, ProjectSubmitForm
│   │   └── effects/   → ParticlesBg, GradientGlow, RevealOnScroll, CursorGlow
│   ├── data/          → speakers, schedule, faq, sponsors, highlights, projects, team
│   ├── hooks/         → useCountdown, useScrollPosition, useModal, useIntersection
│   ├── lib/           → constants, helpers, validations (Zod), seo, store
│   ├── styles/        → utilities.css, animations.css
│   └── context/       → AppContext (toast + modals)
├── data/              → JSON store (gitignored, dev-only)
└── docs/              → Marka kılavuzu, içerik planı, deployment + scaling notları
```

---

## 🔐 Konuşmacı Fotoğrafı Yükleme (Admin)

```bash
curl -X POST http://localhost:3000/api/upload-speaker \
  -H "x-admin-secret: $ADMIN_UPLOAD_SECRET" \
  -F "speakerId=eda-yilmaz" \
  -F "file=@/path/to/photo.jpg"
```

Yüklenen dosya `public/uploads/speakers/eda-yilmaz.jpg` olarak kaydedilir ve `src/data/speakers.js` içinde `photoUrl: '/uploads/speakers/eda-yilmaz.jpg'` ile referanslanır.

---

## 🛡️ Admin Paneli

- Admin ekranı: `/admin`
- Giriş: `ADMIN_PASSWORD`
- Oturum güvenliği: `ADMIN_SESSION_SECRET`
- CSV export: `/api/admin/hackathon/export`

Panel içinde hackathon başvurularını görebilir, toplam sayıları inceleyebilir ve kayıtları CSV olarak indirebilirsin.

---

## 🎨 Yarışmacı Proje Yükleme

Katılımcılar `/projects/submit` formundan başvurur:
- Proje adı, kategori, kısa açıklama
- Ekip bilgileri (üye adları, üniversiteler)
- Tech stack
- GitHub repo URL'si, canlı demo URL'si
- Ekran görüntüsü (image, max 5MB)
- Opsiyonel proje paketi (zip/tar, max 50MB)

Submit sonrası `data/projects.json` içine `status: "pending"` ile kaydedilir.

---

## 📈 Kapasite

Site **5.000 eş zamanlı kullanıcıya** kadar dayanıklı tasarlandı. Production geçişi için gerekli altyapı katmanları (Vercel Pro, Supabase Pro + connection pooling, Vercel Blob, rate limiting, ISR caching, monitoring) detaylı olarak `docs/deployment-notes.md` § 8 altında listelidir. Şu an **prototip / development** modunda:
- Veriler `data/*.json` içinde tutuluyor
- Dosyalar lokal `public/uploads/` altına yazılıyor

Production migration adımları aynı dosyada (Madde 3) detaylı.

---

## 📞 İletişim

- E-posta: gdgoncampusisu@gmail.com
- Instagram: [@gdgoncampusistinye](https://instagram.com/gdgoncampusistinye)
- Twitter / X: [@gdgoncampusisu](https://x.com/gdgoncampusisu)
- WhatsApp Topluluk: [Katıl](https://chat.whatsapp.com/JGj1s5uYWO3D71MLAMND2x)

---

## 📄 Lisans

© 2026 GDG On Campus İstinye Üniversitesi. Tüm hakları saklıdır.

Made with 💙❤️💛💚 in İstanbul.
