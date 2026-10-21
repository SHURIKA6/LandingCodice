# Playwright local isolado — preparação de QA

Verificado em **21/10/2026, 05:09–05:11 UTC** contra a prévia de produção anterior à implementação mobile, em `http://localhost:4321/`. O listener estava em `127.0.0.1:4321`, PID **81884**. Esta verificação comprova o funcionamento do runtime, contexto e vídeo; não aprova o novo mobile.

## Caminho validado

- Node instalado: **v24.13.1**.
- Playwright existente: **1.60.0**, em `C:\Users\ferna\OneDrive\Área de Trabalho\Corretor-web\node_modules\playwright`.
- Chromium: **148.0.7778.96**, executável `C:\Users\ferna\AppData\Local\ms-playwright\chromium-1223\chrome-win64\chrome.exe`.
- WebKit: **26.4**, executável `C:\Users\ferna\AppData\Local\ms-playwright\webkit-2287\Playwright.exe`.
- Encoder de vídeo existente: `C:\Users\ferna\AppData\Local\ms-playwright\ffmpeg-1011\ffmpeg-win64.exe`.

O [runner](isolated-playwright.mjs) lança o executável indicado explicitamente com `launch({ headless: true, executablePath })`, criando seu próprio perfil temporário. Em seguida usa `browser.newContext({ recordVideo, viewport, isMobile, hasTouch })`. Não conecta a uma sessão MCP, Chrome ou Edge do usuário; não encerra processos existentes. Fecha somente os contextos e o browser que criou. Não houve instalação, download ou alteração de `package.json`.

Executar da raiz do repositório:

```powershell
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=chromium --label=preview
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=webkit --label=preview
```

Cada execução cria uma pasta datada dentro de `setup/`, com `result.json`, capturas e vídeo WebM. O cenário padrão abre o hero em 390×844, aguarda hidratação, rola para frente e para trás e registra erros de página. O destino é restrito a loopback na porta 4321.

Para executar cenários locais no formato existente `async (page) => { ... }`:

```powershell
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=chromium --label=people --scenario=scripts/verify-people.browser.js
node docs/mobile-motion-2026-10-21/setup/isolated-playwright.mjs --engine=chromium --label=motion --scenario=scripts/verify-motion.browser.js
```

O runner envolve `browser.newContext` da instância que criou para também gravar contextos abertos pelo cenário; o tamanho do vídeo acompanha `options.viewport`. O cenário e os caminhos são código local confiável. Resultados do cenário ficam em `result.json`, sob `result`. Essas duas suites completas **não foram executadas nesta preparação**.

## Evidência executada

| Execução | Resultado |
| --- | --- |
| Chromium com executável explícito | Exit 0; HTTP 200; largura/scrollWidth 390; nenhum `pageerror`; vídeo VP8 390×844, 267.633 bytes, 3,72 s. [Resultado](2026-10-21T05-09-54-723Z-chromium-explicit-executable/result.json). |
| WebKit com executável explícito + [cenário de contexto aninhado](nested-context-smoke.browser.js) | Exit 0; HTTP 200; abriu segundo contexto isolado; dois vídeos VP8 390×844, 143.870/131.867 bytes, 2,84/2,32 s. [Resultado](2026-10-21T05-09-54-714Z-webkit-nested-context/result.json). |
| Decodificação dos três vídeos acima | `ffmpeg -v error -i <video> -f null -`: exit 0 em todos. Metadados conferidos por `ffprobe`. |
| Captura de abertura Chromium | Inspecionada visualmente: conteúdo e foto do hero renderizados. [Captura](2026-10-21T05-09-54-723Z-chromium-explicit-executable/opening.png). |

A primeira tentativa, preservada nas pastas `*-runtime-validation`, também passou em Chromium e WebKit usando a seleção headless padrão do Playwright. O runner foi então ajustado para selecionar explicitamente o executável que registra no JSON e repetido, com os resultados acima.

## Alternativas presentes e limites

- O runtime empacotado do Codex contém Playwright **1.57.0**, que espera Chromium **1200** e WebKit **2227**. Essas revisões não estavam instaladas; não foi a opção usada.
- `C:\Users\ferna\AppData\Local\npm-cache\_npx\e41f203b7505f1fb\node_modules\playwright` contém Playwright **1.61.1**, com Chromium **1228** instalado. Esse par foi localizado, mas não executado nesta preparação.
- O cache alpha 1.64 espera Chromium 1247/WebKit 2368, ausentes. Evitar usá-lo sem instalar seus browsers.
- A falha anterior do MCP, `Target page, context or browser has been closed`, foi informada pelo coordenador. O runner evita aquele perfil; esta preparação não diagnosticou sua causa nem mexeu em `mcp-chrome`.
- O FFmpeg mínimo do Playwright não possui muxer `null`: a tentativa opcional de decodificar com `-f null -` nele falhou com `Requested output format 'null' is not known`. A conferência foi refeita com o FFmpeg completo **já instalado** em `C:\Users\ferna\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\`, sem download; os três vídeos decodificaram com exit 0.
- WebKit no Windows e toque emulado não substituem Safari/iOS nem aparelho físico. Estes vídeos são da baseline anterior; não constituem evidência da implementação mobile.
