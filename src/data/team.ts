export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
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
    portrait: {
      src: '/team/victor.png',
      alt: 'Retrato de Victor Rafael',
      width: 640,
      height: 641,
    },
  },
] as const satisfies readonly TeamMember[];
