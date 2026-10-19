import { siteContent, whatsappUrl } from './site';

/** One commercial source for the production landing and the preserved studies. */
export const siteOffer = {
  headline: 'Um site profissional para apresentar seus serviços e facilitar o contato com seus clientes.',
  price: 'R$ 1.500',
  payment: 'R$ 750 para iniciar, após acordo de escopo por escrito; R$ 750 após aprovação, antes da publicação',
  cta: 'Conversar sobre meu site',
  href: whatsappUrl(siteContent.founders[0].whatsappNumber, 'Olá! Quero conversar sobre o site de uma página da Codice, por R$ 1.500.'),
  inclusions: [
    'Uma página com até seis seções',
    'Adaptada ao celular e ao computador',
    'Textos organizados a partir de um briefing',
    'Fotos e informações reais fornecidas e aprovadas por você',
    'WhatsApp, localização e metadados básicos',
    'Uma rodada consolidada de alterações',
    'Configuração e publicação do site',
  ],
  conditions: [
    'Domínio e eventual hospedagem são pagos à parte, diretamente por você, em suas próprias contas.',
    'Escopo e condições registrados por escrito antes do início. Prazo combinado na proposta, conforme materiais e agenda.',
    'Correções de defeitos encontrados na entrega não consomem a rodada de alterações.',
    'Mudanças posteriores, novas páginas, lojas e sistemas têm orçamento separado.',
  ],
} as const;
