# Mobile cinematográfico — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar movimento forte e contínuo no celular, com retratos e nomes em um palco fixo controlado pela rolagem e coreografia própria para todos os capítulos.

**Architecture:** Preservar HTML e conteúdo, separar modo de movimento do renderizador e usar progresso local/reversível com Framer Motion. O hero compartilha uma árvore de pessoas entre versões; a mídia do portfólio recebe movimento enquanto controles ficam estáveis. Celular usa DOM/CSS, sem Three.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion e Lenis existentes; Three.js somente no desktop já elegível.

**Spec:** [Design e roteiro mobile](../specs/2026-10-21-mobile-motion-design.md).

**Fechamento da execução em 21/10/2026:** autorizado por “gooo”, implementado e verificado localmente. Typecheck/build, 11 testes de geometria, smoke 16/16, motion 6/6, mobile 18/18 em cada motor e QA complementar concluídos. [Evidências e limites](../../mobile-motion-2026-10-21/verification.md). Os checkboxes registram esta execução; o estado original de proposta abaixo fica preservado como histórico. Sem commit, push ou deploy.

**Estado:** solicitado por `/plan` em 21/10/2026; palco cinematográfico escolhido pelo usuário; **plano proposto, implementação não iniciada**. Valores de coreografia são escolhas propostas da IA. Não interpretar o “pode seguir” da entrega anterior como execução deste novo plano.

## Global Constraints

- Preservar Pessoas em cena, fotos originais e manifestos, fontes/licenças, oferta, contatos, portfólio e histórico.
- Pessoas: Fernando Riad → Eduardo Gobatto → Victor Rafael. Sem inferir cargos, contatos ou condição de estudante de Victor.
- Hero desktop conserva 300svh; trilho cinematográfico mobile terá 300svh, com introdução fora dele.
- Sem dependências, imagens ou vídeos novos; sem Three/canvas abaixo de 1024 px.
- Conteúdo completo em SSR/sem JS/movimento reduzido e em falha. Preferência reduzida deve cancelar animações ao vivo.
- Preservar scroll vertical e pinch zoom; `syncTouch:false`; nenhuma captura global de gestos.
- Substituir na implementação a política antiga de molduras imóveis no telefone, preservando seu registro como histórico.
- Usar o checkout atual sem descartar trabalho sujo. Sem commit, push, deploy ou worktree adicional nesta entrega, salvo pedido posterior.

## Review Focus

1. Mudança de orientação ou breakpoint durante o retrato não pode perder a pessoa/posição nem duplicar títulos — Tarefas 1–2.
2. Toque/foco durante deslocamento não pode mover ou encobrir o alvo — Tarefas 3–4.
3. Preferência reduzida ativada durante qualquer efeito precisa parar o movimento e expor todo o conteúdo — Tarefas 1–4.
4. Recarga intermediária, retorno e rolagem rápida precisam produzir o mesmo retrato e progresso — Tarefas 1–2.
5. Foto/catálogo lento ou falho não pode deixar superfície vazia nem substituir a última escolha — Tarefas 2–3.

## Mapa de arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| Novo `src/components/experience/useMotionMode.ts` | Política responsiva reativa e preferência reduzida. |
| Novo `src/components/experience/mobilePortraitMotion.ts` | Progresso e poses mobile puros, sem React/DOM. |
| Novo `src/components/experience/PersonCard.tsx` | Extrair o cartão atual e aplicar poses sem duplicar conteúdo. |
| `Hero.tsx`, `globals.css` | Trilho/palco, introdução, indicador e composição compacta. |
| `ScrollFrame.tsx`, `ProjectStage.tsx`, `page.tsx`, `interaction-motion.css` | Movimento das mídias e troca de captura; controles estáveis. |
| `MotionChapter.tsx`, `Header.tsx`, `globals.css` | Passagens, oferta, processo, contato e menu/toque. |
| Novo `scripts/mobile-portrait-motion.test.mjs` | Contratos da geometria e progressão. |
| Novo `scripts/verify-mobile-motion.browser.js` | Comportamento e frames intermediários mobile. |
| `scripts/verify-people.browser.js`, `scripts/verify-motion.browser.js` | Atualizar expectativas mobile e preservar regressões. |
| Docs vigentes + pasta de evidências da etapa | Contratos atualizados, resultados reais, vídeo e capturas. |

## Task 1: Definir política e geometria mobile

**Files:** criar `useMotionMode.ts`, `mobilePortraitMotion.ts` e `scripts/mobile-portrait-motion.test.mjs`; consultar `useReducedPreference.ts` sem duplicar seu mecanismo.

**Interfaces:**

```ts
type MotionMode = 'static' | 'mobile-story' | 'mobile-flow' | 'desktop';
useMotionMode(options: { sceneFailed: boolean }): MotionMode;
type MobilePose = {
  xPercent: number; yPercent: number; scale: number; rotation: number;
  opacity: number; nameYPercent: number; nameOpacity: number; zIndex: number;
};
type MobileStoryFrame = { activeIndex: 0 | 1 | 2; panels: readonly MobilePose[] };
getMobileStoryFrame(progress: number): MobileStoryFrame;
```

