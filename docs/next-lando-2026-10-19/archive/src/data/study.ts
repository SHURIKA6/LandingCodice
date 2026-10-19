import { siteContent } from './site';
export { siteOffer as studyOffer } from './offer';

export type DirectionId = 'forma' | 'fluxo' | 'ritmo';

export const directions = [
  { id: 'forma', name: 'Forma', thesis: 'Ideias que ganham dimensão.', description: 'Uma composição espacial se abre e revela como apresentação, serviços e contato formam uma presença digital.', interaction: 'Desdobre a composição e explore a profundidade.', palette: ['#dce4ee', '#2348f5', '#15273e'], character: 'Espacial · precisa · luminosa', risk: 'A peça espacial precisa continuar leve e legível no celular.' },
  { id: 'fluxo', name: 'Fluxo', thesis: 'Seu trabalho, bem apresentado.', description: 'Uma direção gráfica direta, com contraste e uma demonstração que coloca cada parte do negócio em evidência.', interaction: 'Escolha serviços, trabalhos ou contato e veja a composição mudar.', palette: ['#f3f0e7', '#e64220', '#24251f'], character: 'Gráfica · próxima · expressiva', risk: 'O impacto gráfico precisa conviver com a leitura das informações.' },
  { id: 'ritmo', name: 'Ritmo', thesis: 'Uma presença que fica.', description: 'Tipografia em grande escala e uma marca cinética que muda com a rolagem, criando passagem para o trabalho real.', interaction: 'Role a página e acompanhe a transformação da composição.', palette: ['#151419', '#b69aff', '#f5f1eb'], character: 'Cinética · contrastante · marcante', risk: 'O movimento precisa enriquecer a visita sem comandar a navegação.' },
] as const;

export const studyProjects = siteContent.projects.map((project) => ({
  ...project,
  category: project.id === 'roger' ? 'Projeto demonstrativo de portfólio' : 'Projeto realizado · site e sistema imobiliário',
  context: project.id === 'roger'
    ? 'Site desenvolvido para uma proposta que não foi contratada. Apresentado como demonstração do trabalho, sem resultados comerciais atribuídos.'
    : 'Trabalho realizado pela dupla: catálogo de imóveis, filtros de busca e área de gestão. O link abre o ambiente de demonstração.',
}));

export const studyFounders = siteContent.founders;
