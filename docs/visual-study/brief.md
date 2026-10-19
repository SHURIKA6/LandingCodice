# Codice — plano do estudo visual aprovado

> **Briefing histórico — substituído em 18/10/2026.** A direção de livro antigo e a oferta ampla descritas abaixo não são o briefing vigente. O plano atual compara Forma, Fluxo e Ritmo, com prévias funcionais e capturas reais de desktop e celular em `/estudo/`; veja [../study-2026-10-18/README.md](../study-2026-10-18/README.md) e [PRODUCT.md](../../PRODUCT.md). A rota `/` preserva temporariamente a landing anterior. A aprovação de 17/10 permanece como histórico e não seleciona uma das novas direções. Roger deve ser tratado como projeto demonstrativo sem contrato e sem resultado comercial comprovado.

## Estado atual — 17/10/2026, após a escolha

O usuário escolheu explicitamente a direção **2. Encadernação escura**, autorizando a implementação: “Pode escolher por mim e seguir com a 2”. A referência `.impeccable/mocks/02-encadernacao-escura.png` está marcada com `approved: true` e `status: approved_by_user`. As outras propostas continuam preservadas como alternativas da etapa de comparação.

A landing estática está implementada em Astro 7.4/Tailwind CSS 4, na rota `/`, com capa escura e lombada no hero, passagem para fólio claro e portfólio assimétrico. Serviços, suporte, dupla e contato seguem a mesma materialidade de maneira mais contida. O sistema está registrado em [DESIGN.md](../../DESIGN.md).

Paleta implementada: tinta/couro `#251B17`, marfim `#F1E7D2`, ouro envelhecido `#C5AB77`, argila `#78482E` e azul `#3C5373`. Os tons de couro e argila foram refinados em relação ao ponto de partida da comparação abaixo. Tipografia local: Cormorant Garamond 400/500 e itálico 400; Source Sans 3 400/500/600. [Origem e validação das fontes](fonts.md).

Os materiais limpos de capa, papel e fundo de CTA foram gerados com `image_gen.imagegen` e estão em `public/images/`. Texto e controles permanecem HTML. As imagens dos cases são conversões WebP das capturas reais originais, sem reutilizar as miniaturas sintetizadas dentro dos estudos.

Contatos informados e associados: Fernando `5566999356646`; Eduardo `556684184488`, preservado literalmente conforme o usuário identificou o que começa com 8. O domínio segue pendente; `SITE_URL`, descrito em `.env.example`, habilita as URLs públicas e sitemap no build de publicação.

O build de produção concluiu na implementação e o preview está em `http://localhost:4321`, em background. Menu móvel, Escape com devolução de foco, navegação sem JavaScript, foco visível e movimento reduzido estão implementados. A validação em navegador está em andamento; responsividade, contraste e interações ainda não são declarados concluídos nesta atualização.

## Registro histórico — plano e entrega da comparação

O conteúdo a seguir registra a etapa anterior à escolha, também em 17/10/2026. Menções a rota futura, espera por escolha, starter preservado e WhatsApp pendente correspondem àquela etapa; o estado atual está descrito acima.

Data: 17/10/2026. Modo da superfície: Persuade. Rota futura: `/`.

## Entrega atual

Três propostas em imagem, cada uma com primeira tela e início do portfólio, na mesma dimensão de comparação de 1440 × 1100 px. Entregar imagens individuais e comparação lado a lado. A escolha do usuário acontece antes da implementação da landing. Nenhuma proposta é considerada aprovada por silêncio.

## Conteúdo comum

- Marca: Codice.
- Navegação: Trabalhos · Serviços · A dupla · Contato.
- Chamada: **Sites e sistemas sob medida para o seu negócio.**
- Apoio: **Fernando Riad e Eduardo Gobatto. De Sinop para projetos em todo o Brasil.**
- CTA: **Conversar sobre meu projeto**.
- Portfólio: **Trabalhos que já saíram do papel**; Corretor e Roger Estética Automotiva.
- Corretor: site e sistema para o mercado imobiliário.
- Roger: presença digital para um negócio de estética automotiva de Sinop.
- A manutenção de computadores é complementar; não concorre com a chamada principal.

