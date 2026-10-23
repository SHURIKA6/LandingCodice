# Limpeza conservadora de código — 22/10/2026

Executada após o pedido de verificar código morto/Tailwind e a autorização **“gooo”**. A prioridade foi reduzir resíduos sem redesenhar a página, mudar palavras públicas ou desfazer trabalho local.

## Alterações

- `src/app/globals.css`: Tailwind mantido, com `source('../')` relativo ao stylesheet — somente `src/` é varrido. Preflight, plugin PostCSS, dependências e ordem dos imports permanecem. A aplicação continua usando principalmente CSS autoral, não foi convertida para utilities.
- `MotionChapter.tsx` e estilos associados: removida a criação de wrappers, entrada e progresso do preço que não existe mais no markup. Oferta, inclusões, processo, títulos, wordmark e cancelamentos continuam intactos.
- Removidos seletores do antigo `<summary>` das condições, duas regras vazias, `--motion-feedback` e os seletores do atributo `data-mobile-motion`, que não era mais escrito. O `useInView`/`data-entered` de `PersonCard` só alimentava esses seletores e foi removido; o scroll atual continua em Framer Motion.
- `src/data/site.ts`: retirados conteúdo e tipos exclusivos das antigas seções sem consumidores. Os contatos foram preservados literalmente. Corretor e Roger agora fornecem descrição/lista para `page.tsx`; os valores de Roger foram alinhados ao texto **já renderizado**, sem alterar a página.
- `src/data/landing.ts`: removidos headline e media não consumidos. A descrição do pacote agora lê `offer.headline`, sem editar `src/data/offer.ts`. Removida a classe inerte `corretor-case`.
- `scripts/styles.test.mjs`: teste real de compilação PostCSS/Tailwind em fixture isolada, sem dependência nova. Verifica utilities/variantes de `src/`, exclusão de documentação/scripts/estudos e manutenção do preflight.

## Preservação

As fontes imediatamente anteriores de `site.ts` e `landing.ts`, **incluindo as alterações locais pré-existentes**, estão em `archive/`, com bytes e SHA-256 no manifesto. Não são módulos de runtime.

- Nenhum arquivo em `public/` foi apagado ou alterado. Fontes, estudos, licenças, retratos e artes originais continuam presentes.
- As quatro pessoas, assinaturas, números e GitHubs presentes no checkout foram preservados, não reinterpretados como nova autorização comercial. A tipagem opcional de GitHub e `allowImportingTsExtensions` já estavam corrigidos quando esta execução começou; não são mudanças desta limpeza.
- Não foram restauradas nem ampliadas as deleções locais em `docs/mobile-motion-2026-10-21/`. Os briefings/verificações históricos citados em `AGENTS.md`, mas ausentes no checkout, não foram recriados como se contivessem evidência antiga. O QA novo fica neste diretório.
- `project-capture-base` foi preservado: mesmo sem regra CSS própria, é um seletor consumido por `scripts/verify-motion.browser.js`. Ausência de CSS não prova que uma classe é morta.

Resultados e limites: [verification.md](verification.md). Sem commit, push ou deploy nesta execução.
