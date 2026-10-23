# Verificação — Serviços dos sócios (23/10/2026)

Resultados reais desta entrega. Não herdam aprovações dos blocos anteriores; os checks abaixo foram executados sobre o checkout atual.

## Comandos executados

- `npm run typecheck` — **PASS** (tsc --noEmit, sem erros)
- `npm run build` — **PASS** (Next.js 16.4.2, Turbopack; compilação em 3,8s; TypeScript em 7,9s; 4 páginas estáticas geradas em 2,6s)
- `node --experimental-strip-types --test scripts/portrait-motion.test.mjs scripts/mobile-portrait-motion.test.mjs` — **PASS** (14 testes, 0 falhas)
- `node --experimental-strip-types --test scripts/styles.test.mjs scripts/opening-state.test.mjs` — **PASS** (9 testes, 0 falhas)

## Inspeção de renderização (SSR)

- `Invoke-WebRequest http://localhost:4321/` — página renderiza o capítulo `MotionChapter` com `className="services-section"`, `id="servico"`, `labelledBy="servico-title"`; heading "Quatro jeitos de ajudar." com `id="servico-title"`; componente cliente `ServicePanels` carregado como chunk `src_components_experience_ServicePanels_tsx_*.js`; CSS dedicado `src_components_experience_service-panels_css_*.css`.
- Seção posicionada entre `#a-gente` (Hero) e `#trabalho` (MotionChapter de projetos), conforme plano.

## Revisão de código (subagente GLM)

- **Correção aplicada**: palco pinned passou a usar `top: var(--site-header-height, 80px)` e `height: calc(100svh - var(--site-header-height, 80px))`, evitando cobertura do header fixo sobre o topo dos painéis. Typecheck limpo após a edição.
- **Veredito de conformidade com contratos**: conforme (pessoas/ordem, sem novas alegações comerciais, contatos intactos, fotografias referenciadas, fallbacks preservados, trilho de 300svh intocado).

## QA de navegador (pendente — não homologado nesta entrega)

Os itens abaixo exigem evidência manual e **não** podem ser descritos como concluídos sem execução:

- Desktop pinado: 5 paradas de 100vh, retrato entrando/saindo da borda alternada, frase e assinatura visíveis, parada final com link funcional.
- Transição entre paradas: confirmar se o dip de opacidade (fade-through) é aceitável ou se deve virar crossfade.
- Mobile (fluxo): 4 painéis + fechamento empilhados, fotos e textos completos, sem sticky.
- Teclado: foco no link final apenas quando visível (pendência da revisão — decidir inert/tabIndex/aceitação).
- Movimento reduzido ao vivo: seção em fluxo estático, sem transform.
- Sem JavaScript: conteúdo completo em fluxo.
- Desktop curto (< 640px de altura): verificar recorte de assinatura/frase.
- Hidratação: salto flow → pinned aceitável (consistente com o restante do app).

## Capturas de repositórios (atualização 23/10/2026)

### Comandos executados

- `npm run typecheck` — **PASS** (tsc --noEmit, sem erros)
- `npm run build` — **PASS** (Next.js 16.4.2, Turbopack; compilação em 3,5s; TypeScript em 3,1s; 4 páginas estáticas)
- `node --experimental-strip-types --test scripts/portrait-motion.test.mjs scripts/mobile-portrait-motion.test.mjs scripts/styles.test.mjs scripts/opening-state.test.mjs` — **PASS** (23 testes, 0 falhas)

### Proveniência dos prints

- 4 arquivos em `public/services/`, todos 1600×1000 PNG, registrados em `public/services/manifest.json` com SHA-256, bytes e origem.
- SSR confirma as imagens referenciadas via `repository.print.src` (relativas a `/services/...`) e links para os repositórios.

### Pendências (não homologado)

- Visual QA: conferir se os prints ficam legíveis no palco pinado (texto pequeno de GitHub, contraste do `figcaption`).
- Confirmar se a captura da página ao vivo do `treino` (GitHub Pages) corresponde ao que o usuário espera (vs. página do repositório).
- `Corretor-web` segue 404 em `#trabalho` — pendência separada, não tratada nesta entrega.

## Limites desta verificação

- Aparelho físico, Safari/iOS e aceite estético do usuário não foram homologados automaticamente.
- Push e deploy remoto não foram realizados; esta entrega está na branch `feat/cinematica-2`, sem commit. Push não comprova homologação de deploy remoto.