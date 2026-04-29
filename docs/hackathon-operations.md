# Hackathon Başvuru Operasyon Notları

Bu doküman, etkinlik günü hackathon başvuru akışını hızlı ve güvenli şekilde takip etmek için hazırlandı.

## Başvuru geldi mi nasıl kontrol edilir?

- Admin paneline gir: `/admin`
- Başvurular en yeni kayıt üstte olacak şekilde listelenir.
- Panel verileri sadece KV'den değil, fallback backup katmanından da birlikte okur.
- Bu yüzden KV tarafında kısa süreli bir sorun yaşansa bile backup-only kayıtlar da listede görünür.

## CSV nasıl alınır?

- Admin panelinin üst kısmındaki `CSV İndir` butonunu kullan.
- Bu buton `/api/admin/hackathon/export` endpoint'ine gider.
- Yoğun başvuru anlarında düzenli aralıklarla CSV indirip bilgisayarında saklamak iyi bir operasyon alışkanlığıdır.

## Backup'lar nereden kontrol edilir?

### Production

- Fallback kayıtlar Vercel Blob içine yazılır.
- Prefix:

```txt
structured-backups/hackathon-applications/
```

### Local / geliştirme

- Yerel backup klasörü:

```txt
data/_structured_backups/hackathon-applications/
```

## Acil durumda ne yapılır?

1. Önce `/admin` paneline girip güncel CSV dosyasını indir.
2. Vercel dashboard içinde `Logs` bölümünden `/api/hackathon` isteklerini kontrol et.
3. Gerekirse Blob içindeki `structured-backups/hackathon-applications/` kayıtlarını açıp en son başvuruları doğrula.
4. Panelde erişim problemi varsa, indirilen son CSV dosyasını geçici operasyon kaydı olarak kullan.
5. Sorun çözüldükten sonra admin panelindeki kayıt sayısı ile backup/CSV sayısını karşılaştır.

## Şu an aktif korumalar

- Submit sırasında buton disable edilir.
- Her istemci başvurusuna benzersiz bir `submissionId` verilir.
- Backend'de idempotency / duplicate reservation aktiftir.
- Aynı etkinlik + aynı e-posta için unique koruma vardır.
- Honeypot spam filtresi aktiftir.
- IP ve e-posta bazlı rate limit vardır.
- KV yazımı başarısız olursa Blob/local backup fallback devreye girer.
- Form taslağı kullanıcı cihazında tutulur.
