# Verificação — Pessoas em cena

## Coreografia da página inteira — execução de 21/10/2026

O novo pedido de movimento foi autorizado com **“Implement the proposed plan.”** O [registro](../cinematic-motion-2026-10-21/README.md) e a [verificação desta execução](../cinematic-motion-2026-10-21/verification.md), inicialmente em andamento, guardam evidência nova. Os resultados anteriores abaixo permanecem históricos e não aprovam automaticamente a ampliação.

**Fechamento em 21/10:** QA desta ampliação concluído, encerrando o estado inicial, com build/typecheck, 11 geometrias, smoke 16/16, motion 6/6, mobile 18/18 em Chromium/WebKit, coreografia 15/15 em cada motor e revisão de código/30 capturas. Correções, avisos dos runners, preservação e limites ficam no relatório próprio. Sem commit, push ou deploy.

Data local: **20/10/2026, America/Cuiaba**. Execução técnica local; sem commit, push ou deploy. Branch: `feat/pessoas-em-cena`.

## Escultura azul posterior — 21/10/2026

O usuário autorizou a edição da escultura antiga e sua integração na abertura, em azul **`#2f4bff`** com cromado e transparência preservados. **QA local desta alteração concluído em 21/10**, encerrando o registro inicial em execução, separado no [relatório da escultura azul](../blue-sculpture-2026-10-21/verification.md). Build/typecheck, 11 geometrias, layout 11/11, smoke 16/16, motion 6/6, mobile 18/18 em Chromium e 18/18 em WebKit, revisão independente 13/13, integridade 28/28 e inspeção de vídeo/frames passaram. Os testes foram locais/emulados; aparelho físico e aceite estético não são inferidos. Os resultados de Pessoas em cena e mobile abaixo são baseline histórica; não são reaproveitados como aprovação desta mudança. Sem commit, push ou deploy.

## Execução mobile posterior — 21/10/2026

O **“gooo”** autorizou o [plano mobile](../superpowers/plans/2026-10-21-mobile-motion.md). A implementação acrescenta palco HTML cinematográfico em retrato e coreografia própria aos demais capítulos, substituindo a neutralização anterior das molduras no celular por movimento somente na mídia. **Verificação local desta nova execução concluída em 21/10**, encerrando o estado inicial em andamento, com resultados próprios em [mobile-motion-2026-10-21/verification.md](../mobile-motion-2026-10-21/verification.md): build/typecheck, 11 geometrias, smoke 16/16, motion 6/6, mobile 18/18 em Chromium e 18/18 em WebKit, QA complementar e revisão visual. Os resultados e limites antigos abaixo são históricos, não reaproveitados como prova da execução nova.

Os resultados de build, testes, navegador, acessibilidade, integridade e revisão registrados nos blocos seguintes pertencem às versões anteriores. Foram preservados integralmente e não validam automaticamente o novo mobile. Sem commit, push ou deploy nesta execução.

## Ampliação de movimento — concluída em 21/10/2026

O pedido de mais motions/transições foi implementado após a autorização **“pode seguir”**. Identidade Pessoas em cena, stack, fotos originais, pessoas, oferta e contatos foram preservados. O [roteiro](motion.md) registra as referências e os limites. A prévia final usa o build de produção em **http://localhost:4321/**, restrito à máquina, pelo mesmo gerenciador local. Não houve commit, push ou deploy.

### Evidência atual

| Verificação | Resultado executado |
| --- | --- |
| Build final | `npm run build`: exit 0; raiz, 404 e sitemap estáticos. |
| Typecheck final | `npm run typecheck`: exit 0. |
| Geometria dos retratos | `node --experimental-strip-types --test scripts/portrait-motion.test.mjs`: **6/6 passaram**, incluindo continuidade, proporção e planos paralelos. |
| Smoke completo repetido no build final | `scripts/verify-people.browser.js`: **16/16 passaram**. [Resultado](motion-people-verification.json). |
| QA específico de motion | `scripts/verify-motion.browser.js`: **6/6 passaram**. [Resultado](motion-browser-verification.json). |
| Notebook baixo | 1024×768, 1280×720 e 1440×800: nomes/assinatura, indicador, legenda, retratos e CTA separados; sem overflow. Capturas em `captures/motion/`. |
| Teclado e toque | Menu/Enter/Tab/Escape, foco imediato no contato, âncora do pacote e catálogo com toque emulado passaram. Nenhum WhatsApp foi seguido. |
| Integridade | SHA-256 dos **3/3 retratos** e dos **21/21 arquivos do archive** idênticos aos manifestos; bytes dos retratos também conferidos. |
| Cena parada | **Zero novas chamadas de desenho WebGL em 500 ms** depois de estabilizar; medição por instrumentação das chamadas de desenho. |
| Console e estabilidade | Nenhum aviso/erro de console ou erro de página no percurso de captura; nenhuma entrada de layout shift na navegação inicial observada. |
| Revisão independente | Código final e sete capturas de desktop/celular aprovados no escopo da revisão; sem problemas acionáveis. |
| Detector e diff | Detector executou com exit 0 e dez avisos advisory de cores preexistentes, documentadas em DESIGN.md; `git diff --check` passou. |

