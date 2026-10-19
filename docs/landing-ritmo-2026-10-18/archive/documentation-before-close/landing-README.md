# Codice — landing final Ritmo

Data: 18/10/2026. Estado: direção Ritmo escolhida e implementação da landing final na raiz autorizada; verificação da nova página ainda a registrar.

Este é o briefing e o ledger vigentes da etapa final. O usuário selecionou Ritmo após o comparativo Forma, Fluxo e Ritmo e autorizou reconstruir `/`. A comparação anterior permanece preservada em [../study-2026-10-18/README.md](../study-2026-10-18/README.md), com seus próprios resultados. A autorização atual sucede o antigo limite de manter a raiz intacta.

## Objetivo e conteúdo

A landing vende **sites de uma página por R$ 1.500** a prestadores de serviços de Sinop/MT e região, com conversa comercial por WhatsApp. A oferta pública é exclusivamente de sites. Fernando Riad e Eduardo Gobatto aparecem como a dupla responsável, sem atribuição de funções individuais por inferência.

| Bloco | Conteúdo e finalidade |
| --- | --- |
| Hero | Marca Codice, proposta de site, preço de R$ 1.500 e ação clara de contato, usando o sistema gráfico e tipográfico de Ritmo. |
| Projeto imobiliário real | Corretor como trabalho efetivamente desenvolvido; interface real e funcionalidades verificáveis, sem alegações de aumento de vendas, receita ou conversão. |
| Pacote | Entregas, revisão, preço, dois pagamentos, responsabilidade por domínio/hospedagem, prazo na proposta e limites de escopo. |
| Dupla e contato | Fernando Riad e Eduardo Gobatto com contato direto pelos dois WhatsApps. |

Esses são os quatro blocos da landing da própria Codice. O produto comercial oferecido a cada cliente admite até seis seções, conforme acordo de escopo.

## Condições comerciais

| Condição | Definição aprovada |
| --- | --- |
| Produto e preço | Site de uma página, com até seis seções, por R$ 1.500. |
| Layout e conteúdo | Responsivo; textos organizados a partir do briefing; fatos e fotos reais fornecidos e aprovados pelo cliente. |
| Recursos | WhatsApp, localização e metadados básicos. |
| Revisão | Uma rodada consolidada. Correções de defeitos da entrega não consomem essa rodada. |
| Configuração e publicação | Incluídas no pacote. |
| Domínio e hospedagem | Contratados e pagos diretamente pelo cliente, em contas de sua titularidade. |
| Início | R$ 750 para começar, após acordo de escopo por escrito. |
| Aprovação | R$ 750 após aprovação, antes da publicação. |
| Prazo | Definido na proposta, conforme materiais e disponibilidade da dupla. |
| Extras | Alterações posteriores, novas páginas e demais escopos adicionais recebem orçamento separado. Sem promessa de manutenção mensal. |

Contatos preservados: **Fernando `5566999356646`** e **Eduardo `556684184488`**. O número de Eduardo deve permanecer literal, sem acréscimo de dígito por inferência. Domínio final da Codice não é inventado nesta etapa.

**Contexto interno:** ambos estudam Sistemas de Informação e trabalham em regime CLT; a capacidade conjunta de 12 horas semanais orienta a proposta e não deve aparecer na landing nem virar promessa de prazo.

## Sistema visual

Ritmo usa base escura `#151419`, lilás `#B69AFF` e texto `#F5F1EB`, com Archivo Black nos títulos e Manrope no corpo. As famílias locais e suas licenças estão documentadas em [fonts.md do comparativo](../study-2026-10-18/fonts.md). A composição e o movimento devem sustentar a oferta e a leitura do trabalho real.

Rolagem, tipografia e elementos gráficos seguem a direção selecionada. Replay e pausa fora da tela podem compor a interação; a alternativa com movimento reduzido precisa conservar o conteúdo e a ação de contato. Foco visível, teclado, toque, legibilidade e adaptação ao celular fazem parte dos critérios da página final.

