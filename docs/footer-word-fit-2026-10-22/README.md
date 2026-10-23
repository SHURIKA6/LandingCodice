# Blindagem do wordmark "codice" — 22/10/2026

O usuário reportou o nome da empresa cortado na borda direita ("o 'e' no final está cortado"), no desktop e no celular. Nas medições do Chromium headless local a palavra sempre coube no contêiner (larguras 1110–2560 px, +238 px de folga), então o primeiro diagnóstico tratou a hipótese de métrica de fonte/zoom e blindou o tamanho pelo contêiner. O retorno do usuário ("o finalzinho do e está faltando") e uma medição de *ink* revelaram a causa real: o wrapper das letras recortava o ink do glifo.

## Causa real do corte do "e" — 22/10, segunda rodada

O `letter-spacing: -.085em` encolhe a caixa de cada `.footer-letter` para `avanço − 0,085em` (no desktop, 215 − 31,45 = 183,5 px). O ink do "e" chega a 202,3 px, mas o wrapper `.footer-letters` tem `overflow: clip` e sua borda direita coincidia com a última caixa encolhida (1163,3 px): **18,8 px do glifo ficavam fora da máscara e eram cortados**, com a assinatura de corte reto vertical no bojo/terminal. O mesmo valia para qualquer fonte (o corte = espaçamento negativo − side bearing direito). O teste `scrollWidth` usado antes era cego a overflow de *ink* — por isso passou.

### Correção

- `src/components/experience/chapter-choreography.css` e `src/components/experience/mobile-chapters.css` — no wrapper `.footer-letters`: `padding-inline: .09em` (folga de máscara ≥ o corte máximo possível, que é o próprio `letter-spacing`) + `margin-inline: -.09em` (o layout não se move: primeiro glifo e seta ficam no mesmo x). O `padding-block`/`margin-block` verticais não mudam — a máscara de entrada das letras continua idêntica.
- Medição após: `inkSlicePx: −14,5 px` (ink 14,5 px dentro da máscara), seta em x=1183 igual a antes, glifos no mesmo x. Recortes 3×: `captures/e-before-slice.png` × `captures/e-after-complete.png`.
- A blindagem por contêiner descrita em "O que mudou" permanece como proteção de tamanho, independente desta correção de máscara.

## O que mudou

- `src/components/experience/chapter-choreography.css` — bloco novo no fim do arquivo (depois das regras `font: inherit` do wrapper, que ele vence no empate de ordem):
  - `.motion-chapter .footer-word { container-type: inline-size }` — o wordmark vira contêiner de consulta; `cqw` dos descendentes resolve contra a largura real do `.section-shell`.
  - `@supports (container-type: inline-size)`: `.footer-letters { flex-shrink: 0; font-size: min(calc(100cqw / 3.84), 370px) }` no desktop; divisor `3.6` dentro de `@media (max-width: 767px)`; divisor `7.7` em `html[data-large-text]`.
  - Os divisores espelham os clamps autorais medidos no Bricolage (letras ≈ 2,72 em): base ≈ 24% da viewport / cap 370 px, mobile ≈ 25 vw, texto ampliado ≈ 12 vw — verificados a ±1% do render anterior nas larguras testadas, com ~40% de folga métrica de fonte.
- Fora dos arquivos citados nas duas rodadas, nada foi editado: `globals.css` (clamp original e `25vw`), `MotionChapter.tsx`, conteúdo e dados permanecem intocados.

## Por que a blindagem continua necessária

- O wrapper `.footer-letters` é item de flex com `overflow: clip`: seu mínimo automático é zero, então sob pressão de largura o flex podia encolhê-lo e o `clip` fatiava glifos no meio. `flex-shrink: 0` fecha esse caminho de falha.
- Com a fonte calibrada pelo contêiner, `largura das letras ≤ largura do shell` por construção: uma fonte que renderize até ~40% mais larga que o Bricolage ainda cabe; acima disso o word pinga para a margem inteiro e visível (`sliceRisk: false` em todos os cenários medidos), nunca fatiado.
- Navegadores sem suporte a consultas de contêiner caem nos clamps anteriores (o valor com `cqw` é descartado como inválido), e o estado sem JavaScript nunca teve wrapper: exatamente o render de hoje.

## Contratos preservados

- Textos, contatos (`siteContent.founders`), `src/data/offer.ts`, retratos e a ordem do time intocados.
- Coreografia: mesma árvore `.footer-letter` / `--letter-progress` / `--word-progress` escrita por `MotionChapter.tsx`; cancelamentos por foco, `data-large-text` e movimento reduzido continuam válidos.
- Duração de 300 svh, palco fotográfico, header, montagem e fallbacks HTML/movimento reduzido preservados.
- Estado local pré-existente (deleções não commitadas em `docs/mobile-motion-2026-10-21/`) não foi revertido nem ampliado.

## Verificações

Resultados reais em `verification.md` neste diretório. Commits `8bac3bc` e `6dd8f3e` já em `origin/main`; a correção de máscara do "e" entra em commit próprio. Homologação visual no aparelho real do usuário segue necessária.
