# Verificação — blindagem do wordmark, 22/10/2026

Servidor local em `http://localhost:4321/` (gerenciador `scripts/dev.mjs`, pid 17848). CSS-only: o build dev recarregou a folha de coreografia; medições e capturas realizadas com agent-browser/Chromium (headless, 1440×900 e demais larguras indicadas).

## Checagens do repositório

| Check | Resultado |
| --- | --- |
| `npm run typecheck` | Passou, sem erros |
| `npm run build` | Passou (Next.js 16.4.2 / Turbopack, 4 rotas estáticas) |
| `node --experimental-strip-types --test scripts/portrait-motion.test.mjs` | 6/6 |
| `node --experimental-strip-types --test scripts/mobile-portrait-motion.test.mjs` | 5/5 |
| `node --experimental-strip-types --test scripts/opening-state.test.mjs` | 6/6 |

`scripts/verify-people.browser.js` é corpo função para Playwright MCP (`browser_run_code_unsafe`), não executável standalone — não faz parte dos checks obrigatórios listados no AGENTS.md e não foi executado.

## Medição do encaixe (wrapper `.footer-letters` vs shell)

Largura das letras em px antes → depois (o "antes" é o render vigente até a mudança, clamp `24vw`/`25vw`):

| Viewport | Shell | Antes | Depois | Δ | Encaixa | Risco de fatiamento |
| --- | --- | --- | --- | --- | --- | --- |
| 390 | 350 | 265,7 | 265 | −0,3% | Sim | Não |
| 768 | 688 | 502,6 | 486 | −3,3% | Sim | Não |
| 1024 | 944 | 670 | 670 | 0% | Sim | Não |
| 1110 | 1030 | 726 | 732 | +0,8% | Sim | Não |
| 1280 | 1168 | 837 | 827 | −1,2% | Sim | Não |
| 1440 | 1328 | 942 | 943 | +0,1% | Sim | Não |
| 1920 | 1600 | 1008 | 1008 | 0% (cap 370) | Sim | Não |
| 2560 | 1600 | 1008 | 1008 | 0% (cap 370) | Sim | Não |

`sliceRisk` medido por `letters.scrollWidth > clientWidth` = **falso** em todas as larguras. `documentElement.scrollWidth ≤ clientWidth` (sem overflow horizontal) em todas as larguras pós-mudança — inclusive 1110 px, onde o render anterior havia mostrado transitoriamente `scrollWidth` 1125 > 1110.

## Testes de adversidade (setados via inline, revertidos na mesma avaliação)

- `data-large-text` (ativo + medição): wrapper em 1328/7,7 = 172,5 px → letras 470 px ≤ 1328, sem fatiamento. Equivalente ao `12vw` anterior (172,8 px → 471,5 px).
- Deriva uniforme +22% (`letter-spacing: 0.1em` por `.footer-letter`): letras 1326 ≤ shell 1328 — encaixa no limite.
- Deriva uniforme ~+44% (`letter-spacing: 0.18em` por glifo, simulação mais agressiva que um fallback real): letras pingam 164 px além do shell, mas **completas e visíveis** — mecanismo de fatiamento permanece fechado.
- Simulação de família fallback ("Arial Black", +74%): mesmo resultado — extrapolando o contêiner, glifos inteiros nunca fatiados.
- Interpretação: a promessa de ~40% vale para deriva de **avanço de glifo** (fontes reais caem bem dentro — Segoe UI, Arial e Roboto são mais estreitas que o Bricolage); a checagem acima é o pior caso sintético.

## Capturas

Em `captures/`: `before-desktop-1440.png` / `after-desktop-1440.png`, `before-mobile-390.png` / `after-mobile-390.png`, `before-1110.png`. Comparação visual: composição idêntica antes/depois em desktop e mobile (faixa do wordmark, seta `↗` na mesma posição, coluna de contatos e colophon inalterados).

## Limites

- A causa exata do corte visto pelo usuário no seu navegador/aparelho segue sem reprodução determinística no headless local; a mudança elimina a classe de falha por construção (tamanho derivado do contêiner + impossibilidade de encolhimento sob `clip`).
- Estado sem JavaScript e navegadores sem `@supports (container-type)` continuam nos clamps anteriores byte-idênticos.
- Homologação exige aceite visual do usuário no aparelho real (desktop e celular). Sem commit, push ou deploy nesta etapa.
