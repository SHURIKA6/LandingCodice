import type { MetadataRoute } from 'next';

const siteUrl = process.env.SITE_URL || 'https://landing-codice.vercel.app';
const lastModified = new Date('2026-10-23T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/about', '/contact', '/privacy', '/docs'];
  return paths.map(path => ({
    url: new URL(path, siteUrl).href,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}