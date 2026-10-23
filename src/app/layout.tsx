import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { landing } from '../data/landing';
import { SmoothExperience } from '../components/experience/SmoothExperience';
import './globals.css';

const displayFont = localFont({ src: '../../public/fonts/study/bricolage-grotesque-latin.woff2', variable: '--font-display', weight: '200 800', display: 'swap' });
const bodyFont = localFont({ src: '../../public/fonts/source-sans-3-latin-wght-normal.woff2', variable: '--font-body', weight: '200 900', display: 'swap' });

const siteUrl = process.env.SITE_URL || 'https://landing-codice.vercel.app';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: landing.title,
  description: landing.description,
  keywords: ['Codice', 'Codice web design', 'estúdio de web design', 'sites profissionais', 'site de uma página', 'Sinop', 'Mato Grosso'],
  icons: { icon: '/brand-people.svg' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Codice', title: landing.title, description: landing.description, url: siteUrl, images: [{ url: '/media/roger-shot.png', width: 1440, height: 1100, alt: 'Captura da interface do projeto Roger Estética Automotiva.' }] },
  twitter: { card: 'summary_large_image', title: landing.title, description: landing.description, images: ['/media/roger-shot.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable}`}><head>
    <meta name="theme-color" content="#f7f9fc" />
  </head><body><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><SmoothExperience>{children}</SmoothExperience></body></html>;
}
