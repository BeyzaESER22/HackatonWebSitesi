export const SITE = {
  name: 'HackFest\'26 AI',
  shortName: 'HackFest\'26',
  tagline: 'Build with AI',
  organizer: 'Google Developer Groups On Campus İstinye Üniversitesi',
  description:
    '16-17 Mayıs 2026 — İstinye Üniversitesi Kampüsünde 2 gün sürecek hackathon, ilham veren konuşmalar ve büyük ödüller seni bekliyor.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  email: 'gdgoncampusisu@gmail.com',
  phone: '0850 283 60 00',
  location: {
    name: 'İstinye Üniversitesi Vadi Kampüsü',
    city: 'İstanbul',
    full: 'İstinye Üniversitesi Vadi Kampüsü (Sarıyer), İstanbul'
  },
  eventDateISO: process.env.NEXT_PUBLIC_EVENT_DATE_ISO || '2026-05-16T09:00:00+03:00',
  eventDates: '16-17 Mayıs 2026',
  social: {
    instagram: 'https://instagram.com/gdgoncampusistinye',
    twitter:   'https://x.com/gdgoncampusisu',
    whatsapp:  'https://chat.whatsapp.com/JGj1s5uYWO3D71MLAMND2x',
    linkedin:  'https://www.linkedin.com/company/google-dsc-istinye-university/posts/?feedView=all'
  }
};

export const COLORS = {
  blue:   '#4285F4',
  red:    '#EA4335',
  yellow: '#FBBC05',
  green:  '#34A853',
  purple: '#8B5CF6',
  cyan:   '#06B6D4'
};

// Navigation: every entry now resolves to a real route (no scroll-only anchors).
export const NAV_LINKS = [
  { href: '/',           label: 'Ana Sayfa' },
  { href: '/hackathon',  label: 'Hackathon' },
  { href: '/speakers',   label: 'Konuşmacılar' },
  { href: '/schedule',   label: 'Program' },
  { href: '/projects',   label: 'Projeler' },
  { href: '/sponsors',   label: 'Sponsorlar' },
  { href: '/team',       label: 'Ekip' },
  { href: '/#faq',       label: 'SSS' }
];

export const PROJECT_CATEGORIES = [
  { id: 'edu',           label: 'Eğitimde Yenilik' }
];

export const UPLOAD_LIMITS = {
  speakerImage:  { maxBytes: 2  * 1024 * 1024, types: ['image/jpeg','image/png','image/webp'] },
  projectImage:  { maxBytes: 5  * 1024 * 1024, types: ['image/jpeg','image/png','image/webp'] },
  projectFile:   { maxBytes: 50 * 1024 * 1024, types: ['application/zip','application/x-zip-compressed','application/x-tar','application/gzip'] },
  hackathonDocument: { maxBytes: 10 * 1024 * 1024, types: ['application/pdf'] }
};
