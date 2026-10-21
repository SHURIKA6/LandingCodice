## Development — vigente desde 20/10/2026: Pessoas em cena

O usuário aprovou a direção **Pessoas em cena** e autorizou explicitamente os retratos de Fernando Riad, Eduardo Gobatto e Victor Rafael. Este bloco prevalece sobre orientações anteriores que vedavam retratos ou definiam outra identidade visual. Manter **Next.js App Router + React + TypeScript + Tailwind CSS + Lenis + Framer Motion**, com **Three.js** como aprimoramento opcional da apresentação em desktop. Não reintroduzir Astro em `src/`.

Antes de alterar a experiência, consultar [PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md), o [briefing atual](docs/pessoas-em-cena-2026-10-20/README.md) e a [verificação atual](docs/pessoas-em-cena-2026-10-20/verification.md). A entrega de 20/10 foi implementada e verificada localmente; esses resultados são uma baseline dessa versão, não evidência automática para alterações futuras.

### Coreografia da página inteira — execução autorizada em 21/10/2026

**Versionamento posterior ao QA:** o pedido **“Commit e push”** de 21/10 autorizou registrar e enviar esta entrega em `main` para `origin/main`. Os registros abaixo de ausência de commit/push pertencem ao fechamento local anterior. Preservar também as evidências de QA no versionamento, conforme o padrão existente do repositório; push não comprova homologação de deploy remoto.

O usuário pediu mais movimento com frontend-design, Impeccable e UI/UX Pro Max e autorizou o plano com **“Implement the proposed plan.”** A ampliação acrescenta trajetória da escultura, passagens de capítulos, movimento interno das capturas, processo e fechamento ligados ao scroll, além de interações/menu. Preservar Pessoas em cena, fotografias, dados comerciais, 300svh e modos de fallback. Não acrescentar palcos fixos ou loops ambiente. Código e QA desta alteração têm [registro próprio](docs/cinematic-motion-2026-10-21/README.md) e [verificação própria](docs/cinematic-motion-2026-10-21/verification.md), inicialmente em andamento; resultados anteriores são baseline histórica. Atualizar o estado somente a partir dos checks novos.

**Fechamento desta ampliação em 21/10:** QA local concluído no relatório próprio, com build/typecheck, 11 geometrias, smoke 16/16, motion 6/6, mobile 18/18 e coreografia 15/15 em cada motor. Revisão de código e 30 capturas concluída. Preservar também o cancelamento de fechamento pendente ao ocultar/trocar modo e a medição de texto do hero agendada fora da entrega de ResizeObserver. A suíte mobile aguarda pessoa/foto/nome legíveis antes de conferir geometria, sem depender somente de 140 ms fixos. As novas evidências não homologam aparelho físico ou publicações. Checkout `main`, alterações locais sem commit, push ou deploy.

### Escultura azul na abertura — execução autorizada em 21/10/2026

O usuário confirmou a escultura antiga dos dois Cs entrelaçados, pediu esmalte azul **`#2f4bff`** mantendo cromado e transparência, escolheu recolocá-la na abertura e autorizou o plano com **“Implement the proposed plan.”** A edição nativa por ImageGen criou variantes novas em `public/brand/codice-sculpture-blue.png` e `.webp`, com [manifesto](public/brand/codice-sculpture-blue.json); preservar também os originais verde/cromado e sua proveniência. A peça é decorativa e raster, sem novo modelo Three ou dependência.

O [registro da escultura azul](docs/blue-sculpture-2026-10-21/README.md) descreve a integração: três colunas no desktop, peça de 128–176 px entre título e descrição; 160 px antes do título no celular, 112 px em telas baixas; entrada finita de 850 ms e parallax até 24 px em camadas separadas. Preservar os retratos, 300svh, conteúdo, contatos, header/favicon, foco, reflow e fallback HTML/reduce. **QA local desta integração concluído em 21/10**, encerrando o estado inicial em execução, no [relatório próprio](docs/blue-sculpture-2026-10-21/verification.md): build/typecheck, 11 geometrias, layout 11/11, smoke 16/16, motion 6/6, mobile 18/18 em cada motor e revisão independente 13/13; os checks mobile anteriores abaixo não a aprovam automaticamente. Entrega versionada na branch `feat/pessoas-em-cena`, sem push ou deploy.

### Movimento mobile — execução autorizada em 21/10/2026

O **“gooo”** autorizou executar o [plano mobile](docs/superpowers/plans/2026-10-21-mobile-motion.md) após a escolha de palco cinematográfico. O código já inclui `mobile-story`: um trilho de **300svh**, introdução fora do sticky e uma única árvore HTML de pessoas; fotos e nomes atravessam camadas/máscaras em sentidos opostos, com indicador e repousos legíveis. `mobile-flow` mantém movimento local em landscape/altura abaixo de 560 px. O palco só é habilitado após as três fotos carregarem/decodificarem; demora ou falha conserva a apresentação em fluxo.

