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
  // Henüz sponsor eklenmedi. Yer tutucu placeholder'lar:
  { id: 'placeholder-main-1',    name: 'YOUR LOGO',    size: 'main',    logoUrl: null, url: '#' },
  { id: 'placeholder-main-2',    name: 'YOUR LOGO',    size: 'main',    logoUrl: null, url: '#' },

  { id: 'placeholder-support-1', name: 'LOGO',         size: 'support', logoUrl: null, url: '#' },
  { id: 'placeholder-support-2', name: 'LOGO',         size: 'support', logoUrl: null, url: '#' },
  { id: 'placeholder-support-3', name: 'LOGO',         size: 'support', logoUrl: null, url: '#' },
  { id: 'placeholder-support-4', name: 'LOGO',         size: 'support', logoUrl: null, url: '#' },

  { id: 'placeholder-small-1',   name: 'PARTNER',      size: 'small',   logoUrl: null, url: '#' },
  { id: 'placeholder-small-2',   name: 'PARTNER',      size: 'small',   logoUrl: null, url: '#' },
  { id: 'placeholder-small-3',   name: 'PARTNER',      size: 'small',   logoUrl: null, url: '#' },
  { id: 'placeholder-small-4',   name: 'PARTNER',      size: 'small',   logoUrl: null, url: '#' },
  { id: 'placeholder-small-5',   name: 'PARTNER',      size: 'small',   logoUrl: null, url: '#' },
  { id: 'placeholder-small-6',   name: 'PARTNER',      size: 'small',   logoUrl: null, url: '#' }
];

export function groupSponsors() {
  return {
    main:    sponsors.filter(s => s.size === 'main'),
    support: sponsors.filter(s => s.size === 'support'),
    small:   sponsors.filter(s => s.size === 'small')
  };
}
