import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { landing } from '../data/landing';
import { SmoothExperience } from '../components/experience/SmoothExperience';
import './globals.css';

const displayFont = localFont({ src: '../../public/fonts/study/bricolage-grotesque-latin.woff2', variable: '--font-display', weight: '200 800', display: 'swap' });
const bodyFont = localFont({ src: '../../public/fonts/source-sans-3-latin-wght-normal.woff2', variable: '--font-body', weight: '200 900', display: 'swap' });

const siteUrl = process.env.SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: '/' } } : {}),
  title: landing.title,
  description: landing.description,
  icons: { icon: '/brand-people.svg' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Codice', title: landing.title, description: landing.description, ...(siteUrl ? { url: siteUrl } : {}) },
  twitter: { card: 'summary', title: landing.title, description: landing.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable}`}><head>
    <meta name="theme-color" content="#f7f9fc" />
  </head><body><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><SmoothExperience>{children}</SmoothExperience></body></html>;
}
