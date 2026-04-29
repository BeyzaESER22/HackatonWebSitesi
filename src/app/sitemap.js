import { SITE } from '@/lib/constants';

export default function sitemap() {
  const base = SITE.url;
  const now = new Date();
  return [
    { url: `${base}/`,                lastModified: now, priority: 1.0,  changeFrequency: 'daily' },
    { url: `${base}/hackathon`,       lastModified: now, priority: 0.95, changeFrequency: 'weekly' },
    { url: `${base}/speakers`,        lastModified: now, priority: 0.9,  changeFrequency: 'weekly' },
    { url: `${base}/schedule`,        lastModified: now, priority: 0.8,  changeFrequency: 'weekly' },
    { url: `${base}/sponsors`,        lastModified: now, priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${base}/team`,            lastModified: now, priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${base}/projects`,        lastModified: now, priority: 0.85, changeFrequency: 'daily' },
    { url: `${base}/projects/submit`, lastModified: now, priority: 0.7,  changeFrequency: 'weekly' },
    { url: `${base}/register`,        lastModified: now, priority: 0.95, changeFrequency: 'daily' },
    { url: `${base}/speaker-event`,   lastModified: now, priority: 0.85, changeFrequency: 'weekly' }
  ];
}
