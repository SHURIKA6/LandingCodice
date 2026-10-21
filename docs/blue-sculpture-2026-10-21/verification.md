# Verificação — escultura azul na abertura

Data local: **21/10/2026, America/Cuiaba**. Plano autorizado pelo usuário após confirmar a escultura, a aplicação na landing e a posição na abertura. Checkout existente preservado. Sem commit, push ou deploy.

**Fechamento local em 21/10/2026: implementação e QA concluídos no escopo abaixo.** O registro inicial estava com verificações em execução; os resultados finais encerram aquele estado. Esta tabela não herda as aprovações de [Pessoas em cena](../pessoas-em-cena-2026-10-20/verification.md) nem do [mobile cinematográfico](../mobile-motion-2026-10-21/verification.md). Os resultados abaixo pertencem somente à integração da escultura azul. Aceite estético e aparelho físico permanecem distintos do QA local.

## Evidências desta execução

| Verificação | Estado atual |
| --- | --- |
| Edição da imagem | Executada com `image_gen.imagegen`, saída preservada em PNG e variante WebP criada. [Prompt](prompt.txt) e [manifesto](../../public/brand/codice-sculpture-blue.json). |
| Transparência e proveniência | RGBA e alfa 0–255 nos dois formatos; PNG com cantos alfa 0, WebP `[1,1,0,0]`. Saída original da edição preservada, com prompt e manifesto; conversão WebP mecânica, sem fundo plano. |
| Integridade e preservação | **28/28**: dois originais verde/cromado, dois novos assets azuis, três retratos e 21 arquivos do archive; [JSON](integrity.json). Não houve substituição do PNG/WebP verde nem edição dos retratos. |
| Build final | Passou: [log](build.log), Next.js 16.4.2, rotas `/`, `/_not-found` e `/sitemap.xml` pré-renderizadas. Build ID **`SOX68zeQP07OKL-8d3de1`**; nenhum ajuste de aplicação posterior a esse build. |
| Typecheck | Exit 0: [log](typecheck.log). |
| Geometria desktop/mobile | **11/11**: [log](geometry.log), cobrindo os dois arquivos de teste. |
| Layout, HTML e redução inicial | **11/11**: nove tamanhos, movimento reduzido e ausência de JavaScript; [JSON](../mobile-motion-2026-10-21/setup/2026-10-21T14-32-09-775Z-chromium-blue-sculpture-layout/result.json), [medidas](layout-results.json). |
| Smoke Pessoas em cena | **16/16**, contra o build desta integração: [JSON](../mobile-motion-2026-10-21/setup/2026-10-21T14-32-09-782Z-chromium-blue-sculpture-people/result.json). |
| Cenários mobile | **18/18 Chromium** e **18/18 WebKit**: [Chromium](../mobile-motion-2026-10-21/setup/2026-10-21T14-32-09-768Z-chromium-blue-sculpture-mobile/result.json), [WebKit](../mobile-motion-2026-10-21/setup/2026-10-21T14-34-21-742Z-webkit-blue-sculpture-mobile/result.json). |
| Motion e interações | **6/6**: [JSON](../mobile-motion-2026-10-21/setup/2026-10-21T14-34-21-750Z-chromium-blue-sculpture-motion/result.json). Catálogo lento/falho/alternância, reversão, foco, menu e toque continuam funcionais. |
| Altura da introdução | Mesma altura da [baseline anterior](intro-baseline.json) nas cinco larguras desktop: 1024, 1280, 1366, 1440 e 1920 px. Escultura separada de título/descrição, sem overflow nos nove tamanhos medidos. |
| Capturas e movimento | Nove capturas de repouso aprovadas; exemplos [mobile 390×844](captures/opening-390x844.png) e [desktop 1440×1000](captures/opening-1440x1000.png). Três frames intermediários da entrada e repouso foram inspecionados: [estados](motion-frames/states.json), [início](motion-frames/entry-early.png), [meio](motion-frames/entry-middle.png), [fim](motion-frames/entry-late.png). |
| Vídeo | [Abertura e continuidade](opening-tour.mp4), **14,88 s**, **753.484 bytes**, [metadados](video.json), [execução](../mobile-motion-2026-10-21/setup/2026-10-21T14-34-21-762Z-chromium-blue-sculpture-tour/result.json). FFmpeg decodificou sem erros; revisado pelo coordenador junto com os frames. |
| Revisão independente | **13/13**, aprovada: [dez cenários iniciais](../mobile-motion-2026-10-21/setup/2026-10-21T14-31-45-866Z-chromium-blue-independent-review/result.json) e [três complementares](../mobile-motion-2026-10-21/setup/2026-10-21T14-33-57-488Z-chromium-blue-independent-fallbacks/result.json), incluindo texto ampliado, aba oculta e HTML sem JS. Revisão realizada em Chromium; os demais motores têm cobertura própria indicada acima. |
| Detector/diff | Detector nos três arquivos UI da integração: **zero achados**, exit 0, [JSON](design-detector.json). `git diff --check`: exit 0, [log](diff-check.log). |

