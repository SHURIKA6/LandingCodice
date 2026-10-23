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

**Ressalva desta métrica (ver seção do ink do "e" abaixo):** `scrollWidth`/`clientWidth` medem overflow de *layout*, não de *ink*. A tabela acima atesta que a palavra cabe no shell, mas não que o glifo esteja inteiro dentro da máscara de `clip` do wrapper — motivo pelo qual o corte do "e" passou por ela.

## Testes de adversidade (setados via inline, revertidos na mesma avaliação)

- `data-large-text` (ativo + medição): wrapper em 1328/7,7 = 172,5 px → letras 470 px ≤ 1328, sem fatiamento. Equivalente ao `12vw` anterior (172,8 px → 471,5 px).
- Deriva uniforme +22% (`letter-spacing: 0.1em` por `.footer-letter`): letras 1326 ≤ shell 1328 — encaixa no limite.
- Deriva uniforme ~+44% (`letter-spacing: 0.18em` por glifo, simulação mais agressiva que um fallback real): letras pingam 164 px além do shell, mas **completas e visíveis** — mecanismo de fatiamento permanece fechado.
- Simulação de família fallback ("Arial Black", +74%): mesmo resultado — extrapolando o contêiner, glifos inteiros nunca fatiados.
- Interpretação: a promessa de ~40% vale para deriva de **avanço de glifo** (fontes reais caem bem dentro — Segoe UI, Arial e Roboto são mais estreitas que o Bricolage); a checagem acima é o pior caso sintético.

## Capturas

Em `captures/`: `before-desktop-1440.png` / `after-desktop-1440.png`, `before-mobile-390.png` / `after-mobile-390.png`, `before-1110.png`. Comparação visual: composição idêntica antes/depois em desktop e mobile (faixa do wordmark, seta `↗` na mesma posição, coluna de contatos e colophon inalterados).

## Corte do ink do "e" — causa confirmada e corrigida (segunda rodada, 22/10)

Medição no Chromium headless local (viewport 1910×983, scroll até o rodapé), com `canvas.measureText('e').actualBoundingBoxRight` comparado à borda do wrapper:

| Grandeza | Valor |
| --- | --- |
| `font-size` das letras | 370 px |
| `letter-spacing` | −31,45 px (−0,085em) |
| Avanço do "e" (`measureText.width`) | 215 px |
| Ink direito do "e" (origem do glifo) | 202,3 px (side bearing direito ≈ 12,7 px) |
| Largura do último `.footer-letter` | 183,5 px (= avanço − espaçamento) |
| Borda direita do wrapper (antes) | 1163,3 px |
| Ink direito absoluto do "e" | 1182,1 px |
| **Ink fora da máscara (antes)** | **18,8 px cortados** |

Causa: o `overflow: clip` do `.footer-letters` recortava no conteúdo, e o `letter-spacing` negativo deixava a caixa do último span 31,45 px mais estreita que o glifo. O corte máximo possível é o próprio `letter-spacing` (quando o side bearing é 0), então serve de folga exata.

Correção: `padding-inline: .09em` + `margin-inline: -.09em` no wrapper, nos dois arquivos (`chapter-choreography.css` e o override de `mobile-chapters.css`). O padding alarga a máscara; a margem negativa mantém primeiro glifo e seta no mesmo x. `padding-block`/`margin-block` intactos — a máscara vertical da entrada das letras não muda.

Medição após a correção (mesmo viewport):

| Grandeza | Antes | Depois |
| --- | --- | --- |
| `inkSlicePx` | +18,8 (cortado) | **−14,5** (ink 14,5 px dentro da máscara) |
| `padding-inline` do wrapper | 0 px | 33,3 px |
| x da seta | 1183 | 1183 (inalterado) |
| x do primeiro glifo | 155 | 155 (inalterado) |

Checagens reexecutadas depois da correção: `npm run typecheck` sem erros; `npm run build` passou (Next.js 16.4.2 / Turbopack, 4 rotas estáticas); `portrait-motion` 6/6; `mobile-portrait-motion` 5/5; `opening-state` 6/6.

Recortes 3× do "e" em `captures/e-before-slice.png` (corte reto vertical no bojo/terminal) e `captures/e-after-complete.png` (curva e terminal completos). Captura integral pós-correção: `captures/after-fix-1910.png`.

## Limites

- O corte do ink do "e" está reproduzido e corrigido numericamente em 1910 px (de +18,8 px para −14,5 px) e em 390 px (de corte para **−3 px**, isto é, ink 3 px dentro da máscara; `padding-inline` 8,75 px contra `letter-spacing` 8,29 px). A folga positiva é pequena no mobile porque a caixa do glifo é pequena, mas o padding em `em` acompanha o `letter-spacing` — a folga de 3 px é suficiente e não há colisão.
- O corte de ink também pode atingir o último glifo de linhas de título (`.chapter-title-line`, `letter-spacing` negativo) quando o texto encosta na borda direita do bloco; não foi medido nem alterado nesta entrega.
- Estado sem JavaScript e navegadores sem `@supports (container-type)` continuam nos clamps anteriores byte-idênticos.
- Homologação exige aceite visual do usuário no aparelho real (desktop e celular).

## Validação do deploy (complemento de 22/10, após "commit e push")

- Commit `8bac3bc` enviado a `origin/main`.
- `https://landing-codice-dun.vercel.app/` servindo o build novo, comprovado no DOM: `.footer-word` com `container-type: inline-size`, wrapper com `flex-shrink: 0`.
- Bateria de larguras **no deploy** (320, 390, 768, 1024, 1110, 1280, 1366, 1440, 1536, 1600, 1920, 2560 × 850): 12/12 sem vazamento (`letters.right ≤ clientWidth`), sem fatiamento (`scrollWidth ≤ clientWidth`) e sem overflow horizontal do documento.
- Captura da rodapé no deploy em 1910×983: `captures/deploy-1910.png`.
- Permanece em aberto: aceite visual do usuário no aparelho real. A correção de máscara do "e" (segunda rodada) entra em commit próprio; a validação de ink no deploy é registrada abaixo após o rebuild.
