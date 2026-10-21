# Verificação — coreografia da página inteira

## Autorização posterior de versionamento — 21/10/2026

O usuário pediu **“Commit e push”** após o fechamento dos checks. A inspeção de publicação confirmou `main` rastreando `origin/main`, remoto `https://github.com/SHURIKA6/LandingCodice.git` e divergência `0 0` após `git fetch origin`. O código e as evidências desta execução são incluídos no versionamento, preservando os registros anteriores. Os checks de aplicação abaixo já haviam sido executados sobre o código entregue; esta etapa acrescenta somente o registro de versionamento. Nenhum resultado de deploy remoto é inferido do push.

Execução autorizada em **21/10/2026, America/Cuiaba**. **Em andamento**: implementação e QA desta alteração. Resultados anteriores não são reaproveitados como prova.

**Fechamento em 21/10/2026: implementação e QA local concluídos**, encerrando o estado inicial acima. Build/typecheck, 11 geometrias, smoke 16/16, motion 6/6, mobile 18/18 em cada motor e novos cenários 15/15 em cada motor passaram. Revisões de código e 30 capturas concluídas. Sem commit, push ou deploy; checkout `main`, prévia de produção em `http://localhost:4321/`, PID **71788**, somente loopback.

## Inspeção inicial

- Checkout `main` sem modificações locais na abertura da implementação.
- Prévia antiga referenciava `02gfungycrztk.css`, ausente em `.next/static/chunks`, com HTTP 500. Reinício pelo gerenciador em modo de desenvolvimento devolveu fundo e fontes corretos e folhas de estilo carregadas.
- Retratos, escultura azul e suas proveniências não fazem parte de edição de assets.

## Verificações desta execução

| Verificação | Evidência desta execução |
| --- | --- |
| Typecheck e build | Passaram. Build final após o ajuste de ResizeObserver: `ttYvd9JGgRJc3Z5XzeBHG`, raiz/404/sitemap estáticos. |
| Geometria dos retratos | **11/11** nos dois arquivos existentes de teste; sem alteração das funções de pose. |
| Motion e interações existentes | **6/6** no build final: [resultado](../mobile-motion-2026-10-21/setup/2026-10-21T23-32-50-452Z-chromium-cinematic-complete-motion/result.json). |
| Smoke Pessoas em cena | **16/16** no build final: [resultado](../mobile-motion-2026-10-21/setup/2026-10-21T23-29-01-049Z-chromium-cinematic-complete-people/result.json). Inclui falhas de chunk/WebGL/textura/contexto, desktop/mobile, HTML sem JS e reduce. |
| Mobile Chromium | **18/18** no build final: [resultado](../mobile-motion-2026-10-21/setup/2026-10-21T23-29-01-024Z-chromium-cinematic-complete-mobile/result.json). |
| Mobile WebKit | **18/18** no build final, sem avisos de encerramento nesta repetição: [resultado](../mobile-motion-2026-10-21/setup/2026-10-21T23-32-50-428Z-webkit-cinematic-stable-mobile/result.json). |
| Coreografia nova | **15/15 Chromium** e **15/15 WebKit** no build final: [Chromium](../mobile-motion-2026-10-21/setup/2026-10-21T23-28-57-962Z-chromium-cinematic-focused-resize-final/result.json), [WebKit](../mobile-motion-2026-10-21/setup/2026-10-21T23-28-57-962Z-webkit-cinematic-focused-resize-final/result.json). |
| Percurso visual | **30 capturas**, desktop 1440×1000 e mobile 390×844: [execução](../mobile-motion-2026-10-21/setup/2026-10-21T23-26-58-506Z-chromium-cinematic-tour/result.json). A única alteração posterior ao percurso é o agendamento da medição de texto ampliado, sem alterar a coreografia. |
| Integridade | **7/7 assets binários** conferidos com SHA-256: três retratos e quatro variantes da escultura. Dados comerciais, manifestos e archive sem diff no Git. Conteúdo dos **21/21 arquivos do archive** igual ao HEAD ao normalizar somente quebras de linha. |
| Detector | Dez arquivos UI analisados, exit 0, sem achados no modo regex. Regras que exigem página renderizada não rodaram; não equivale a auditoria integral. |
| Revisão independente | Código final e **30/30 capturas** revisados; nenhum problema acionável remanescente. Capturas avaliam composição, não FPS ou fluidez em aparelho físico. |

