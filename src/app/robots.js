import { SITE } from '@/lib/constants';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/uploads/'] }
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url
  };
}
