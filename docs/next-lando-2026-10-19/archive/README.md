# Preservação do Astro antes da migração para Next.js

Em 19/10/2026, o usuário autorizou Next.js App Router, React, TypeScript, Tailwind, Lenis e Framer Motion e pediu uma experiência com o nível de acabamento da referência Lando Norris. Este diretório preserva o estado anterior à migração, sem apagar ou mover os originais.

## Fonte preservada

Foram copiados 148 arquivos de `src/pages`, `src/layouts`, `src/styles`, `src/scripts`, `src/components`, `src/data`, configurações Astro/TypeScript, manifesto de dependências e lockfile, documentação principal e `.impeccable`. A relação completa, tamanho e SHA-256 de cada arquivo estão em `source-manifest.json`. A cópia foi conferida contra esses hashes: nenhuma divergência.

As fontes arquivadas incluem a landing Ritmo e os três estudos Astro. Os arquivos antigos preservados em outros diretórios de documentação continuam com seu histórico próprio. Esta cópia não é uma segunda aplicação ativa nem deve receber as mudanças do novo Next.js.

O [README original do projeto](source-README.md) fica em `source-README.md`, enquanto este `README.md` é o guia do arquivo. A entrada `README.md` do manifesto identifica esse destino por `archivePath`; seu tamanho original de 13.551 bytes e SHA-256 `ebe93180140f8ebd435438c087c523ccae197b02f412f4b1680bc8acd008e259` foram mantidos. O guia havia ocupado o mesmo nome da cópia; o conteúdo original foi recuperado byte a byte a partir do histórico preservado na documentação raiz, incluindo seus finais de linha mistos, e conferido contra o hash original.

## Estudos estáticos preservados

O `dist/estudo` existente e válido foi usado para congelar o painel e as três prévias em `public/estudo`. O build não foi repetido. A data de modificação do build de origem era 19/10/2026 às 09:22, conforme o ambiente local.

- Quatro páginas HTML: painel, Forma, Fluxo e Ritmo.
- Nove bundles CSS/JS, incluindo a dependência compartilhada das interações, em `public/estudo/assets`.
- As URLs `/_astro/` foram substituídas por `/estudo/assets/`.
- Os quatro HTMLs continuam com `noindex, nofollow`.
- Foram verificadas 55 referências locais para arquivos e diretórios. Fontes em `/fonts/study`, prévias em `/study/previews` e imagens em `/images` continuam nos caminhos originais.
- A landing Astro da raiz e seus bundles exclusivos não foram publicados nesta cópia estática.

`static-studies-manifest.json` registra hashes de origem e destino. `preserve-studies.py` documenta o procedimento e pode recriar a cópia a partir daquele build Astro, enquanto ele existir.

## Integração necessária no Next.js

O Next.js não oferece automaticamente `index.html` de um diretório em `public`. A configuração da nova aplicação precisa resolver `/estudo/`, `/estudo/forma/`, `/estudo/fluxo/` e `/estudo/ritmo/` para os respectivos `index.html`, inclusive os links internos com barra final. A rota `/` é fornecida pelo App Router e por isso não entrou na verificação de arquivos estáticos.

As rotas de estudo devem continuar fora do sitemap. Um cabeçalho `X-Robots-Tag: noindex, nofollow` pode reforçar os metadados já presentes. A validação de navegação no servidor Next.js pertence à entrega da migração; esta preservação verificou arquivos, referências e hashes, sem iniciar servidor ou usar navegador.
