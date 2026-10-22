# Prompt: CODICE Studio 26 — Editorial Hero & Landing Page (Baseado em KAIRN Alpine 26)

> **Como usar na sua IDE (Cursor / Windsurf / Copilot / Claude Code):**
> - **Opção A (Prompt em Inglês Técnico + Copy em Português — Recomendado para LLMs de código):** Copie a seção **1** abaixo para obter máxima precisão geométrica, pois os modelos seguem instruções de layout/CSS (`--k`, `font-stretch`, `1546×1017`) com maior fidelidade na estrutura original do Motion.AI.
> - **Opção B (Prompt 100% em Português adaptado para Next.js / App Router ou HTML puro):** Copie a seção **2** caso queira colar em português direto no seu repositório atual.

## 1. Prompt Principal para IDE (Estrutura Exata Motion.AI + Identidade CODICE.studio)

Build a **landing hero and editorial showcase for a high-craft web & software studio**, **CODICE** (collection/edition **"SINOP 26"**). Look and feel: light-mode winter/studio editorial with extreme typographic precision. Keep the exact spatial geometry, `--k` proportional scaling, 2×2 tile cluster, side-shade readability gradients, and 2.2s choreographed CSS entrance from the KAIRN Alpine 26 reference, adapted to **CODICE.studio** (Sinop, MT — Fernando Riad, Eduardo Gobatto, and Victor Rafael).

*(Stack note: If generating in an existing Next.js/React repo, implement as modular components in `app/page.tsx` with scoped CSS variables for `--k`; if generating standalone, build a single-file plain HTML, CSS and vanilla JS build with zero external runtime dependencies beyond Google Fonts).*

### Scene

- **Plate:** the background is ONE 16:10 photo (`1728×1080`): use `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg` as the default high-contrast editorial plate (expose a CSS custom property or constant `HERO_PLATE_URL` so it can be swapped for a studio B&W portrait). Apply `object-fit: cover`, `object-position: 50% 30%` (phones: `50% 18%`, then `50% 0`).
- **Motion:** a 5s muted looping video of the same plate plays over it with **identical cover rules**: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/823d013d-bf03-4967-b08f-63c3752df435.mp4` (`1152×720`, `autoplay loop muted playsinline`).
  - Start the video at `opacity: 0` and fade it in smoothly (`transition: opacity 700ms ease`) only once its first frame is ready (`loadeddata` / `canplay` event).
- **Readability:** a soft, cool navy side-shade (`linear-gradient(90deg, rgba(22,52,84,.34) 0%, rgba(22,52,84,0) 55%, rgba(22,52,84,.20) 100%)`) keeps white type crisp and readable over the pale background.
- **Rule:** nothing in the background scene is drawn or animated in code.

### Type and colour

- **Display:** **Anybody** (Google Fonts variable width, `wdth` axis `115–150%`, `font-stretch: 115%–150%`), set wide, for the logo, nav, headline, card titles, counters, and buttons.
- **Text:** **Inter** for body copy, captions, and small UI text.
- **Colours:**
  - Text primary: pure white `#FFFFFF`
  - Accent primary: **ice cyan `#44DAFD`** (hover state `#6FE3FF`)
  - Secondary card surface: **cream card `#F3F1E9`**
  - Dark text / contrast ink: **ink black `#0B0F17`**

### Layout (desktop: a measured 1546×1017 canvas scaled by `--k = min(100vw/1546, 100vh/1017)`)

- **Top left:** the text wordmark **"CODICE."** at `calc(28 * var(--k))`, wide (`Anybody` 800, `font-stretch: 135%`), with **"CO"** in cyan (`#44DAFD`) and **"DICE."** in white (`#FFFFFF`).
- **Top centre:** `"A GENTE / OS PROJETOS / SEU SITE"`, wide caps, `calc(15.4 * var(--k))`, letter-spacing `0.14em`.
- **Top right:** a location/status pin icon (`SINOP · MT`), `"VAGAS"` in wide caps and a round white counter `"2"` (ink black text inside a solid white circle, indicating 2 project slots open this month).
- **Middle left:**
  - three slider dots (the first active in cyan `#44DAFD`, clicking or auto-cycling highlights the 3 studio pillars/founders)
  - the eyebrow `"DE SINOP · PERTO DA SUA IDEIA"` in wide caps
  - a huge wide, thin headline at about `calc(106 * var(--k))` (`line-height: 0.94`, zero overlap with adjacent elements):
    - Line 1: **"PESSOAS."** (solid white)
    - Line 2: **"IDEIAS."** (solid white)
    - Line 3: **"TRABALHO"** in outline letters (`color: transparent`, `-webkit-text-stroke: 1.8px #44DAFD`)