Os seis cenários adicionais exercitam movimento reversível das molduras e dos contornos, cancelamento de animações ao ativar movimento reduzido, preservação da imagem durante download lento e escolha mais recente, falha de imagem/nova tentativa/alternâncias rápidas, foco de teclado durante a entrada e menu/âncora/catálogo por toque. Na preferência reduzida ao vivo: **zero animações em execução**, rolagem nativa, contornos de 0 px, molduras sem transform e nenhum canvas.

### Ajustes comprovados pelo QA

- Um primeiro teste de moldura usou uma posição vertical que não correspondia ao centro de uma superfície maior que o viewport. A medição foi corrigida para alinhar os centros; o movimento foi comprovado nos dois sentidos.
- A mudança ao vivo para movimento reduzido revelou uma animação Framer de nome ainda em execução quando seu destino já era zero. O trecho passou a usar CSS condicionado à preferência; a repetição confirmou cancelamento imediato, sem animações restantes.
- A revisão visual de 1024×768 mostrou falta de espaço para o novo indicador. A composição ganhou regras específicas para desktop com altura até 850 px; três tamanhos de notebook passaram na conferência de retângulos e capturas.

### Limites desta verificação

QA em Chromium local, com toque e preferências emulados. Capturas não substituem a avaliação estética do usuário, e não houve teste em aparelho físico, Safari, Firefox ou auditoria integral por leitor de tela. Axe e os cálculos de contraste da primeira entrega abaixo são **baseline histórica**: não foram reexecutados nesta ampliação. A paleta e o conteúdo foram preservados. As medições de desenho e layout são amostras locais; não são escores Lighthouse, garantia de FPS ou medição de todo o JavaScript. O sidecar de design não foi regenerado. Todo o registro anterior permanece abaixo.

## Baseline preservada — primeira entrega de 20/10/2026

## Resultado

Implementação e verificação local concluídas. Revisão independente de código **aprovada**, sem pendências acionáveis. Revisão independente das capturas de projetos, oferta, contato e celular também aprovada no escopo das imagens. A homologação estética da experiência pelo usuário permanece distinta desses checks.

A prévia usa o build de produção em **http://localhost:4321/**, restrito à máquina. Os retratos entram na ordem Fernando Riad → Eduardo Gobatto → Victor Rafael. O código e o conteúdo essencial são HTML; Three.js é importado após a hidratação, apenas em desktop elegível.

## Checks executados

| Verificação | Evidência |
| --- | --- |
| Baseline anterior | `npm run typecheck` passou antes das alterações. Teste da nova apresentação falhou pela ausência de Victor, como esperado. |
| Typecheck final | `npm run typecheck`: exit 0. |
| Build final | `npm run build`: exit 0; raiz, 404 e sitemap gerados estaticamente. |
| Movimento | `node --experimental-strip-types --test scripts/portrait-motion.test.mjs`: **6/6 passaram**. |
| Navegador | `scripts/verify-people.browser.js`, executado por Playwright MCP contra a prévia de produção: **16/16 cenários passaram**. |
| Layout | 320, 390, 768, 1024, 1440 e 1920 px: sem overflow horizontal; nomes, ordem e números comerciais conferidos. |
| Toque | Chromium com tela móvel e toque emulado: menu, âncora do pacote e seletor de catálogo passaram. |
| 404 | HTTP 404; link de retorno com o tratamento azul atual. |
| Alta densidade | DPR do dispositivo 3: canvas de 460 CSS px / 690 pixels, limite efetivo **1,5**. |
| Integridade | **21/21** arquivos arquivados com SHA-256 idêntico; três retratos com originais e hashes conferidos. |
| Diff | `git diff --check` passou. |

### Os 16 cenários do smoke

