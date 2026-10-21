import type { Metadata } from 'next';
import { landing } from '../data/landing';
import { SmoothExperience } from '../components/experience/SmoothExperience';
import './globals.css';

const siteUrl = process.env.SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: '/' } } : {}),
  title: landing.title,
  description: landing.description,
  icons: { icon: '/brand-next.svg' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Codice', title: landing.title, description: landing.description, ...(siteUrl ? { url: siteUrl } : {}) },
  twitter: { card: 'summary', title: landing.title, description: landing.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><head>
    <meta name="theme-color" content="#f4f4ed" />
    <link rel="preload" href="/fonts/study/archivo-black-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="preload" href="/fonts/study/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  </head><body><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><SmoothExperience>{children}</SmoothExperience></body></html>;
}
