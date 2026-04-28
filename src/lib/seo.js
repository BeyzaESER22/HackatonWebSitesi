import { SITE } from './constants';

export function buildMetadata({ title, description, path = '/' } = {}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const desc = description || SITE.description;
  const url = `${SITE.url}${path}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description: desc,
      siteName: SITE.name,
      locale: 'tr_TR',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: SITE.name }]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: ['/og-image.jpg']
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png'
    },
    keywords: [
      'hackathon', 'AI', 'yapay zeka', 'GDG', 'Google Developer Groups',
      'İstinye Üniversitesi', 'HackFest', 'öğrenci hackathon',
      'AI workshop', 'machine learning', 'startup', 'demo day'
    ]
  };
}
