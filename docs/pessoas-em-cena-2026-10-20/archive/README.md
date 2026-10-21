# Codice — landing e estudo visual

## Estado vigente — migração para Next.js e nova experiência, 19/10/2026

O usuário pediu explicitamente **Next.js App Router + React + TypeScript + Tailwind CSS + Lenis + Framer Motion**, buscando uma experiência com o nível de acabamento do [site de Lando Norris](https://landonorris.com/). A decisão substitui a orientação anterior de manter Astro. A oferta comercial continua sendo **um site de uma página, com até seis seções, por R$ 1.500**, para prestadores de serviços de Sinop/MT e região.

A nova direção tem uma composição central com arte abstrata, tons de marfim e oliva e destaque ácido. Movimento e interação apoiam a hierarquia, a apresentação do trabalho e o contato; a arte de marca não é evidência de um projeto de cliente. A referência orienta acabamento e fluidez, sem copiar a identidade de Lando. As três propostas anteriores continuam disponíveis em `/estudo/` como histórico de comparação.

**Implementação e validação local concluídas.** A raiz usa a stack solicitada. Build de produção e typecheck passaram; QA em 320, 390, 768, 1024 e 1440 px cobriu teclado, toque, menu, catálogo, contatos interceptados, âncoras, replay e movimento reduzido ao vivo. O QA sem JavaScript também passou. Axe registrou zero violações detectadas, com limites descritos no [relatório](docs/next-lando-2026-10-19/verification.md). Revisão independente: **ship**. Os 148 arquivos anteriores foram conferidos por hash, e os estudos continuam noindex. Não houve deploy; o domínio final segue sem definição. A prévia do build de produção está em `http://localhost:4321/`.

- [Briefing e registro da migração](docs/next-lando-2026-10-19/README.md)
- [Preservação de fontes, estudos e hashes](docs/next-lando-2026-10-19/archive/README.md)
- [Produto e condições comerciais](PRODUCT.md)
- [Direção visual](DESIGN.md)

| Caminho | Responsabilidade vigente |
| --- | --- |
| `src/app/layout.tsx` | Documento, fontes, metadados e integração global. |
| `src/app/page.tsx` | Página principal pelo App Router. |
| `src/app/globals.css` | Sistema visual, responsividade, foco e movimento reduzido. |
| `src/components/experience/` | Componentes React e interações com Lenis/Framer Motion. |
| `src/data/offer.ts` | Oferta pública e condições comerciais compartilhadas. |
| `src/data/landing.ts` e `src/data/site.ts` | Conteúdo, projeto real e contatos preservados. |
| `public/estudo/` | Painel e três estudos Astro congelados como arquivos estáticos. |
| `scripts/dev.mjs` | Gerenciamento do servidor Next.js em background. |

Para desenvolver, use `npm run dev -- --background`. Consulte `npm run dev -- status`, `npm run dev -- logs` e `npm run dev -- stop` para gerenciar o servidor. As verificações da nova stack são `npm run typecheck` e `npm run build`; veja também [AGENTS.md](AGENTS.md).

Os estudos possuem quatro HTMLs e nove bundles próprios, com 55 referências locais verificadas. Rewrites mantêm `/estudo/`, `/estudo/forma/`, `/estudo/fluxo/` e `/estudo/ritmo/`; essas rotas ficam `noindex` e fora do sitemap. A fonte Astro completa, configurações e documentação anterior foram arquivadas antes da migração, com 148 arquivos e hashes conferidos. Em 19/10/2026 a árvore Astro saiu de `src/` e o `astro.config.mjs` foi eliminado: essas fontes existem somente em `docs/next-lando-2026-10-19/archive/`, byte-idênticas, e `src/` passou a conter apenas TypeScript e TSX. Os contatos de Fernando (`5566999356646`) e Eduardo (`556684184488`) continuam literais; não adicionar dígitos por inferência.

## Histórico preservado — entrega Ritmo em Astro, anterior à migração de 19/10/2026

O bloco a seguir registra a entrega Astro concluída antes do pedido explícito de Next.js. A stack, os comandos de servidor e os resultados de QA desse bloco pertencem àquela implementação. O estado vigente está acima.

## Estado vigente — landing final Ritmo, fechamento em 19/10/2026

**Ritmo foi escolhida** e a landing final está implementada na rota `/`. A página vende sites de uma página por **R$ 1.500** para prestadores de serviços de Sinop/MT e região, em quatro blocos: hero, projeto imobiliário real, pacote e dupla com contato.

O pacote inclui até seis seções, layout responsivo, textos organizados a partir do briefing, WhatsApp, localização, metadados básicos, uma rodada consolidada de revisão e configuração/publicação. Fatos e fotos são fornecidos e aprovados pelo cliente; correções de defeitos da entrega não consomem a revisão. São **R$ 750 para iniciar após acordo de escopo por escrito e R$ 750 após aprovação, antes da publicação**. Prazo consta da proposta. O cliente paga domínio e hospedagem diretamente em suas próprias contas; alterações posteriores e escopos extras são orçados separadamente.

- [Briefing e ledger da landing final](docs/landing-ritmo-2026-10-18/README.md)
- [Verificação da landing final e limites](docs/landing-ritmo-2026-10-18/verification.md)
- [Produto vigente](PRODUCT.md)
- [Sistema visual vigente](DESIGN.md)
- [Comparativo anterior preservado](docs/study-2026-10-18/README.md)

O projeto imobiliário Corretor é a evidência de trabalho real, sem promessa de resultado comercial. O fechamento preserva os WhatsApps de Fernando Riad (`5566999356646`) e Eduardo Gobatto (`556684184488`), sem alterar o número de Eduardo por inferência. A oferta pública desta página é de sites; o histórico de outras competências e serviços não amplia o pacote.

Astro 7.4 e Tailwind CSS 4 continuam. Os termos comerciais passam a `src/data/offer.ts`; produção usa `src/layouts/Page.astro`, `src/pages/index.astro`, `src/styles/global.css` e `src/scripts/landing.ts`. `src/data/site.ts` permanece preservado para portfólio e contatos. Os estudos em `/estudo/` ficam intactos, com `noindex` e fora do sitemap.

Build e QA próprio da raiz concluídos em 320, 390, 768, 1024 e 1440 px, incluindo teclado, toque, movimento reduzido e uso sem JavaScript. Axe registrou zero violações nas duas larguras verificadas, com limites na análise de títulos em contorno documentados no relatório. A revisão visual independente terminou com **ship**. A demo imobiliária indisponível foi substituída pela captura real autorizada; não há vídeo válido publicado. As quatro fontes antigas foram arquivadas com hashes conferidos; acervo e estudos permanecem preservados. Nenhum domínio final foi configurado nem houve deploy. O servidor segue em background em `http://localhost:4321/`; gerencie com `npm run astro -- dev status`, `logs` e `stop`, conforme `AGENTS.md`.

## Histórico preservado — comparativo anterior à escolha de Ritmo, 18/10/2026

Os registros abaixo pertencem à comparação entregue antes da seleção. Menções a escolha pendente, raiz antiga preservada e reconstrução futura descrevem aquele momento. O estado vigente é a implementação autorizada de Ritmo acima; o acervo permanece intacto.

## Estado vigente — 18/10/2026

A Codice, de Fernando Riad e Eduardo Gobatto, apresenta uma oferta de site de uma página para prestadores de serviços de Sinop/MT e região. A entrada aprovada custa **R$ 1.500**, com até seis seções; condições, revisão, pagamentos e limites estão em [PRODUCT.md](PRODUCT.md).

O estudo de três direções de marca e interação está implementado: **Forma**, **Fluxo** e **Ritmo**. A identidade anterior de livro antigo foi abandonada. A rota `/` permanece temporariamente com a landing anterior, enquanto `/estudo/` reúne as alternativas e leva às prévias `/estudo/forma/`, `/estudo/fluxo/` e `/estudo/ritmo/`. Cada uma apresenta hero, início da próxima seção e uma interação característica, além de blocos de apoio para revisar oferta, portfólio e dupla. A escolha do usuário segue pendente e antecede a reconstrução da landing completa.

- [Briefing vigente e registro de execução](docs/study-2026-10-18/README.md)
- [Produto e oferta aprovados](PRODUCT.md)
- [Critérios do estudo visual atual](DESIGN.md)
- [Acervo histórico de 17/10](docs/visual-study/README.md)

O painel usa seis capturas reais das prévias, em desktop de 1440 × 1100 px e celular de 390 × 1400 px, e permite abrir cada interação. As quatro rotas construídas têm `noindex,nofollow`; sua exclusão do sitemap foi verificada. Astro 7.4 e Tailwind CSS 4 permanecem, com estilos e layout isolados. As três fontes locais e suas licenças OFL estão documentadas em [fonts.md](docs/study-2026-10-18/fonts.md).

O build passou; o teste de sitemap com `SITE_URL` temporária em domínio reservado também passou, e o ambiente foi restaurado antes de outro build normal bem-sucedido. O QA em navegador cobriu 12 combinações de prévia e largura e oito de painel e formato, sem overflow, imagens quebradas ou destinos de âncora ausentes. As interações, teclado, toque, movimento reduzido e uso sem JavaScript foram conferidos. Axe 4.14 registrou zero violações nas prévias; a análise automática de contraste ficou incompleta em Forma e Ritmo e foi complementada pela conferência manual dos pares de cores. O painel terminou a repetição de axe com zero violações e sem verificações incompletas. Os quatro hashes legados foram confirmados iguais ao início. Resultados e limites estão no [relatório final](docs/study-2026-10-18/verification.md); esse QA não equivale a typecheck completo ou aprovação visual do usuário. Nenhum domínio final foi definido nem houve deploy.

O portfólio deve distinguir **Corretor**, trabalho efetivamente desenvolvido sem alegações de resultado, de **Roger**, projeto demonstrativo desenvolvido para um prospect que desistiu, sem contrato. Capturas e provenance antigas permanecem preservadas.

Para desenvolvimento, seguir `AGENTS.md`: `npm run dev -- --background`; gerenciar com `npm run astro -- dev status`, `npm run astro -- dev logs` e `npm run astro -- dev stop`. O build é `npm run build`. O ambiente exige Node.js `>=22.22.0`, conforme `package.json`. A ausência de `.git` foi confirmada e a pasta atual foi utilizada; não houve `git init`, criação de worktree nem commit. Não foi adicionado framework de testes para estas prévias; a validação usou build e QA em navegador.

## Histórico preservado — landing e estudo de 17/10/2026

O conteúdo abaixo é o registro anterior. As menções a estado “atual”, “direção escolhida”, servidor ativo e QA concluído pertencem àquela execução e podem estar desatualizadas. A identidade e a oferta vigentes estão nos blocos de 18/10 acima; a classificação comercial de Roger foi corrigida após o briefing original.

Empresa de tecnologia de Fernando Riad e Eduardo Gobatto. Sites e sistemas sob medida são o foco; manutenção e suporte para computadores são complementares.

## Estado atual — 17/10/2026

A landing estática foi implementada em Astro 7.4 e Tailwind CSS 4 após a escolha explícita da proposta **2. Encadernação escura**: “Pode escolher por mim e seguir com a 2”. O hero tem capa escura e lombada, seguido de um fólio claro com os dois projetos reais em composição assimétrica. Serviços, suporte local, apresentação da dupla e contato completam a página.

O preview local está em `http://localhost:4321`, com servidor em background. O build estático e a revisão em Chromium foram concluídos: oito larguras de 320 a 1920 px, navegação por teclado, menu, movimento reduzido e fallback sem JavaScript. Axe terminou com zero violações; a análise automática de contraste sobre imagens permaneceu incompleta e foi complementada por inspeção visual e amostragem do material. Evidências e limites em [verificação da implementação](docs/visual-study/implementation-verification.md).

- [Contexto do produto](PRODUCT.md)
- [Direção visual e padrões implementados](DESIGN.md)
- [Briefing e estado do estudo](docs/visual-study/brief.md)
- [Comparação das propostas](docs/visual-study/README.md)
- [Origem das capturas reais](docs/visual-study/references/sources.md)
- [Fontes locais e licenças](docs/visual-study/fonts.md)

Os contatos estão centralizados em `src/data/site.ts`: Fernando `5566999356646` e Eduardo `556684184488`. O número de Eduardo preserva exatamente o fornecido pelo usuário, sem inclusão de outro dígito. O CTA principal usa Fernando; há links individuais para ambos.

O domínio final ainda não foi informado. Configure `SITE_URL` com a URL pública antes do build de publicação. A configuração condicional em `astro.config.mjs` habilita o sitemap quando o valor existe; o layout usa a mesma URL para canonical, `og:url` e URL da organização no JSON-LD. O exemplo está em `.env.example`; em PowerShell, a variável também pode ser definida no ambiente do processo antes do build:

```powershell
$env:SITE_URL = 'https://dominio-final-informado.com.br'
npm run build
```

O endereço do exemplo deve ser substituído pelo domínio real. Sem `SITE_URL`, o build local não publica canonical, URL da organização nem sitemap com um domínio inventado.

## Estrutura da landing

| Caminho | Responsabilidade |
| --- | --- |
| `src/pages/index.astro` | Hero, trabalhos, serviços, suporte, dupla, contato e comportamento do menu móvel. |
| `src/layouts/Page.astro` | Documento, metadados, pré-carregamento das fontes e capa, JSON-LD e link para pular ao conteúdo. |
| `src/styles/global.css` | Fontes locais, tokens visuais, composição, responsividade, foco e movimento reduzido. |
| `src/data/site.ts` | Textos, projetos, contatos, links e serviços tipados. |
| `public/images/` | Materiais de capa/papel/CTA e capturas reais dos cases em WebP. |
| `public/fonts/` | WOFF2 locais e licenças OFL das duas famílias. |

Os materiais de capa, papel e botão são artes limpas produzidas com `image_gen.imagegen`, sem texto incorporado. As imagens de Corretor e Roger vêm das capturas originais documentadas, convertidas para WebP; miniaturas reinterpretadas pelos conceitos gerados não substituem essas capturas.

O menu móvel inclui Escape com retorno de foco, fechamento ao seguir links e navegação disponível sem JavaScript. As regras de foco visível e `prefers-reduced-motion` foram verificadas no navegador. Não há typecheck completo configurado; o build Astro e os checks em navegador não devem ser descritos como tal.

## Desenvolvimento

Usar `npm run dev -- --background`. Gerenciar o servidor com `npm run astro -- dev status`, `npm run astro -- dev logs` e `npm run astro -- dev stop`. O build é executado com `npm run build`.

Requer Node.js `>=22.22.0`, conforme `package.json`. O resultado estático do build fica em `dist/`.

## Histórico — etapa de comparação, antes da escolha

O texto abaixo registra o estado da primeira entrega de 17/10/2026. A seleção explícita e a implementação descritas acima são posteriores. Os estudos e a documentação original permanecem disponíveis.

> O plano foi aprovado. A primeira entrega foi produzida: comparação de três propostas em imagem, **Fólios abertos**, **Encadernação escura** e **Manuscrito de projetos**, com versões individuais de 1440 × 1100 px e painel lado a lado. A landing será implementada depois da escolha visual do usuário; o starter Astro está preservado até essa decisão.
>
> As capturas dos projetos são referências reais. As propostas visuais geradas são estudos de composição, não capturas de uma landing já implementada. Número de WhatsApp e domínio ainda precisam ser informados antes da publicação.

## Documentação original do starter

O conteúdo original abaixo foi preservado como referência de instalação e estrutura. Para iniciar o servidor neste projeto, prevalece o modo em background indicado acima e em AGENTS.md.

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