Os cenários novos conferem CSS com resposta 200, trajetória multieixo da escultura/reversão/separação da descrição, passagens e títulos nos dois sentidos, percurso das capturas até 99% sem bordas vazias, controles estáveis, processo horizontal, letras finais, fechamento/reabertura do menu com ponteiro real, foco imediato, preferência reduzida e texto ampliado sem erros de página.

Vídeos: [mobile, 23,60 s / 390×844 / 2.227.176 bytes](mobile-tour.mp4) e [desktop, 23,24 s / 1152×800 / 3.470.726 bytes](desktop-tour.mp4). Conversão e decodificação integral por FFmpeg sem erros. O percurso original foi gravado em 1440×1000 no desktop, reduzido uniformemente na cópia MP4; os WebM originais permanecem no diretório do runner. O vídeo/capturas antecedem somente a correção de agendamento do ResizeObserver, validada separadamente nos dois motores.

## Correções obtidas no QA

- A primeira trajetória da escultura aproximou a peça da descrição; foi reduzida para manter separação. O cenário novo confere os retângulos em três posições desktop, além de reversão em desktop/mobile.
- A revisão independente encontrou perda da intenção de fechar o menu ao ocultar a aba/trocar modo, e especificidade insuficiente dos traços durante a saída. Ambos corrigidos; reversão por novo clique e Escape são exercitados com eventos reais de ponteiro.
- A rodada mobile inicial teve **17/18** nos dois motores: a nova transição da seta ao focar um contato ainda estava ativa após o cancelamento de WAAPI. O foco agora resolve as transições CSS do capítulo imediatamente; repetição antes do ajuste de ResizeObserver passou **18/18 em ambos**.
- O QA novo passou **15/15 Chromium**, mas encontrou um erro de ciclo de ResizeObserver no teste de fonte ampliada do WebKit, apesar da geometria válida. A medição do hero passou a ser agendada uma vez por frame, com cancelamento na limpeza. A repetição final não suprime esse erro e continua monitorando `pageerror`.
- Na repetição paralela da matriz WebKit, o cenário 360×740 coletou uma pessoa intermediária antes do marcador ativo atualizar; a observação seguinte já mostrava Victor no repouso solicitado. A espera fixa de 140 ms foi complementada por espera da pessoa/foto/nome legíveis antes da captura, preservando todas as asserções de proporção, geometria, ordem e controles.

## Preservação e limites

Os hashes históricos de 21 arquivos textuais do archive não coincidem com os bytes do checkout atual. Dezesseis correspondem ao manifesto ao normalizar CRLF para LF; cinco já diferem também no blob do HEAD. Não houve edição do archive nesta execução: `git diff --quiet` nos arquivos protegidos retornou 0 e os 21 conteúdos conferidos continuam iguais ao HEAD após normalizar somente quebras de linha. A divergência anterior fica registrada, sem restaurar ou reescrever o acervo.

Chromium/WebKit locais com toque, preferências e tamanho de fonte emulados não equivalem a aparelho físico, Safari/iOS real ou zoom físico. A simulação de texto ampliado dobra a fonte observada pelo mecanismo de fallback. Não houve envio de mensagens, uso dos links de WhatsApp, alteração de dados externos, push ou deploy.

Alguns runners registraram timeout de `context.close`/`browser.close` depois de concluir os cenários, preservado nos JSONs. Resultados comportamentais e avisos de encerramento são distintos; não foram ocultados erros de página nem relaxadas as asserções.

## Reprodução

```sh
npm run typecheck
npm run build
node --experimental-strip-types --test scripts/portrait-motion.test.mjs scripts/mobile-portrait-motion.test.mjs
npm run dev -- --background --production
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=chromium --label=cinematic --scenario=scripts/verify-cinematic-motion.browser.js
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=webkit --label=cinematic --scenario=scripts/verify-cinematic-motion.browser.js
```

Gerenciar o servidor com `npm run dev -- status`, `logs` e `stop`. Sem `--lan`, a prévia fica restrita à máquina em `http://localhost:4321/`.
