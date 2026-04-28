# HackFest'26 AI — Deployment Notları

## 1. Ortam Modları

Bu repo iki modda çalışacak şekilde tasarlandı:

| Mod         | Veritabanı            | Dosya Depolama         | Mail            |
|-------------|------------------------|-------------------------|-----------------|
| Development | `data/*.json`          | `public/uploads/`       | Console log     |
| Production  | Supabase / Postgres    | S3 / R2 / Vercel Blob   | Resend / Postmark |

Mevcut kod **development** modunda hazır. Production'a geçerken aşağıdaki dört noktayı değiştir.

---

## 2. Vercel Üzerinde Hızlı Deploy

```bash
# 1) Repo'yu GitHub'a push et
git init && git add . && git commit -m "Initial"
gh repo create hackfest26-ai --public --push

# 2) Vercel'e bağla
vercel link
vercel env add ADMIN_UPLOAD_SECRET production
vercel env add NEXT_PUBLIC_SITE_URL  production
vercel env add NEXT_PUBLIC_EVENT_DATE_ISO production
vercel env add NEXT_PUBLIC_CONTACT_EMAIL production

# 3) Deploy
vercel --prod
```

> ⚠️ **Önemli:** Vercel'in serverless filesystem'i **read-only**'dir.
> Mevcut `data/*.json` ve `public/uploads/` mantığı **Vercel'de çalışmaz**;
> production'da Madde 3'teki migration'ı yapmadan deploy etmeyin.

---

## 3. Production'a Geçiş — 4 Adım

### a) Veritabanı (Supabase önerilir)

`src/lib/db.js` dosyası oluştur:

```js
import { createClient } from '@supabase/supabase-js';
export const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
```

Şu üç tabloyu oluştur:

```sql
create table hackathon_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text, university text, department text,
  email text, phone text, team_status text, project_idea text,
  status text default 'pending',
  submitted_at timestamptz default now()
);

create table attendees (
  id uuid primary key default gen_random_uuid(),
  full_name text, email text, participation_type text,
  registered_at timestamptz default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  title text, category text, short_description text, long_description text,
  team jsonb, tech_stack text[], contact_email text,
  github_url text, demo_url text, image_url text, package_url text,
  status text default 'pending',
  submitted_at timestamptz default now()
);
```

Sonra `src/app/api/*/route.js` içindeki `appendToStore`/`readStore` çağrılarını `db.from('...').insert(...)` ile değiştir.

### b) Dosya Depolama

Vercel Blob veya Cloudflare R2 önerilir. `src/lib/storage.js`:

```js
import { put } from '@vercel/blob';
export async function uploadFile(buffer, filename, contentType) {
  const { url } = await put(filename, buffer, { access: 'public', contentType });
  return url;
}
```

`api/upload-speaker/route.js` ve `api/projects/route.js` içindeki `fs.writeFile` çağrılarını bununla değiştir.
Yapılması gereken tek değişiklik:

```diff
- await fs.writeFile(path.join(IMG_DIR, imgName), buffer);
- imageUrl = `/uploads/projects/images/${imgName}`;
+ imageUrl = await uploadFile(buffer, imgName, imageFile.type);
```

### c) Mail (Resend)

Başvuru sonrası teyit maili:

```js
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'HackFest <noreply@istinye.edu.tr>',
  to: record.email,
  subject: 'Başvurun alındı — HackFest\'26 AI',
  html: '...'
});
```

### d) Auth (NextAuth)

Admin paneli için `/admin` rotasını NextAuth ile koru, organizatör Google hesaplarına izin ver.

---

## 4. Konuşmacı Fotoğraflarını Yüklemek

### Development (lokal)
```bash
curl -X POST http://localhost:3000/api/upload-speaker \
  -H "x-admin-secret: $ADMIN_UPLOAD_SECRET" \
  -F "speakerId=eda-yilmaz" \
  -F "file=@/path/to/photo.jpg"
```

Yanıt:
```json
{ "ok": true, "speakerId": "eda-yilmaz", "photoUrl": "/uploads/speakers/eda-yilmaz.jpg",
  "hint": "src/data/speakers.js içinde \"eda-yilmaz\" ID'li konuşmacının photoUrl alanını ... olarak güncelleyin." }
```

`src/data/speakers.js` içinde:
```js
{ id: 'eda-yilmaz', photoUrl: '/uploads/speakers/eda-yilmaz.jpg', ... }
```

### Production (sonrası)
Aynı endpoint, ama `photoUrl` Blob URL'si olarak döner. Yine `speakers.js` içine kopyalanır.

---

## 5. Yarışmacı Projelerin Onaylanması

Şimdilik manuel: `data/projects.json` içine `"status": "pending"` olarak gelen kayıtları operatör elle `"approved"` olarak işaretler.

İdeal: minimum admin paneli — `/admin/projects` rotasında onay/red butonları + e-posta gönderimi.

---

## 6. Performans Checklist

- [ ] Lighthouse > 90 (Performance, Accessibility, SEO)
- [ ] Hero görseli WebP + `next/image`
- [ ] Tailwind purge production build'da çalışıyor (otomatik)
- [ ] Cloudflare CDN önünde
- [ ] HSTS + CSP header'ları
- [ ] Rate limit `api/projects` POST için (örn. dakikada 5)

