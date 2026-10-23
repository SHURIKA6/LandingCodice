import { siteContent } from './site';

export const landing = {
  title: 'Codice Web Design — Estúdio de sites profissionais em Sinop, MT',
  description: 'Codice é um estúdio de web design em Sinop, Mato Grosso. Criamos sites profissionais de uma página que apresentam seus serviços e facilitam o contato com seus clientes. Conheça Fernando, Eduardo, Victor e Jose Vitor, da Codice.',
  founders: siteContent.founders,
  project: siteContent.projects.find(project => project.id === 'corretor')!,
  process: [
    { title: 'Conversa e escopo', text: 'Entendemos seu negócio e registramos a proposta, o prazo e o que será entregue.' },
    { title: 'Entrada e materiais', text: 'Com o acordo feito e a entrada paga, você envia as informações e fotos reais do negócio.' },
    { title: 'Criação e revisão', text: 'Organizamos os textos e montamos o site. Você reúne seus ajustes em uma rodada de alterações.' },
    { title: 'Aprovação e publicação', text: 'Você aprova, paga o saldo e publicamos o site nas suas contas de domínio e hospedagem.' },
  ],
} as const;
