import { siteContent, whatsappUrl } from './site';
import { teamMembers } from './team';

/**
 * PROVISIONAL MEDIA. Decision of 21/10/2026 ("por enquanto, use a do prompt"): the plate and the
 * loop come from the KAIRN Alpine 26 template. Their origin and rights are undocumented, so
 * they are referenced here, never copied into the repository. Replace these two constants (or
 * self-host with a manifest of origin, hash, MIME and size) before publishing. Record:
 * docs/abertura-alpine-2026-10-21/media.md.
 */
export const HERO_PLATE_URL = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg';
export const HERO_VIDEO_URL = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/823d013d-bf03-4967-b08f-63c3752df435.mp4';
export const HERO_MEDIA_ORIGIN = new URL(HERO_PLATE_URL).origin;
export const heroPlate = { width: 1728, height: 1080 } as const;
export const heroVideo = { width: 1152, height: 720 } as const;

/**
 * Roles confirmed by the user on 21/10/2026. They belong to the opening only: `team.ts` keeps
 * names and portraits, and nothing else on the page attributes a role to a person.
 */
const roles = {
  fernando: 'Engenharia & Produto',
  eduardo: 'Arquitetura & Sistemas',
  victor: 'Design & Experiência',
} as const;

export const openingPeople = teamMembers.map(member => ({
  id: member.id,
  name: member.name,
  firstName: member.firstName,
  role: roles[member.id],
  portrait: member.portrait,
}));

const [fernando, eduardo] = siteContent.founders;
const corretor = siteContent.projects[0];
const conversation = 'Olá! Vim pelo site da Codice e quero conversar sobre meu site.';

export type OpeningContact = {
  readonly id: string;
  readonly kind: 'whatsapp' | 'github';
  readonly name: string;
  readonly href: string;
};

export const openingContent = {
  status: 'Sinop · MT',
  eyebrow: 'De Sinop. Perto da sua ideia.',
  headline: ['Pessoas.', 'Ideias.', 'Trabalho'],
  people: { label: 'Sócios' },
  system: { eyebrow: '01 / Sistema em produção', title: ['Corretor', '/ MT'], text: 'Por fora, apresenta. Por dentro, organiza.' },
  edition: { title: ['Sinop', '/ 26'], note: 'Arquitetura autoral' },
  project: {
    label: 'Projeto 01',
    link: 'Explorar projetos',
    href: '#trabalho',
    // The public-page capture, not the catalogue one: the portfolio loads that file on demand and its checks intercept it.
    image: { src: corretor.image.src, alt: corretor.image.alt, width: 1440, height: 900 },
  },
  story: {
    title: 'Tecnologia feita por gente',
    text: 'Somos Fernando, Eduardo e Victor. Criamos sites e sistemas para colocar seu negócio em evidência.',
    link: 'Conhecer a gente',
    href: '#a-gente',
  },
  cta: { label: 'Vamos conversar no WhatsApp', href: whatsappUrl(fernando.whatsappNumber, conversation) },
  contactLabel: 'Contato direto',
  contacts: [
    { id: 'whatsapp-fernando', kind: 'whatsapp', name: 'WhatsApp de Fernando Riad', href: whatsappUrl(fernando.whatsappNumber, conversation) },
    { id: 'whatsapp-eduardo', kind: 'whatsapp', name: 'WhatsApp de Eduardo Gobatto', href: whatsappUrl(eduardo.whatsappNumber, conversation) },
    { id: 'github-eduardo', kind: 'github', name: 'GitHub de Eduardo Gobatto', href: eduardo.githubHref },
  ] satisfies readonly OpeningContact[],
} as const;
