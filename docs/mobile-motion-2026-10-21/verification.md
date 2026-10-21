# Verificação — mobile cinematográfico

Data local: **21/10/2026, America/Cuiaba**. Execução autorizada por **“gooo”**, no checkout existente `feat/pessoas-em-cena`. Sem commit, push ou deploy.

**Fechamento local em 21/10/2026: implementação e QA concluídos no escopo abaixo.** Este registro começou com verificações pendentes; os resultados finais substituem aquele estado. Resultados anteriores de [Pessoas em cena](../pessoas-em-cena-2026-10-20/verification.md) continuam preservados como baseline histórica. Aceitação estética e teste em aparelho físico permanecem distintos do QA local.

## Quadro de evidências atuais

| Verificação | Estado nesta execução |
| --- | --- |
| Typecheck final | Exit 0, [log](typecheck-final.log). |
| Build final de produção | `npm run build`, exit 0; Next 16.4.2, rotas `/`, `/_not-found` e `/sitemap.xml` pré-renderizadas. |
| Geometria desktop e mobile | **11/11**: seis anteriores e cinco novos; [log](geometry-final.log). Os novos testes tiveram RED por módulo ausente antes da implementação. |
| Smoke Pessoas em cena | **16/16** contra o build final: [JSON](setup/2026-10-21T12-55-26-870Z-chromium-complete-people/result.json). Inclui desktop Three, reload, falhas de chunk/WebGL/textura/contexto, HTML sem JS e reduce. |
| QA de motion existente | **6/6**: [JSON](setup/2026-10-21T12-55-26-881Z-chromium-complete-motion/result.json). Mídia reversível, catálogo lento/falho/alternância, foco, menu e toque. |
| Cenários específicos mobile | **18/18 Chromium** e **18/18 WebKit**: [Chromium](setup/2026-10-21T12-55-26-881Z-chromium-complete-mobile/result.json), [WebKit](setup/2026-10-21T12-55-26-892Z-webkit-complete-mobile/result.json). Inclui controle positivo de Three no desktop para validar a ausência real no celular. |
| QA complementar | **4/4 Chromium**: [JSON](setup/2026-10-21T12-55-26-921Z-chromium-complete-supplemental/result.json). Texto 200%, ocultação simulada, repouso/CLS e gestos CDP. WebKit: [quatro cenários concluídos](setup/2026-10-21T05-41-18-559Z-webkit-supplemental-final/result.json), com texto ampliado/CDP explicitamente indisponíveis, não aprovados por inferência. |
| Repousos e frames intermediários | [Capturas por viewport](captures/measurements.json), [33 frames do percurso](tour-frames/frames.json) e [oito frames extras de footer/menu](detail-frames/states.json), com três estados intermediários distintos por cena. Inspecionados em conjunto com a gravação. |
| Vídeo mobile completo | [MP4](mobile-tour.mp4), 390×844, 64,68 s, 4.285.564 bytes; gravação de [execução real](setup/2026-10-21T05-40-59-413Z-chromium-release-tour/result.json). FFmpeg decodificou sem erros. Os ajustes finais posteriores afetam somente o CSS do texto ampliado, mantendo o percurso normal gravado. |
| Integridade de fotos e archive | Conferência desta execução: **3/3 retratos e 21/21 arquivos do archive** passaram contra os manifestos em 21/10/2026, 05:29 UTC. [Resultado](asset-verification.json). |
| Revisão independente | Código aprovado após corrigir link de abertura e menu baixo, revalidados nos dois motores. Revisão de 30 frames do percurso sem colisões; frames extras de footer/menu e ajuste final de texto revistos pelo coordenador. |
| Detector/diff | Detector em 13 arquivos UI: sem achados, incluindo [amostra principal](design-detector.json) e [SmoothExperience](design-detector-smooth.json); capítulos/menu tiveram sua passagem independente. Ajustes posteriores revisados manualmente. `git diff --check`: exit 0. |

## Cobertura exigida

320×568, 360×740, 390×844, 430×932, 768×1024, 844×390; limites 767/768 e 1023/1024 nos dois sentidos; preservação do desktop. Conferir rolagem normal/rápida, retorno e recarga intermediária, toque/teclado/menu/Escape, foto ou captura lenta/falha, preferência reduzida inicial/ao vivo, ausência de JavaScript, falha da cena opcional, controles estáveis e nenhuma requisição real de Three no celular.

Os artefatos do runner isolado ficam em `setup/`, com resultado JSON e vídeo por contexto. A tabela pequena de importação assíncrona do Turbopack pode nomear módulos futuros sem carregar Three; distinguir essa tabela de chunks do renderizador na análise de rede.