- [x] Escrever testes de comportamento: progresso inválido/overscroll normaliza; .08/.50/.92 selecionam Fernando/Eduardo/Victor; fotos em repouso centrais, escala 1, rotação 0; movimento contínuo nos limites .18/.38/.62/.82; reversão restaura as mesmas poses; ao menos um retrato permanece visível em toda troca; escala uniforme preserva proporção.
- [x] Executar `node --experimental-strip-types --test scripts/mobile-portrait-motion.test.mjs` e comprovar a falha pela ausência da geometria. Não criar framework de testes novo nem asserts de texto-fonte.
- [x] Implementar poses a partir dos intervalos da spec, com interpolação suave nos trechos de troca, limites de 38%/12%/6° e escala .82–1.04. Dados não dependem de frames anteriores.
- [x] Implementar hook reativo: SSR/reduce → `static`; largura ≥1024 e cena válida → `desktop`; abaixo de 1024 em retrato/altura ≥560 → `mobile-story`; demais celulares/tablets baixos → `mobile-flow`. Falha Three em desktop conserva fallback atual.
- [x] Reexecutar o teste novo e `scripts/portrait-motion.test.mjs`; ambos passam. `npm run typecheck` passa.

## Task 2: Construir o palco das três pessoas

**Files:** `Hero.tsx`, novo `PersonCard.tsx`, `globals.css`, novo `scripts/verify-mobile-motion.browser.js`.

**Interfaces:** `PersonCard({ member, index, active, mode, progress })`, com `member: TeamMember`, `index:number`, `active:boolean`, `mode:MotionMode` e `progress:MotionValue<number>`. Consome `getMobileStoryFrame` da Tarefa 1. Renderizador Three e callbacks de prontidão/falha permanecem no contrato atual.

- [x] Criar cenário de navegador que exija palco sticky mobile e diferenças reais entre três posições de scroll; observar falha no mobile atual. Testar resultado visível/matriz, não presença de className.
- [x] Extrair cartão sem alterar conteúdo. Introduzir wrappers de trilho e palco; manter uma única lista semântica e a introdução fora do sticky mobile. Desktop continua consumindo o mesmo cartão e suas poses atuais.
- [x] Vincular o palco mobile ao seu próprio progresso 0–1, descontando header e altura útil. Aplicar poses na fotografia e máscara no nome em wrappers separados; indicador de três segmentos visível no telefone. Estado React muda só nos limiares de pessoa ativa, .28 e .72.
- [x] Implementar 300svh no trilho e palco útil em `svh`/safe areas. Em altura até 700 px, compactar fotografia/nome/espaços; em landscape/altura <560, usar `mobile-flow` forte em fluxo. Medições inválidas mantêm HTML estático.
- [x] Recalcular geometria em orientação/breakpoints preservando a âncora da pessoa visível. Recolhimento de barra não reinicia progresso; recarga intermediária usa a posição restaurada pelo navegador.
- [x] Testar 0→.5→1→.5→0, scroll rápido, reload no Eduardo, mudanças 767/768 e 1023/1024, orientação, retrato lento/falho e entrada antes de hidratar. Com reduce ao vivo/sem JS: fluxo completo, foco e três nomes/fotos presentes. Não solicitar chunk Three no mobile.
- [x] Gravar primeira evidência em movimento: abertura, duas trocas de retratos e salto “Ver projetos”. Rever intensidade e legibilidade antes de prosseguir.

## Task 3: Liberar movimento forte nos projetos com controles estáveis

**Files:** `ScrollFrame.tsx`, `ProjectStage.tsx`, `page.tsx`, `interaction-motion.css`, `globals.css`; cenários no script mobile e atualização de `verify-motion.browser.js`.

**Interfaces:** manter `ScrollFrame({ children, kind })` e `ProjectStage({ repositoryHref, demoHref })`; mover a fronteira de `ScrollFrame` para conter apenas a figura/browser da mídia. `kind:'project'|'roger'` permanece; a política vem do hook da Tarefa 1.

- [x] Acrescentar caso que compara movimento da mídia em duas posições e confirma botões/links em layout estável durante a aproximação. Substituir o teste que exige `transform:none` incondicional no mobile; preservar essa exigência sob reduce.
- [x] Remover a neutralização global até 767 px e configurar trajetória mobile da spec: escala .86→1, deslocamento até 64 px e rotação até 2°, com Roger em sentido oposto. Limitar o deslocamento de leitura a 24 px e garantir retorno determinístico.
- [x] Colocar todos os controles e descrições fora do wrapper móvel. Foco e `pointerdown` estabilizam qualquer ancestral que ainda possa afetar a área acionável.
- [x] Acrescentar transição horizontal de até 8% ao crossfade de 350–450 ms, conservando a captura anterior até load/decode. Respeitar último pedido, falha/nova tentativa, cliques rápidos e reduce ao vivo; não adicionar gesto obrigatório ou novo carrossel.
- [x] Testar scroll de toque iniciado sobre foto, mídia e botões, ativação durante chegada, download lento/abortado, alternância rápida e reversão. Vertical/pinch permanecem nativos.

