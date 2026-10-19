---
name: Codice — Ritmo
description: Tipografia em grande escala para uma oferta de sites clara e direta.
colors:
  ground: "#151419"
  ink: "#f5f1eb"
  accent: "#b69aff"
  quiet: "#c2bacd"
  line: "#4c4556"
  primary-hover: "#d0bdff"
  dark-hover: "#352b45"
  browser-surface: "#24202c"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(46px, 4.8vw, 72px)"
    fontWeight: 400
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(38px, 4vw, 60px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 800
    lineHeight: 1.4
rounded:
  action: "0px"
  browser: "12px"
spacing:
  step-24: "24px"
  step-40: "40px"
  step-64: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ground}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.ground}"
  button-dark:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "14px 22px"
  button-dark-hover:
    backgroundColor: "{colors.dark-hover}"
    textColor: "{colors.ink}"
---

# Design System: Codice — Ritmo

## Overview

**Creative North Star: "Ritmo"**

Tipografia em grande escala marca a presença da Codice, enquanto preço, escopo e contato permanecem diretos. A alternância entre fundo escuro e campos lilás conduz a leitura sem depender de efeitos de entrada.

**Key Characteristics:**

- Marca tipográfica, com uma única assinatura de movimento.
- Campos de cor inteiros e hierarquia de leitura clara.
- Trabalho real apresentado por capturas com origem documentada.
- Controles e conteúdo completos antes do JavaScript.

Estado vigente em 19/10/2026: implementação local concluída e revisão independente **ship**. [Contrato](docs/landing-ritmo-2026-10-18/direction.md), [verificação e limites](docs/landing-ritmo-2026-10-18/verification.md) e [revisão](docs/landing-ritmo-2026-10-18/review.md). A identidade de livro é histórica; seu acervo permanece preservado abaixo.

## Colors

`ground` e `ink` organizam a base escura. `accent` sustenta botões e ocupa os campos de case e contato; sobre ele, o texto usa `ground`. `quiet` mantém a leitura secundária na base escura. `line` separa conteúdo sem criar uma coleção de cards. Hover e superfície do navegador usam os tokens observados no CSS.

Seleção inverte texto para a base sobre lilás. A barra de rolagem usa tinta lilás acinzentada sobre a base; o foco muda para tinta escura nas seções lilás.

## Typography

Archivo Black, peso real 400, dá forma à marca e aos títulos. Manrope, com faixa local 400–800, compõe o corpo e os controles. Ambas têm `font-display: swap`, fallbacks sans-serif e `font-synthesis: none`. As [licenças e fontes](docs/study-2026-10-18/fonts.md) continuam no acervo.

Os valores de display e headline no frontmatter descrevem desktop. Até 1100 px, o hero usa `clamp(44px, 5.2vw, 62px)`; até 800 px, `clamp(42px, 7.5vw, 64px)`; até 540 px, `clamp(37px, 10.6vw, 56px)`, entrelinha 1.08. Títulos de seção chegam a `clamp(33px, 9vw, 48px)` no celular. Corpo varia entre 13–17 px conforme o papel; textos de apoio não assumem a escala de títulos.

## Layout

O container tem largura máxima de 1344 px, com 48 px de margem de cada lado em desktop, 32 px até 1100 px e 20 px até 540 px. O header permanece sticky, com altura mínima de 88 px, reduzida a 72 px no celular. Âncoras reservam 108 px de afastamento, ou 92 px no celular.

Hero e introduções usam proporção 1.3:1 e vão a uma coluna até 800 px. Case usa 1.55:1; a imagem é sticky a 122 px no desktop e passa ao fluxo normal até 800 px. O pacote usa 1:1.1 e vira uma coluna até 540 px. O processo é uma lista ordenada de quatro etapas, com quatro, duas ou uma coluna conforme a largura.

## Elevation & Depth

A composição é predominantemente plana. A moldura da captura usa `0 20px 50px #32204326` para destacar a interface real do campo lilás. A palavra cinética ganha profundidade pelo eco em contorno e pelo deslocamento das letras; não há halos ou sombras de ação nos botões.

## Shapes

Botões são retangulares, sem raio. A moldura de navegador tem raio de 12 px e recorte de overflow; divisores são de 1 px. A palavra cinética é HTML decorativo, não uma imagem da página.

## Components