---

## 7. Etkinlik Günü Operasyon

- Demo Day'de jüri ekranında `/projects` açık tutulur
- Yeni proje gönderildikçe `force-dynamic` sayesinde otomatik güncellenir
- Onay ekibi 5 dakikada bir `data/projects.json` (veya DB) içindeki yeni kayıtları gözden geçirir
- Onaylananlar galeride otomatik görünür

---

## 8. Kapasite & Ölçeklendirme — 5.000 Kullanıcı Hedefi

Site beklenen yoğunluğu (eş zamanlı ~5.000 ziyaretçi, etkinlik anlarında ani trafik artışı) sorunsuz karşılayacak şekilde tasarlandı. Aşağıdaki katmanlar production geçişi sırasında zorunludur:

### a) Hosting — Vercel Pro veya benzeri serverless

| Yetenek | Vercel Pro | Yorum |
|---|---|---|
| Eş zamanlı kullanıcı | Sınırsız (auto-scale) | Edge fonksiyonları kendiliğinden ölçeklenir |
| Bandwidth | 1 TB/ay | Etkinlik günü ~50-100 GB beklenir → fazlasıyla yeterli |
| Function invocation | 1M/ay dahil | Form submission'ları + project list endpoint'i için yeterli |
| Build minutes | 6.000/ay | İçerik güncellemeleri için yeterli |

**Alternatif:** Cloudflare Pages + Workers (daha yüksek burst limitleri, daha düşük maliyet).

### b) Veritabanı — Supabase Pro

| Limit | Pro Plan | Yorum |
|---|---|---|
| Eş zamanlı bağlantı | 200 (pooler ile 6.400) | PgBouncer üzerinden 5K kullanıcı rahat |
| Storage | 8 GB | Başvurular + projeler için yıllarca yeterli |
| Egress | 250 GB/ay | API yanıtları için |
| Daily backup | ✅ | Etkinlik günü kritik |

**Connection pooling şart:** `?pgbouncer=true&connection_limit=1` query string'i ile Supabase pool'u kullanın; aksi takdirde 5K kullanıcı 200 doğrudan bağlantıyı saniyeler içinde tüketir.

### c) Object Storage — Vercel Blob veya Cloudflare R2

- Speaker / project görsellerinde CDN otomatik (her ikisi de global edge cache yapar)
- 5K kullanıcı × 2MB ortalama görsel = 10GB ay sonu transfer; her iki platform da bu seviyede ücretsiz tier'da
- **Image optimization:** `next/image` kullanın → WebP/AVIF dönüşümü + lazy loading + responsive srcset otomatik

### d) Rate Limiting — abuse koruması

5K kullanıcı kötüye kullanım potansiyeli yaratır. `@upstash/ratelimit` ile kritik endpoint'leri koru:

```js
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m')  // 5 istek/dakika/IP
});

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await limiter.limit(ip);
  if (!success) return NextResponse.json({ message: 'Çok fazla istek' }, { status: 429 });
  // ...
}
```

Önerilen limitler:
| Endpoint | Limit |
|---|---|
| `POST /api/hackathon` | 3/dakika/IP |
| `POST /api/attendees` | 5/dakika/IP |
| `POST /api/projects` | 2/dakika/IP (yükleme ağır) |
| `POST /api/upload-speaker` | Admin secret zaten kısıtlar; ayrıca 10/dakika |

### e) Caching — sayfa düzeyinde ISR

- **Static sayfalar** (`/`, `/hackathon`, `/team`, `/sponsors`, `/schedule`, `/speakers`, `/speakers/[id]`): Build-time render + revalidate 60s
- **Dynamic sayfalar** (`/projects`, `/projects/[id]`): `force-dynamic` (yeni proje anında görünmeli)
- **API yanıtları:** `/api/projects` GET için 30s edge cache (admin onayı sonrası `revalidatePath('/projects')` çağırın)

```js
// app/projects/page.js — production sürümünde
export const revalidate = 30;  // ISR
```

### f) Monitoring

- **Vercel Analytics** (built-in, ücretsiz) — Web Vitals + traffic
- **Sentry** — JS hata yakalama, free tier 5K event/ay → etkinlik günü için yeterli
- **Uptime:** UptimeRobot ücretsiz tier ile `/`, `/api/projects`, `/register` 5dk pingli

### g) Etkinlik Günü Checklist

- [ ] T-7 gün: Vercel Pro upgrade tamam
- [ ] T-7 gün: Supabase prod migration
- [ ] T-3 gün: Yük testi (k6 / Artillery ile 1K eş zamanlı sanal kullanıcı)
- [ ] T-1 gün: Rate limit'ler doğrulanmış
- [ ] T-1 gün: Sentry alarm kuralları aktif
- [ ] Etkinlik günü: 2 kişilik on-call (operasyon + dev)

### Beklenen Performans (5K kullanıcı senaryosunda)

| Metrik | Hedef | Ölçüm |
|---|---|---|
| TTFB | < 200ms | Edge cache hit |
| LCP | < 2.5s | next/image optimize |
| API p95 latency | < 500ms | DB pool + index |
| Error rate | < 0.5% | Sentry takibi |
| Form submission başarı oranı | > 99% | Rate limit'i aşmayan istekler |
