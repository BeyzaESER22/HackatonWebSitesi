/**
 * Konuşmacılar ve oturumları.
 */

export const speakers = [
  {
    id: 'mehmet-niyazi-atlioglu',
    name: 'Mehmet Niyazi Atlioğlu',
    title: 'Workshop Konuşmacısı',
    company: '',
    talk: 'Workshop',
    type: 'Workshop',
    day: '16 Mayıs',
    initials: 'MN',
    colorFrom: '#4285F4',
    colorTo: '#1A73E8',
    photoUrl: '/uploads/speakers/mehmet-niyazi-atlioglu.jpeg',
    bio: 'HackFest\'26 AI kapsamında 16 Mayıs Cumartesi günü workshop oturumuyla katılımcılarla buluşacak.',
    sessions: [
      {
        id: 'workshop-mehmet-niyazi-atlioglu',
        title: 'Workshop',
        type: 'Workshop',
        day: '16 Mayıs',
        time: '16:00',
        room: 'ANK 1. Kat, 102',
        audience: 'Hackathon katılımcıları',
        description: 'Mehmet Niyazi Atlioğlu ile uygulamalı workshop oturumu.'
      }
    ],
    links: {}
  },
  {
    id: 'kerimcan-arslan',
    name: 'Kerimcan Arslan',
    title: 'Veri Bilimi Panelisti',
    company: '',
    talk: 'Veri Bilimi Paneli',
    type: 'Panel',
    day: '17 Mayıs',
    initials: 'KA',
    colorFrom: '#EA4335',
    colorTo: '#C5221F',
    photoUrl: '/uploads/speakers/kerimcan-arslan.jpeg',
    bio: 'HackFest\'26 AI veri bilimi panelinde deneyim ve perspektiflerini katılımcılarla paylaşacak.',
    sessions: [
      {
        id: 'veri-bilimi-paneli',
        title: 'Veri Bilimi Paneli',
        type: 'Panel',
        day: '17 Mayıs',
        time: '13:00 - 14:00',
        room: 'ANK Kongre -2',
        audience: 'Tüm katılımcılar',
        description: 'Kerimcan Arslan, Emre Doğan ve Emin Doğan ile veri bilimi odağında panel oturumu.'
      }
    ],
    links: {}
  },
  {
    id: 'emre-dogan',
    name: 'Emre Doğan',
    title: 'Veri Bilimi Panelisti',
    company: '',
    talk: 'Veri Bilimi Paneli',
    type: 'Panel',
    day: '17 Mayıs',
    initials: 'ED',
    colorFrom: '#FBBC05',
    colorTo: '#F29900',
    photoUrl: '/uploads/speakers/emre-dogan.jpeg',
    bio: 'HackFest\'26 AI veri bilimi panelinde katılımcılarla bir araya gelecek.',
    sessions: [
      {
        id: 'veri-bilimi-paneli',
        title: 'Veri Bilimi Paneli',
        type: 'Panel',
        day: '17 Mayıs',
        time: '13:00 - 14:00',
        room: 'ANK Kongre -2',
        audience: 'Tüm katılımcılar',
        description: 'Kerimcan Arslan, Emre Doğan ve Emin Doğan ile veri bilimi odağında panel oturumu.'
      }
    ],
    links: {}
  },
  {
    id: 'emin-dogan',
    name: 'Emin Doğan',
    title: 'Veri Bilimi Panelisti',
    company: '',
    talk: 'Veri Bilimi Paneli',
    type: 'Panel',
    day: '17 Mayıs',
    initials: 'ED',
    colorFrom: '#34A853',
    colorTo: '#188038',
    photoUrl: '/uploads/speakers/emin-dogan.jpeg',
    bio: 'HackFest\'26 AI veri bilimi panelinde katılımcılarla buluşacak.',
    sessions: [
      {
        id: 'veri-bilimi-paneli',
        title: 'Veri Bilimi Paneli',
        type: 'Panel',
        day: '17 Mayıs',
        time: '13:00 - 14:00',
        room: 'ANK Kongre -2',
        audience: 'Tüm katılımcılar',
        description: 'Kerimcan Arslan, Emre Doğan ve Emin Doğan ile veri bilimi odağında panel oturumu.'
      }
    ],
    links: {}
  }
];

export const speakerSessions = [
  {
    id: 'workshop-mehmet-niyazi-atlioglu',
    title: 'Workshop',
    type: 'Workshop',
    day: '16 Mayıs',
    time: '16:00',
    room: 'ANK 1. Kat, 102',
    speakers: ['Mehmet Niyazi Atlioğlu'],
    description: 'Mehmet Niyazi Atlioğlu ile uygulamalı workshop oturumu.'
  },
  {
    id: 'veri-bilimi-paneli',
    title: 'Veri Bilimi Paneli',
    type: 'Panel',
    day: '17 Mayıs',
    time: '13:00 - 14:00',
    room: 'ANK Kongre -2',
    speakers: ['Kerimcan Arslan', 'Emre Doğan', 'Emin Doğan'],
    description: 'Veri bilimi odağında panel oturumu.'
  }
];

export function getSpeakerById(id) {
  return speakers.find(s => s.id === id) || null;
}