## Task 4: Coreografar capítulos, oferta, processo e fechamento

**Files:** `MotionChapter.tsx`, `page.tsx`, `Header.tsx`, `interaction-motion.css`, `globals.css`; cenários no script mobile.

**Interfaces:** manter props públicas de `MotionChapter`; consumir `MotionMode` reativo. Adicionar atributo `data-reveal` somente nos grupos que o roteiro requer e wrappers semânticos preservando os títulos/contatos existentes.

- [x] Implementar os momentos 1/3/5/6/7 da spec: abertura até 1,1 s; passagem com até 64 px; preço completo/grupos até 48 px e 240 ms de stagger total; trilho de processo por scroll; fechamento por letras até 300 ms de atraso total.
- [x] Diferenciar máscara tipográfica, movimento de superfície e progressão do processo. Não aplicar uma entrada genérica igual a todos os elementos. Acionar CTA/rodapé por visibilidade, evitando animação consumida antes de chegar ao elemento.
- [x] Política de amplitude acompanha resize/orientação. Não transformar ancestral sticky; um autor de transform por nó; entradas finitas canceladas ao ocultar aba ou receber foco/toque. Remover listeners/observers/`will-change` ao desmontar/sair.
- [x] Reforçar painel e sequência do menu conservando `details/summary`, acesso imediato, toque, Escape e retorno de foco. Press .97 com retorno curto e cancelamento; sem hover obrigatório.
- [x] No navegador, observar frames intermediários de passagem, preço completo, trilho em três posições, contatos disponíveis durante chegada, menu por toque/teclado e cancelamento de todos os movimentos ao ativar reduce. Confirmar que o CTA continua imediatamente acionável e seu href não mudou.

## Task 5: Validar a experiência completa e atualizar o contrato

**Files:** scripts existentes/novo mobile; `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `README.md`, `.impeccable/surfaces/src-pages-index-astro.md`, briefing/`motion.md`/`verification.md` atuais; criar pasta `docs/mobile-motion-2026-10-21/` para evidências sem apagar capturas anteriores.

- [x] Atualizar `verify-people.browser.js`: celular animado deixa de exigir `data-mode=static`; continua exigindo renderer HTML, três pessoas e ausência de canvas. Manter testes de falhas Three e preferência reduzida.
- [x] Executar typecheck, build, os dois scripts Node de geometria e os três smokes de navegador contra o build final. Usar o gerenciador `npm run dev -- --background`, `status`, `logs`, `stop`; produção em localhost:4321, sem `--lan` não solicitado.
- [x] Conferir 320×568, 360×740, 390×844, 430×932, 768×1024 e 844×390; os quatro limites de breakpoint nos dois sentidos; preferência reduzida, sem JS, zoom de texto, aba oculta, reload/volta e falhas de imagem.
- [x] Capturar ao menos três frames intermediários por momento e um vídeo completo mobile com rolagem normal/rápida/reversa. Revisar frames junto com vídeo; não validar motion apenas por screenshot final.
- [x] Medir console/CLS, atividade parada, ausência de Three mobile e integridade de retratos/archives. Exercitar Chromium e WebKit disponíveis; aparelho real e motores indisponíveis recebem status separado, sem afirmar execução. Registrar desempenho observado sem promessa universal de FPS.
- [x] Solicitar revisão independente de código e vídeo/capturas. Corrigir problemas concretos antes de concluir.
- [x] Acrescentar novo registro vigente nos docs: política mobile intensa substitui a antiga neutralização; modo renderer/motion separados; exceções reduzidas e comportamento landscape explícitos. Preservar história e resultados anteriores como baseline.
- [x] Entregar prévia local, vídeo, mudanças realizadas, checks executados e limites. A aceitação da intensidade é do usuário; não equivale ao QA técnico.

## Comandos de verificação previstos

```sh
npm run typecheck
npm run build
node --experimental-strip-types --test scripts/portrait-motion.test.mjs scripts/mobile-portrait-motion.test.mjs
```

Os três `scripts/verify-*.browser.js` são snippets assíncronos para Playwright MCP, não comandos Node autônomos. Iniciar cada execução com o navegador na prévia local. Novos checks só podem ser marcados como aprovados após executar a implementação.

## Revisão do plano

Cobertura: Tarefa 1 define as faixas/modes; Tarefa 2 entrega palco; Tarefa 3 entrega portfólio; Tarefa 4 cobre os demais momentos; Tarefa 5 verifica percurso e contratos. Nenhuma tarefa depende de assets novos ou de contato, função ou claim não autorizados. Nesta etapa, somente este plano, sua spec e registros documentais são entregues.

Revisão independente de clareza e viabilidade concluída em 21/10/2026: nenhuma pergunta indispensável pendente para executar dentro da direção proposta. Links locais conferidos e `git diff --check` passou. Não foram executados testes da aplicação nesta etapa de planejamento.
