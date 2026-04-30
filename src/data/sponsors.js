/**
 * Sponsorlar — boyut bazlı liste.
 *
 * Tier (platin/altın/silver) kategorisi kaldırıldı.
 * size: 'main' (büyük) | 'support' (orta) | 'small' (küçük) — sadece görsel
 * boyutu kontrol eder, sponsorluk paketiyle ilgili bir anlamı YOKTUR.
 *
 * Yeni sponsor eklemek için:
 *   1) /public/uploads/sponsors/<slug>.svg yükleyin (veya .png/.webp)
 *   2) Aşağıya bir obje ekleyin: { id, name, size, logoUrl, url }
 *   3) Kayıt size='main' (1-2 adet) | 'support' (4-8 adet) | 'small' (sınırsız)
 */

export const sponsors = [
  // Ana Sponsor
  { id: 'claws',        name: 'CLAWS Next Generation Technology', size: 'main',    logoUrl: '/uploads/sponsors/claws.jpg',        url: '#' },

  // Destekçi Sponsorlar
  { id: 'huawei',       name: 'Huawei',                          size: 'support', logoUrl: '/uploads/sponsors/huawei.jpg',       url: '#' },
  { id: 'indomie',      name: 'Indomie',                         size: 'support', logoUrl: '/uploads/sponsors/indomie.jpg',      url: '#' },
  { id: 'british-time', name: 'British Time Dil Okulları',       size: 'support', logoUrl: '/uploads/sponsors/british-time.png', url: '#' }
];

export function groupSponsors() {
  return {
    main:    sponsors.filter(s => s.size === 'main'),
    support: sponsors.filter(s => s.size === 'support'),
    small:   sponsors.filter(s => s.size === 'small')
  };
}
