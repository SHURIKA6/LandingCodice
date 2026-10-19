# Verificação — Next.js e experiência Em evidência

Data: 19/10/2026. Entrega local; nenhum deploy executado. Esta etapa substitui a aplicação Astro de produção, por solicitação explícita do usuário.

## Stack efetivamente instalada e usada

| Tecnologia | Versão | Uso |
| --- | --- | --- |
| Next.js | 16.4.2 | App Router, Server Components, metadados, sitemap, rewrites e build estático das páginas. |
| React / React DOM | 19.3.1 | Componentes da experiência e hidratação. |
| TypeScript | 5.9.3 | Tipagem estrita e `tsc --noEmit`. |
| Tailwind CSS / PostCSS plugin | 4.3.3 | Pipeline CSS 4 com preflight e fontes de classes limitadas à nova aplicação. |
| Lenis | 1.3.27 | Rolagem com `lerp: 0.1`, âncoras, um loop RAF e toque nativo. |
| Framer Motion | 14.4.0 | Ponteiro, rolagem, replay da arte e transição das capturas. |

As versões constam no manifesto/lockfile e foram confirmadas por `npm ls --depth=0`. Não foi adicionado backend de IA.

## Build, tipos e metadados

`npm run build` e `npm run typecheck` passaram. Next gerou `/`, `/_not-found` e `/sitemap.xml` como conteúdo estático. A validação foi repetida após as correções de navegação e movimento reduzido.

Build temporário com `SITE_URL=https://codice-verification.invalid` conferiu canonical normalizado e sitemap com apenas a raiz. Next normaliza o canonical sem a barra final; a comparação foi feita como URL, não por diferença textual de barras. Os estudos não aparecem no sitemap. A variável foi restaurada e outro build normal passou, sem o domínio reservado no HTML. [Resultado](sitemap-verification.json).

Título, descrição, idioma, favicon, organização/fundadores em JSON-LD e preloads locais mantidos. O domínio público final segue não informado; sem ele, não há canonical fictício. A raiz é indexável; os documentos de estudo mantêm meta e cabeçalho `noindex,nofollow`.

O servidor foi iniciado em background com `npm run dev -- --background --production`, servindo o **build de produção** em `http://localhost:4321/`. `npm run dev -- status`, `logs` e `stop` gerenciam o processo; o comando sem `--production` mantém o modo de desenvolvimento.

## QA de navegador

O procedimento [verify-browser.js](verify-browser.js) foi executado em Chromium. Houve execução durante o desenvolvimento e repetição no build de produção. [Resultado de desenvolvimento](browser-verification.json) e [resultado final de produção](production-verification.json).

| Largura × altura | Overflow / imagem quebrada / âncora ausente | CTA principal |
| --- | --- | --- |
| 320 × 1000 | Nenhum | Topo em 626 px |
| 390 × 1000 | Nenhum | Topo em 678 px |
| 768 × 1000 | Nenhum | Topo em 719 px |
| 1024 × 1000 | Nenhum | Topo em 769 px |
| 1440 × 1000 | Nenhum | Topo em 841 px |

O documento desconta a largura da barra de rolagem. Não houve erro de página ou de console na execução final de produção. Controles visíveis têm ao menos 24 px em ambas as dimensões.

- Teclado: skip link e foco no conteúdo; foco visível do CTA; menu por Enter, fechamento por Escape e retorno do foco; fechamento ao seguir âncora; seleção das capturas por Enter/Space com um estado pressionado; replay.
- Toque em 390 × 844: menu, navegação, seleção do catálogo, CTA principal e os dois contatos individuais.
- WhatsApp: popups **interceptados localmente**, com números e mensagem conferidos. Não foi enviada mensagem nem verificado cadastro dos números no provedor.
- Preferência reduzida: ativação ao vivo devolve a rolagem ao navegador, remove o replay e as transformações; desativação reativa Lenis. Um hook com `useSyncExternalStore` acompanha a preferência, porque o hook da versão instalada do Framer Motion mantém um snapshot inicial.
- Sem JavaScript: oferta, preço, termos, menu nativo e contato disponíveis; controles de troca de captura ficam ocultos e a primeira captura real continua visível.
- Rolagem: corrigido o afastamento duplicado nas âncoras. Lenis considera `scroll-margin` do CSS; não recebe um segundo offset. Há uma única RAF, cancelada com destroy/cleanup e com aba oculta.

