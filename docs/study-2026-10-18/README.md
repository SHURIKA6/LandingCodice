# Codice — estudo Forma, Fluxo e Ritmo

Data do briefing e da execução: 18/10/2026. Estado: painel, três prévias, capturas e verificação em navegador concluídos; escolha visual pendente.

Este é o briefing vigente e o ledger da etapa atual. Ele substitui as direções e os termos comerciais conflitantes de `docs/visual-study/`, mantidos como acervo histórico. A implementação foi autorizada e executada; a aprovação da execução não seleciona uma direção. A escolha entre Forma, Fluxo e Ritmo permanece com o usuário.

## Objetivo e público

Apresentar uma marca forte, uma oferta compreensível e interações que ajudem o visitante a entender o trabalho da Codice. O foco inicial são prestadores de serviços de Sinop/MT e região, com aquisição por prospecção direta e conversa comercial por WhatsApp.

A Codice é de Fernando Riad e Eduardo Gobatto. Ambos são estudantes de Sistemas de Informação e trabalham em regime CLT. A dupla reúne um desenvolvedor júnior e um especialista em LLMs; essas funções não foram associadas individualmente aos nomes.

**Uso interno, fora do conteúdo público:** a disponibilidade conjunta é de 12 horas semanais. Prazos e volume de trabalho precisam respeitar esse limite em cada proposta. O número não deve aparecer como argumento comercial nem promessa de atendimento.

## Oferta comum às três direções

| Condição | Definição aprovada |
| --- | --- |
| Produto e preço | Site de uma página, com até seis seções, por R$ 1.500. |
| Conteúdo e layout | Responsivo; textos organizados a partir do briefing; fatos e fotos reais fornecidos e aprovados pelo cliente. |
| Recursos | WhatsApp, localização e metadados básicos. |
| Revisão | Uma rodada consolidada. Correções de defeitos da entrega não contam como revisão. |
| Configuração e publicação | Incluídas. Domínio e hospedagem são pagos diretamente pelo cliente em contas de sua titularidade. |
| Primeiro pagamento | R$ 750 para começar, após acordo de escopo por escrito. |
| Segundo pagamento | R$ 750 após aprovação, antes de publicar. |
| Prazo | Definido na proposta conforme materiais e disponibilidade; sem prazo fixo público nesta etapa. |
| Fora do pacote | Alterações posteriores, páginas extras, comércio eletrônico e sistemas são orçados separadamente. Não prometer manutenção mensal. |

Os contatos já fornecidos são Fernando `5566999356646` e Eduardo `556684184488`. Preservar o número de Eduardo exatamente como informado. Não inventar domínio final, retratos, depoimentos, métricas ou funções individuais.

## Escopo visual e funcional

A identidade de livro antigo foi abandonada. O estudo implementado apresenta três alternativas com composição, tipografia, paleta e interação próprias. O núcleo da comparação é o hero e o início da próxima seção. Blocos adicionais de portfólio, pacote e dupla foram incluídos para permitir a revisão completa da oferta e o uso dos destinos de âncora; as prévias continuam sendo um estudo, sem reconstrução da landing inteira de produção.

| Direção | Rota | Interação implementada e verificada |
| --- | --- | --- |
| Forma | `/estudo/forma/` | Composição espacial em CSS 3D, com alternância entre abrir e fechar, verificada por teclado e toque; sem dependência de WebGL. |
| Fluxo | `/estudo/fluxo/` | Demonstração de um site de prestador de serviços. Três botões alternam serviços, fotos e contato, com estados verificados por teclado e toque. |
| Ritmo | `/estudo/ritmo/` | Tipografia e gráfico cinéticos relacionados à rolagem, com replay e pausa fora da tela; movimento reduzido verificado. |

O painel `/estudo/` reúne uma imagem real de desktop e uma de celular de cada direção, descreve a interação e permite abrir a respectiva prévia funcional. O estudo foi implementado em código e depois capturado no navegador; as imagens não foram geradas como páginas inteiras. Imagem e interação foram revisadas separadamente.

| Direção | Cores | Famílias utilizadas |
| --- | --- | --- |
| Forma | `#DCE4EE`, `#2348F5`, `#15273E`. | Manrope. |
| Fluxo | `#F3F0E7`, `#E64220`, `#24251F`; texto pequeno sobre vermelho em `#11120D`. | Bricolage Grotesque nos títulos e Manrope no corpo. |
| Ritmo | `#151419`, `#B69AFF`, `#F5F1EB`. | Archivo Black nos títulos e Manrope no corpo. |

