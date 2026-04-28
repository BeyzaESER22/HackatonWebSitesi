/**
 * Konuşmacılar.
 *
 * Şu an konuşmacılar henüz açıklanmadı. Sayfada tutucu (placeholder) profiller
 * gösterilir; her biri için örnek bir detay sayfası (oturum bilgileri ile)
 * `/speakers/[id]` adresinden açılabilir.
 *
 * Konuşmacı eklemek:
 *  - photoUrl → /uploads/speakers/<slug>.jpg yüklendikten sonra atanır
 *  - sessions → konuşmacının oturum(lar)ı; her biri detay sayfasında listelenir
 */

export const speakers = [
  {
    id: 'speaker-1',
    name: 'Konuşmacı Yakında',
    title: 'Açıklanacak',
    company: '',
    talk: 'Yakında açıklanacak',
    type: 'Keynote',
    day: '16 Mayıs',
    initials: '?',
    colorFrom: '#4285F4',
    colorTo:   '#1A73E8',
    photoUrl: null,
    bio: 'Konuşmacı bilgisi yakında bu alanda görünecektir.',
    sessions: [],
    links: {}
  },
  {
    id: 'speaker-2',
    name: 'Konuşmacı Yakında',
    title: 'Açıklanacak',
    company: '',
    talk: 'Yakında açıklanacak',
    type: 'Panel',
    day: '16 Mayıs',
    initials: '?',
    colorFrom: '#EA4335',
    colorTo:   '#C5221F',
    photoUrl: null,
    bio: 'Konuşmacı bilgisi yakında bu alanda görünecektir.',
    sessions: [],
    links: {}
  },
  {
    id: 'speaker-3',
    name: 'Konuşmacı Yakında',
    title: 'Açıklanacak',
    company: '',
    talk: 'Yakında açıklanacak',
    type: 'Workshop',
    day: '17 Mayıs',
    initials: '?',
    colorFrom: '#FBBC05',
    colorTo:   '#F29900',
    photoUrl: null,
    bio: 'Konuşmacı bilgisi yakında bu alanda görünecektir.',
    sessions: [],
    links: {}
  },
  {
    id: 'speaker-4',
    name: 'Konuşmacı Yakında',
    title: 'Açıklanacak',
    company: '',
    talk: 'Yakında açıklanacak',
    type: 'Talk',
    day: '17 Mayıs',
    initials: '?',
    colorFrom: '#34A853',
    colorTo:   '#188038',
    photoUrl: null,
    bio: 'Konuşmacı bilgisi yakında bu alanda görünecektir.',
    sessions: [],
    links: {}
  },
  {
    id: 'speaker-5',
    name: 'Konuşmacı Yakında',
    title: 'Açıklanacak',
    company: '',
    talk: 'Yakında açıklanacak',
    type: 'Panel',
    day: '17 Mayıs',
    initials: '?',
    colorFrom: '#8B5CF6',
    colorTo:   '#6D28D9',
    photoUrl: null,
    bio: 'Konuşmacı bilgisi yakında bu alanda görünecektir.',
    sessions: [],
    links: {}
  },
  {
    id: 'speaker-6',
    name: 'Konuşmacı Yakında',
    title: 'Açıklanacak',
    company: '',
    talk: 'Yakında açıklanacak',
    type: 'Talk',
    day: '16 Mayıs',
    initials: '?',
    colorFrom: '#06B6D4',
    colorTo:   '#0891B2',
    photoUrl: null,
    bio: 'Konuşmacı bilgisi yakında bu alanda görünecektir.',
    sessions: [],
    links: {}
  },

  // ÖRNEK — gerçek format için referans, detay sayfasında nasıl görüneceğini gösterir.
  {
    id: 'sample-speaker',
    isSample: true,
    name: 'Örnek Konuşmacı',
    title: 'AI Research Lead',
    company: 'Örnek Şirket',
    talk: 'LLM\'lerden Otonom Ajanlara: 2026 ve Ötesi',
    type: 'Keynote',
    day: '16 Mayıs',
    initials: 'ÖK',
    colorFrom: '#4285F4',
    colorTo:   '#EA4335',
    photoUrl: null,
    bio: 'Bu, konuşmacı detay sayfasının nasıl görüneceğini göstermek için hazırlanmış örnek bir profildir. Gerçek konuşmacılar açıklandığında bu format kullanılarak doldurulacaktır.',
    sessions: [
      {
        id: 's1',
        title: 'LLM\'lerden Otonom Ajanlara: 2026 ve Ötesi',
        type: 'Keynote',
        day: '16 Mayıs',
        time: '10:00 — 11:00',
        room: 'Ana Salon (Amfi A)',
        audience: 'Tüm katılımcılar',
        description: 'Büyük dil modellerinin son iki yıldaki gelişiminden, tool-calling ile otonom ajan paradigmasına geçişe; production sistemlerde dikkat edilmesi gereken bias-audit, latency ve maliyet tradeoff\'larına kadar geniş bir saha turu.'
      },
      {
        id: 's2',
        title: 'Soru-Cevap & Networking',
        type: 'Q&A',
        day: '16 Mayıs',
        time: '11:00 — 11:30',
        room: 'Fuaye',
        audience: 'İlgilenen katılımcılar',
        description: 'Keynote sonrası açık soru-cevap ve birebir görüşme imkanı.'
      }
    ],
    links: { twitter: '#', linkedin: '#' }
  }
];

export function getSpeakerById(id) {
  return speakers.find(s => s.id === id) || null;
}
