export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

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
  readonly linkLabel: string;
  readonly repositoryHref: string;
}

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
}

export interface SiteContent {
  readonly brand: string;
  readonly headline: string;
  readonly headlineLines: readonly { readonly text: string; readonly emphasis?: string }[];
  readonly introLines: readonly string[];
  readonly intro: string;
  readonly description: string;
  readonly primaryContactLabel: string;
  readonly primaryContactHref: string;
  readonly navigation: readonly NavigationItem[];
  readonly founders: readonly Founder[];
  readonly projects: readonly Project[];
  readonly services: readonly Service[];
  readonly support: {
    readonly title: string;
    readonly description: string;
    readonly area: string;
    readonly contactLabel: string;
    readonly href: string;
  };
  readonly about: {
    readonly title: string;
    readonly description: string;
  };
  readonly contact: {
    readonly title: string;
    readonly description: string;
  };
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

const primaryContact = founders[0];

export const siteContent = {
  brand: 'Codice',
  headline: 'Sites e sistemas sob medida para o seu negócio.',
  headlineLines: [
    { text: 'Sites e sistemas' },
    { text: 'sob medida para' },
    { text: 'o ', emphasis: 'seu negócio.' },
  ],
  introLines: ['Fernando Riad, Eduardo Gobatto, Victor Rafael e Jose Vitor.', 'De Sinop para projetos em todo o Brasil.'],
  intro: 'Fernando Riad, Eduardo Gobatto, Victor Rafael e Jose Vitor. De Sinop para projetos em todo o Brasil.',
  description:
    'Sites e sistemas sob medida para pequenos e médios negócios. Fale diretamente com Fernando Riad, Eduardo Gobatto, Victor Rafael e Jose Vitor, da Codice, em Sinop/MT.',
  primaryContactLabel: 'Conversar sobre meu projeto',
  primaryContactHref: primaryContact.whatsappHref,
  navigation: [
    { label: 'Trabalhos', href: '#trabalhos' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'O time', href: '#a-gente' },
    { label: 'Contato', href: '#contato' },
  ],
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
      href: 'https://corretor-web-test.vercel.app/',
      linkLabel: 'Ver demonstração',
      repositoryHref: 'https://github.com/Edu4rdo-Gobatto/Corretor-web',
    },
    {
      id: 'roger',
      title: 'Roger Estética Automotiva',
      category: 'Presença digital para um negócio local',
      description:
        'Um site para apresentar os serviços de estética automotiva, reunir informações de atendimento e facilitar o contato com o negócio.',
      features: ['Serviços e galeria', 'Contato', 'Localização'],
      image: {
        src: '/media/roger-shot.png',
        alt: 'Página de serviços do site Roger Estética Automotiva.',
      },
      href: 'https://roger-estetica-automotiva.vercel.app/',
      linkLabel: 'Visitar o site',
      repositoryHref: 'https://github.com/SHURIKA6/roger-estetica-automotiva',
    },
  ],
  services: [
    {
      id: 'sites',
      title: 'Sites para apresentar seu negócio',
      description:
        'Uma presença digital pensada para explicar o que sua empresa faz, apresentar seus serviços e abrir caminho para o contato.',
      features: ['Páginas institucionais', 'Catálogos e portfólios', 'Experiência no celular'],
    },
    {
      id: 'sistemas',
      title: 'Sistemas para o seu dia a dia',
      description:
        'Ferramentas construídas a partir da rotina do seu negócio, com as informações e os fluxos que sua equipe precisa organizar.',
      features: ['Áreas de gestão', 'Cadastros e consultas', 'Fluxos sob medida'],
    },
  ],
  support: {
    title: 'Seu computador também faz parte do trabalho.',
    description:
      'Além do desenvolvimento, oferecemos manutenção e suporte para computadores de pessoas e empresas de Sinop e região.',
    area: 'Atendimento local · Sinop/MT e região',
    contactLabel: 'Conversar sobre suporte',
    href: whatsappUrl(
      primaryContact.whatsappNumber,
      'Olá! Quero conversar sobre manutenção ou suporte para computadores com a Codice.',
    ),
  },
  about: {
    title: 'Você conversa com quem desenvolve.',
    description:
      'Somos Fernando Riad, Eduardo Gobatto, Victor Rafael e Jose Vitor. Criamos a Codice em Sinop para desenvolver sites e sistemas com contato direto, do entendimento da ideia à construção do projeto.',
  },
  contact: {
    title: 'Vamos abrir o próximo capítulo?',
    description:
      'Conte o que seu negócio precisa. A conversa começa com a sua ideia e com o que podemos construir juntos.',
  },
} as const satisfies SiteContent;