**Ações.** Botão principal lilás na base escura; variante escura no campo lilás. Altura mínima de 56 px, ou 52 px no celular; hover altera apenas a cor de fundo em 0,2 s. Links textuais têm altura mínima de 44 px e underline no hover. Foco visível usa outline de 2 px, afastado 6 px, com cor adequada à superfície.

**Navegação.** Wordmark local, links para trabalho/pacote e contato. Até 800 px, os dois links de seção deixam o header; a ação de contato permanece visível, e a âncora de trabalho continua no hero. Não há menu dependente de script.

**Assinatura Ritmo.** As letras acompanham a rolagem nativa; o replay dura 1400 ms. A interação pausa fora da tela e com a aba oculta. Movimento reduzido remove transformações; sem JavaScript ou IntersectionObserver, o conteúdo é estático e o replay fica oculto. A decoração usa `aria-hidden`.

**Case.** Captura real com dimensões declaradas, texto alternativo, legenda e fonte. A demo indisponível não foi apresentada como vídeo válido; a alternativa estática autorizada foi usada.

## Do's and Don'ts

- Do manter preço, escopo e contato legíveis antes do carregamento da interação.
- Do usar as fontes locais e as cores conforme a superfície.
- Do preservar foco visível e a versão estática completa.
- Don't transformar a identidade de livro arquivada em referência vigente.
- Don't atribuir à captura resultados comerciais ou disponibilidade atual da demo.

## Histórico preservado — documentação anterior a este fechamento

Os registros completos abaixo pertencem às suas datas e etapas. Suas expressões de pendência, aprovação ou estado vigente não substituem o sistema e os resultados acima. O comp antigo foi marcado como superado, preservando sua aprovação histórica.

# Codice — sistema visual

## Direção vigente — landing final Ritmo, 18/10/2026

**Ritmo foi escolhida pelo usuário** para a landing final na rota `/`. A implementação está autorizada com a oferta exclusiva de sites de uma página por R$ 1.500. O briefing e o ledger desta etapa estão em [docs/landing-ritmo-2026-10-18/README.md](docs/landing-ritmo-2026-10-18/README.md).

A composição tem quatro blocos: **hero**, **projeto imobiliário real**, **pacote** e **dupla com contato**. O hero usa tipografia de impacto e movimento gráfico para apresentar o serviço e o preço. A seção seguinte dá espaço à interface real de Corretor, sem métricas inventadas. O pacote mantém preço, entregas, pagamentos e limites legíveis. O fechamento apresenta Fernando Riad e Eduardo Gobatto e os dois contatos diretos.

| Elemento do sistema Ritmo | Diretriz para a landing final |
| --- | --- |
| Paleta base | Fundo `#151419`, lilás `#B69AFF` e texto `#F5F1EB`; qualquer ajuste de contraste da implementação deve ser registrado na verificação. |
| Tipografia | Archivo Black nos títulos e Manrope no corpo, com fontes locais e licenças já documentadas no [acervo de fontes](docs/study-2026-10-18/fonts.md). |
| Movimento | Relação entre rolagem, tipografia e elementos gráficos, com replay e pausa fora da tela quando aplicável. O estado com movimento reduzido deve preservar conteúdo, hierarquia e ação. |
| Imagens | Captura real do projeto imobiliário. Fotografias, números, resultados e interfaces de clientes não podem ser inventados. |
| Controles | Foco visível, rótulos compreensíveis, teclado e toque; a ação de contato permanece evidente em desktop e celular. |
| Conteúdo | Oferta de sites, preço de R$ 1.500 e condições comerciais. A composição da landing tem quatro blocos; o pacote vendido admite até seis seções. |

O sistema de produção usa `src/layouts/Page.astro`, `src/pages/index.astro`, `src/styles/global.css` e `src/scripts/landing.ts`, com termos em `src/data/offer.ts`. O conteúdo de contatos e portfólio em `src/data/site.ts` permanece preservado. As prévias `/estudo/` e suas três direções ficam intactas, com `noindex` e exclusão do sitemap. A identidade anterior de livro pertence ao acervo histórico.

