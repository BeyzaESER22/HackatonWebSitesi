/**
 * GDG On Campus İstinye Üniversitesi — Çekirdek Ekip.
 *
 * Sıralama: order alanı UI sıralamasını kontrol eder.
 *
 * Yeni üye eklemek için: bir obje ekleyin ve fotoğrafı /uploads/team/<id>.jpg
 * olarak yükleyip photoUrl alanını güncelleyin.
 */

export const team = [
  {
    id: 'asya-oral',
    order: 1,
    name: 'Asya Oral',
    role: 'Organizer',
    initials: 'AO',
    colorFrom: '#4285F4',
    colorTo:   '#1A73E8',
    photoUrl: '/uploads/team/asya-oral.jpg',
    bio: 'Topluluk yönetimi, sponsor ilişkileri ve genel koordinasyon.',
    links: {}
  },
  {
    id: 'semih-celenk',
    order: 2,
    name: 'Semih Çelenk',
    role: 'Event Team Coordinator',
    initials: 'SÇ',
    colorFrom: '#EA4335',
    colorTo:   '#C5221F',
    photoUrl: null,
    bio: 'Etkinlik ekibi koordinasyonu ve operasyon yönetimi.',
    links: {}
  },
  {
    id: 'arda-kocadoru',
    order: 3,
    name: 'Arda Kocadoru',
    role: 'Project Coordinator',
    initials: 'AK',
    colorFrom: '#FBBC05',
    colorTo:   '#F29900',
    photoUrl: '/uploads/team/arda-kocadoru.jpg',
    bio: 'Proje koordinasyonu ve teknik süreçlerin yönetimi.',
    links: {}
  },
  {
    id: 'nilasu-yildiz',
    order: 4,
    name: 'Nilasu Yıldız',
    role: 'Social Media Manager',
    initials: 'NY',
    colorFrom: '#34A853',
    colorTo:   '#188038',
    photoUrl: null,
    bio: 'Sosyal medya yönetimi ve dijital iletişim stratejisi.',
    links: {}
  },
  {
    id: 'beyza-eser',
    order: 5,
    name: 'Beyza Eser',
    role: 'Project Team Coordinator',
    initials: 'BE',
    colorFrom: '#8B5CF6',
    colorTo:   '#6D28D9',
    photoUrl: null,
    bio: 'Proje takımı koordinasyonu ve süreç yönetimi.',
    links: {}
  },
  {
    id: 'mehmet-emin-soyal',
    order: 6,
    name: 'Mehmet Emin Soyal',
    role: 'Sponsorship Manager',
    initials: 'MS',
    colorFrom: '#FF6D01',
    colorTo:   '#E65100',
    photoUrl: null,
    bio: 'Sponsorluk ilişkileri ve iş ortaklıkları yönetimi.',
    links: {}
  },
  {
    id: 'nur-huner',
    order: 7,
    name: 'Nur Hüner',
    role: 'Event Coordinator',
    initials: 'NH',
    colorFrom: '#00BCD4',
    colorTo:   '#00838F',
    photoUrl: null,
    bio: 'Etkinlik koordinasyonu ve organizasyon planlaması.',
    links: {}
  }
];

export function getOrderedTeam() {
  return [...team].sort((a, b) => a.order - b.order);
}