## Cobertura executada

Desktop e notebooks baixos, celular, tablet e landscape foram conferidos: dimensões e separação da escultura, título e descrição; ausência de aumento da introdução desktop; ausência de overflow; nome/foto/indicador e contatos sem colisões. Continuidade do palco de 300svh, recarga e breakpoints da versão mobile vigente foram exercitados pelas suítes desta integração.

As rodadas cobriram teclado e toque, redução de movimento inicial/ao vivo, aba oculta, texto em 200%, HTML sem JavaScript e falha do renderizador opcional. A escultura permaneceu decorativa, com dimensões reservadas e alternativa estática; o conteúdo e os controles não dependem da imagem ou de canvas. Vídeo e frames intermediários complementam os estados de repouso.

## Limites e preservação

O runner da revisão inicial ultrapassou 8 s ao encerrar o browser, após os dez cenários concluídos e vídeos gravados. Esse aviso de finalização foi preservado no JSON, separado do resultado comportamental; a rodada complementar encerrou sem aviso.

Browsers locais, toque, preferências e ocultação emulados não equivalem a aparelho físico, Safari/iOS de dispositivo real, auditoria completa de leitor de tela ou garantia de FPS. Manter os limites concretos dos motores e do runner nos resultados novos. Aceite estético do usuário permanece separado do QA técnico.

Os limites do WebKit empacotado no Windows continuam explícitos na suíte: recarga nativa pode zerar o scroll também sem JavaScript; nesse motor, são conferidos HTML após recarga e reentrada determinística na pessoa. Foco direto e Escape são verificados, enquanto o percurso Tab estrito é executado em Chromium porque o contexto WebKit pula links. Não se apresenta esse motor como Safari de aparelho real. A inspeção complementar de texto ampliado e ocultação da escultura foi realizada em Chromium, sem inferir execução equivalente nos demais motores.

Não foram autorizados envio de mensagens, publicação, alteração de oferta/contatos, reconstrução de rostos ou descarte de estudos, prompts, licenças, capturas e archives. PNG/WebP verde, retratos e seus manifestos devem manter seus hashes.

## Reproduzir

```sh
npm run typecheck
npm run build
node --experimental-strip-types --test scripts/portrait-motion.test.mjs
node --experimental-strip-types --test scripts/mobile-portrait-motion.test.mjs
```

Prévia final em **http://localhost:4321/**, produção pelo gerenciador local, PID **47248**, listener **`127.0.0.1:4321`**. Gerenciar com `npm run dev -- status`, `npm run dev -- logs` e `npm run dev -- stop`. Para produção, após build, iniciar com `npm run dev -- --background --production`; para HMR, parar o processo existente e iniciar `npm run dev -- --background`. Nenhum acesso LAN foi habilitado.