Esta execução **substitui a antiga neutralização das molduras no celular**: somente as mídias de Corretor e Roger acompanham o scroll; botões, descrições e links ficam na camada estável. Oferta, processo, contato, palavra final e menu recebem coreografias próprias. Modo de movimento (`static`, `mobile-story`, `mobile-flow`, `desktop`) e renderizador (`html`, `three`) são independentes; Three continua exclusivo do desktop elegível. Preferência reduzida ao vivo deve cancelar os efeitos e manter pessoa/foco. Fotografias, conteúdo, contatos, oferta, stack e duração desktop continuam protegidos.

Escopo, implementação e limites estão no [registro mobile](docs/mobile-motion-2026-10-21/README.md). A [verificação desta execução](docs/mobile-motion-2026-10-21/verification.md) concentra os resultados novos; não herdar aprovações dos blocos anteriores. **QA local encerrado em 21/10:** typecheck/build, 11 testes de geometria, smoke 16/16, motion 6/6, mobile 18/18 em Chromium e 18/18 em WebKit, mais QA complementar documentado. O registro inicialmente estava em andamento. Entrega versionada na branch `feat/pessoas-em-cena`, sem push ou deploy. O bloco de planejamento abaixo é histórico da etapa `/plan`, anterior à autorização.

Texto ampliado que exceda a composição retorna a `mobile-flow`, com header e conteúdo em reflow; não bloquear zoom para preservar o palco. Mudanças de modo sincronizam pessoa/indicador com a geometria, preservando a restauração nativa na hidratação inicial. Ao ocultar a aba, cancelar também entradas/transições CSS finitas. Manter essas correções e seus cenários. Aparelho físico, Safari/iOS e aceite estético do usuário não foram homologados automaticamente por esse QA.

### Histórico do planejamento mobile — 21/10/2026, antes da implementação

O usuário pediu `/plan` para movimento mobile muito mais intenso e escolheu uma cena fixa com retratos e nomes controlados pela rolagem. A [spec proposta](docs/superpowers/specs/2026-10-21-mobile-motion-design.md) e o [plano de implementação](docs/superpowers/plans/2026-10-21-mobile-motion.md) registram essa etapa. A antiga neutralização de molduras no telefone é um limite a substituir quando a implementação deste plano for autorizada. Não tratar a proposta como código entregue ou reutilizar os checks anteriores como QA do novo mobile. O palco desktop, fotos, conteúdo, contatos e preferência reduzida continuam protegidos.

### Ampliação de movimento — 20/10/2026

**Fechamento em 21/10/2026:** build e typecheck finais, seis testes de geometria, 16 cenários do smoke e seis cenários adicionais de motion passaram. Três tamanhos de notebook baixo também foram conferidos; revisão independente final de código e capturas aprovada. Evidências e limites em [verification.md](docs/pessoas-em-cena-2026-10-20/verification.md).

Após elogiar Pessoas em cena, o usuário pediu mais movimentos e transições, usando Lando Norris e KAIRN como referências. O **“pode seguir”** autorizou implementar a coreografia, sem substituir a direção ou ampliar o conteúdo comercial. Consultar também o [roteiro de movimento](docs/pessoas-em-cena-2026-10-20/motion.md).

A ampliação inclui título por linhas, nomes animados, indicador de três etapas, maior profundidade e ponteiro com mola no hero; `MotionChapter` para contornos e entradas finitas dos capítulos, processo e fechamento; `ScrollFrame` para acomodar Corretor e Roger em desktop; menu coordenado e catálogo com carregamento/decodificação antes do crossfade. Preservar a duração de 300svh, planos fotográficos paralelos, reset do ponteiro fora da tela/aba oculta, neutralização das molduras no celular, movimento reduzido ao vivo e conteúdo HTML visível antes dos aprimoramentos. Não ocultar um controle focado para aguardar uma animação.

Nesta ampliação, typecheck, build, seis testes de movimento e a nova execução dos 16 cenários do smoke passaram; revisão estática independente aprovada. O QA adicional de movimento, rede e toque tem seu estado final na verificação atual. Esses checks não apagam nem reaproveitam automaticamente os resultados da primeira entrega. Sem commit, push ou deploy nesta etapa.

### Contratos a preservar

- Pessoas: `src/data/team.ts`, na ordem Fernando Riad, Eduardo Gobatto e Victor Rafael. Não inferir funções, especialidades ou contatos. Fernando e Eduardo foram descritos como estudantes; essa informação não autoriza chamar Victor ou o grupo inteiro de estudantes.
- Fotografias: originais em `public/team/`, adquiridos dos perfis GitHub autorizados e do anexo de Victor. Preservar bytes, origem, MIME, dimensões e hashes de `public/team/manifest.json` e do [registro dos assets](docs/pessoas-em-cena-2026-10-20/assets.md). Não reconstruir rostos nem remover fundos.
- Contatos comerciais: apenas os originais de `siteContent.founders`, Fernando `5566999356646` e Eduardo `556684184488`. Não acrescentar dígitos por inferência ou criar contato para Victor.
- Oferta: `src/data/offer.ts` conserva o pacote aprovado e seus limites. Corretor é trabalho real; Roger é projeto demonstrativo, sem contrato ou resultado comercial comprovado.
- Cena: importar Three.js por um componente de cliente dinâmico, somente em desktop com largura a partir de 1024 px e sem movimento reduzido. Preservar HTML completo para celular, ausência de JavaScript, movimento reduzido e falha de WebGL. Manter foco visível em controles e conteúdo legível sem canvas.
- Identidade: base `#f7f9fc`, texto `#142033`, ação `#2f4bff`, campo suave `#dce5f3`; Bricolage Grotesque e Source Sans 3 servidas localmente com suas licenças.
- Preservação: não apagar estudos, prompts, fontes, licenças, capturas e archives. A versão anterior foi preservada em `docs/pessoas-em-cena-2026-10-20/archive/`. Atualizar a documentação existente sem eliminar seus registros anteriores.

