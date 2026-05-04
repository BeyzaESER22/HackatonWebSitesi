/**
 * Sponsorlar — boyut bazlı liste.
 *
 * size: 'main' (büyük) | 'support' (orta) | 'small' (küçük) — sadece görsel
 * boyutu kontrol eder, sponsorluk paketiyle ilgili bir anlamı YOKTUR.
 *
 * Yeni sponsor eklemek için:
 *   1) /public/uploads/sponsors/<slug>.svg yükleyin (veya .png/.webp/.jpg)
 *   2) Aşağıya bir obje ekleyin: { id, name, size, logoUrl, url }
 *   3) Kayıt size='main' (1-2 adet) | 'support' (4-8 adet) | 'small' (sınırsız)
 */

export const sponsors = [
  // Ana Sponsor
  { id: 'claws', name: 'CLAWS Next Generation Technology', size: 'main', logoUrl: '/uploads/sponsors/claws.jpg', url: '#' },

  // Destekçi Sponsorlar
  { id: 'huawei',         name: 'Huawei',                    size: 'support', logoUrl: '/uploads/sponsors/huawei.jpg',         url: '#' },
  { id: 'corba-express',  name: 'ÇORBA express',              size: 'support', logoUrl: '/uploads/sponsors/corba-express.png',  url: '#' },
  { id: 'indomie',        name: 'Indomie',                   size: 'support', logoUrl: '/uploads/sponsors/indomie.jpg',        url: '#' },
  { id: 'british-time',   name: 'British Time Dil Okulları', size: 'support', logoUrl: '/uploads/sponsors/british-time.png',   url: '#' },
  { id: 'spb',            name: 'SPB - So Pro Bro',          size: 'support', logoUrl: '/uploads/sponsors/spb.jpg',            url: '#' },
  { id: 'anxcure',       name: 'AnxCure',                   size: 'support', logoUrl: '/uploads/sponsors/anxcure.png',        url: '#' },
  { id: 'ajans-kurdu',   name: 'Ajans Kurdu',               size: 'support', logoUrl: '/uploads/sponsors/ajans-kurdu.png',    url: '#' },
  { id: 'tamek',         name: 'Tamek',                     size: 'support', logoUrl: '/uploads/sponsors/tamek.png',          url: '#' },
  { id: 'porty',         name: 'Porty',                     size: 'support', logoUrl: '/uploads/sponsors/porty.png',          url: '#' }
];

export function groupSponsors() {
  return {
    main:    sponsors.filter(s => s.size === 'main'),
    support: sponsors.filter(s => s.size === 'support'),
    small:   sponsors.filter(s => s.size === 'small')
  };
}