A verificação desta nova implementação deve conferir responsividade, contraste, texto sem cortes, ausência de overflow, teclado, toque, movimento reduzido e uso sem JavaScript. Capturas e vídeo precisam registrar a página final realmente renderizada. O [relatório próprio da etapa](docs/landing-ritmo-2026-10-18/verification.md) será consolidado pelo responsável pela implementação; nenhum resultado de QA, captura ou vídeo da landing final é declarado concluído aqui antes desse registro. O QA do comparativo abaixo permanece restrito às prévias.

## Histórico preservado — estudo anterior à seleção de Ritmo, 18/10/2026

O conteúdo abaixo descreve a comparação entregue antes da escolha. A antiga espera por seleção e a preservação da raiz eram limites daquela etapa; a nova autorização para implementar Ritmo está acima. Capturas, fontes e resultados anteriores continuam preservados como evidência do estudo.

## Direção vigente — estudo de 18/10/2026

A identidade de livro antigo foi abandonada. Couro, lombada, pergaminho, ouro envelhecido e as famílias do estudo anterior permanecem apenas no histórico e na rota `/` preservada temporariamente. Eles não são a referência das novas prévias.

O estudo implementado compara **Forma**, **Fluxo** e **Ritmo** em `/estudo/`, com prévias independentes em `/estudo/forma/`, `/estudo/fluxo/` e `/estudo/ritmo/`. A comparação parte da primeira tela e do início da próxima seção, com marca forte e uma interação funcional característica por direção. Blocos adicionais de portfólio, pacote e dupla permitem revisar a oferta completa e usar as âncoras; não constituem a landing final de produção. O usuário escolhe a direção antes da reconstrução da landing completa. [Briefing e ledger atuais](docs/study-2026-10-18/README.md).

| Direção | Composição e comportamento implementados |
| --- | --- |
| Forma | Volume em CSS 3D, com controle para abrir e fechar a composição espacial; sem dependência de WebGL. Acionamento por teclado e toque verificado, com alternativa de movimento reduzido. |
| Fluxo | Demonstração de site de prestador de serviços; três botões alternam serviços, fotos e contato. Estados e acionamento por teclado e toque verificados. |
| Ritmo | Tipografia e gráfico cinéticos relacionados à rolagem, com replay e pausa fora da tela. Rolagem, replay e movimento reduzido verificados. |

As três propostas diferem em composição, tipografia, cor e ritmo, preservando a oferta aprovada: site de uma página com até seis seções por R$ 1.500, com contato por WhatsApp.

| Direção | Paleta principal | Tipografia |
| --- | --- | --- |
| Forma | Base `#DCE4EE`, azul `#2348F5`, tinta `#15273E`. | Manrope. |
| Fluxo | Base `#F3F0E7`, vermelho `#E64220`, tinta `#24251F`; tinta `#11120D` nos textos pequenos sobre vermelho. | Bricolage Grotesque nos títulos; Manrope no corpo. |
| Ritmo | Fundo `#151419`, lilás `#B69AFF`, texto `#F5F1EB`. | Archivo Black nos títulos; Manrope no corpo. |

As três famílias são servidas localmente, com binários, caracteres portugueses e licenças OFL conferidos. Arquivos, origem e pesos estão em [fonts.md](docs/study-2026-10-18/fonts.md).

As seis imagens de comparação são **capturas reais das prévias implementadas**, em desktop de 1440 × 1100 px e celular de 390 × 1400 px. Os PNGs estão em `docs/study-2026-10-18/review/final/`; os WebP usados no painel ficam em `public/study/previews/`. O estudo foi construído em código e depois capturado, sem geração de páginas inteiras em imagem. O painel também permite abrir cada prévia para avaliar a interação.

As três prévias foram verificadas em 320, 390, 768 e 1440 px: sem overflow horizontal, imagens quebradas ou âncoras ausentes; sem erros de página. Uso sem JavaScript e movimento reduzido passaram nas três direções. Axe 4.14 registrou zero violações nas prévias, mas a análise automática de contraste ficou incompleta em Forma e Ritmo. Pares de cores foram conferidos manualmente, incluindo a correção da tinta sobre vermelho em Fluxo. Isso não equivale a auditoria integral por leitores de tela nem à aprovação visual do usuário.

As quatro rotas construídas usam `noindex,nofollow` e a exclusão do sitemap foi verificada. A repetição final de axe do painel terminou com zero violações e sem verificações incompletas. Os quatro hashes da implementação legada permanecem idênticos. Resultados e limites estão no [relatório final](docs/study-2026-10-18/verification.md). A seleção entre Forma, Fluxo e Ritmo permanece pendente.

