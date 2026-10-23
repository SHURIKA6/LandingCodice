import { siteContent } from './site';

export const landing = {
  title: 'Codice — Sites profissionais em Sinop',
  description: 'Um site profissional para apresentar seus serviços e facilitar o contato com seus clientes. Conheça Fernando, Eduardo, Victor e Jose Vitor, da Codice, em Sinop/MT.',
  headline: 'Seu trabalho merece uma presença profissional.',
  founders: siteContent.founders,
  project: siteContent.projects.find(project => project.id === 'corretor')!,
  // The public demo was unavailable. Ship a genuine capture; see the media log.
  media: { poster: '/media/corretor-poster.webp' },
  process: [
    { title: 'Conversa e escopo', text: 'Entendemos seu negócio e registramos a proposta, o prazo e o que será entregue.' },
    { title: 'Entrada e materiais', text: 'Com o acordo feito e a entrada paga, você envia as informações e fotos reais do negócio.' },
    { title: 'Criação e revisão', text: 'Organizamos os textos e montamos o site. Você reúne seus ajustes em uma rodada de alterações.' },
    { title: 'Aprovação e publicação', text: 'Você aprova, paga o saldo e publicamos o site nas suas contas de domínio e hospedagem.' },
  ],
} as const;