- **Middle right, a 2×2 tile cluster:**
  - **System card (top-left of cluster, solid cyan `#44DAFD`, ink black text):** eyebrow `"01 / SISTEMA EM PRODUÇÃO"`, a large bold wide `"CORRETOR / MT"` and subtitle `"Por fora, apresenta. Por dentro, organiza."` (referencing the Lucas Gobatto CRECI 15776 real estate platform).
  - **Beside it (top-right of cluster):** `"SINOP / 26"` in large wide white type (`Anybody`, `font-stretch: 140%`) with subtle sub-label `"ARQUITETURA AUTORAL"`.
  - **Glass circle (bottom-left of cluster):** a frosted cool-blue circle (`backdrop-filter: blur(18px)`, `background: rgba(22, 52, 84, 0.36)`, `border: 1px solid rgba(255,255,255,0.22)`) with a `↗` arrow and `"01 / 03"` with an SVG progress ring (cyan `#44DAFD` arc). Clicking cycles through the 3 founders without any text collision:
    - `01 / 03` — `Fernando Riad · Engenharia & Produto`
    - `02 / 03` — `Eduardo Gobatto · Arquitetura & Sistemas`
    - `03 / 03` — `Victor Rafael · Design & Experiência`
  - **Project card (bottom-right of cluster, cream `#F3F1E9`, ink black text):** clean preview thumbnail of the real estate catalog & filter UI, then `"PROJETO 01"` and an interactive link `"EXPLORAR PROJETOS ↗"` (scrolls to the selected projects section or opens the live demo modal; never leave dead links).
- **Bottom left:** a frosted navy glass story card (`backdrop-filter: blur(18px)`, `background: rgba(16, 36, 60, 0.48)`, `border: 1px solid rgba(255,255,255,0.18)`) with a B&W studio/founders thumbnail, `"TECNOLOGIA FEITA POR GENTE"` in cyan (`#44DAFD`), and `"Somos Fernando, Eduardo e Victor. / Criamos sites e sistemas para colocar / seu negócio em evidência. Conhecer a gente"`.
- **Bottom centre:** a cyan (`#44DAFD`) `"VAMOS CONVERSAR NO WHATSAPP"` button (ink black wide text, linking to `https://wa.me/5566999356646?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Codice%20e%20quero%20conversar%20sobre%20meu%20site.`) sitting centered on a thin `1px` horizontal rule (`rgba(255,255,255,0.28)`) that spans across the page.
- **Bottom right:** `"CONTATO DIRETO"` and three round outline action icons (`WhatsApp` pointing to Fernando `+55 66 99935-6646`, `WhatsApp 2` pointing to Eduardo `+55 66 8418-4488`, and `GitHub` pointing to `https://github.com/Edu4rdo-Gobatto`), the first ringed in cyan (`#44DAFD`).

### Motion (UI)

- **Entrance:** a one-time CSS entrance, about `2.2s` total, using `cubic-bezier(0.22, 1, 0.36, 1)`:
  1. `0.00s – 0.45s`: The `"CODICE."` logo, top nav, and right counter settle in; the three slider dots and `"DE SINOP · PERTO DA SUA IDEIA"` eyebrow fade/slide in.
  2. `0.45s – 1.15s`: Each headline line (`"PESSOAS."`, `"IDEIAS."`, `"TRABALHO"`) types/reveals upward in turn via masked `translateY(105%)` to `0%`.
  3. `1.05s – 1.70s`: The cyan `"CORRETOR / MT"` card, `"SINOP / 26"`, the `"01 / 03"` glass circle (animating its SVG cyan arc `stroke-dashoffset`), and the cream `"PROJETO 01"` card arrive with a crisp stagger.
  4. `1.65s – 2.20s`: The bottom-left story card and the `"VAMOS CONVERSAR NO WHATSAPP"` button settle; the `1px` bottom horizontal rule draws across (`transform: scaleX(0)` to `scaleX(1)`); the bottom-right contact icons fade in last.
