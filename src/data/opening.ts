import { landing } from './landing';

/**
 * First screen (#inicio), decided by the owner on 05/11/2026: one message, one main action and one
 * visual. The KAIRN plate and its loop left the page; nothing in the opening loads from another
 * origin. People, roles and contacts live in team.ts and site.ts, never here.
 */
export const openingContent = {
  eyebrow: 'Soluções tecnológicas e digitais',
  headline: ['Tecnologia', 'feita por', 'gente.'],
  lede: 'Sites e sistemas sob medida, consultoria e assistência técnica para negócios de Sinop e região.',
  cta: { label: 'Vamos conversar no WhatsApp', href: landing.contactHref },
  secondary: { label: 'Ver soluções', href: '#servico' },
} as const;

export type OpeningPhoto = {
  /** A same-origin path under /team/, saved and recorded as AGENTS.md (05/11/2026) describes. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** CSS object-position that keeps every face inside the frame at rest. */
  readonly objectPosition: string;
};

/**
 * Real team photo chosen by the owner on 05/11/2026; null until the owner sends it.
 * While it is null the blue sculpture is the opening's visual.
 */
export const openingPhoto: OpeningPhoto | null = null;
