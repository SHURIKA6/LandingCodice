# Blindagem do wordmark "codice" — 22/10/2026

O usuário reportou o nome da empresa cortado na borda direita ("o 'e' no final está cortado"), no desktop e no celular. Nas medições do Chromium headless local a palavra sempre coube no contêiner (larguras 1110–2560 px, +238 px de folga), então a causa exata do render do usuário ficou por-confirmar (métricas de fonte, zoom ou escala do sistema). O autorizou executar com "Blindar de vez": o tamanho do wordmark passou a derivar da **largura real do contêiner**, eliminando a classe do problema em qualquer causa.

## O que mudou

- `src/components/experience/chapter-choreography.css` — bloco novo no fim do arquivo (depois das regras `font: inherit` do wrapper, que ele vence no empate de ordem):
  - `.motion-chapter .footer-word { container-type: inline-size }` — o wordmark vira contêiner de consulta; `cqw` dos descendentes resolve contra a largura real do `.section-shell`.
  - `@supports (container-type: inline-size)`: `.footer-letters { flex-shrink: 0; font-size: min(calc(100cqw / 3.84), 370px) }` no desktop; divisor `3.6` dentro de `@media (max-width: 767px)`; divisor `7.7` em `html[data-large-text]`.
  - Os divisores espelham os clamps autorais medidos no Bricolage (letras ≈ 2,72 em): base ≈ 24% da viewport / cap 370 px, mobile ≈ 25 vw, texto ampliado ≈ 12 vw — verificados a ±1% do render anterior nas larguras testadas, com ~40% de folga métrica de fonte.
- Nenhum outro arquivo foi editado. `globals.css` (clamp original e `25vw`), `MotionChapter.tsx`, conteúdo e dados permanecem intocados.

## Por que isso fecha o corte

- O wrapper `.footer-letters` é item de flex com `overflow: clip`: seu mínimo automático é zero, então sob pressão de largura o flex podia encolhê-lo e o `clip` fatiava glifos no meio. `flex-shrink: 0` fecha esse caminho de falha.
- Com a fonte calibrada pelo contêiner, `largura das letras ≤ largura do shell` por construção: uma fonte que renderize até ~40% mais larga que o Bricolage ainda cabe; acima disso o word pinga para a margem inteiro e visível (`sliceRisk: false` em todos os cenários medidos), nunca fatiado.
- Navegadores sem suporte a consultas de contêiner caem nos clamps anteriores (o valor com `cqw` é descartado como inválido), e o estado sem JavaScript nunca teve wrapper: exatamente o render de hoje.

## Contratos preservados

- Textos, contatos (`siteContent.founders`), `src/data/offer.ts`, retratos e a ordem do time intocados.
- Coreografia: mesma árvore `.footer-letter` / `--letter-progress` / `--word-progress` escrita por `MotionChapter.tsx`; cancelamentos por foco, `data-large-text` e movimento reduzido continuam válidos.
- Duração de 300 svh, palco fotográfico, header, montagem e fallbacks HTML/movimento reduzido preservados.
- Estado local pré-existente (deleções não commitadas em `docs/mobile-motion-2026-10-21/`) não foi revertido nem ampliado.

## Verificações

Resultados reais em `verification.md` neste diretório. Sem commit nem push nesta etapa; produção e aparelho físico do usuário seguem por homologar.
