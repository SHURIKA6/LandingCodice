import type { MetadataRoute } from 'next';

const siteUrl = process.env.SITE_URL || 'https://landing-codice.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: new URL('/', siteUrl).href,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        `${siteUrl}/media/codice-share-v1.png`,
        `${siteUrl}/media/corretor-poster.webp`,
        `${siteUrl}/media/roger-shot.png`,
      ],
    },
    ...['/about', '/contact', '/privacy', '/docs', '/developers'].map(path => ({
      url: new URL(path, siteUrl).href,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}