As quatro rotas `/estudo/`, `/estudo/forma/`, `/estudo/fluxo/` e `/estudo/ritmo/` responderam 200 pelo Next, com noindex no meta e no cabeçalho, oferta preservada e nenhuma imagem quebrada. Os HTMLs são documentos estáticos independentes; não foram reimplementados como React nem receberam o CSS da nova raiz.

## Acessibilidade e limites

Axe 4.14, regras WCAG 2 A/AA e 2.1 AA, em 390 e 1440 px: **zero violações detectadas**, 25 verificações aprovadas por execução. A análise de contraste ficou incompleta em textos sobre a composição artística, títulos em contorno e, em uma execução, a moldura/legenda transformadas do projeto. A inspeção visual e os pares de cor complementaram a análise automática:

| Texto / fundo | Razão |
| --- | --- |
| Tinta `#25291f` / papel `#f4f4ed` | 13,43:1 |
| Secundária `#626857` / papel | 5,23:1 |
| Tinta / ácido `#d2ff00` | 12,75:1 |
| Secundária clara `#c8cdbd` / tinta | 9,13:1 |

Não equivale a auditoria integral com leitores de tela, todos os navegadores/aparelhos, benchmark de performance ou aprovação visual do usuário. Não foi configurado ESLint separado; build e typecheck não são descritos como lint.

O detector visual foi executado uma vez. Foram observados avisos de escala tipográfica contra o DESIGN anterior enquanto o sistema visual era atualizado. A saída foi truncada pelo limite do comando; [o resumo](detector-summary.json) não é um parecer de zero achados. A revisão independente avalia a tipografia real e o código vigente.

## Imagens, referência e preservação

A escultura foi criada com `image_gen.imagegen` nativo, convertida mecanicamente para WebP de 800 × 800, cerca de 105 KB e alfa real. O PNG mestre e o prompt foram preservados; o PNG recebeu metadados de proveniência, e seu manifesto foi atualizado mantendo os valores anteriores. [Prompt e método](asset.md). A interação transforma uma imagem raster, não um modelo tridimensional real. Não há assets, retratos ou marca do piloto na aplicação.

As duas capturas imobiliárias são genuínas, do ambiente de teste em 17/10, com fontes e sidecars documentados. Elas não comprovam disponibilidade atual ou resultados comerciais. O sistema imobiliário e a própria experiência autoral da Codice têm escopo distinto do pacote de R$ 1.500. Nenhuma condição, número de contato ou resultado foi inventado.

O arquivo anterior contém 148 fontes/configurações/documentos. Os hashes foram conferidos no fechamento; o README original está em `archive/source-README.md`, diferenciado do guia de arquivo por `archivePath` no manifesto. O acervo Astro, imagens, licenças, prompts e histórico permanecem preservados. [Arquivo e manifestos](archive/README.md).

Capturas finais de produção: `width-320.png`, `width-390.png`, `width-768.png`, `width-1024.png`, `width-1440.png`, `desktop-full.png`, `mobile-full.png` e `menu-mobile.png`. O estado `project-catalog-mobile.png` foi recapturado isoladamente após uma captura transitória inválida; todos esses arquivos foram abertos e inspecionados. As imagens `*-round1.png` são intermediárias e não representam o fechamento.

## Revisão final

A revisão visual independente terminou com **ship**, sem achados materiais no escopo das capturas e fontes, conforme [review.md](review.md). A revisão técnica paralela também não encontrou achados materiais no ciclo de Lenis, SSR, menu e rewrites; uma pequena proteção extra foi adicionada para não reiniciar Lenis com a aba oculta.

Checagem adicional em produção confirmou resposta da arte ao ponteiro e transformações durante a rolagem. Os textos vigentes de PRODUCT, README e ledger foram encerrados com os resultados reais; o histórico foi preservado.

