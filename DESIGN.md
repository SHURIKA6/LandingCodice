---
name: Codice — Pessoas em cena
description: Retratos reais, composição clara e planos fotográficos em profundidade para apresentar as pessoas da Codice.
colors:
  paper: "#f7f9fc"
  ink: "#142033"
  blue: "#2f4bff"
  mist: "#dce5f3"
  quiet: "#526079"
  line: "#c5cfdf"
  blue-hover: "#203bd8"
  mist-line: "#a6b6cd"
  blue-text: "#e0e7ff"
  blue-line: "#a4b2ff"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontWeight: "200–800"
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontWeight: "200–900"
---

# Design System: Codice — Pessoas em cena

## Coreografia da página inteira — execução de 21/10/2026

O plano autorizado com **“Implement the proposed plan.”** mantém a paleta/fontes e os retratos como assinatura; amplia a continuidade entre cenas com campos decorativos direcionais, títulos em contraponto, capturas com percurso interno, processo progressivo e palavra final recomposta pela rolagem. A escultura azul ganha arco de deslocamento/escala/rotação plana e resposta ao ponteiro em camada independente. Ações mantêm caixas estáveis. Menu tem saída curta reversível por novo acionamento, sem atrasar navegação/Escape. Não há novo palco fixo, biblioteca ou loop ambiente.

Usar os modos e fallbacks existentes, manter 300svh, reflow com texto ampliado, cancelamento ao ocultar a aba e renderização sob demanda. [Registro](docs/cinematic-motion-2026-10-21/README.md) e [verificação desta execução](docs/cinematic-motion-2026-10-21/verification.md), inicialmente em andamento, substituem qualquer inferência de QA a partir dos registros históricos abaixo.

**Fechamento desta ampliação em 21/10:** código e 30 capturas revisados; build/typecheck, 11 geometrias, smoke 16/16, motion 6/6, mobile 18/18 e coreografia 15/15 em cada motor passaram. Foco estabiliza também transições CSS das setas; o fallback de fonte ampliada passou sem erros de página após agendar a medição do hero fora da entrega de ResizeObserver. Vídeos/limites no relatório próprio. Sem commit, push ou deploy.

## Escultura azul na abertura — execução de 21/10/2026

O usuário escolheu recuperar a escultura anterior dos dois Cs entrelaçados e recolocá-la na abertura, com o esmalte em azul de base **`#2f4bff`** e a faixa cromada preservada. A edição é um raster transparente, com novos PNG/WebP e proveniência em `public/brand/codice-sculpture-blue.json`; não substituir os originais nem simular novo modelo 3D.

Desktop usa título → escultura → descrição em três colunas; peça de 128–176 px, conservando a altura da introdução nas cinco larguras desktop comparadas à baseline. Abaixo de 1024 px, peça central de 160 px antes do título, reduzida a 112 px em altura até 700 px. Entrada finita de 850 ms e parallax de até 24 px ocupam wrappers separados, sem transformar ancestrais de sticky ou ações. A imagem tem `alt=""`, dimensões reservadas e repouso estático em SSR/sem JS/reduce. Preservar reflow com texto ampliado.

A apresentação das pessoas e seus 300svh continua após a abertura; navegação, favicon, conteúdo comercial, fotos e contatos não mudam. [Registro](docs/blue-sculpture-2026-10-21/README.md) e [QA próprio concluído em 21/10](docs/blue-sculpture-2026-10-21/verification.md), encerrando o registro inicial em execução. Nove capturas estáveis, três frames intermediários e vídeo da abertura foram inspecionados; revisão independente 13/13 aprovada, assets e archive íntegros. As aprovações mobile abaixo permanecem como baseline anterior, não como prova desta integração.

## Mobile cinematográfico — execução de 21/10/2026

O **“gooo”** autorizou a implementação da [spec mobile](docs/superpowers/specs/2026-10-21-mobile-motion-design.md) após a escolha explícita de retratos e nomes em uma área fixa controlada pelo scroll. O telefone em retrato, abaixo de 1024 px e com altura a partir de 560 px, usa `mobile-story`: introdução fora do sticky, trilho único de 300svh, palco abaixo do header e composição compacta até 700 px de altura. Fernando/Eduardo/Victor têm repousos em .08/.50/.92, com foto proporcional e nome completo. Fotografias cruzam camadas em deslocamento lateral/vertical, escala e rotação plana; nomes percorrem máscaras em sentido oposto. A rolagem inversa recompõe a mesma pose.

Landscape ou altura inferior a 560 px usa `mobile-flow`, com movimento local de fotografias e nomes sem fixar uma cena que não cabe. O palco só começa após carregamento/decodificação das três fotos; demora ou falha mantém o fluxo HTML. `static` cobre SSR e movimento reduzido; `desktop` mantém a cena existente. Esses modos são separados do renderizador `html`/`three`: Three permanece sob demanda somente no desktop elegível.

A antiga política de molduras imóveis no celular é substituída por movimento **somente na mídia**: escala .86→1, deslocamento até 64 px e acomodação oposta de Corretor/Roger, com leitura reversível até 24 px. Capturas trocam com até 8% de deslocamento e crossfade, após preparo da nova imagem. Botões, descrições e links ficam em camada estável. Os capítulos têm superfície e tipografia separadas; preço inteiro, inclusões, trilha vertical do processo, frase de contato e letras finais têm coreografias próprias. Menu continua nativo e o foco resolve entradas imediatamente. A preferência reduzida ao vivo cancela efeitos, com HTML completo.

