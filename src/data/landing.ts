import { siteContent, whatsappUrl } from './site';

/** Neutral first message for every general WhatsApp entry point: header, opening, #contato and /contact. */
const contactMessage = 'Olá! Vim pelo site da Codice e quero conversar sobre um projeto.';

export const landing = {
  title: 'Codice Web Design — Sites, sistemas e soluções digitais em Sinop, MT',
  description: 'Codice é um estúdio de web design e tecnologia em Sinop, MT: sites e sistemas sob medida, consultoria e assistência técnica para negócios da região.',
  founders: siteContent.founders,
  project: siteContent.projects.find(project => project.id === 'corretor')!,
  contactMessage,
  /** The general conversation starts with Fernando; the package button keeps `siteOffer.href`. */
  contactHref: whatsappUrl(siteContent.founders[0].whatsappNumber, contactMessage),
  /** One list, in page order, feeds the header links and the mobile menu. */
  navigation: [
    { href: '#a-gente', label: 'A gente' },
    { href: '#servico', label: 'Soluções' },
    { href: '#trabalho', label: 'Os projetos' },
    { href: '#pacote', label: 'Seu site' },
  ],
  /** The mobile menu also reaches the closing chapter. */
  menuContact: { href: '#contato', label: 'Contato' },
  menuNote: 'Sites e sistemas sob medida em Sinop, MT.',
  process: [
    { title: 'Conversa e escopo', text: 'Entendemos seu negócio e registramos a proposta, o prazo e o que será entregue.' },
    { title: 'Entrada e materiais', text: 'Com o acordo feito e a entrada paga, você envia as informações e fotos reais do negócio.' },
    { title: 'Criação e revisão', text: 'Organizamos os textos e montamos o site. Você reúne seus ajustes em uma rodada de alterações.' },
    { title: 'Aprovação e publicação', text: 'Você aprova, paga o saldo e publicamos o site nas suas contas de domínio e hospedagem.' },
  ],
} as const;
