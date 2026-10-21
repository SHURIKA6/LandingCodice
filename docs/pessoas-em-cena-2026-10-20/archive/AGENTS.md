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