1. Layout em 320 px.
2. Entrada do retrato fora da tela em celular.
3. Layout em 390 px.
4. Layout em 768 px.
5. Layout em 1024 px, com Three.js.
6. Layout em 1440 px, com Three.js.
7. Layout em 1920 px, com Three.js.
8. Recarga no meio da sequência mantendo Eduardo como apresentação ativa.
9. Rolagem para frente e para trás, seletor de capturas e menu por teclado/Escape.
10. Desktop → celular → desktop, alteração de movimento reduzido ao vivo e foto HTML mantida até o primeiro frame da nova cena.
11. Falha do download do módulo opcional: HTML completo e catálogo ainda interativo.
12. WebGL indisponível: HTML completo e catálogo interativo.
13. Falha de carregamento da textura, injetada no loader de imagens desconectadas: recuperação sem perder o HTML.
14. Perda real de contexto via `WEBGL_lose_context`: canvas removido e apresentação HTML recuperada.
15. JavaScript desativado: três pessoas, preço, contatos e âncoras nativas disponíveis.
16. Movimento reduzido desde a abertura: nenhum canvas e apresentação completa.

O script é um snippet `async (page) => ...` para `browser_run_code_unsafe.filename`, não um comando Node autônomo. O navegador precisa estar na prévia local. Quando a ferramenta restringir os caminhos de scripts, usar uma cópia idêntica na área de trabalho permitida. Nenhum teste segue WhatsApps ou envia mensagens.

## Acessibilidade, aparência e desempenho

- **axe-core 4.14.0**, em 390 e 1440 px, modo de movimento reduzido: **zero violações detectadas** nos conjuntos WCAG 2 A/AA e WCAG 2.1 A/AA. A regra de contraste produziu itens incompletos; esse resultado não equivale a uma auditoria integral de acessibilidade.
- Pares textuais foram calculados separadamente: tinta/base **15,50:1**; secundário/base **6,02:1**; azul/base **5,58:1**; secundário/campo suave **5,00:1**; branco/azul **5,88:1**; secundário claro/azul **4,77:1**. Esses valores não medem cada pixel das fotografias.
- Foco dos botões azuis corrigido de branco sobre a página clara para grafite. Regressão observada em vermelho e depois em verde, com outline final `rgb(20, 32, 51)`.
- Capturas em `captures/`: três pessoas, transição intermediária, projetos, Roger, oferta, contato e duas vistas móveis. Os enquadramentos foram revisados; as fotos mantêm suas proporções e originais.
- Medição da cena parada: **zero novas chamadas de desenho WebGL em 500 ms**; seis chamadas no primeiro desenho das três imagens/molduras. A cena não tem loop contínuo próprio.
- Na navegação medida: nenhuma entrada de layout shift e nenhum aviso/erro no console. Não foram produzidos escores Lighthouse nem alegações de FPS universal.
- O Lenis continua com sua própria gestão de frames; a ausência de novos desenhos WebGL não significa ausência de todo JavaScript da página.

## Correções verificadas durante a execução

- Readiness antiga ao remontar a cena: estado reinicializado quando a elegibilidade muda. O teste congelou RAF para provar que o HTML permanece até o primeiro frame.
- O módulo 3D deixou de participar da entrada obrigatória de hidratação. Importação em efeito elegível, cancelamento de respostas tardias e catch mantêm a página funcional em falha de download. O manifesto de produção foi conferido.
- Planos fotográficos com rotações opostas atravessavam um ao outro. Um teste de regressão falhou no progresso 0,27; os planos agora compartilham orientação, preservando profundidade sem cortes entre superfícies.
- Offset nativo duplicado por `scroll-padding` e `scroll-margin`: mantido um único offset, conferido sem JavaScript.
- Fontes locais integradas por `next/font/local`, com variáveis e preload gerados pelo Next.

## Preservação e limites

Os retratos e suas origens estão em [assets.md](assets.md) e `public/team/manifest.json`. O acervo anterior continua intacto. A versão imediatamente anterior foi copiada para `archive/`, com manifesto de 21 arquivos. `next-env.d.ts` já estava modificado antes desta tarefa; esses bytes estão preservados no archive. O build regenerou seus imports atuais para `.next/types`; o arquivo gerado não foi editado manualmente.

Roger respondeu HTTP 200 com o título esperado. Corretor retornou inicialmente 503 e depois 200 com o título esperado. Os links são externos e sua disponibilidade pode mudar; as capturas locais não dependem deles. Não houve login, envio de formulários nem alteração nos projetos apresentados.

Os testes de navegador e toque foram executados em Chromium/emulação. Não houve homologação em aparelho físico, auditoria completa com leitor de tela ou matriz Safari/Firefox. Nenhum domínio final foi informado e esta entrega não publicou o site.
