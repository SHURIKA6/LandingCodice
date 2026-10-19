# Codice — migração para Next.js e nova experiência

## Autorização e escopo — 19/10/2026

Depois da entrega Ritmo em Astro, o usuário perguntou se a implementação usava Next.js App Router, React, TypeScript, Tailwind, Lenis e Framer Motion. Ao receber a confirmação de que Astro havia sido mantido conforme o plano anterior, pediu explicitamente essa stack e uma experiência com o nível de acabamento do [site de Lando Norris](https://landonorris.com/). Essa instrução substitui a preservação de Astro como tecnologia de produção; não substitui as condições comerciais aprovadas.

A execução atual migra a landing raiz para **Next.js App Router + React + TypeScript + Tailwind CSS + Lenis + Framer Motion** e reestrutura a experiência com arte central abstrata, marfim, oliva e destaque ácido. A referência orienta composição, escala e fluidez, sem copiar a marca do piloto. A identidade Ritmo e as direções anteriores ficam no histórico.

## O que precisa continuar verdadeiro

- Site de uma página, até seis seções, por **R$ 1.500**.
- **R$ 750** para iniciar após acordo de escopo por escrito e **R$ 750** após aprovação, antes da publicação.
- Textos organizados pela dupla a partir de briefing; informações e fotos reais fornecidas e aprovadas pelo cliente.
- Uma rodada consolidada; correções de defeitos da entrega não consomem essa rodada.
- Domínio e eventual hospedagem pagos diretamente pelo cliente em suas próprias contas; prazo conforme proposta, materiais e disponibilidade.
- Mudanças posteriores e novos escopos orçados separadamente. A experiência autoral desta landing não amplia automaticamente o pacote de entrada.
- Contatos literais: Fernando Riad `5566999356646`; Eduardo Gobatto `556684184488`.
- Corretor como trabalho real por funcionalidades verificáveis; Roger como projeto demonstrativo de portfólio; sem resultados, depoimentos ou métricas inventados.
- Preço, texto, contato e navegação acessíveis; animação respeita movimento reduzido. Sem demo de IA ou promessa de atendimento automatizado incluído.
- Nenhum deploy nesta etapa. Domínio final ainda não informado.

## Preservação concluída antes da migração

[O arquivo Astro](archive/README.md) contém 148 arquivos de fonte, configuração, dependências, documentação e estado do processo visual, com SHA-256 conferidos e nenhuma divergência. Não foram movidos nem apagados os originais durante essa cópia.

O build Astro existente foi congelado em `public/estudo/`: painel e três prévias, quatro HTMLs e nove bundles próprios. Foram verificadas 55 referências locais. Todos os estudos mantêm `noindex, nofollow`, sem dependências de `/_astro/`; fontes, imagens, licenças e prévias continuam em seus caminhos preservados. A root Astro e seus bundles exclusivos não foram copiados para a nova aplicação pública. O Next.js precisa resolver os quatro caminhos de estudo por rewrites e excluí-los do sitemap.

## Organização da implementação

| Área | Caminhos |
| --- | --- |
| App Router | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css` |
| Experiência React | `src/components/experience/` |
| Fonte da oferta e dos contatos | `src/data/offer.ts`, `src/data/landing.ts`, `src/data/site.ts` |
| Estudos preservados | `public/estudo/` |
| Servidor em background | `scripts/dev.mjs` |
| Acervo Astro | `docs/next-lando-2026-10-19/archive/` |

Para iniciar o servidor, use `npm run dev -- --background`. Para gerenciar: `npm run dev -- status`, `npm run dev -- logs` e `npm run dev -- stop`. As verificações da nova aplicação são `npm run typecheck` e `npm run build`. O protocolo corrente está também em [AGENTS.md](../../AGENTS.md); os comandos Astro anteriores continuam documentados como histórico.

## Registro de execução

| Estado | Registro |
| --- | --- |
| Concluído | Fonte Astro copiada com hashes; quatro estudos exportados e suas referências verificadas. |
| Concluído | App Router, componentes React, hero autoral, Lenis, Framer Motion e composição responsiva implementados. |
| Verificado | Build e typecheck passaram. QA próprio repetido sobre o build de produção, com zero erros de página/console. |
| Verificado | Cinco larguras, teclado, toque, foco, links, menu, catálogo, replay, movimento reduzido ao vivo e no-JS. Revisão independente: **ship**. |
| Fora desta entrega | Publicação e configuração de domínio final. |

Resultados e limites estão em [verification.md](verification.md), com [QA de produção](production-verification.json) e [revisão independente](review.md). Migração e entrega local concluídas; o parecer não equivale à aprovação visual pessoal do usuário ou a deploy. A prévia local em background serve o build de produção: `npm run dev -- --background --production`.

## Documentação e histórico relacionados

- [Produto vigente e histórico completo](../../PRODUCT.md)
- [Direção visual e histórico](../../DESIGN.md)
- [Fontes arquivadas e procedimento de preservação](archive/README.md)
- [Manifesto SHA-256 das fontes](archive/source-manifest.json)
- [Manifesto SHA-256 dos estudos estáticos](archive/static-studies-manifest.json)
- [Origem da nova arte](asset.md)
- [Entrega Ritmo em Astro](../landing-ritmo-2026-10-18/README.md)
- [Comparação Forma, Fluxo e Ritmo](../study-2026-10-18/README.md)