- **Hover:** the primary cyan button lightens to `#6FE3FF` with a subtle `translateY(-1px)` lift; the glass circle rotates its `↗` arrow by `45deg`.
- **Reduced motion:** inside `@media (prefers-reduced-motion: reduce)`, disable all entrance keyframes (render in final resting state immediately) and hide/disable the background `<video>`.

### Tablet and phone

- **Tablet (`768px – 1024px`):** unlock the fixed desktop `--k` aspect canvas into a clean portrait composition: header row at top, masked hero photo with the 3-line headline overlaid, followed by the story card paired with the 2×2 tile cluster in a 2-column grid, and the bottom action row.
- **Phone (`< 768px`):**
  - a viewport-height hero (`min-height: 100svh`) with the photo masked into the page (`object-position: 50% 18%`, adjusting to `50% 0%` on narrow screens)
  - the centre nav moves into a slide-over burger menu with corrected Portuguese labels (`"A gente ->"`, `"Os projetos ->"`, `"Seu site ->"`, `"Vamos conversar ->"` — ensure zero text truncation)
  - below the fold come the 2×2 tiles, the frosted story card, and the direct WhatsApp contact row

### Acceptance check (1440×900)

- The pale icy editorial hero shows the full-bleed plate and smooth fade-in looping video in the centre, the big wide **"PESSOAS. / IDEIAS. / TRABALHO"** on the left, and the cyan (`#44DAFD`) + cream (`#F3F1E9`) 2×2 tile cluster on the right.
- Zero text overlap or clipping across any viewport (`1440×900`, `1280×800`, `768×1024`, `390×844`).
- All WhatsApp CTAs use universal `https://wa.me/` URLs (never `whatsapp://send`).

## 2. Versão em Português (Caso queira colar em PT-BR no Cursor / Windsurf)

Construa a **Hero Section Editorial da CODICE (`SINOP 26`)** seguindo rigorosamente a geometria, tipografia variável e coreografia de entrada de 2.2s da referência **KAIRN Alpine 26**.

### Cena e Fundo (`Scene`)

- **Plate Estático:** Uma imagem `16:10` (`1728×1080`) ocupando `100%` do palco (`object-fit: cover`, `object-position: 50% 30%` no desktop; `50% 18%` e `50% 0%` em smartphones): `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/18a4a3c1-2af7-4c4a-9045-f6ddff26f4ca.jpg`.
- **Vídeo em Loop:** Vídeo de 5s sem som (`muted loop playsInline`) sobreposto com exatamente as mesmas regras de `object-fit: cover` e `object-position`: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/823d013d-bf03-4967-b08f-63c3752df435.mp4` (`1152×720`). Aplique `opacity: 0` inicialmente e faça fade-in suave assim que o primeiro frame estiver pronto (`onLoadedData` / `canplay`).
- **Sombra de Leitura (`Readability`):** Gradiente lateral azul-marinho frio (`rgba(22,52,84,.34)` na esquerda caindo para `0` em `55%`, e voltando a `0.20` na extrema direita) garantindo leitura perfeita da tipografia branca sobre o fundo claro.
- **Regra Estrita:** Nada na cena de fundo é desenhado ou animado via Canvas/WebGL; todo o impacto vem do plate + vídeo e da precisão suíça da interface.

### Tipografia e Paleta (`Type & Colour`)

- **Display:** Fonte variável **Anybody** (Google Fonts), expandida (`font-stretch: 115%–150%`), aplicada na wordmark `CODICE.`, navegação, headline de 3 linhas, títulos dos cards e botões.
- **Texto Auxiliar:** **Inter** para textos corridos, legendas e metadados.
- **Cores:** Texto principal branco (`#FFFFFF`), cor de destaque **Ice Cyan `#44DAFD`** (hover `#6FE3FF`), card secundário **Creme `#F3F1E9`**, texto escuro **Ink Black `#0B0F17`**.