Paleta, fontes locais/licenças, fotos, oferta e contatos permanecem os mesmos. O [registro da execução](docs/mobile-motion-2026-10-21/README.md) e a [verificação específica](docs/mobile-motion-2026-10-21/verification.md) registram a versão; **QA local concluído em 21/10**, encerrando o estado inicial em andamento. Texto ampliado troca máscaras fixas por fluxo, com reflow do header/preço e espaço para o marcador girado das condições. Ocultação cancela CSS/WAAPI finitos. A revisão independente corrigiu foco na abertura e menu baixo; frames finais foram inspecionados. As aprovações anteriores abaixo pertencem às versões preservadas e não se transferem ao mobile novo.

## Ampliação de movimento — 20/10/2026

**Fechamento em 21/10/2026:** build e typecheck finais, seis testes de geometria, 16 cenários do smoke e seis cenários adicionais de motion passaram. Três tamanhos de notebook baixo também foram conferidos; revisão independente final de código e capturas aprovada. Evidências e limites em [verification.md](docs/pessoas-em-cena-2026-10-20/verification.md).

O usuário elogiou a direção e autorizou ampliar sua coreografia com **“pode seguir”**, citando [Lando Norris](https://landonorris.com/) e [KAIRN no MotionSites](https://motionsites.ai/?prompt=kairn). A assinatura continua sendo a apresentação das três pessoas por fotografias reais. Título por linhas, nomes animados, indicador de três etapas, profundidade e pequena resposta com mola ao ponteiro reforçam esse momento, sem estender os 300svh nem alterar os retratos. O ponteiro retorna ao repouso fora da tela e com a aba oculta.

`MotionChapter` abre os cantos superiores de 64 px para 0 conforme a rolagem e coordena entradas finitas de títulos, grupos de leitura, processo e palavra de fechamento. `ScrollFrame` acomoda as molduras reais de Corretor e Roger com movimento reversível em desktop, neutralizado no celular. Menu usa uma abertura coordenada de painel e links; catálogo conserva a captura anterior até a próxima estar pronta e faz uma transição curta de opacidade. Os estilos complementares das interações estão em `src/components/experience/interaction-motion.css`.

O conteúdo já é visível no HTML. Movimento reduzido ao vivo, ausência de JavaScript, celular e falhas da cena preservam leitura e ações; o foco não aguarda a coreografia. Entradas são finitas, observadores e animações são liberados, e a cena mantém renderização sob demanda e DPR máximo 1,5. O [roteiro](docs/pessoas-em-cena-2026-10-20/motion.md) detalha a proposta.

Build, typecheck, seis testes de movimento e a nova execução dos 16 cenários do smoke passaram; revisão estática independente aprovada. O QA adicional de movimento, rede e toque tem seu estado final em [verification.md](docs/pessoas-em-cena-2026-10-20/verification.md), sem transferir automaticamente a aprovação da baseline preservada abaixo. Sem commit, push ou deploy.

### Tons complementares já existentes

| Papel | Valor |
| --- | --- |
| Hover da ação azul | `#203bd8` |
| Filete sobre campo suave | `#a6b6cd` |
| Texto secundário sobre azul | `#e0e7ff` |
| Filete sobre azul | `#a4b2ff` |

Esses tons já eram usados no CSS. O detector executou com exit 0 e registrou dez avisos advisory sobre essas cores preexistentes fora do sidecar. Este registro documenta seus papéis, sem modificar CSS ou sidecar; a saída do detector não substitui QA visual ou de acessibilidade.

## Estado vigente — direção aprovada em 20/10/2026

**Pessoas em cena** apresenta Fernando Riad, Eduardo Gobatto e Victor Rafael por retratos reais, nomes legíveis e uma composição clara. A direção anterior Em evidência, de marfim, oliva, lima e arte abstrata, permanece como histórico abaixo. A restrição antiga sobre acrescentar retratos foi substituída pela autorização explícita de 20/10; os originais autorizados estão documentados em [assets.md](docs/pessoas-em-cena-2026-10-20/assets.md).

**Implementada e verificada localmente.** Build, typecheck, seis testes de movimento, 16 cenários de navegador e revisão independente passaram. A homologação estética do usuário é distinta da revisão técnica. O escopo está no [briefing da implementação](docs/pessoas-em-cena-2026-10-20/README.md); evidências e limites de acessibilidade/desempenho estão em [verification.md](docs/pessoas-em-cena-2026-10-20/verification.md).

### Cor e tipografia

| Papel | Valor |
| --- | --- |
| Base clara | `#f7f9fc` |
| Texto principal | `#142033` |
| Ação e ênfase azul | `#2f4bff` |
| Campo suave | `#dce5f3` |
| Texto secundário | `#526079` |
| Divisores | `#c5cfdf` |

**Bricolage Grotesque** organiza marca, títulos e nomes; **Source Sans 3** sustenta leitura e controles. As duas famílias são locais, com `font-display: swap`, preservando arquivos e licenças OFL existentes. Os retratos fornecem a matéria visual principal; a cor e a tipografia organizam a leitura e o contato.

### Composição, fotografia e movimento

O hero combina título amplo, apresentação direta e retratos em planos. A sequência fotográfica tem três posições, uma por pessoa, na ordem Fernando, Eduardo e Victor. O progresso acompanha a rolagem e deve permanecer reversível, sem acumular distorções. Os arquivos originais não são alterados; qualquer ajuste de enquadramento na apresentação preserva a proporção e não substitui a fotografia por conteúdo gerado.

A cena Three.js entra por carregamento dinâmico de cliente somente em desktop a partir de 1024 px e quando o usuário permite movimento. O HTML conserva as imagens, os nomes e o conteúdo comercial antes de qualquer aprimoramento. No celular, sem JavaScript, com movimento reduzido ou diante de erro de WebGL, a composição completa continua legível e utilizável. O canvas é complementar e não deve carregar texto ou controles essenciais.

### Conteúdo e acessibilidade

Preservar a ordem semântica, nomes por extenso, textos alternativos simples e foco visível nos controles. A apresentação dos três não permite inferir funções, especialidades, contatos ou condição de estudante de Victor. A informação anterior sobre estudantes de Sistemas de Informação refere-se a Fernando e Eduardo. As ações comerciais continuam direcionadas apenas aos contatos originais em `siteContent.founders`.

Corretor usa evidência de trabalho real; Roger mantém a classificação demonstrativa. Fotografias, capturas de portfólio e arte de marca não comprovam resultados comerciais. Não acrescentar depoimentos, métricas ou prazos sem evidência.

### Implementação e verificação

Os tokens estão em `src/app/globals.css`; os dados de pessoas, em `src/data/team.ts`; o aprimoramento usa `Hero.tsx`, `PortraitScene.tsx` e `portraitMotion.ts` em `src/components/experience/`. Verificar `npm run typecheck`, `npm run build` e `node --experimental-strip-types --test scripts/portrait-motion.test.mjs`, além do QA de teclado, toque, responsividade e alternativas estáticas. As verificações dos arquivos de retrato já executadas não equivalem ao QA da integração.

Preservar estudos, fontes, licenças, prompts, capturas e archives. A versão anterior da experiência está em `docs/pessoas-em-cena-2026-10-20/archive/`; o restante deste documento permanece como registro histórico.

## Histórico preservado — sistema Em evidência, anterior à autorização de 20/10/2026

O frontmatter e as seções anteriores foram mantidos abaixo. Seus tokens, estado de implementação e resultados correspondem àquela versão. Para alterações atuais, prevalecem os critérios de Pessoas em cena acima.

### Frontmatter anterior preservado

```yaml
---
name: Codice — Em evidência
description: Marca monumental, objeto escultórico e campos de cor para uma presença profissional.
colors:
  paper: "#f4f4ed"
  ink: "#25291f"
  acid: "#d2ff00"
  quiet: "#626857"
  line: "#b8bdaf"
  dark-line: "#5a604e"
  dark-text: "#c8cdbd"
  ink-hover: "#414934"
  acid-hover: "#e0ff50"
  header-hover: "#bce300"
  browser-surface: "#e6e9df"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "22.6vw"
    fontWeight: 400
    lineHeight: 0.76
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(42px, 5.5vw, 82px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  hero-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(40px, 4vw, 58px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 800
    lineHeight: 1.4
rounded:
  action: "8px"
  browser: "12px"
  chapter: "32px"
spacing:
  gap-24: "24px"
  gap-48: "48px"
  gap-64: "64px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "15px 22px"
    height: "58px"
  button-ink-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.paper}"
  button-lime:
    backgroundColor: "{colors.acid}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "15px 22px"
    height: "58px"
  button-lime-hover:
    backgroundColor: "{colors.acid-hover}"
    textColor: "{colors.ink}"
---
```


# Design System: Codice — Em evidência

## Overview

**Creative North Star: "Em evidência"**

Marca tipográfica em grande escala e objeto escultórico dão presença à Codice. Marfim e oliva sustentam a leitura; o lima marca ações e muda o tom de capítulos inteiros. Textos e controles existem antes da interação.

O usuário pediu Next.js, React, TypeScript, Tailwind, Lenis e Framer Motion, com o nível de acabamento da referência Lando Norris. Essa referência orienta escala, composição e fluidez; os ativos do piloto não foram copiados. A arte abstrata é da Codice e não representa um produto de cliente.

**Key Characteristics:**

- Tipografia monumental e arte escultórica com papéis distintos do texto comercial.
- Campos contínuos de marfim, oliva e lima, com divisores finos.
- Capturas reais de trabalho em uma apresentação editorial.
- Interação opcional, foco visível e conteúdo estático completo.

Sistema extraído de `src/app/globals.css` e `src/components/experience/` em 19/10/2026. [Contrato da direção](docs/superpowers/plans/2026-10-19-next-lando.md) e [registro da execução](docs/next-lando-2026-10-19/README.md). Build, QA e revisão final desta migração estão em andamento; seus resultados pertencem ao [relatório atual](docs/next-lando-2026-10-19/verification.md), não às verificações Astro históricas.

## Colors

### Primary

`acid` é o lima de ação e do fechamento. Ele também reaparece na arte, no destaque do trabalho e no estado selecionado das capturas. `acid-hover` pertence ao botão principal lima; `header-hover` é a resposta do contato compacto do header.

### Neutral

`paper` é o campo claro e o texto sobre oliva; `ink` é a tinta e o campo do trabalho. `quiet` acompanha textos secundários sobre marfim. `dark-text` sustenta leitura secundária sobre oliva. `line` e `dark-line` dividem as respectivas superfícies. `browser-surface` pertence à moldura da captura; `ink-hover` responde ao botão escuro.

Seleção usa lima com tinta oliva. Foco segue `currentColor`, evitando um anel invisível ao mudar de capítulo. Não transportar o secundário claro para a superfície marfim nem o secundário escuro para a superfície oliva.

## Typography

**Display Font:** Archivo Black, fallback sans-serif, peso real 400. **Body Font:** Manrope, fallback sans-serif, faixa local declarada 400–800. As duas usam `font-display: swap` e `font-synthesis: none`; [origem e licenças OFL](docs/study-2026-10-18/fonts.md).

A marca usa Archivo Black, entrelinha curta e tracking negativo. Os títulos de seção repetem essa densidade; o título do hero combina Manrope 800 com a palavra de ênfase em Archivo Black. O texto comercial e os controles permanecem em Manrope. O corpo varia entre 12–16 px por função; rótulos e legendas usam valores menores e não substituem informações principais.

O frontmatter registra desktop. A marca do hero passa a 22vw até 800 px e 22.4vw até 540 px. Até 540 px, o título do hero usa `clamp(34px, 9.2vw, 47px)` e títulos de seção usam `clamp(34px, 9.6vw, 50px)`, ambos com entrelinha 1.08. O preço do pacote tem Archivo Black e não quebra no meio.

## Layout

Conteúdo com largura máxima de 1344 px e margens laterais de 48 px; até 1100 px, margens de 32 px; até 540 px, 20 px. O header fixo tem altura mínima de 88 px, reduzida a 76 px no celular. Âncoras reservam 104 px, ou 92 px até 540 px.

A abertura coloca marca e arte no centro, com informação comercial nas bordas inferiores. Até 800 px, passa ao fluxo vertical. Até 540 px, título, oferta e contato usam uma coluna. O trabalho alterna captura e seletor, tornando-se uma coluna até 800 px; os controles tornam-se horizontais no celular. Pacote usa duas colunas com resumo sticky, passando a uma até 540 px. O processo vai de quatro para duas e depois uma coluna. O fechamento mantém nomes e contatos em duas colunas até 540 px.

Os capítulos de trabalho e contato têm cantos superiores de 32 px, reduzidos a 24 px e depois 20 px. Os breakpoints observados são 1800, 1100, 800 e 540 px; os valores não constituem uma escala genérica para novas telas.

## Elevation & Depth

A profundidade vem principalmente da própria escultura cromada/lima e da alternância dos campos de cor. A imagem recebe `drop-shadow(0 28px 22px #25291f24)`; com movimento reduzido, usa `0 18px 20px #25291f1c`. O menu usa `0 18px 50px #25291f26`. Botões não dependem de sombra nem de um deslocamento de hover.

## Shapes

Ações têm raio de 8 px, moldura do navegador e menu 12 px, capítulos 32 px em desktop. Botão de menu e contato compacto reduzem para 6 px no celular. Divisores de 1 px acompanham a grade; pequenos círculos identificam estado e composição, sem transformar conteúdo em uma coleção de cards. Contornos amplos no hero repetem a geometria interligada da escultura.

## Components

**Ações.** Variante escura sobre marfim ou lima; variante lima sobre a base apropriada. Altura mínima de 58 px em desktop, 52 px no celular, transição de cor em 0.2 s. O contato compacto do header tem altura mínima de 48 px, ou 44 px no celular. Foco usa outline de 2 px com afastamento de 6 px.

**Navegação.** Marca, localização, WhatsApp e menu nativo `details/summary`. O menu abre um painel oliva com links grandes; Escape fecha e devolve o foco, clique externo fecha e links recolhem o painel quando JavaScript está disponível. O controle nativo continua disponível sem script.

**Objeto e marca.** Uma imagem raster transparente é transformada por Framer Motion; não é um modelo 3D. A marca responde à rolagem; o objeto combina rolagem, ponteiro de mouse e replay de 1.2 s. Ao sair da tela ou ocultar a aba, replay e deslocamento de ponteiro são reiniciados. Movimento reduzido remove os transforms e o replay. A [proveniência da arte](docs/next-lando-2026-10-19/asset.md) e seus hashes estão em `public/brand/codice-sculpture.json`; o sidecar específico do WebP guarda o prompt.

**Rolagem.** Lenis usa `lerp: 0.1`, `autoRaf: false`, uma RAF própria, `anchors: true` e `syncTouch: false`. A distância do header nas âncoras vem somente do `scroll-margin-top` do CSS, sem duplicar um offset na biblioteca. O toque mantém comportamento nativo. Mudança para movimento reduzido ou aba oculta destrói a instância; a preferência e a visibilidade são observadas durante a sessão. O hero e o case acompanham a preferência ao vivo por um hook próprio com `useSyncExternalStore` e listener de `matchMedia`; o estado SSR é estático. Sem JavaScript a rolagem permanece nativa.

**Trabalho.** Duas capturas reais trocadas por botões com `aria-pressed` e descrição anunciada. Framer Motion faz transição de opacidade em 0.3 s, sem transição sob movimento reduzido. A captura permanece visível desde o HTML inicial; sem script, o seletor é oculto e o estado estático continua com legenda e link para o código.

**Condições.** `details/summary` permite consultar os termos sem depender de JavaScript. O indicador muda de mais para cruz por rotação; o texto segue no fluxo, com filetes em vez de contêiner decorativo.

## Do's and Don'ts

- Do manter leitura, preço e contato independentes da arte e da interação.
- Do usar as fontes locais, os secundários adequados a cada superfície e foco visível nos controles.
- Do preservar a apresentação completa com movimento reduzido e sem JavaScript.
- Do manter capturas reais e proveniência das artes separadas.
- Don't copiar retratos, logos ou materiais da referência Lando Norris.
- Don't apresentar a escultura raster como modelo 3D real ou produto de cliente.
- Don't tratar Ritmo lilás ou a identidade de livro como sistema vigente.
- Don't usar verificações Astro anteriores como validação da nova aplicação Next.js.

## Histórico preservado — sistema anterior à migração de 19/10/2026

O documento anterior está integralmente preservado abaixo. Seus tokens, estados de conclusão e caminhos Astro pertencem às etapas históricas; a fonte normativa vigente é o frontmatter no início deste arquivo. A cópia original com hash está também no arquivo da migração.

<details>
<summary>Documento completo anterior: Ritmo e acervo de livro</summary>

```markdown
---
name: Codice — Ritmo
description: Tipografia em grande escala para uma oferta de sites clara e direta.
colors:
  ground: "#151419"
  ink: "#f5f1eb"
  accent: "#b69aff"
  quiet: "#c2bacd"
  line: "#4c4556"
  primary-hover: "#d0bdff"
  dark-hover: "#352b45"
  browser-surface: "#24202c"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(46px, 4.8vw, 72px)"
    fontWeight: 400
    lineHeight: 1.07
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(38px, 4vw, 60px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 800
    lineHeight: 1.4
rounded:
  action: "0px"
  browser: "12px"
spacing:
  step-24: "24px"
  step-40: "40px"
  step-64: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ground}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.ground}"
  button-dark:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "14px 22px"
  button-dark-hover:
    backgroundColor: "{colors.dark-hover}"
    textColor: "{colors.ink}"
---

# Design System: Codice — Ritmo

## Overview

**Creative North Star: "Ritmo"**

Tipografia em grande escala marca a presença da Codice, enquanto preço, escopo e contato permanecem diretos. A alternância entre fundo escuro e campos lilás conduz a leitura sem depender de efeitos de entrada.

**Key Characteristics:**

- Marca tipográfica, com uma única assinatura de movimento.
- Campos de cor inteiros e hierarquia de leitura clara.
- Trabalho real apresentado por capturas com origem documentada.
- Controles e conteúdo completos antes do JavaScript.

Estado vigente em 19/10/2026: implementação local concluída e revisão independente **ship**. [Contrato](docs/landing-ritmo-2026-10-18/direction.md), [verificação e limites](docs/landing-ritmo-2026-10-18/verification.md) e [revisão](docs/landing-ritmo-2026-10-18/review.md). A identidade de livro é histórica; seu acervo permanece preservado abaixo.

## Colors

`ground` e `ink` organizam a base escura. `accent` sustenta botões e ocupa os campos de case e contato; sobre ele, o texto usa `ground`. `quiet` mantém a leitura secundária na base escura. `line` separa conteúdo sem criar uma coleção de cards. Hover e superfície do navegador usam os tokens observados no CSS.

Seleção inverte texto para a base sobre lilás. A barra de rolagem usa tinta lilás acinzentada sobre a base; o foco muda para tinta escura nas seções lilás.

## Typography

Archivo Black, peso real 400, dá forma à marca e aos títulos. Manrope, com faixa local 400–800, compõe o corpo e os controles. Ambas têm `font-display: swap`, fallbacks sans-serif e `font-synthesis: none`. As [licenças e fontes](docs/study-2026-10-18/fonts.md) continuam no acervo.

Os valores de display e headline no frontmatter descrevem desktop. Até 1100 px, o hero usa `clamp(44px, 5.2vw, 62px)`; até 800 px, `clamp(42px, 7.5vw, 64px)`; até 540 px, `clamp(37px, 10.6vw, 56px)`, entrelinha 1.08. Títulos de seção chegam a `clamp(33px, 9vw, 48px)` no celular. Corpo varia entre 13–17 px conforme o papel; textos de apoio não assumem a escala de títulos.

## Layout

O container tem largura máxima de 1344 px, com 48 px de margem de cada lado em desktop, 32 px até 1100 px e 20 px até 540 px. O header permanece sticky, com altura mínima de 88 px, reduzida a 72 px no celular. Âncoras reservam 108 px de afastamento, ou 92 px no celular.

Hero e introduções usam proporção 1.3:1 e vão a uma coluna até 800 px. Case usa 1.55:1; a imagem é sticky a 122 px no desktop e passa ao fluxo normal até 800 px. O pacote usa 1:1.1 e vira uma coluna até 540 px. O processo é uma lista ordenada de quatro etapas, com quatro, duas ou uma coluna conforme a largura.

## Elevation & Depth

A composição é predominantemente plana. A moldura da captura usa `0 20px 50px #32204326` para destacar a interface real do campo lilás. A palavra cinética ganha profundidade pelo eco em contorno e pelo deslocamento das letras; não há halos ou sombras de ação nos botões.

## Shapes

Botões são retangulares, sem raio. A moldura de navegador tem raio de 12 px e recorte de overflow; divisores são de 1 px. A palavra cinética é HTML decorativo, não uma imagem da página.

## Components

**Ações.** Botão principal lilás na base escura; variante escura no campo lilás. Altura mínima de 56 px, ou 52 px no celular; hover altera apenas a cor de fundo em 0,2 s. Links textuais têm altura mínima de 44 px e underline no hover. Foco visível usa outline de 2 px, afastado 6 px, com cor adequada à superfície.

**Navegação.** Wordmark local, links para trabalho/pacote e contato. Até 800 px, os dois links de seção deixam o header; a ação de contato permanece visível, e a âncora de trabalho continua no hero. Não há menu dependente de script.

**Assinatura Ritmo.** As letras acompanham a rolagem nativa; o replay dura 1400 ms. A interação pausa fora da tela e com a aba oculta. Movimento reduzido remove transformações; sem JavaScript ou IntersectionObserver, o conteúdo é estático e o replay fica oculto. A decoração usa `aria-hidden`.

**Case.** Captura real com dimensões declaradas, texto alternativo, legenda e fonte. A demo indisponível não foi apresentada como vídeo válido; a alternativa estática autorizada foi usada.

## Do's and Don'ts

- Do manter preço, escopo e contato legíveis antes do carregamento da interação.
- Do usar as fontes locais e as cores conforme a superfície.
- Do preservar foco visível e a versão estática completa.
- Don't transformar a identidade de livro arquivada em referência vigente.
- Don't atribuir à captura resultados comerciais ou disponibilidade atual da demo.

## Histórico preservado — documentação anterior a este fechamento

Os registros completos abaixo pertencem às suas datas e etapas. Suas expressões de pendência, aprovação ou estado vigente não substituem o sistema e os resultados acima. O comp antigo foi marcado como superado, preservando sua aprovação histórica.

# Codice — sistema visual

## Direção vigente — landing final Ritmo, 18/10/2026

**Ritmo foi escolhida pelo usuário** para a landing final na rota `/`. A implementação está autorizada com a oferta exclusiva de sites de uma página por R$ 1.500. O briefing e o ledger desta etapa estão em [docs/landing-ritmo-2026-10-18/README.md](docs/landing-ritmo-2026-10-18/README.md).

A composição tem quatro blocos: **hero**, **projeto imobiliário real**, **pacote** e **dupla com contato**. O hero usa tipografia de impacto e movimento gráfico para apresentar o serviço e o preço. A seção seguinte dá espaço à interface real de Corretor, sem métricas inventadas. O pacote mantém preço, entregas, pagamentos e limites legíveis. O fechamento apresenta Fernando Riad e Eduardo Gobatto e os dois contatos diretos.

| Elemento do sistema Ritmo | Diretriz para a landing final |
| --- | --- |
| Paleta base | Fundo `#151419`, lilás `#B69AFF` e texto `#F5F1EB`; qualquer ajuste de contraste da implementação deve ser registrado na verificação. |
| Tipografia | Archivo Black nos títulos e Manrope no corpo, com fontes locais e licenças já documentadas no [acervo de fontes](docs/study-2026-10-18/fonts.md). |
| Movimento | Relação entre rolagem, tipografia e elementos gráficos, com replay e pausa fora da tela quando aplicável. O estado com movimento reduzido deve preservar conteúdo, hierarquia e ação. |
| Imagens | Captura real do projeto imobiliário. Fotografias, números, resultados e interfaces de clientes não podem ser inventados. |
| Controles | Foco visível, rótulos compreensíveis, teclado e toque; a ação de contato permanece evidente em desktop e celular. |
| Conteúdo | Oferta de sites, preço de R$ 1.500 e condições comerciais. A composição da landing tem quatro blocos; o pacote vendido admite até seis seções. |

O sistema de produção usa `src/layouts/Page.astro`, `src/pages/index.astro`, `src/styles/global.css` e `src/scripts/landing.ts`, com termos em `src/data/offer.ts`. O conteúdo de contatos e portfólio em `src/data/site.ts` permanece preservado. As prévias `/estudo/` e suas três direções ficam intactas, com `noindex` e exclusão do sitemap. A identidade anterior de livro pertence ao acervo histórico.

A verificação desta nova implementação deve conferir responsividade, contraste, texto sem cortes, ausência de overflow, teclado, toque, movimento reduzido e uso sem JavaScript. Capturas e vídeo precisam registrar a página final realmente renderizada. O [relatório próprio da etapa](docs/landing-ritmo-2026-10-18/verification.md) será consolidado pelo responsável pela implementação; nenhum resultado de QA, captura ou vídeo da landing final é declarado concluído aqui antes desse registro. O QA do comparativo abaixo permanece restrito às prévias.

## Histórico preservado — estudo anterior à seleção de Ritmo, 18/10/2026

O conteúdo abaixo descreve a comparação entregue antes da escolha. A antiga espera por seleção e a preservação da raiz eram limites daquela etapa; a nova autorização para implementar Ritmo está acima. Capturas, fontes e resultados anteriores continuam preservados como evidência do estudo.

## Direção vigente — estudo de 18/10/2026

A identidade de livro antigo foi abandonada. Couro, lombada, pergaminho, ouro envelhecido e as famílias do estudo anterior permanecem apenas no histórico e na rota `/` preservada temporariamente. Eles não são a referência das novas prévias.

O estudo implementado compara **Forma**, **Fluxo** e **Ritmo** em `/estudo/`, com prévias independentes em `/estudo/forma/`, `/estudo/fluxo/` e `/estudo/ritmo/`. A comparação parte da primeira tela e do início da próxima seção, com marca forte e uma interação funcional característica por direção. Blocos adicionais de portfólio, pacote e dupla permitem revisar a oferta completa e usar as âncoras; não constituem a landing final de produção. O usuário escolhe a direção antes da reconstrução da landing completa. [Briefing e ledger atuais](docs/study-2026-10-18/README.md).

| Direção | Composição e comportamento implementados |
| --- | --- |
| Forma | Volume em CSS 3D, com controle para abrir e fechar a composição espacial; sem dependência de WebGL. Acionamento por teclado e toque verificado, com alternativa de movimento reduzido. |
| Fluxo | Demonstração de site de prestador de serviços; três botões alternam serviços, fotos e contato. Estados e acionamento por teclado e toque verificados. |
| Ritmo | Tipografia e gráfico cinéticos relacionados à rolagem, com replay e pausa fora da tela. Rolagem, replay e movimento reduzido verificados. |

As três propostas diferem em composição, tipografia, cor e ritmo, preservando a oferta aprovada: site de uma página com até seis seções por R$ 1.500, com contato por WhatsApp.

| Direção | Paleta principal | Tipografia |
| --- | --- | --- |
| Forma | Base `#DCE4EE`, azul `#2348F5`, tinta `#15273E`. | Manrope. |
| Fluxo | Base `#F3F0E7`, vermelho `#E64220`, tinta `#24251F`; tinta `#11120D` nos textos pequenos sobre vermelho. | Bricolage Grotesque nos títulos; Manrope no corpo. |
| Ritmo | Fundo `#151419`, lilás `#B69AFF`, texto `#F5F1EB`. | Archivo Black nos títulos; Manrope no corpo. |

As três famílias são servidas localmente, com binários, caracteres portugueses e licenças OFL conferidos. Arquivos, origem e pesos estão em [fonts.md](docs/study-2026-10-18/fonts.md).

As seis imagens de comparação são **capturas reais das prévias implementadas**, em desktop de 1440 × 1100 px e celular de 390 × 1400 px. Os PNGs estão em `docs/study-2026-10-18/review/final/`; os WebP usados no painel ficam em `public/study/previews/`. O estudo foi construído em código e depois capturado, sem geração de páginas inteiras em imagem. O painel também permite abrir cada prévia para avaliar a interação.

As três prévias foram verificadas em 320, 390, 768 e 1440 px: sem overflow horizontal, imagens quebradas ou âncoras ausentes; sem erros de página. Uso sem JavaScript e movimento reduzido passaram nas três direções. Axe 4.14 registrou zero violações nas prévias, mas a análise automática de contraste ficou incompleta em Forma e Ritmo. Pares de cores foram conferidos manualmente, incluindo a correção da tinta sobre vermelho em Fluxo. Isso não equivale a auditoria integral por leitores de tela nem à aprovação visual do usuário.

As quatro rotas construídas usam `noindex,nofollow` e a exclusão do sitemap foi verificada. A repetição final de axe do painel terminou com zero violações e sem verificações incompletas. Os quatro hashes da implementação legada permanecem idênticos. Resultados e limites estão no [relatório final](docs/study-2026-10-18/verification.md). A seleção entre Forma, Fluxo e Ritmo permanece pendente.

## Histórico preservado — Encadernação escura, 17/10/2026

O texto abaixo documenta uma escolha e implementação anteriores, agora superadas como direção visual. A aprovação, as capturas e os resultados de QA de 17/10 pertencem à landing antiga; não aprovam nem validam Forma, Fluxo ou Ritmo. As classificações de portfólio vigentes são as registradas em [PRODUCT.md](PRODUCT.md).

## Direção escolhida

Em 17/10/2026, após comparar três propostas, o usuário autorizou seguir com a **2. Encadernação escura**: “Pode escolher por mim e seguir com a 2”. A referência aprovada é `.impeccable/mocks/02-encadernacao-escura.png`, com `approved: true` no sidecar. A cópia de apresentação está em `docs/visual-study/proposals/02-encadernacao-escura.png`.

A identidade vem do códice encadernado. A própria página assume a capa escura e passa para folhas claras, com margem de lombada, filetes e composição editorial. Esse princípio organiza conteúdo e navegação: evitar repetir o nome Codice, alusões a livro ou ornamentos como preenchimento sem informação.

Fólios abertos e Manuscrito de projetos continuam arquivados em `docs/visual-study/proposals/` como alternativas da comparação, sem substituir a referência aprovada. O briefing original e a mudança de estado estão em [docs/visual-study/brief.md](docs/visual-study/brief.md).

## Paleta

| Cor | Valor | Papel |
| --- | --- | --- |
| Tinta/couro | `#251B17` | Capa do hero e fechamento de contato; texto principal sobre papel. |
| Marfim | `#F1E7D2` | Texto sobre a capa e base clara do CTA. |
| Ouro envelhecido | `#C5AB77` | Referência de bordas e detalhes da encadernação. |
| Argila | `#78482E` | Ênfase tipográfica e legendas sobre papel. |
| Azul | `#3C5373` | Acento reservado do sistema; não precisa aparecer em cada seção. |

O papel também usa base `#E8D7C2`; variações de filetes e tinta secundária sustentam a leitura sem uniformizar a textura. Couro e argila foram refinados em relação à proposta inicial (`#27221E` e `#A76F53`), preservada no histórico do briefing. A legibilidade deve ser avaliada sobre o material real, incluindo as regiões mais claras ou escuras da textura.

## Tipografia

- **Cormorant Garamond:** wordmark e títulos em 400/500; ênfases em itálico 400. Georgia e serif são fallbacks. Os títulos usam escala fluida, quebras editoriais e entrelinhas próximas; a adaptação móvel precisa preservar leitura e evitar recortes.
- **Source Sans 3:** corpo, informações de serviço, contato e links de apoio em 400/500/600. O texto corrido privilegia comprimento de linha e entrelinha para leitura.
- As duas famílias são locais em `public/fonts/`, com `font-display: swap` e suporte aos caracteres pt-BR. O CSS registra as faixas reais dos arquivos variáveis; `font-synthesis: none` evita pesos ou itálicos artificiais. O itálico disponível é exclusivamente 400.
- [fonts.md](docs/visual-study/fonts.md) registra WOFF2, origem oficial, licenças OFL, pesos, dimensões dos arquivos e hashes.

## Composição e conteúdo

O hero usa uma capa de couro escuro com lombada lateral e filete de encadernação. Wordmark, navegação, oferta de sites e sistemas, identificação da dupla e CTA são HTML sobre esse material. O CTA claro cria uma ação evidente, com o rótulo “Conversar sobre meu projeto”. O material não contém palavras nem controles rasterizados.

A abertura clara funciona como fólio: Corretor lidera com imagem à esquerda e legenda à direita; Roger inverte a relação e avança abaixo. Evitar transformar os dois projetos em cartões iguais. No celular, imagem e texto passam para uma sequência legível sem depender da sobreposição do desktop.

Serviços usam linhas editoriais e descrições concretas. Manutenção e suporte são uma nota complementar para Sinop/MT e região, preservando sites e sistemas como oferta principal. A dupla aparece pelo nome, GitHub e contato direto, sem retratos ou atribuições profissionais inventadas. O fechamento retoma a capa escura com links de WhatsApp individuais e origem geográfica.

Os dados tipados de conteúdo e contato ficam em `src/data/site.ts`. Fernando usa `5566999356646`; Eduardo usa exatamente `556684184488`, segundo a associação informada pelo usuário. O número de Eduardo não deve receber outro dígito por normalização presumida.

## Materiais locais e fidelidade dos cases

| Arquivo | Origem e função |
| --- | --- |
| `public/images/codice-cover.webp` | Nova arte limpa de capa e lombada, gerada com a ferramenta nativa `image_gen.imagegen`. |
| `public/images/codice-paper.webp` | Nova arte limpa de papel/fólio, gerada com a mesma ferramenta. |
| `public/images/parchment-button.webp` | Fundo claro do CTA, gerado sem texto incorporado. |
| `public/images/corretor-public.webp` | Conversão WebP da captura original `docs/visual-study/references/corretor-public-desktop-1440x900.png`. |
| `public/images/roger-services.webp` | Conversão WebP da captura original `docs/visual-study/references/roger-services-desktop-1440x900.png`. |

Os PNGs dos conceitos registram composição; suas miniaturas podem ter detalhes reinterpretados pelo gerador. Sempre usar as capturas originais para mostrar as interfaces reais dos projetos, sem sintetizar telas. As fontes e limitações dos cases estão em [references/sources.md](docs/visual-study/references/sources.md): Corretor vem do ambiente de teste público documentado; Roger contém fotografias identificadas pelo projeto como ilustrativas.

## Movimento e interação

A entrada do texto do hero é discreta: deslocamento de 6 px, mudança de opacidade e desfoque leve, durante 0,7 s. Links e superfícies clicáveis usam transições curtas de cor, sombra ou deslocamento de poucos pixels. Não há necessidade de movimento contínuo para explicar o conteúdo.

Com `prefers-reduced-motion: reduce`, animações e transições são removidas, a rolagem deixa de ser suave e os deslocamentos de hover são cancelados. O menu móvel funciona por acionamento do botão, sem depender de hover; fecha ao navegar, ao clicar fora, ao passar para desktop ou ao usar Escape. Escape devolve o foco ao botão de abertura.

## Acessibilidade e adaptação

O documento usa `lang="pt-BR"`, landmarks, títulos, textos alternativos dos cases, link para pular ao conteúdo e foco visível em links e botões. Ícones decorativos não substituem rótulos. Links externos anunciam a abertura de outra aba e usam `rel="noopener noreferrer"`.

A navegação móvel tem botão com `aria-controls` e `aria-expanded`. Sem JavaScript, os links de navegação permanecem disponíveis; com JavaScript, o menu é recolhível. As regras móveis reorganizam o portfólio, serviços, dupla e contatos em fluxo vertical, com controles dimensionados para toque.

Esses recursos estão implementados. A revisão em Chromium verificou oito larguras de 320 a 1920 px, teclado, menu, movimento reduzido e fallback sem JavaScript. Axe terminou com zero violações, mantendo contraste sobre backgrounds como análise incompleta. Pares de cores, material sob a introdução e capturas foram conferidos separadamente; não houve auditoria integral por leitores de tela. Evidências e limites estão em [implementation-verification.md](docs/visual-study/implementation-verification.md).

Os derivados `paper-grain.webp` e `paper-spine.webp` mantêm o papel contínuo sem bordas atravessando o conteúdo. O fólio inicial se funde ao grão antes da borda inferior; no celular, somente grão e lombada estreita sustentam o texto. `leather-grain.webp` evita ampliar a lombada sobre o contato no celular. `codice-cover-mobile.webp` reduz o peso da capa para telas pequenas. Uma camada escura uniforme protege o contraste do texto sobre a capa, preservando sua materialidade.

## Implementação e publicação

A landing é estática em Astro 7.4/Tailwind CSS 4, com estrutura em `src/pages/index.astro`, `src/layouts/Page.astro`, `src/styles/global.css` e `src/data/site.ts`. O build de produção concluiu na implementação. O preview local usa `http://localhost:4321`, em background conforme `AGENTS.md`.

O domínio final ainda não foi informado. `SITE_URL` habilita o domínio no Astro, canonical, `og:url`, URL da organização no JSON-LD e sitemap. `.env.example` documenta o valor a configurar antes de um build para publicação. Esta etapa não registra publicação nem aprovação visual final da landing implementada.

```
</details>