Manrope, Bricolage Grotesque e Archivo Black são locais; binários, caracteres portugueses e licenças OFL foram conferidos. Arquivos, pesos e origem estão em [fonts.md](fonts.md). Materiais e fontes anteriores permanecem no acervo histórico.

## Capturas da comparação

As seis capturas finais das prévias foram produzidas em 18/10/2026. Desktop usa viewport de **1440 × 1100 px**; celular usa **390 × 1400 px**. Os PNGs são evidência de renderização; as seis versões WebP em `public/study/previews/` são os derivados usados no painel.

| Direção | Desktop | Celular |
| --- | --- | --- |
| Forma | [forma-desktop.png](review/final/forma-desktop.png) | [forma-mobile.png](review/final/forma-mobile.png) |
| Fluxo | [fluxo-desktop.png](review/final/fluxo-desktop.png) | [fluxo-mobile.png](review/final/fluxo-mobile.png) |
| Ritmo | [ritmo-desktop.png](review/final/ritmo-desktop.png) | [ritmo-mobile.png](review/final/ritmo-mobile.png) |

## Limites técnicos e editoriais

- Manter Astro 7.4 e Tailwind CSS 4; não trocar o stack para executar o estudo.
- Isolar layouts, dados e estilos das prévias. Preservar `src/pages/index.astro`, `src/layouts/Page.astro` e `src/styles/global.css`; a rota `/` permanece temporariamente como está.
- Uma correção estritamente factual da categoria de Roger no conteúdo legado é compatível com a preservação visual.
- Todas as rotas de estudo devem usar `noindex` e ficar fora do sitemap.
- Não reconstruir a página de produção nem publicar o estudo nesta etapa.
- Preservar capturas, prompts, sidecars, licenças e registros anteriores. Não criar repositório Git ou worktree nesta pasta.
- Corretor pode ser mostrado como trabalho efetivamente desenvolvido, sem resultados comerciais inventados.
- Roger deve ser identificado como **projeto demonstrativo de portfólio**: houve desenvolvimento, o prospect desistiu e não houve contrato. Não usar “cliente”, “case de sucesso” ou alegações de resultado; fotografias já declaradas ilustrativas mantêm essa classificação.

## Verificação executada e limites

A matriz de [browser-verification.json](browser-verification.json) cobre as três prévias em 320, 390, 768 e 1440 px: **12 casos**, sem overflow horizontal, imagens quebradas, âncoras ausentes ou erros de página. A interação de Forma abre e fecha; Fluxo alterna os três estados; Ritmo responde à rolagem, permite replay e pausa quando sai da tela. Houve verificação por teclado das três direções e por toque em Forma e Fluxo. As três prévias também passaram por uso sem JavaScript e por movimento reduzido.

O painel foi conferido em quatro larguras e nos dois formatos de imagem: **oito casos**, sem overflow e com as três capturas correspondentes visíveis e válidas. O aviso inicial sobre `aria-label` em `div` foi corrigido com `role="img"`; a execução final de axe no painel terminou com zero violações e sem verificações incompletas. Evidência em [panel-verification.json](panel-verification.json).

Axe **4.14** registrou zero violações nas três prévias. A análise automática de contraste ficou incompleta em Forma e Ritmo; pares de cores foram conferidos manualmente, incluindo a tinta sobre vermelho de Fluxo. A revisão não equivale a auditoria integral por leitores de tela nem à escolha visual do usuário. [detector.json](detector.json) registrou `[]` em uma execução.

`npm run build` passou. Um build adicional com `SITE_URL` temporária em `https://codice-verification.invalid` confirmou a presença de `/` no sitemap e a ausência de todas as rotas `/estudo/`. Os quatro HTMLs de estudo construídos contêm `noindex,nofollow`. A variável foi restaurada e o build normal passou novamente; esse endereço reservado foi usado somente para verificação, sem configuração de domínio público.

A [baseline.json](baseline.json) contém hashes de quatro fontes legadas: todos foram conferidos iguais ao início. Os descritores passaram para baixo dos títulos, preservando o contexto dos projetos. Os termos explícitos de R$ 750 após acordo escrito de escopo e R$ 750 após aprovação, antes da publicação, foram incorporados ao conteúdo do estudo e confirmados na verificação final.

Um build bem-sucedido não equivale a typecheck completo. Não foi adicionado framework de testes; build e QA em navegador verificaram os comportamentos e as adaptações desta etapa. Resultados de QA de 17/10 continuam restritos à landing antiga.

## Decisões de execução

