---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/globals.css","src/app/layout.tsx","src/components/experience/Hero.tsx","src/components/experience/ProjectStage.tsx","src/components/experience/SmoothExperience.tsx","src/data/offer.ts","src/data/site.ts"]
---

# Landing Codice — Next.js vigente, 19/10/2026

O nome deste arquivo foi mantido para preservar os vínculos do histórico. A superfície de produção agora é `src/app/page.tsx`, em Next.js App Router, React, TypeScript, Tailwind, Lenis e Framer Motion, conforme o pedido explícito do usuário. [Plano e contrato da direção](../../docs/superpowers/plans/2026-10-19-next-lando.md), [registro da migração](../../docs/next-lando-2026-10-19/README.md) e [sistema visual](../../DESIGN.md).

## THESIS

Objeto escultórico central e marca monumental tornam a Codice reconhecível. A composição mantém a oferta concreta de site profissional por R$ 1.500 e o contato direto nas áreas de leitura, sem uma introdução que bloqueie o conteúdo.

## OWN-WORLD

Marfim `#f4f4ed`, tinta oliva `#25291f` e lima `#d2ff00`; Manrope e Archivo Black locais. A escultura de duas formas interligadas, cromada e lima, fornece profundidade e orienta contornos amplos. Campos inteiros mudam de tom entre os capítulos. A referência Lando orienta acabamento, escala e fluidez, sem ativos de marca emprestados.

## STORY

Oferta, preço e contato → trabalho imobiliário real → pacote e responsabilidades → Fernando e Eduardo e seus WhatsApps. A arte decorativa não é evidência de portfólio. Capturas reais mostram funcionalidades sem resultados comerciais inventados.

## FIRST VIEWPORT

Header fixo com marca, contato e menu. Wordmark monumental na parte superior; objeto ao centro; título comercial embaixo à esquerda; preço e WhatsApp embaixo à direita. A abertura reorganiza-se em fluxo vertical no celular, com conteúdo legível antes do JavaScript e independente da imagem.

## FORM

Expansão em código do pedido explícito de referência Lando e migração de stack. Não houve nova disputa de conceitos ou necessidade de repetir a aprovação. A escultura foi gerada originalmente para a Codice, com transparência, e é um raster transformado na página: [proveniência](../../docs/next-lando-2026-10-19/asset.md). Não é uma cena 3D real.

## INTERACTION

Lenis suaviza a roda com `lerp: 0.1`, `anchors: true`, uma RAF própria e toque nativo; é destruído com movimento reduzido ou aba oculta. O afastamento das âncoras vem somente do CSS. Framer Motion relaciona marca/objeto à rolagem e desloca o objeto com ponteiro de mouse; o replay opcional dura 1.2 s. Replay e deslocamento de ponteiro são reiniciados fora da tela e com a aba oculta. O hook próprio `useReducedPreference` observa mudanças de preferência ao vivo por `useSyncExternalStore` e `matchMedia`, com SSR estático; movimento reduzido remove transformações. O case permite selecionar duas capturas verdadeiras com transição de opacidade e estado acessível; sem script mantém a captura inicial completa.

## Quality bar

Oferta e preço acessíveis, termos comerciais preservados, conteúdo SSR, sem escassez ou métricas inventadas, controles claros, teclado/toque/foco, fontes locais, sem overflow, movimento reduzido e alternativa estática. Estudos anteriores preservados como quatro documentos estáticos em `public/estudo/`, com rewrites, `noindex` e exclusão do sitemap. Build, typecheck e QA próprios da migração passaram; revisão independente **ship**. Resultados e limites em [verification.md](../../docs/next-lando-2026-10-19/verification.md) e [review.md](../../docs/next-lando-2026-10-19/review.md), sem transferir o veredito das versões Astro.

## Histórico preservado — superfície anterior à migração para Next.js

O registro anterior permanece integralmente abaixo. As aprovações e os caminhos Astro nele descritos pertencem às etapas antigas.

```markdown
---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/styles/global.css","src/layouts/Page.astro","src/data/site.ts"]
---

# Landing Codice — Ritmo vigente

## THESIS

Uma marca tipográfica marcante apresenta uma oferta concreta de site para prestadores de serviços de Sinop e região. O conteúdo conduz do trabalho do visitante ao trabalho verificável da dupla e à contratação.

## OWN-WORLD

Base `#151419`, tinta `#f5f1eb`, lilás `#b69aff`, secundária `#c2bacd` e filetes `#4c4556`. Archivo Black dá escala à marca e aos títulos; Manrope organiza leitura e ações. O lilás ocupa o case e o contato, além dos botões no fundo escuro. Sem materiais de couro ou livro.

