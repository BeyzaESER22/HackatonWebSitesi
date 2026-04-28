/**
 * GDG On Campus İstinye Üniversitesi — Çekirdek Ekip.
 *
 * Sıralama: order alanı UI sıralamasını kontrol eder.
 * Beyza ESER (order: 3), Nila (order: 4), Mehmet Emin Soyal (order: 5).
 *
 * Yeni üye eklemek için: bir obje ekleyin ve fotoğrafı /uploads/team/<id>.jpg
 * olarak yükleyip photoUrl alanını güncelleyin.
 */

export const team = [
  {
    id: 'lead-1',
    order: 1,
    name: 'GDG Lead',
    role: 'Topluluk Lideri',
    initials: 'GL',
    colorFrom: '#4285F4',
    colorTo:   '#1A73E8',
    photoUrl: null,
    bio: 'Topluluk yönetimi, sponsor ilişkileri ve genel koordinasyon.',
    links: {}
  },
  {
    id: 'lead-2',
    order: 2,
    name: 'Co-Lead',
    role: 'Yardımcı Lider',
    initials: 'CL',
    colorFrom: '#EA4335',
    colorTo:   '#C5221F',
    photoUrl: null,
    bio: 'Etkinlik organizasyonu ve operasyon ekibi liderliği.',
    links: {}
  },
  {
    id: 'beyza-eser',
    order: 3,
    name: 'Beyza ESER',
    role: 'Ekip Üyesi',
    initials: 'BE',
    colorFrom: '#FBBC05',
    colorTo:   '#F29900',
    photoUrl: null,
    bio: '',
    links: {}
  },
  {
    id: 'nila',
    order: 4,
    name: 'Nila',
    role: 'Ekip Üyesi',
    initials: 'N',
    colorFrom: '#34A853',
    colorTo:   '#188038',
    photoUrl: null,
    bio: '',
    links: {}
  },
  {
    id: 'mehmet-emin-soyal',
    order: 5,
    name: 'Mehmet Emin Soyal',
    role: 'Ekip Üyesi',
    initials: 'MS',
    colorFrom: '#8B5CF6',
    colorTo:   '#6D28D9',
    photoUrl: null,
    bio: '',
    links: {}
  }
];

export function getOrderedTeam() {
  return [...team].sort((a, b) => a.order - b.order);
}