## Histórico preservado — Encadernação escura, 17/10/2026

O texto abaixo documenta uma escolha e implementação anteriores, agora superadas como direção visual. A aprovação, as capturas e os resultados de QA de 17/10 pertencem à landing antiga; não aprovam nem validam Forma, Fluxo ou Ritmo. As classificações de portfólio vigentes são as registradas em [PRODUCT.md](PRODUCT.md).

## Direção escolhida

Em 17/10/2026, após comparar três propostas, o usuário autorizou seguir com a **2. Encadernação escura**: “Pode escolher por mim e seguir com a 2”. A referência aprovada é `.impeccable/mocks/02-encadernacao-escura.png`, com `approved: true` no sidecar. A cópia de apresentação está em `docs/visual-study/proposals/02-encadernacao-escura.png`.

A identidade vem do códice encadernado. A própria página assume a capa escura e passa para folhas claras, com margem de lombada, filetes e composição editorial. Esse princípio organiza conteúdo e navegação: evitar repetir o nome Codice, alusões a livro ou ornamentos como preenchimento sem informação.

Fólios abertos e Manuscrito de projetos continuam arquivados em `docs/visual-study/proposals/` como alternativas da comparação, sem substituir a referência aprovada. O briefing original e a mudança de estado estão em [docs/visual-study/brief.md](docs/visual-study/brief.md).

## Paleta

| Cor | Valor | Papel |
| --- | --- | --- |
| Tinta/couro | `#251B17` | Capa do hero e fechamento de contato; texto principal sobre papel. |
| Marfim | `#F1E7D2` | Texto sobre a capa e base clara do CTA. |
| Ouro envelhecido | `#C5AB77` | Referência de bordas e detalhes da encadernação. |
| Argila | `#78482E` | Ênfase tipográfica e legendas sobre papel. |
| Azul | `#3C5373` | Acento reservado do sistema; não precisa aparecer em cada seção. |

O papel também usa base `#E8D7C2`; variações de filetes e tinta secundária sustentam a leitura sem uniformizar a textura. Couro e argila foram refinados em relação à proposta inicial (`#27221E` e `#A76F53`), preservada no histórico do briefing. A legibilidade deve ser avaliada sobre o material real, incluindo as regiões mais claras ou escuras da textura.

## Tipografia

- **Cormorant Garamond:** wordmark e títulos em 400/500; ênfases em itálico 400. Georgia e serif são fallbacks. Os títulos usam escala fluida, quebras editoriais e entrelinhas próximas; a adaptação móvel precisa preservar leitura e evitar recortes.
- **Source Sans 3:** corpo, informações de serviço, contato e links de apoio em 400/500/600. O texto corrido privilegia comprimento de linha e entrelinha para leitura.
- As duas famílias são locais em `public/fonts/`, com `font-display: swap` e suporte aos caracteres pt-BR. O CSS registra as faixas reais dos arquivos variáveis; `font-synthesis: none` evita pesos ou itálicos artificiais. O itálico disponível é exclusivamente 400.
- [fonts.md](docs/visual-study/fonts.md) registra WOFF2, origem oficial, licenças OFL, pesos, dimensões dos arquivos e hashes.

## Composição e conteúdo

O hero usa uma capa de couro escuro com lombada lateral e filete de encadernação. Wordmark, navegação, oferta de sites e sistemas, identificação da dupla e CTA são HTML sobre esse material. O CTA claro cria uma ação evidente, com o rótulo “Conversar sobre meu projeto”. O material não contém palavras nem controles rasterizados.

A abertura clara funciona como fólio: Corretor lidera com imagem à esquerda e legenda à direita; Roger inverte a relação e avança abaixo. Evitar transformar os dois projetos em cartões iguais. No celular, imagem e texto passam para uma sequência legível sem depender da sobreposição do desktop.

Serviços usam linhas editoriais e descrições concretas. Manutenção e suporte são uma nota complementar para Sinop/MT e região, preservando sites e sistemas como oferta principal. A dupla aparece pelo nome, GitHub e contato direto, sem retratos ou atribuições profissionais inventadas. O fechamento retoma a capa escura com links de WhatsApp individuais e origem geográfica.

