# Verificação do estudo Codice — 18/10/2026

Data de referência: 18/10/2026, America/Cuiaba. Estudo local, sem deploy. Nenhuma direção visual foi escolhida pelo usuário nesta execução.

## Resultado

Implementados o painel `/estudo/` e as prévias `/estudo/forma/`, `/estudo/fluxo/` e `/estudo/ritmo/`. O painel usa seis capturas reais de Chromium, com alternância desktop/celular, ampliação e links para as experiências funcionais. Todas apresentam o mesmo pacote e contato principal. As seções complementares permitem conferir projetos, condições e fundadores sem âncoras vazias; não equivalem à landing final de uma direção escolhida.

## Comandos e evidências

- `npm run build`: concluído com sucesso após as últimas alterações; cinco páginas estáticas geradas. Não houve instalação de dependências nem alteração de `package.json`/lockfile.
- `npm run dev -- --background`: servidor local em `http://localhost:4321`, conforme AGENTS.md. O painel de comparação foi aberto para o usuário.
- Build adicional com `SITE_URL=https://codice-verification.invalid`, um domínio reservado apenas para a verificação offline: sitemap gerado, rota `/` presente e nenhuma rota `/estudo` incluída. Os quatro HTMLs de estudo contêm `noindex, nofollow`. Variável restaurada e build normal executado novamente; nenhum domínio fictício ficou configurado para publicação.
- Detector Impeccable executado uma vez sobre os novos arquivos: `[]`, em [detector.json](detector.json).
- [baseline.json](baseline.json): SHA-256 de `src/pages/index.astro`, `src/styles/global.css`, `src/layouts/Page.astro` e `src/data/site.ts` conferidos iguais ao início. A página antiga e os dados legados não foram alterados.

## Navegador

[browser-verification.json](browser-verification.json) registra 12 combinações: três prévias em 320, 390, 768 e 1440 px. Nenhuma apresentou overflow horizontal, imagens quebradas ou âncoras ausentes. Preço, CTA, contexto demonstrativo de Roger e `noindex` foram conferidos.

- **Forma:** abrir e reunir por Enter/Espaço, atualização de `aria-pressed` e status, abertura por toque. Profundidade responde ao mouse; o botão oferece a operação equivalente sem depender de hover. Uma elipse decorativa inicialmente excedia o palco; sua geometria foi corrigida antes da matriz final, sem esconder overflow da página.
- **Fluxo:** três estados por teclado, um único controle selecionado por vez, mudança do destaque e status; contato selecionado por toque.
- **Ritmo:** progresso relacionado à rolagem nativa observado, reprodução por teclado e pausa ao sair da viewport. O código também cancela trabalho quando a aba fica oculta; a ocultação de aba não foi medida independentemente no runner.
- **Sem JavaScript:** as três direções mantêm título, oferta, CTA e pacote. Forma apresenta a composição estática sem botão inoperante; Fluxo mantém a representação completa; Ritmo mantém a marca estática.
- **Movimento reduzido:** três direções verificadas, preservando oferta e contato; Ritmo remove o controle de reprodução e mantém uma composição estática.
- **Foco:** link de salto visível e contorno conferido; controles principais acionados por teclado.
- Nenhum erro JavaScript não tratado observado.

[panel-verification.json](panel-verification.json) registra oito combinações do painel: quatro larguras e dois formatos de captura. Três imagens corretas visíveis em cada estado, sem overflow ou imagens quebradas. As condições de pagamento por escrito e antes da publicação foram confirmadas no conteúdo.

## Acessibilidade e contraste

Axe-core **4.14.0**, conjunto WCAG 2 A/AA e WCAG 2.1 AA, registrou zero violações nas três prévias e no painel. O painel e Fluxo terminaram sem verificações incompletas nesse conjunto. Um `aria-label` inicialmente aplicado a uma `div` de paleta foi corrigido com `role="img"`, e a nova execução eliminou a pendência.

Forma e Ritmo mantêm análise automática de contraste incompleta por sobreposição na arte: textos dos planos espaciais e eco tipográfico, respectivamente. Os elementos são decorativos, com equivalentes informativos fora da arte. Isso não equivale a uma auditoria integral de contraste ou de leitores de tela.

Pares de cores conferidos por luminância relativa: tinta Forma `#40536a` sobre `#dce4ee`, 6,15:1; acento Fluxo `#c83215` sobre `#f3f0e7`, 4,70:1; texto secundário Ritmo `#c2bacd` sobre `#151419`, 9,77:1. Texto pequeno sobre o campo vermelho de Fluxo foi escurecido para `#11120d`; sua combinação passou na execução axe final. As capturas foram abertas e inspecionadas.

## Imagens e fontes

Capturas finais em `review/final/`: três desktop de **1440 × 1100** e três mobile de **390 × 1400**, mais duas capturas do painel. PNGs preservados; derivados WebP de qualidade 88, produzidos com FFmpeg, servidos em `public/study/previews/`. [images-manifest.json](images-manifest.json) registra rota, viewport, origem, tamanho e SHA-256 de cada derivado. As imagens vêm das páginas reais; não são comps gerados.

[fonts.md](fonts.md) registra três famílias locais, licenças OFL, fontes oficiais, tamanhos, hashes e validação de caracteres portugueses. As capturas dos projetos mantêm a provenance do acervo anterior.

## Revisão independente e decisões de execução

Revisão por agente com contexto novo: oito capturas finais e fontes inspecionadas, sem execução própria de navegador. Veredito inicial `fix`, sem necessidade de reconstrução: explicitar os dois momentos do pagamento e concluir o ledger. O texto compartilhado passou a declarar acordo de escopo por escrito e pagamento final antes da publicação; documentação preenchida com as evidências desta execução. Descritores de direção e contexto de projeto foram colocados abaixo dos títulos, preservando as ressalvas factuais.

- Pasta sem `.git`: usado o workspace existente, com baseline por hash. Nenhum Git/worktree/commit foi criado.
- Estudos são protótipos comparativos conduzidos pelo código; screenshots documentam o resultado executável. A preferência anterior por pipeline de comp não é tratada como aprovação de uma identidade nesta nova etapa. O sorteio Impeccable foi executado, mas os três conceitos do plano explicitamente aprovado prevaleceram.
- Forma usa planos CSS 3D e conteúdo estático de base. Nenhum canvas/WebGL é necessário, evitando dependência de contexto gráfico para essa interação.
- Nenhuma nova suíte ou framework de testes foi introduzido para estes estudos reversíveis. A verificação significativa ocorreu nos comportamentos reais em Chromium, no build e no sitemap gerado.

## Limites e próximo passo

Não foi executado typecheck completo: TypeScript e `@astrojs/check` não estão configurados como verificações do projeto. Não houve auditoria por leitor de tela, medição de conversão, promessa de retorno financeiro, publicação ou aprovação da direção visual. As verificações descritas são locais em Chromium.

O revisor independente conferiu as correções pontuais e retornou **ship para entrega do estudo comparativo**, encerrando os achados iniciais. Veredito registrado em [review.md](review.md).

O próximo passo é a escolha de Forma, Fluxo ou Ritmo e o planejamento específico da nova landing completa.