### Layout Desktop (Canvas medido de `1546×1017` escalado por `--k = min(100vw/1546, 100vh/1017)`)

- **Top Left:** Wordmark **"CODICE."** em `28px` wide, com **"CO"** em ciano (`#44DAFD`) e **"DICE."** em branco.
- **Top Centre:** `"A GENTE / OS PROJETOS / SEU SITE"` em caixa alta expandida, `15.4px`.
- **Top Right:** Ícone de pino/status `"SINOP · MT"`, label `"VAGAS"` e contador circular branco `"2"`.
- **Middle Left:**
  - Três pontos de slide (o primeiro ativo em ciano `#44DAFD`).
  - Eyebrow `"DE SINOP · PERTO DA SUA IDEIA"`.
  - Headline monumental fina e larga (~`106px`, sem nenhuma colisão com o subtítulo): **"PESSOAS."** / **"IDEIAS."**, seguido de **"TRABALHO"** apenas com contorno vazado (`stroke` em ciano `#44DAFD`).
- **Middle Right (Cluster 2×2):**
  - **Card 1 (Ciano `#44DAFD`):** `"01 / SISTEMA EM PRODUÇÃO"`, título largo em negrito `"CORRETOR / MT"` e legenda `"Por fora, apresenta. Por dentro, organiza."`.
  - **Card 2 (Ao lado, tipográfico):** `"SINOP / 26"` em tipografia `Anybody` ultra-larga branca.
  - **Card 3 (Círculo Frosted Glass):** Círculo azul-gelo translúcido (`backdrop-filter: blur(18px)`) com seta `↗` e contador `"01 / 03"` envolto por um anel de progresso SVG em arco ciano (`#44DAFD`). Ao clicar, alterna entre os 3 sócios (*Fernando Riad*, *Eduardo Gobatto* e *Victor Rafael*) sem sobrepor textos.
  - **Card 4 (Card Creme `#F3F1E9`):** Miniatura visual limpa do catálogo imobiliário (Lucas Gobatto - CRECI 15776), seguida de `"PROJETO 01"` e `"VER DEMONSTRAÇÃO ↗"`.
- **Bottom Left:** Story card em vidro azul-marinho translúcido com miniatura P&B da equipe, título `"TECNOLOGIA FEITA POR GENTE"` em ciano (`#44DAFD`), e texto `"Somos Fernando, Eduardo e Victor. / Criamos sites e sistemas para colocar / seu negócio em evidência. Conhecer a gente"`.
- **Bottom Centre:** Botão ciano (`#44DAFD`) `"VAMOS CONVERSAR NO WHATSAPP"` assentado exatamente sobre uma linha horizontal fina (`1px`) que atravessa a largura da página, apontando para `https://wa.me/5566999356646?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Codice%20e%20quero%20conversar%20sobre%20meu%20site.`.
- **Bottom Right:** `"CONTATO DIRETO"` e três ícones circulares contornados (WhatsApp Fernando, WhatsApp Eduardo, GitHub), sendo o primeiro contornado em ciano (`#44DAFD`).

### Movimento, Responsividade e Critérios de Aceite

- **Coreografia de Entrada (`2.2s`):** Executada uma única vez no carregamento: (1) Logo e navegação assentam, seguidos pelos dots e eyebrow; (2) cada linha da headline sobe individualmente; (3) entram o card ciano, `SINOP / 26`, o círculo de vidro `01 / 03` e o card creme; (4) entram o story card e o botão central enquanto a linha horizontal se desenha de ponta a ponta e os ícones sociais surgem por último.
- **Hover & Acessibilidade:** Botão principal clareia para `#6FE3FF` no hover; suporte completo a `prefers-reduced-motion: reduce` (desativa animação de entrada e oculta o vídeo).
- **Tablet & Smartphone:** Em tablets, composição vertical em tela única (header, foto, headline, story card + cluster 2×2 e barra de ação). Em smartphones, hero com altura da viewport e foto mascarada, navegação recolhida em menu hambúrguer (com texto revisado `"Vamos conversar ->"`) e, abaixo da dobra, o cluster 2×2, o story card e a linha de contato.