## STORY

Oferta e preço → catálogo imobiliário real → pacote, responsabilidades e contratação → Fernando e Eduardo e seus WhatsApps. Sem métricas ou promessas comerciais inventadas. Sistemas e automações aparecem apenas como consulta de escopo separado.

## FIRST VIEWPORT

Header fixo no fluxo com marca e contato. Em desktop, título à esquerda, oferta/preço/CTA à direita e palavra cinética em grande escala abaixo. Em celular, sequência vertical título, oferta, preço, CTA e marca. Conteúdo legível antes de qualquer script ou fonte terminar de carregar.

## FORM

Extensão da direção Ritmo já implementada e selecionada. Referências de crítica: `../../docs/study-2026-10-18/review/final/ritmo-desktop.png` e `ritmo-mobile.png`; são capturas do estudo, não um comp final a reproduzir pixel a pixel. Build em código. Não houve novo sorteio de conceito nem geração de arte nesta etapa.

## INTERACTION

Uma assinatura de movimento: letras respondem à rolagem nativa e a um replay opcional. Pausa fora da tela e com aba oculta; apresentação estática com movimento reduzido, sem JavaScript ou sem IntersectionObserver. Conteúdo inferior permanece estático. Imobiliária usa captura real: a demo estava indisponível para gravação, conforme `media.md`.

## Quality bar

Preço e contato visíveis, sem escassez falsa; controles claros com foco; fontes locais; nenhum overflow em 320/390/768/1024/1440; uma hierarquia coerente e quatro blocos com ritmo próprio. Estudos preservados com noindex e fora do sitemap. Build e QA não equivalem a aprovação visual ou deploy.


## Histórico preservado — superfície de livro, 17/10/2026

O texto a seguir é histórico e não rege a raiz atual. As evidências e limites do pipeline antigo continuam vinculados à etapa antiga.

# Landing Codice

> **Superfície histórica — superada em 18/10/2026.** Este registro corresponde à landing antiga preservada temporariamente em `/`. A identidade de livro antigo foi abandonada e a aprovação abaixo não se transfere ao novo estudo. O briefing vigente compara Forma, Fluxo e Ritmo em `/estudo/`, com prévias funcionais e capturas reais de desktop e celular; consulte [o registro atual](../../docs/study-2026-10-18/README.md), [PRODUCT.md](../../PRODUCT.md) e [DESIGN.md](../../DESIGN.md). Resultados de revisão abaixo se aplicam somente à implementação de 17/10. Roger deve ser apresentado como projeto demonstrativo, sem contrato e sem alegação de resultados.

Modo: Persuade. Rota: `/`. Referência aprovada: `.impeccable/mocks/02-encadernacao-escura.png`. O usuário autorizou: "Pode escolher por mim e seguir com a 2".

## Direction contract

THESIS: um códice antigo que apresenta uma empresa de tecnologia. A capa é a própria superfície, com oferta legível e contato direto; os trabalhos sustentam a mensagem.

OWN-WORLD: couro castanho, lombada e ouro envelhecido na abertura; papel marfim, Cormorant Garamond e Source Sans 3 no conteúdo. Textos e controles são HTML; os materiais são rasters locais.

STORY: entender sites e sistemas sob medida, conhecer Corretor e Roger, descobrir suporte complementar e conversar com os fundadores.

FIRST VIEWPORT: capa de aproximadamente 560px em 1440px; wordmark e navegação no alto, título em três linhas à esquerda, identificação e CTA claro abaixo. O fólio abre com Corretor à esquerda e Roger em composição inversa logo depois.

FORM: Encadernação escura, segunda das três opções fixadas pelo plano e escolhida expressamente; seed:bf108b720ef0fb54. A escolha do usuário prevalece sobre o sorteio.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Resultado

Implementada e revisada. Veredito da revisão independente: sem defeito material pendente após as correções verificadas. DESIGN.md e provenance dos rasters de produção registrados. Evidências, limites e estado do pipeline auxiliar em `docs/visual-study/implementation-verification.md`.

```