## Correções verificadas

- Preservação de pessoa ao ativar movimento reduzido: o snapshot nativo de scroll podia anteceder a atualização de pessoa ativa pelo Motion. O anchor acompanha a pessoa que assentou; cenário passou nos dois motores.
- Foco durante entrada: `focusin` cancela animações em andamento e impede reinício pelo observer enquanto o capítulo contém foco. O link da abertura e os controles ficam fora de wrappers animados. Menu baixo tem rolagem local.
- Recarga: a promoção inicial do HTML preserva a restauração nativa; o indicador sincroniza a geometria mesmo quando o progresso já havia sido amostrado. Reload no Eduardo passou em Chromium no hero mobile e desktop.
- Texto ampliado: medição do tamanho real das fontes habilita fluxo sem máscara fixa; header, grids, preço e tipografia refluem. O marcador rotacionado de “Os combinados” recebeu espaço próprio; largura final de 390 px, sem transbordamento no cenário 200%.
- Aba oculta: efeitos CSS finitos também são cancelados, além de WAAPI/Lenis. Retorno conserva posição e não repete entradas.

## Observações de execução

Chromium 148.0.7778.96 e WebKit 26.4, Playwright local 1.60.0, Node 24.13.1. Todos os perfis foram isolados; não se conectou ao navegador do usuário e não se instalaram dependências. Houve timeout somente na finalização de dois browsers do runner (motion e frames); os cenários já haviam passado, os vídeos foram gravados e somente os processos filhos pertencentes ao runner foram encerrados. Os avisos são preservados nos JSONs, separados do resultado comportamental.

Nas duas janelas de repouso de 1,2 s, foram observadas zero animações ativas, zero alterações de transform e zero mutações de estilo. O callback existente de Lenis continua agendado enquanto a aba está visível. A sessão medida em Chromium teve CLS de sessão máximo 0, excluindo shifts marcados como entrada recente; WebKit não expôs a API. Isso não é medição de FPS nem prova universal de ausência de layout shift em rede/dispositivo diferente.

Rolagens com `Input.dispatchTouchEvent` avançaram a página a partir da fotografia, mídia e controles, com `pointercancel` e sem `preventDefault`. `synthesizeScrollGesture` do Chromium instalado não gerou movimentos e teve seu limite registrado; a alternativa nativa CDP foi usada. Política de pinch foi inspecionada (`touch-action:auto`, viewport sem bloqueio), sem afirmar teste físico de multitoque.

## Limites

Os testes locais usam browsers instalados e toque/preferências emulados. Não equivalem a homologação em aparelho físico, auditoria integral por leitor de tela, Safari de aparelho real, Firefox ou garantia de FPS. Resultados de axe/contraste anteriores permanecem históricos até uma nova execução explícita. Não foram seguidos WhatsApps, enviados formulários ou alterados dados dos projetos apresentados.

Limitações demonstradas do WebKit empacotado no Windows: a recarga zerou o scroll também com JavaScript desativado (1500→0); a restauração nativa da posição será reportada somente em Chromium. O cenário WebKit verifica HTML completo após recarga e reentrada determinística no Eduardo. Nesse contexto mobile, Tab e Alt+Tab também pulam links e chegam ao botão do catálogo; foco direto em links e Escape são verificados em WebKit, enquanto o percurso de Tab nativo permanece estrito em Chromium. Essas diferenças de motor não foram apresentadas como uma regressão comprovada da aplicação nem como validação de Safari/iOS.

WebKit ignorou `text-size-adjust:200%`; o cenário informa `supported:false`, sem equivaler a zoom real. A ocultação foi simulada por `document.hidden`/`visibilitychange`, não por suspensão física do aplicativo.

## Executar e revisar

```sh
npm run dev -- --background
npm run dev -- status
npm run typecheck
npm run build
node --experimental-strip-types --test scripts/portrait-motion.test.mjs scripts/mobile-portrait-motion.test.mjs
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=chromium --label=mobile --scenario=scripts/verify-mobile-motion.browser.js
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=webkit --label=mobile --scenario=scripts/verify-mobile-motion.browser.js
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=chromium --label=people --scenario=scripts/verify-people.browser.js
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=chromium --label=motion --scenario=scripts/verify-motion.browser.js
```

Prévia final: **http://localhost:4321/**, produção pelo gerenciador, PID **64376**, restrita a `127.0.0.1:4321`. `npm run dev -- status` confirmou o processo. Para HMR: `npm run dev -- stop` e `npm run dev -- --background`. Para voltar à produção após build: `npm run dev -- --background --production`. Encerrar com `npm run dev -- stop`. Nenhum acesso LAN foi habilitado.