### Servidor e verificações

Iniciar pelo gerenciador local: `npm run dev -- --background`. Usar `npm run dev -- status`, `npm run dev -- logs` e `npm run dev -- stop` para gerenciar o mesmo servidor. A prévia local usa `http://localhost:4321/`. Para acesso na rede, acrescentar `--lan`; sem essa opção, manter o servidor restrito à máquina.

Executar as verificações atuais e registrar seus resultados reais em `docs/pessoas-em-cena-2026-10-20/verification.md`:

```sh
npm run typecheck
npm run build
node --experimental-strip-types --test scripts/portrait-motion.test.mjs
node --experimental-strip-types --test scripts/mobile-portrait-motion.test.mjs
```

O QA de navegador deve cobrir desktop e celular, teclado, toque, movimento reduzido, ausência de JavaScript e falha da cena. Não descrever esses checks como concluídos antes de obter a evidência atual. Consultar a documentação oficial de [Next.js App Router](https://nextjs.org/docs/app), [componentes de servidor e cliente](https://nextjs.org/docs/app/getting-started/server-and-client-components) e [Three.js](https://threejs.org/docs/) antes de tarefas relacionadas.

## Histórico preservado — instruções anteriores à autorização de 20/10/2026

Os registros seguintes ficam preservados. A stack Next.js e o uso do gerenciador em background continuam válidos; identidade, escopo visual e resultados anteriores devem ser lidos à luz do contrato vigente acima.

## Development — vigente desde 19/10/2026

O usuário autorizou explicitamente substituir Astro por **Next.js App Router + React + TypeScript + Tailwind CSS + Lenis + Framer Motion**. Essa decisão substitui a orientação anterior de manter Astro. Não recriar a aplicação Astro nem tratar os registros antigos como a stack vigente.

Inicie o servidor em background pelo gerenciador local `scripts/dev.mjs`:

```sh
npm run dev -- --background
```

Gerencie o mesmo servidor com:

```sh
npm run dev -- status
npm run dev -- logs
npm run dev -- stop
```

Para expor o servidor na rede local, de modo que outros dispositivos no mesmo wifi alcancem a página, acrescente `--lan`:

```sh
npm run dev -- --background --lan
```

Com `--lan`, o Next.js escuta em `0.0.0.0` em vez de `127.0.0.1` e o gerenciador imprime os endereços alcançáveis, com o IP da rota padrão primeiro. Sem a flag, o servidor fica restrito à máquina. A flag vale para os modos dev e produção.

Valide a aplicação com `npm run typecheck` e `npm run build`. O App Router está em `src/app/`; a experiência interativa usa componentes React em `src/components/experience/`. A oferta e os contatos continuam em `src/data/offer.ts`, `src/data/landing.ts` e `src/data/site.ts`. `src/` contém apenas TypeScript e TSX; não reintroduzir componentes `.astro`, `src/pages/` ou `astro.config.mjs`.

Antes de alterar tarefas relacionadas, consulte a documentação oficial vigente:

- [Next.js App Router](https://nextjs.org/docs/app)
- [Layouts e páginas](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Componentes de servidor e cliente](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [CSS e Tailwind](https://nextjs.org/docs/app/getting-started/css)
- [Metadados e imagens de compartilhamento](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

As fontes Astro, configurações e documentação anteriores foram copiadas com hashes para `docs/next-lando-2026-10-19/archive/`. Em 19/10/2026 a árvore Astro foi removida de `src/` e o `astro.config.mjs` foi eliminado: a fonte histórica existe somente no archive, byte-idêntica e com SHA-256 conferido. Os estudos estão congelados como HTML/CSS/JS em `public/estudo/`, sem dependência de `/_astro/`; as rotas são resolvidas por rewrites e permanecem `noindex`, fora do sitemap. Não apagar o acervo, seus prompts, capturas ou licenças. A documentação da migração está em `docs/next-lando-2026-10-19/README.md`.

## Histórico preservado — desenvolvimento Astro, anterior à autorização de 19/10/2026

As instruções abaixo pertencem à aplicação Astro preservada. Não são o protocolo de desenvolvimento da nova aplicação Next.js. Os guias Astro continuam úteis apenas ao consultar ou reconstruir aquela fonte histórica.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