A identidade antiga de livro permanece no acervo histórico. Roger mantém sua classificação demonstrativa nos registros anteriores e não integra os quatro blocos de produção desta etapa. Nenhum depoimento, retrato, resultado comercial ou conteúdo factual de clientes deve ser inventado.

## Organização técnica autorizada

Astro 7.4 e Tailwind CSS 4 permanecem no projeto.

| Arquivo ou área | Responsabilidade |
| --- | --- |
| `src/data/offer.ts` | Termos e conteúdo da oferta de sites. |
| `src/pages/index.astro` | Landing final na rota `/`, com os quatro blocos. |
| `src/layouts/Page.astro` | Documento e estrutura de produção. |
| `src/styles/global.css` | Sistema visual, responsividade e acessibilidade da produção. |
| `src/scripts/landing.ts` | Comportamento e interações da landing final. |
| `src/data/site.ts` | Fonte preservada de portfólio e contatos. |
| `/estudo/` e suas prévias | Acervo funcional intacto, com `noindex` e fora do sitemap. |

O arquivo de produto, o sistema visual e o README principal recebem um bloco vigente sem apagar os registros anteriores. A preservação e eventual arquivamento dos materiais da página antiga são responsabilidade da implementação; esta atualização documental não declara esse arquivamento concluído.

## Verificação e evidências

O responsável pela implementação consolidará os resultados em [verification.md](verification.md). Build, QA, capturas e registro em vídeo da landing final não estão declarados concluídos neste briefing. Os resultados do comparativo de `/estudo/ritmo/` não validam automaticamente a nova raiz, pois a página e seu escopo mudaram.

A verificação deve registrar a página realmente implementada em desktop e celular; teclado e toque; âncoras e links de contato; ausência de overflow, cortes e imagens quebradas; contraste e seus limites de análise; movimento reduzido e uso sem JavaScript. Também deve conferir a oferta e os dois pagamentos no HTML, os metadados de produção e a permanência das rotas de estudo fora da indexação e do sitemap. Qualquer vídeo deve mostrar a interação da página final renderizada e ser listado como evidência somente após sua produção.

Um build bem-sucedido não equivale a typecheck completo nem a aprovação visual. Domínio final e deploy exigem registro próprio; nenhum deles está declarado concluído nesta etapa documental.

## Ledger da etapa

| Item | Estado | Evidência ou próximo registro |
| --- | --- | --- |
| Escolha visual | Aprovada | Ritmo selecionada pelo usuário após o comparativo. |
| Implementação da raiz | Autorizada | Quatro blocos e organização técnica descritos acima. |
| Oferta e condições | Registradas | R$ 1.500; R$ 750 após escopo escrito e R$ 750 após aprovação, antes da publicação. |
| Documentação vigente | Atualizada | `PRODUCT.md`, `DESIGN.md`, `README.md` e este briefing, com histórico preservado. |
| Código da landing final | A registrar | Responsável pela implementação registra os arquivos efetivamente concluídos. |
| Preservação do acervo e estudos | A conferir | Registrar o estado final dos materiais antigos e das rotas `/estudo/`. |
| Build da nova raiz | Pendente de registro | Resultado em `verification.md`. |
| QA de navegador e acessibilidade | Pendente de registro | Escopo, resultados e limites em `verification.md`. |
| Capturas da página final | Pendente de registro | Arquivos e viewports em `verification.md`. |
| Vídeo da interação final | Pendente de registro | Arquivo e conteúdo demonstrado em `verification.md`, após produção. |
| Domínio final | Não informado neste registro | Configurar somente com o dado real e registrar a decisão. |
| Publicação | Não registrada | Esta documentação não declara deploy. |

## Histórico relacionado

- [Comparativo Forma, Fluxo e Ritmo](../study-2026-10-18/README.md)
- [Verificação do comparativo](../study-2026-10-18/verification.md)
- [Direção anterior de livro e seu acervo](../visual-study/README.md)
- [Capturas reais e suas fontes](../visual-study/references/sources.md)

As aprovações e verificações desses registros continuam vinculadas às suas etapas de origem. A escolha de Ritmo autoriza a implementação final descrita aqui; a comprovação técnica da nova raiz vem do relatório próprio.
