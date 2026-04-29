# 🚀 Vercel KV + Blob Kurulumu — 5 Dakikada Çalışır Hale Getir

> Bu rehberi sırayla izle, formların Vercel'de çalışır hale gelir.

---

## Adım 1 — Yeni paketi GitHub'a yükle

Bu zip'in içindeki **tüm** dosyaları repo'na kopyala (üzerine yaz), commit + push:

```bash
git add .
git commit -m "Add Vercel KV + Blob storage"
git push
```

⚠️ **Önemli:** `package.json` değişti (yeni `@vercel/kv` ve `@vercel/blob` bağımlılıkları). Vercel otomatik install eder, sen `npm install` çalıştırma.

---

## Adım 2 — Vercel KV oluştur

1. Vercel dashboard'a git: <https://vercel.com/dashboard>
2. Sol menüden **Storage** sekmesine tıkla
3. **Create Database** → **KV** seç
4. İsim ver: `hackfest26-kv`, region: `Frankfurt (fra1)` (Türkiye'ye en yakın)
5. **Create** → **Connect to Project** → projeni seç
6. ✅ Otomatik olarak şu env vars enjekte edilir:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

**Hiçbir manuel env eklemen gerekmiyor.**

---

## Adım 3 — Vercel Blob oluştur

1. Aynı **Storage** sekmesinde **Create** → **Blob** seç
2. İsim ver: `hackfest26-uploads`
3. **Create** → **Connect to Project** → projeni seç
4. ✅ Otomatik olarak `BLOB_READ_WRITE_TOKEN` env'i enjekte edilir.

---

## Adım 4 — ADMIN_UPLOAD_SECRET ayarla

Vercel dashboard → Project → **Settings** → **Environment Variables** → **Add New**:

| Key | Value | Environments |
|---|---|---|
| `ADMIN_UPLOAD_SECRET` | `<güçlü-bir-secret-üret>` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://senin-domain.vercel.app` | Production |

> Güçlü secret üretmek için terminalde:
> ```bash
> openssl rand -hex 32
> ```

---

## Adım 5 — Redeploy

Vercel dashboard → **Deployments** → son deploy'un `...` menüsü → **Redeploy**.
"Use existing Build Cache" kutusunu **kapat** ki KV/Blob bağımlılıkları yeniden install olsun.

---

## ✅ Test et

Deploy bittikten sonra:

1. Siteni aç → **Hackathon'a Katıl** modal'ı → formu doldur → **Başvuruyu Gönder**
2. "Başvurun alındı!" toast'u görmelisin

### Verileri görmek için:

Vercel dashboard → **Storage** → KV database → **Data Browser** sekmesi → şu key'leri göreceksin:

- `store:hackathon-applications` → hackathon başvuruları
- `store:attendees` → konuşmacı etkinliği kayıtları
- `store:projects` → yarışmacı proje submission'ları

Her birinde JSON array olarak başvurular tutulur.

---

## 🐛 Sorun çıkarsa

### Form hâlâ "veri kaydedilemedi" diyor

1. Vercel dashboard → **Logs** sekmesini aç → submit'i tekrar yap
2. `Hackathon store error:` gibi log satırı göreceksin → altındaki gerçek hata mesajı yol gösterir
3. En yaygın sebepler:
   - KV bağlanmadı → Storage sekmesinden projeyle bağlantıyı kontrol et
   - Eski deployment cache → Redeploy + cache'i temizle

### Speaker upload "Yetkisiz erişim" dönüyor

`ADMIN_UPLOAD_SECRET` env'i tanımlı değil ya da curl çağrısında `x-admin-secret` header'ı eksik.

```bash
curl -X POST https://senin-domain.vercel.app/api/upload-speaker \
  -H "x-admin-secret: <senin-secret-değerin>" \
  -F "speakerId=eda-yilmaz" \
  -F "file=@/path/to/photo.jpg"
```

### Proje görseli yüklenmiyor

Vercel Blob token'ı yok. Adım 3'ü tekrar yap.

---

## 💰 Maliyet

| Servis | Free tier | HackFest için yeterli mi? |
|---|---|---|
| Vercel KV | 30K komut/ay, 256MB | ✅ Fazlasıyla |
| Vercel Blob | 1GB depolama, 10GB transfer/ay | ✅ Etkinlik için yeterli |
| Vercel Hosting (Hobby) | Kişisel proje, 100GB transfer/ay | ⚠️ 5K kullanıcıda Pro öneririm ($20/ay) |

Etkinlik günü öncesi **Hobby → Pro** upgrade'i yap, etkinlik sonrası geri düşürebilirsin.
