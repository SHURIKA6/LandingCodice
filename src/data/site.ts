export interface Founder {
  readonly id: 'fernando' | 'eduardo' | 'victor' | 'jose-vitor';
  readonly name: string;
  readonly githubHref?: string;
  readonly whatsappNumber: string;
  readonly phoneLabel: string;
  readonly whatsappHref: string;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
  readonly href: string;
  readonly repositoryHref: string;
}

export interface SiteContent {
  readonly founders: readonly Founder[];
  readonly projects: readonly Project[];
}

const projectMessage = 'Olá! Quero conversar sobre um projeto com a Codice.';

export function whatsappUrl(phone: string, message = projectMessage): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const founders: readonly Founder[] = [
  {
    id: 'fernando',
    name: 'Fernando Riad',
    githubHref: 'https://github.com/SHURIKA6',
    whatsappNumber: '5566999356646',
    phoneLabel: '+55 (66) 99935-6646',
    whatsappHref: whatsappUrl('5566999356646'),
  },
  {
    id: 'eduardo',
    name: 'Eduardo Gobatto',
    githubHref: 'https://github.com/Edu4rdo-Gobatto',
    whatsappNumber: '556684184488',
    phoneLabel: '+55 (66) 8418-4488',
    whatsappHref: whatsappUrl('556684184488'),
  },
  {
    id: 'victor',
    name: 'Victor Rafael',
    githubHref: 'https://github.com/vict0r-rafael',
    whatsappNumber: '556699598519',
    phoneLabel: '+55 (66) 9959-8519',
    whatsappHref: whatsappUrl('556699598519'),
  },
  {
    id: 'jose-vitor',
    name: 'Jose Vitor',
    githubHref: 'https://github.com/JoseVitor-net',
    whatsappNumber: '556681063600',
    phoneLabel: '+55 (66) 8106-3600',
    whatsappHref: whatsappUrl('556681063600'),
  },
];

// Superseded landing content is preserved in docs/code-cleanup-2026-10-22/archive/.
export const siteContent = {
  founders,
  projects: [
    {
      id: 'corretor',
      title: 'Corretor',
      category: 'Site e sistema imobiliário',
      description:
        'Um catálogo de imóveis com filtros de busca e uma área de gestão para organizar o trabalho imobiliário.',
      features: ['Catálogo de imóveis', 'Filtros de busca', 'Área de gestão'],
      image: {
        src: '/media/corretor-poster.webp',
        alt: 'Página pública do Corretor, com catálogo de imóveis e filtros de busca.',
      },
      href: 'https://corretor-web-eta.vercel.app/',
      repositoryHref: 'https://github.com/Edu4rdo-Gobatto/Corretor-web',
    },
    {
      id: 'roger',
      title: 'Roger Estética Automotiva',
      category: 'Presença digital para um negócio local',
      description:
        'Serviços, informações de atendimento e contato reunidos em uma presença própria para o negócio.',
      features: ['Serviços e galeria', 'Contato e localização'],
      image: {
        src: '/media/roger-shot.png',
        alt: 'Página de serviços do site Roger Estética Automotiva.',
      },
      href: 'https://roger-estetica-automotiva.vercel.app/',
      repositoryHref: 'https://github.com/SHURIKA6/roger-estetica-automotiva',
    },
  ],
} as const satisfies SiteContent;