- A ausência de `.git` foi confirmada e a pasta atual foi usada. Não houve `git init`, criação de worktree nem commit.
- As alternativas foram construídas como prévias funcionais e depois capturadas, preservando imagens reais da renderização para comparação.
- Forma usa composição espacial por CSS, sem dependência de WebGL; o conteúdo permanece disponível com movimento reduzido e sem JavaScript.
- Astro 7.4 e Tailwind CSS 4 foram mantidos, com layout e estilos isolados da landing anterior.
- A reconstrução da landing completa depende da escolha visual. Não houve domínio final configurado nem publicação nesta etapa.

## Ledger de execução

O registro abaixo distingue execução comprovada de escolha do usuário. A versão inicial deste ledger registrava as verificações como pendentes; as linhas foram atualizadas após os resultados da execução de 18/10.

| Item | Estado | Evidência ou registro |
| --- | --- | --- |
| Plano e oferta | Aprovados | Briefing de 18/10 registrado acima. |
| Documentação vigente e avisos históricos | Registrados | `PRODUCT.md`, `DESIGN.md`, `README.md`, contratos e provenance do acervo anterior. |
| Painel e três prévias | Implementados | `/estudo/`, `/estudo/forma/`, `/estudo/fluxo/` e `/estudo/ritmo/`; hero, seção seguinte e blocos de apoio para revisar oferta e âncoras. |
| Fontes locais e licenças | Conferidas | Três famílias com binários, português e OFL conferidos; [fonts.md](fonts.md). |
| Capturas reais de desktop | Concluídas | Três PNGs em `review/final/`, 1440 × 1100 px, de 18/10/2026; derivados WebP no painel. |
| Capturas reais de celular | Concluídas | Três PNGs em `review/final/`, 390 × 1400 px, de 18/10/2026; derivados WebP no painel. |
| Build do estudo | Passou | Build normal, build com domínio reservado para sitemap e novo build normal após restauração de `SITE_URL`. |
| Interações, teclado e toque | Verificados | Forma abre/fecha; Fluxo alterna três estados; Ritmo responde a scroll/replay e pausa fora da tela; toque em Forma e Fluxo. |
| Responsividade e imagens das prévias | Passou | 12 casos em 320, 390, 768 e 1440 px; sem overflow, imagens quebradas, âncoras ausentes ou erros de página. |
| Responsividade e imagens do painel | Passou | Oito casos: quatro larguras × dois formatos; três capturas correspondentes visíveis e válidas. |
| Sem JavaScript e movimento reduzido | Passou | As três prévias foram conferidas em cada condição. |
| Acessibilidade automatizada das prévias | Zero violações | Axe 4.14; contraste automático incompleto em Forma e Ritmo, com pares de cores conferidos manualmente. |
| Semântica do painel | Verificada | Ajuste de `role="img"`; repetição final de axe com zero violações e sem verificações incompletas. |
| Detector | Executado | [detector.json](detector.json): `[]` em uma execução. |
| `noindex` e sitemap | Confirmados | Quatro HTMLs com `noindex,nofollow`; sitemap com `/` e sem `/estudo/`, em build de verificação com domínio reservado. |
| Preservação da rota `/` | Confirmada | Quatro fontes legadas com SHA-256 idêntico ao início, conforme [baseline.json](baseline.json). |
| Revisão final | Ship para o estudo comparativo | Revisor independente conferiu as correções e encerrou os achados iniciais; [review.md](review.md). |
| Escolha visual do usuário | Pendente | A aprovação da execução não seleciona Forma, Fluxo ou Ritmo. |
| Reconstrução da landing completa | Fora desta etapa | Depende da escolha visual posterior. |
| Publicação | Fora desta etapa | Nenhum deploy faz parte desta entrega. |

Relatórios consolidados: [verification.md](verification.md), [images-manifest.json](images-manifest.json), [panel-verification.json](panel-verification.json) e [review.md](review.md). O painel foi aberto no navegador integrado e marcado como entrega, com o servidor em background.

## Acervo preservado

- [Comparação e imagens de 17/10](../visual-study/README.md)
- [Briefing anterior](../visual-study/brief.md)
- [Contrato anterior](../visual-study/surface-contract.md)
- [Capturas reais e suas fontes](../visual-study/references/sources.md)
- [Fontes do sistema anterior](../visual-study/fonts.md)
- [Verificação da implementação anterior](../visual-study/implementation-verification.md)

As imagens e aprovações desse acervo documentam a etapa anterior. Elas não devem ser reaproveitadas como capturas, seleção ou prova de funcionamento de Forma, Fluxo e Ritmo.
