import type { MetadataRoute } from 'next';

const siteUrl = process.env.SITE_URL || 'https://landing-codice.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}