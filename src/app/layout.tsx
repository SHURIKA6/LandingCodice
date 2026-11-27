import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { landing } from '../data/landing';
import { SmoothExperience } from '../components/experience/SmoothExperience';
import './globals.css';

const displayFont = localFont({ src: '../../public/fonts/study/bricolage-grotesque-latin.woff2', variable: '--font-display', weight: '200 800', display: 'swap' });
const bodyFont = localFont({ src: '../../public/fonts/source-sans-3-latin-wght-normal.woff2', variable: '--font-body', weight: '200 900', display: 'swap' });

const siteUrl = process.env.SITE_URL || 'https://landing-codice.vercel.app';
const sharingImage = {
  url: '/media/codice-share-v1.png',
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: 'Codice — sites e sistemas sob medida, com escultura azul de dois Cs entrelaçados.',
};
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: { default: landing.title, template: '%s — Codice' },
  description: landing.description,
  authors: [{ name: 'Codice' }],
  creator: 'Codice',
  publisher: 'Codice',
  formatDetection: { telephone: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
  },
  keywords: ['Codice', 'Codice web design', 'programadores', 'programador', 'devs', 'desenvolvedores', 'programação', 'desenvolvimento de sites', 'desenvolvimento de sistemas', 'estúdio de web design', 'sites profissionais', 'site de uma página', 'sites e sistemas sob medida', 'software personalizado', 'consultoria em tecnologia', 'assistência técnica', 'manutenção de computadores', 'manutenção de notebooks', 'conserto de computadores', 'conserto de notebooks', 'manutenção de redes', 'assistência de redes', 'Sinop', 'Mato Grosso', 'programadores em Mato Grosso', 'criação de sites Mato Grosso'],
  icons: { icon: '/brand-people.svg' },
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Codice', title: landing.title, description: landing.description, url: siteUrl, images: [sharingImage] },
  twitter: { card: 'summary_large_image', title: landing.title, description: landing.description, images: [sharingImage] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable}`}><head>
    <meta name="theme-color" content="#f7f9fc" />
  </head><body><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><SmoothExperience>{children}</SmoothExperience></body></html>;
}
