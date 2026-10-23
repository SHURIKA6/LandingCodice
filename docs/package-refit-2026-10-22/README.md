# Refatoração da seção do pacote — 22/10/2026

O usuário apontou que a seção `#pacote` estava vazia à esquerda e desaprovou a composição da direita, e autorizou a execução sobre três escolhas: (1) título da seção migrando para dentro da coluna esquerda sticky, (2) lista de inclusões em painel numerado sem linhas, (3) "Os combinados" como bloco discreto permanente, sem `<details>`.

## O que mudou

- `src/app/page.tsx` — o `.section-heading` da seção foi dissolvido: eyebrow "Seu próximo passo", H2 `#package-title` ("Seu negócio tem o que mostrar.") e a descrição entraram em `.package-heading` dentro de `.package-summary`; label + nota de escopo em `.package-gloss`; CTA inalterado (mesmo href, mesmo texto, sr-only preservado). A lista de inclusões continuou usando exatamente `offer.inclusions`, agora com numeração `01`–`07` (`.package-index`, `aria-hidden`) em grade de duas colunas, sem seta `↗` e sem divisórias; `data-delay` passou a ser por fileira (`Math.floor(index / 2) * 90`). "Os combinados" deixou de ser `<details open>` e virou `.package-conditions` (div) com H4 + os quatro `offer.conditions`. Nenhuma palavra de conteúdo foi inventada ou removida.
- `src/app/globals.css` — estilos novos para `.package-heading`, `.package-gloss`, `.package-index` e `.package-conditions` (fundo `var(--mist)`, raio 6 px); lista em `grid-template-columns:repeat(2,minmax(0,1fr))`; regras mortas de `.package-price` (preço não existe mais no HTML) removidas do bloco principal e dos breakpoints. Coluna esquerda continua sticky em `top:120px`; mobile empilha em coluna única.
- `src/components/experience/chapter-choreography.css` — as inclusões não têm mais divisórias animadas nem seta girando: a regra nova usa o `--inclusion-progress` que `MotionChapter.tsx` já escreve por item para transladar e revelar o número do item. `.package-index` entrou nas três listas de cancelamento (foco dentro da seção, `data-large-text`, movimento reduzido).
- `scripts/verify-people.browser.js` — a asserção do fallback ainda esperava "R$ 1.500" em `#pacote`, conteúdo que não existe no HTML há tempo: substituída por checagens do texto real ("O que vai com o seu site", "Uma rodada consolidada de alterações").

## Contratos preservados

- `src/data/offer.ts` intocado; nenhum texto comercial novo; contatos apenas os originais (perfil de Fernando no CTA, `wa.me/5566999356646`).
- `MotionChapter.tsx` não foi editado: `.package-grid`, `.package-details > ul`, itens `:scope > li` e `data-reveal` seguem sendo os pontos de cofotografia; varredura azul do topo da grade e entrada do H2 por linhas continuam válidas.
- H2 realocado mantém `id="package-title"` e o `labelledBy` da seção; o bloco `data-reveal="heading"` não contém controles (o botão ficou fora dele), então a entrada do título continua executando.
- HTML estático contém a seção inteira; movimento reduzido, `data-large-text` e modos mobile (`mobile-story`/`mobile-flow`) continuam capacitados a anular toda a coreografia.
- Estado local pré-existente (deleções não commitadas em `docs/mobile-motion-2026-10-21/` e o `next-env.d.ts` regenerado pelo servidor dev) não foi revertido nem ampliado.

## Restos conhecidos

- `.package-conditions summary` em `mobile-chapters.css`/`mobile-hero.css` e `.package-price`/`.price-motion-surface` em `chapter-choreography.css`/`MotionChapter.tsx` ficaram sem correspondente no markup (mortos e inócuos); permanecem para não alargar o diff desta entrega.

Resultados das verificações: `verification.md` neste diretório.