## Três direções fixadas pelo usuário

### Fólios abertos

Livro aberto organiza a apresentação; papel, margem de encadernação e telas dos projetos inseridas nas páginas.

Paleta: pergaminho `#E9DCC1`, tinta `#26211D`, vinho `#7C3038`, oliva `#5D624B`, ouro `#B19559`.

### Encadernação escura

Capa de couro, nome com aparência de gravação e abertura para páginas claras com os trabalhos.

Paleta: couro `#27221E`, marfim `#F1E7D2`, ouro `#C5AB77`, azul `#3C5373`, argila `#A76F53`.

### Manuscrito de projetos

Páginas de um manuscrito encadernado; anotações nas margens explicam soluções reais dos projetos. A estrutura de manuscrito deve determinar a composição, e não ser uma textura aplicada sobre um template.

Paleta: velino `#F2EBD9`, tinta `#292D2B`, azul `#264A73`, vermelho `#9F3B35`, latão `#A68D54`.

## Tipografia e materialidade

Ponto de partida aprovado: Cormorant Garamond nos títulos e Source Sans 3 no texto. O livro antigo é uma referência forte e explícita. Tratar as imagens como propostas de uma página real, sem navegador, computador ou cenário de mesa envolvendo a interface. Composições distintas, com conteúdo idêntico. Texturas e ilustrações da marca são arte de conceito; telas dos cases são capturas reais e identificadas em references/sources.md.

## Depois da escolha

Registrar a proposta escolhida em DESIGN.md e na referência da superfície. Implementar landing estática em Astro/Tailwind com apresentação, os dois trabalhos, serviços e suporte complementar, fundadores com GitHubs e contato. Adaptar para celular e validar teclado, contraste, movimento reduzido, links e ausência de overflow. Número do WhatsApp e domínio precisam ser informados para concluir a publicação.

## Estado

- Contexto de produto registrado em PRODUCT.md.
- Preferência de fluxo registrada: imagens antes de código.
- Três propostas produzidas e revisadas; nenhuma escolhida.
- Imagens individuais em `proposals/`, com 1440 × 1100 px; comparação lado a lado em `proposals/comparacao.png`, com 4320 × 1100 px.
- Starter Astro preservado até a seleção visual.

## Registro de execução

- Execução iniciada após aprovação expressa do plano em 17/10/2026.
- `concept-seed --scope direction --mode persuade` executado; referência de origem `seed:bf108b720ef0fb54`.
- Decisão: preservar as três direções, materiais, paletas e composição fixados pelo plano do usuário. Essa instrução explícita prevalece sobre a seleção aleatória de outros mundos visuais. Os desafios sorteados não substituem o briefing aprovado.
- A marca de livro antigo deve organizar a página e carregar links, conteúdo e contato legíveis; não se trata de uma fotografia de livro com uma interface perdida no cenário.
- Capturas públicas reais obtidas e inspecionadas. O endereço antigo do Corretor retornou 404; foi utilizado o ambiente de teste indicado no README, conforme references/sources.md.
- Produção: ferramenta nativa `image_gen.imagegen`, uma geração por direção e uma revisão de texto por imagem. Prompts iniciais em prompts.json; prompts de revisão em prompts/ e nos sidecars.
- Saídas normalizadas mecanicamente com FFmpeg para a dimensão de comparação, sem retoque manual de conteúdo. O painel é uma montagem horizontal dos três arquivos.
- Verificação executada: dimensões dos quatro PNGs, existência das capturas originais e da documentação, sidecars com `approved: false`, preservação do starter Astro e inspeção visual das três propostas e do painel.
- Revisão independente de conteúdo e QA visual concluída sem impedimentos para apresentação. A microtipografia das miniaturas pode ser reinterpretada pelo gerador; originais permanecem como evidência e serão usados na landing.
- `npm run build` e validação responsiva da landing pertencem à etapa posterior à escolha visual. Nenhuma implementação funcional da landing foi iniciada nesta entrega.
