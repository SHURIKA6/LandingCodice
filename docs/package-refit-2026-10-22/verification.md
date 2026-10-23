# Verificação — refatoração da seção do pacote (22/10/2026)

Todas as execuções abaixo desta data, na máquina local, contra `http://localhost:4321/` servido pelo gerenciador (`npm run dev -- --background`, pid 17848). Nenhum resultado herdado de entregas anteriores.

## Bateria automatizada

| Check | Resultado |
| --- | --- |
| `npm run typecheck` | Limpo, sem erros |
| `npm run build` (Next.js 16.4.2 / Turbopack) | Compilado, 4 páginas estáticas geradas |
| `node --experimental-strip-types --test scripts/portrait-motion.test.mjs` | 6/6 aprovados |
| `node --experimental-strip-types --test scripts/mobile-portrait-motion.test.mjs` | 5/5 aprovados |

## QA de navegador (agent-browser, Chromium via CDP)

Capturas em `captures/` neste diretório: `package-desktop.png`, `package-desktop-scrolled.png`, `package-mobile.png`, `package-mobile-2.png`, `package-reduced.png`.

### Desktop 1440×1000
- Composição nova correta: esquerda com eyebrow + H2 display (duas linhas, `mostrar.` em azul) + descrição + divisória + label/nota + CTA; direita com H3, sete itens numerados 01–07 em duas colunas sem divisórias/setas, e card "Os combinados" em campo suave com notas separadas por filete.
- Coluna esquerda sticky confirmada: após rolar 400 px, `getBoundingClientRect().top` = 120 com a coluna direita deslizando.
- Coreografia viva: `#pacote[data-choreography="true"]`; `--offer-progress` = 1 e o `::before` azul da grade em `scaleX(1)` ao repouso; item de inclusão com `--inclusion-progress` = 1 e número em opacidade 1/transform nula no fim do percurso.
- Sem estouro horizontal (`scrollWidth` 1440 = `clientWidth` 1440).

### Celular 390×844 (`mobile-story` ativo)
- Empilhamento correto: sticky desligado, título → glosa → CTA → lista em coluna única → card de combinados; varredura azul do topo presente.
- Sem estouro horizontal (`scrollWidth` 390 = `clientWidth` 390); `motionMode` = `mobile-story`.

### Movimento reduzido
- `#pacote` sem `data-choreography`; `.package-index` em `opacity: 1`, `transform: none`; divisória superior da grade no cinza padrão; todo o conteúdo visível sem efeitos.

### Acessibilidade e foco
- `agent-browser a11y --selector "#pacote"` (axe-core 4.12.1): 0 violações, 0 incompletos, 14 regras aprovadas.
- Foco no CTA: contorno 3 px sólido; os itens da lista não são controles e o `<details>` eliminado não reduziu alcance de navegação por teclado.

### Sem JavaScript / HTML estático
- HTML pré-renderizado do servidor contém os nove trechos checados: título nas duas linhas + ênfase, "O que vai com o seu site", "Uma página com até seis seções", "Configuração e publicação do site", "Os combinados", primeira condição, texto do CTA e `wa.me/5566999356646`. Nada depende do JS para ser lido.

## Ajuste de script herdado

- `scripts/verify-people.browser.js` linha da oferta no fallback foi corrigido nesta entrega (esperava "R$ 1.500", removido do HTML antes desta mudança). Esse script roda no fluxo do Playwright MCP e **não foi executado** nesta verificação; o QA equivalente acima cobre o fallback por HTML estático.

## Limites

- Não houve QA em aparelho físico, Safari/iOS, nem aceite estético reverso do usuário — só Chromium headless local.
- Nada foi commitado ou enviado; a árvore segue local com as mudanças desta entrega e as pré-existentes intocadas.
