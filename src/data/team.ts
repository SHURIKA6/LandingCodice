export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly signature: string;
  readonly portrait: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
}

export const teamMembers = [
  {
    id: 'fernando',
    name: 'Fernando Riad',
    firstName: 'Fernando',
    lastName: 'Riad',
    signature: 'Arquitetura e Design',
    portrait: {
      src: '/team/fernando.jpg',
      alt: 'Retrato de Fernando Riad',
      width: 460,
      height: 460,
    },
  },
  {
    id: 'eduardo',
    name: 'Eduardo Gobatto',
    firstName: 'Eduardo',
    lastName: 'Gobatto',
    signature: 'Engenharia e Produto',
    portrait: {
      src: '/team/eduardo.jpg',
      alt: 'Retrato de Eduardo Gobatto',
      width: 460,
      height: 460,
    },
  },
  {
    id: 'victor',
    name: 'Victor Rafael',
    firstName: 'Victor',
    lastName: 'Rafael',
    signature: 'Experiencia e Sistemas',
    portrait: {
      src: '/team/victor.png',
      alt: 'Retrato de Victor Rafael',
      width: 640,
      height: 641,
    },
  },
  {
    id: 'jose-vitor',
    name: 'Jose Vitor',
    firstName: 'Jose',
    lastName: 'Vitor',
    signature: 'Infra e Redes',
    portrait: {
      src: '/team/jose-vitor.jpg',
      alt: 'Retrato de Jose Vitor',
      width: 1122,
      height: 1402,
    },
  },
] as const satisfies readonly TeamMember[];
