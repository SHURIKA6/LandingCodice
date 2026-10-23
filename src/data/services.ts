import type { TeamMember } from './team';

/**
 * Authorized content for the "O que a gente faz" chapter (#servico).
 *
 * Each entry binds one socio (from team.ts) to one service the house offers, with a
 * striking one-line phrase. The mapping and the phrases were approved by the owner on
 * 23/10/2026 and are recorded in docs/servicos-socios-2026-10-23/README.md.
 *
 * The media of each panel is a capture of one public repository chosen by the owner
 * on 23/10/2026 (see public/services/manifest.json). It replaces the portrait photo
 * in this chapter only; public/team/ and the team scene stay untouched.
 * Do not infer new services, roles or specialties beyond this list.
 */
export interface ServiceRepository {
  readonly owner: string;
  readonly repo: string;
  readonly url: string;
  readonly captureType: 'github-repo-page' | 'github-pages-site';
  readonly print: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
}

export interface ServicePanel {
  readonly id: string;
  readonly memberId: TeamMember['id'];
  readonly side: 'left' | 'right';
  readonly kicker: string;
  readonly phrase: string;
  readonly repository: ServiceRepository;
}

export const services = [
  {
    id: 'consultoria',
    memberId: 'fernando',
    side: 'left',
    kicker: 'Consultoria',
    phrase: 'Confusão se resolve conversando.',
    repository: {
      owner: 'SHURIKA6',
      repo: 'minimal-api-dio',
      url: 'https://github.com/SHURIKA6/minimal-api-dio',
      captureType: 'github-repo-page',
      print: {
        src: '/services/panel-consultoria--minimal-api-dio.png',
        alt: 'Repositório minimal-api-dio de SHURIKA6 no GitHub',
        width: 1600,
        height: 1000,
      },
    },
  },
  {
    id: 'software',
    memberId: 'eduardo',
    side: 'right',
    kicker: 'Software personalizado',
    phrase: 'Software do tamanho do seu processo. Nem um clique a mais.',
    repository: {
      owner: 'Edu4rdo-Gobatto',
      repo: 'Cattle-counter',
      url: 'https://github.com/Edu4rdo-Gobatto/Cattle-counter',
      captureType: 'github-repo-page',
      print: {
        src: '/services/panel-software--cattle-counter.png',
        alt: 'Repositório Cattle-counter de Edu4rdo-Gobatto no GitHub',
        width: 1600,
        height: 1000,
      },
    },
  },
  {
    id: 'site',
    memberId: 'victor',
    side: 'left',
    kicker: 'Site profissional',
    phrase: 'Seu trabalho é bom. O site só precisa mostrar isso.',
    repository: {
      owner: 'vict0r-rafael',
      repo: 'Projeto-e-commerce',
      url: 'https://github.com/vict0r-rafael/Projeto-e-commerce',
      captureType: 'github-repo-page',
      print: {
        src: '/services/panel-site--projeto-e-commerce.png',
        alt: 'Repositório Projeto-e-commerce de vict0r-rafael no GitHub',
        width: 1600,
        height: 1000,
      },
    },
  },
  {
    id: 'assistencia',
    memberId: 'jose-vitor',
    side: 'right',
    kicker: 'Assistência técnica',
    phrase: 'Máquina parada é negócio parado. A gente volta ela pro trabalho.',
    repository: {
      owner: 'JoseVitor-net',
      repo: 'NetPulse',
      url: 'https://github.com/JoseVitor-net/NetPulse',
      captureType: 'github-repo-page',
      print: {
        src: '/services/panel-assistencia--netpulse.png',
        alt: 'Repositório NetPulse de JoseVitor-net no GitHub',
        width: 1600,
        height: 1000,
      },
    },
  },
] as const satisfies readonly ServicePanel[];

export const servicesClosing = 'A gente junta o que o seu negócio precisa.' as const;