Os dados tipados de conteúdo e contato ficam em `src/data/site.ts`. Fernando usa `5566999356646`; Eduardo usa exatamente `556684184488`, segundo a associação informada pelo usuário. O número de Eduardo não deve receber outro dígito por normalização presumida.

## Materiais locais e fidelidade dos cases

| Arquivo | Origem e função |
| --- | --- |
| `public/images/codice-cover.webp` | Nova arte limpa de capa e lombada, gerada com a ferramenta nativa `image_gen.imagegen`. |
| `public/images/codice-paper.webp` | Nova arte limpa de papel/fólio, gerada com a mesma ferramenta. |
| `public/images/parchment-button.webp` | Fundo claro do CTA, gerado sem texto incorporado. |
| `public/images/corretor-public.webp` | Conversão WebP da captura original `docs/visual-study/references/corretor-public-desktop-1440x900.png`. |
| `public/images/roger-services.webp` | Conversão WebP da captura original `docs/visual-study/references/roger-services-desktop-1440x900.png`. |

Os PNGs dos conceitos registram composição; suas miniaturas podem ter detalhes reinterpretados pelo gerador. Sempre usar as capturas originais para mostrar as interfaces reais dos projetos, sem sintetizar telas. As fontes e limitações dos cases estão em [references/sources.md](docs/visual-study/references/sources.md): Corretor vem do ambiente de teste público documentado; Roger contém fotografias identificadas pelo projeto como ilustrativas.

## Movimento e interação

A entrada do texto do hero é discreta: deslocamento de 6 px, mudança de opacidade e desfoque leve, durante 0,7 s. Links e superfícies clicáveis usam transições curtas de cor, sombra ou deslocamento de poucos pixels. Não há necessidade de movimento contínuo para explicar o conteúdo.

Com `prefers-reduced-motion: reduce`, animações e transições são removidas, a rolagem deixa de ser suave e os deslocamentos de hover são cancelados. O menu móvel funciona por acionamento do botão, sem depender de hover; fecha ao navegar, ao clicar fora, ao passar para desktop ou ao usar Escape. Escape devolve o foco ao botão de abertura.

## Acessibilidade e adaptação

O documento usa `lang="pt-BR"`, landmarks, títulos, textos alternativos dos cases, link para pular ao conteúdo e foco visível em links e botões. Ícones decorativos não substituem rótulos. Links externos anunciam a abertura de outra aba e usam `rel="noopener noreferrer"`.

A navegação móvel tem botão com `aria-controls` e `aria-expanded`. Sem JavaScript, os links de navegação permanecem disponíveis; com JavaScript, o menu é recolhível. As regras móveis reorganizam o portfólio, serviços, dupla e contatos em fluxo vertical, com controles dimensionados para toque.

Esses recursos estão implementados. A revisão em Chromium verificou oito larguras de 320 a 1920 px, teclado, menu, movimento reduzido e fallback sem JavaScript. Axe terminou com zero violações, mantendo contraste sobre backgrounds como análise incompleta. Pares de cores, material sob a introdução e capturas foram conferidos separadamente; não houve auditoria integral por leitores de tela. Evidências e limites estão em [implementation-verification.md](docs/visual-study/implementation-verification.md).

Os derivados `paper-grain.webp` e `paper-spine.webp` mantêm o papel contínuo sem bordas atravessando o conteúdo. O fólio inicial se funde ao grão antes da borda inferior; no celular, somente grão e lombada estreita sustentam o texto. `leather-grain.webp` evita ampliar a lombada sobre o contato no celular. `codice-cover-mobile.webp` reduz o peso da capa para telas pequenas. Uma camada escura uniforme protege o contraste do texto sobre a capa, preservando sua materialidade.

## Implementação e publicação

A landing é estática em Astro 7.4/Tailwind CSS 4, com estrutura em `src/pages/index.astro`, `src/layouts/Page.astro`, `src/styles/global.css` e `src/data/site.ts`. O build de produção concluiu na implementação. O preview local usa `http://localhost:4321`, em background conforme `AGENTS.md`.

O domínio final ainda não foi informado. `SITE_URL` habilita o domínio no Astro, canonical, `og:url`, URL da organização no JSON-LD e sitemap. `.env.example` documenta o valor a configurar antes de um build para publicação. Esta etapa não registra publicação nem aprovação visual final da landing implementada.

