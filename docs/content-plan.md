# HackFest'26 AI — İçerik Planı

## 1. İçerik Editörlük Yetki Matrisi

| Alan                      | Dosya                                | Sahibi |
|---------------------------|--------------------------------------|--------|
| Hero başlık + açıklama    | `src/components/sections/Hero.js`    | İletişim Komitesi |
| Konuşmacı listesi         | `src/data/speakers.js`               | Program Komitesi |
| Konuşmacı fotoğrafları    | `public/uploads/speakers/`           | Program Komitesi |
| Etkinlik takvimi          | `src/data/schedule.js`               | Program Komitesi |
| SSS                       | `src/data/faq.js`                    | İletişim + Operasyon |
| Sponsor logoları          | `src/data/sponsors.js`               | Sponsor Komitesi |
| Why-Join argümanları      | `src/data/highlights.js`             | Pazarlama |
| Showcase proje (örnek)    | `src/data/projects.js`               | Pazarlama |
| Submitted projeler        | `data/projects.json` (admin onayı)   | Operasyon |
| SEO meta                  | `src/lib/seo.js`, `src/lib/constants.js` | Pazarlama |

---

## 2. Yayın Takvimi (Geri Sayım)

### T-60 gün (etkinlikten önce)
- [ ] Hero görsel finalize
- [ ] İlk 3 keynote konuşmacı duyurusu
- [ ] Sponsor "Platinum" anlaşmaları kapanmış olmalı
- [ ] SSS son hali

### T-45 gün
- [ ] Tüm Gold sponsor logoları yüklenmiş
- [ ] 7+ konuşmacı fotoğraflı + bio'lu yayında
- [ ] Sosyal medya takvimi başlar (Instagram, LinkedIn, X)

### T-30 gün
- [ ] Program akışı %100
- [ ] Showcase proje (sample-medai) gözden geçirilmiş ve gerekirse güncellenmiş
- [ ] Workshop özetleri yayında

### T-14 gün
- [ ] Yedek konuşmacı listesi
- [ ] Lojistik bilgileri (otel, ulaşım) SSS'e eklenmiş
- [ ] Press release dağıtımı

### T-1 gün
- [ ] /projects sayfasının jüri ekranı için hazır olduğunun testi
- [ ] /api/projects endpoint'i load test edilmiş
- [ ] Tüm formların manuel test pass'ı

### T+1 (etkinlik sonrası)
- [ ] Demo Day'in tüm projelerinin onayı
- [ ] Kazanan projelerinin galerinin başına `featured` flag ile eklenmesi
- [ ] Eğitim videoları + galeri canlı

---

## 3. Tonalite Örnekleri

### Hero
> ✅ "Toplum Yararına Yapay Zeka ile Geleceği Kodla."
> ❌ "Bir hackathon etkinliğine katılmak için bekliyoruz."

### Sponsor pitch
> ✅ "Türkiye'nin en parlak öğrenci yazılımcılarına doğrudan ulaşın."
> ❌ "Sponsor olarak desteğinizi rica ederiz."

### Konuşmacı bio
> ✅ "Google'da büyük dil modelleri ve otonom ajanlar üzerine çalışan deneyimli bir AI araştırmacısı."
> ❌ "Çok başarılı bir kişidir. Sektörün önde gelen isimlerindendir."

---

## 4. Görsel Brief

| Konum                | Boyut       | Format | Stil |
|----------------------|-------------|--------|------|
| OG image             | 1200×630    | JPG    | Hero başlık + 4 marka rengi |
| Konuşmacı portresi   | 800×800     | JPG/WebP | Sade BG, göz teması |
| Sponsor logo (light) | min 400px W | SVG    | Mono ya da renkli, transparan |
| Proje cover (kullanıcı) | 1280×800 | JPG/PNG | Ekran görüntüsü ya da mock-up |
