# Verificação — Cinemática 2 (23/10/2026)

**Versionamento posterior:** o usuário autorizou commit e push da entrega na branch `feat/cinematica-2`. Menções a ausência de versionamento abaixo pertencem ao fechamento local anterior; o envio não altera os resultados ou as pendências de QA e não comprova deploy.

Implementação concluída localmente. **QA Chromium aprovado; WebKit permanece parcial, com falhas descritas abaixo.** Resultados históricos não foram usados como aprovação.

## Código e preservação

| Check | Resultado |
| --- | --- |
| `npm run typecheck` | Passou |
| `npm run build` | Passou; Next.js 16.4.2, três rotas estáticas; saída em `build.txt` |
| Testes Node (`portrait-motion`, `mobile-portrait-motion`, `opening-state`, `styles`) | **23/23**, incluindo dolly, continuidade, planos paralelos e parallax graduado; `node-tests.txt` |
| Checagem extra `noUnusedLocals` / `noUnusedParameters` | Nenhum diagnóstico em `src/`; comando retorna dois diagnósticos dos validadores gerados em `.next/dev/types/`, sem editar fontes geradas |
| Integridade | **57 arquivos protegidos e 16 originais arquivados idênticos**; `integrity.json` |
| Detector Impeccable | Zero erros bloqueantes; dois advisories de branco/translucidez **preexistentes** em `opening.css`; `design-detector.json` |
| `git diff --check` | Sem erros de whitespace; avisos Git de conversão LF/CRLF |

O teste de repouso inicialmente identificou `-0` na coordenada vertical: corrigido na função, sem afrouxar o teste. A revisão também corrigiu a precedência hover/foco do header e a superfície do contato: clareá-la diminuía o contraste do texto secundário; a camada final escurece levemente o azul.

## Navegador — sem novas capturas após o pedido do usuário

Prévia de produção em `http://localhost:4321/`, somente loopback, iniciada pelo gerenciador. agent-browser foi usado na revisão/interação inicial; as suítes existentes foram executadas com Playwright 1.61.1 externo à aplicação. O primeiro transporte CDP do lote legado foi encerrado pelo navegador e não foi contado como aprovação. As execuções finais usam navegadores de QA isolados. Nenhuma dependência foi acrescentada ao projeto.

**Capturas e vídeo foram interrompidos quando o usuário pediu.** Os scripts de QA atuais não chamam screenshot ou gravação, nem em falhas. O acervo anterior foi preservado; suas imagens são anteriores ao ajuste final da lâmina para 32 px e não constituem revisão visual da última alteração. A geometria e as interações finais são verificadas sem imagens.

### Chromium 149.0.7827.55

| Suíte | Resultado | Evidência |
| --- | --- | --- |
| Pessoas / regressão | **16/16** | `chromium-people.json` |
| Motion existente | **6/6** | `chromium-motion.json` |
| Cinemática 2 | **17/17** | `chromium-cinematic.json` |

**39 cenários aprovados**: seis larguras de 320 a 1920 px; ordem/reversão das quatro pessoas; restauração no reload; remount e primeira pintura; foco/teclado/menu; catálogo lento, falha e escolha rápida; falhas de chunk/textura/WebGL e perda de contexto; HTML sem JS e preferência reduzida ao vivo.

Os cenários novos medem parallax sob o scrim imóvel, renderização Three sob demanda e reset por blur, contador reversível, tilt sem mover controles, skew que chega ao repouso, nomes acessíveis do header sem duplicação, ações imóveis, wordmark com folga no último glifo, sete repousos em cada celular de 560/667/844 px de altura, 300svh, landscape em fluxo e texto ampliado em 390/1440 px. O teste de ocultação usa `document.hidden` simulado e verifica cancelamento sem replay; não equivale a uma homologação em aparelho físico.

O smoke legado passou a aguardar fontes e dois frames de layout nas trocas responsivas/antes do reload. Mantém todas as asserções: evita que um novo scroll do próprio teste concorra com a restauração de leitura agendada pela aplicação. `archive/scripts/verify-people.browser.js` preserva a versão anterior.

### WebKit 26.5 (build de QA 2311, Windows)

**Não aprovado integralmente.** A tentativa inicial com o binário antigo 2287 foi substituída pelo binário correspondente ao driver, instalado em diretório temporário isolado, sem coleta/exclusão de caches existentes.

- Novos cenários: seis passaram antes de um timeout ao aguardar o sweep do botão. Diagnóstico posterior encontrou `hoverMedia=true`, `pointerFine=true`, mas o botão não estava em `:hover` após a navegação/rolagem do teste (`webkit-hover-diagnostic.json`). Não declarar esse feedback validado neste motor.
- Motion legado: quatro passaram; falhou a expectativa de Tab alcançar imediatamente o primeiro link do menu.
- Pessoas: sete cenários de layout passaram, incluindo renderer Three em 1024/1440/1920; falhou a expectativa de retornar a Victor no reload intermediário.
- O diagnóstico de restauração isolado registrou sucesso sem intervenção da aplicação e falha ao experimentar a exclusão de scroll anchoring (`restoration-diagnostic.json`). A hipótese foi descartada: **não** foi incluído override de anchoring, timer ou scroll forçado no produto para mascarar o problema.

Os arquivos `webkit-*-failure.json` / `*-wait-failure.json` conservam essas falhas. Não somar aprovações parciais a um resultado de suíte completa. Safari/iOS real, teclado nativo e restauração neste motor exigem validação adicional.

## Acessibilidade, acabamento e limites

- Axe 4.12.1 no HTML com preferência reduzida: **0 violações, 1 regra incompleta de contraste**, 40 regras aprovadas (`a11y-reduced.json`). Não equivale a auditoria integral ou leitor de tela.
- Oito pares de cores conferidos por luminância: **8/8 AA**, incluindo texto secundário sobre o hover final dos contatos, aproximadamente **5,11:1** (`contrast.json`). O resultado preliminar com clareamento está separado em `contrast-initial.json`. Isso não mede todos os frames do vídeo externo.
- A lâmina foi confinada aos 32 px superiores da costura, acima da leitura, para não atravessar palavras azuis. Conteúdo, fontes, fotos, oferta, contatos, stack e duração continuam preservados.
- Sem novo loop, biblioteca ou palco fixo. A aprovação estética final pertence ao usuário. Sem commit, push ou deploy.
- Ao encerrar, servidor devolvido ao modo dev pelo gerenciador, restrito à máquina em `http://localhost:4321/`; home respondeu HTTP 200 e typecheck final passou. `next-env.d.ts` voltou ao conteúdo inicial por geração do próprio Next. Sessão agent-browser encerrada; nenhum lote de navegador ficou em execução.
