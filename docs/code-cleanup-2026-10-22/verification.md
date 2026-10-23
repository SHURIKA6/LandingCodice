# Verificação — limpeza de código e escopo Tailwind (22/10/2026)

Resultados desta execução local; não reutilizam o QA histórico. Navegador: agent-browser 0.33.1 / Chromium via CDP, contra build de produção em `http://localhost:4321/`, restrito a `127.0.0.1` e iniciado pelo gerenciador do projeto.

## Checks automatizados

| Check | Resultado |
| --- | --- |
| `npm run typecheck` | Passou antes e depois da limpeza |
| `npm run build` | Passou; Next.js 16.4.2/Turbopack, rotas estáticas `/`, `/_not-found`, `/sitemap.xml` |
| `node --experimental-strip-types --test scripts/portrait-motion.test.mjs` | 7/7 |
| `node --experimental-strip-types --test scripts/mobile-portrait-motion.test.mjs` | 5/5 |
| `node --experimental-strip-types --test scripts/opening-state.test.mjs` | 6/6 |
| `node --test scripts/styles.test.mjs` | 3/3; a exclusão de fontes externas falhou antes de restringir o import e passou depois |
| API do TypeScript com `noUnusedLocals`/`noUnusedParameters`, diagnóstico de `src/` | Zero erros/locals/parâmetros ociosos; dois avisos dos validadores gerados fora de `src/` não foram tratados como código morto da aplicação |
| `git diff --check` | Sem erros de whitespace; apenas avisos Git de conversão LF/CRLF |

Total da execução conjunta: **21/21 testes**. Não há script de lint configurado; lint não foi declarado executado. As suítes Playwright legadas não foram executadas nesta etapa.

## CSS gerado

`baseline-build.json` e `build-comparison.json` registram os dois arquivos CSS referenciados pelo HTML da home, medidos antes/depois.

| Métrica | Antes | Depois |
| --- | ---: | ---: |
| CSS total, bytes minificados antes de compressão HTTP | 73.152 | 68.769 |
| Seletores utilitários Tailwind distintos gerados | 25 | 11 |

Economia: **4.383 bytes / 5,99%** de CSS. O ganho combina escopo de fontes e CSS morto removido, não é uma medição isolada do custo do Tailwind. Ainda há tokens incidentais dentro do TypeScript (`static`, `hidden`, etc.); a restrição não promete interpretar exclusivamente `className`. O framework ignora arquivos CSS na detecção automática.

## Invariância visual e de conteúdo

- `baseline-desktop.json` × `final-desktop.json`: 1440×1000, preferência reduzida.
- `baseline-mobile.json` × `final-mobile.json`: 390×844, preferência reduzida.
- Mesmos textos de `main`, mesmos textos/hrefs dos links, mesmas **14 caixas por viewport** com tolerância máxima de 0,05 px. Nenhuma diferença de geometria encontrada; nenhum overflow ou imagem quebrada. Resultado em `layout-comparison.json`.
- Capturas da abertura: `pixel-desktop.json` e `pixel-mobile.json` registram **zero pixels diferentes** nas comparações. Isso cobre essas duas capturas estáveis, não todas as posições intermediárias do site.
- Capturas finais, pacote em movimento, mobile-story, menu sem JS e fallback WebGL foram inspecionados em `captures/`.

## Interação e fallbacks

| Cenário | Evidência / resultado |
| --- | --- |
| Desktop 1440×1000 | `motion-desktop.json`: modo `scroll`, renderer `three`, quatro pessoas e canvas ativos após entrar no hero, sem overflow |
| Pacote atual | `motion-package.json`: sete inclusões, quatro condições, progresso da grade em 1 e número em opacidade 1; zero wrappers de preço obsoletos |
| Catálogo | `catalogue.json`: escolha carregada, imagem com pixels, `aria-pressed=true`, descrição correta; controles sem transform |
| Teclado | `keyboard.json`: Tab alcança link real com `:focus-visible` e outline sólido de 3 px. Nenhum link externo acionado |
| Menu mobile | `menu-keyboard.json`: Escape fecha e devolve foco visível ao summary |
| Leitura mobile reversível | `mobile-stops.json`: quatro fotos/nomes legíveis nos repousos, sequência 0→1→2→3→2→1→0; trilho 2532 px = 300×8,44, sem overflow |
| Toque emulado | `touch-smoke.json`: `maxTouchPoints=1`, ponteiro coarse, abertura/fechamento com `Input.dispatchTouchEvent` e repetição dos sete repousos mantendo toque ativo |
| Movimento reduzido ao vivo | `live-reduced-motion.json`: modo `static`/`html`, coreografia e máscaras de título desfeitas, inclusões em opacidade 1/transform none, quatro pessoas, sem overflow |
| JavaScript desabilitado | `nojs-desktop.json` e `nojs-mobile.json`: 1440×1000 e 390×844, sem hidratação, HTML completo, quatro pessoas, pacote e catálogo noscript presentes. Menu nativo mobile abre sem JS |
| WebGL indisponível | `disable-webgl.init.js` retorna null para contextos WebGL antes da aplicação. `webgl-fallback.json`: modo `static`/`html`, quatro nomes e oferta preservados, sem overflow |
| Erros de página | `desktop-page-errors.json` e `mobile-page-errors.json`: arrays vazios |
| Axe em `#pacote` | `a11y-package.json`: axe 4.12.1, 0 violações, 0 incompletos, 14 regras aprovadas; não é auditoria do site inteiro |

O comando `set device` do CLI ajustou o viewport, mas não manteve emulação touch verificável entre comandos. Por isso `touch-smoke.mjs` usa a conexão CDP do próprio browser gerenciado para habilitar toque e enviar eventos reais do protocolo; não há biblioteca de automação nova. Sem equivalência a aparelho físico.

## Integridade e limites

- Conferidos os hashes de **55 arquivos protegidos**: todo `public/`, oferta, equipe, abertura, package/lock e tsconfig. Nenhuma alteração. Bloco `founders` byte-idêntico ao snapshot inicial; dois arquivos arquivados conferidos contra seus SHA-256.
- Assets históricos, contatos e deleções locais de documentação foram preservados. A limpeza não homologa dados comerciais novos que já estavam no worktree.
- Revisão do diff sem reorganização de imports, dependência nova, abstração extra ou alteração dos fallbacks atuais.
- Após o QA de produção, o gerenciador retornou ao modo dev em `http://localhost:4321/` (loopback); status e typecheck finais passaram. As sessões de navegador criadas para esta execução foram fechadas.
- Apenas Chromium local. Safari/WebKit, aparelho físico, leitor de tela e aceite estético não foram homologados. Não houve commit, push ou deploy.
