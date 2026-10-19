# Verificação da landing implementada — 17/10/2026

## Resultado e execução

Direção 2, Encadernação escura, escolhida expressamente pelo usuário. Landing estática implementada, com conteúdo real, fontes locais, artes de materiais novas e capturas originais dos projetos. Servidor em background em http://localhost:4321/.

- `npm run build`: concluído com saída estática em `dist/`.
- Build com `SITE_URL=https://codice.example` somente para teste: canonical, `og:url`, URL da organização e sitemap verificados. O domínio de teste foi removido e o build final foi regenerado sem domínio; não há canonical ou sitemap inventados no resultado final.
- Documento `pt-BR`, destinos de âncoras, imagens locais e os dois números de WhatsApp conferidos no HTML gerado. Não houve envio de mensagens nem verificação de titularidade de contas WhatsApp.
- Chromium isolado: 320, 390, 700, 768, 1024, 1280, 1440 e 1920 px, sem rolagem horizontal, imagens quebradas ou âncoras ausentes.
- Menu móvel: Enter, Tab, navegação, fechamento ao seguir link e Escape com retorno de foco verificados. Skip link primeiro na ordem de tabulação, com foco visível e destino no conteúdo.
- Movimento reduzido: animações ausentes e rolagem automática. Sessão real sem JavaScript: navegação continua disponível e âncora Contato funciona.
- Após a revisão, foram corrigidos a emenda de textura sobre a legenda Roger e o hero fora de landmark. Reinspeção de 1440/390 e axe confirmou a correção.
- Axe: zero violações, 34 verificações aprovadas; contraste sobre imagens ficou como análise incompleta, não como aprovação automática. Relatório detalhado em `.impeccable/review/qa/report.md`.
- Contraste dos pares de cores: tinta/marfim 13,70:1; tinta secundária/marfim 6,56:1; argila/marfim 6,18:1; ouro/couro 10,06:1. Uma camada escura uniforme sobre a capa mantém a leitura da introdução sobre os picos claros da textura: amostra de 59.566 pixels sob a introdução, mínimo 4,80:1 no modelo do material com a camada aplicada. Isso não substitui avaliação integral por leitores de tela ou todas as situações de antialiasing/zoom.
- Detector Impeccable sobre Astro/CSS: `[]`, sem achados mecânicos.
- Inspeção visual das capturas de desktop e celular e revisão estática independente dos cinco arquivos principais concluídas, sem defeito material pendente.

## Limites das verificações

O build Astro não é typecheck completo. Não foram adicionados TypeScript, `@astrojs/check` nem uma suíte de testes unitários para esta página estática; as verificações foram de build, HTML produzido, navegação e navegador. Não houve publicação, teste de entrega de mensagens, auditoria exaustiva com leitores de tela ou teste em aparelho físico.

O domínio final continua necessário para publicação. Os números foram preservados exatamente como fornecidos; o usuário identificou o número iniciado em 8 como sendo de Eduardo.

## Referência visual e ferramentas

A comparação da primeira tela com a proposta aprovada marcou 81% global (match), com diferenças regionais de fonte e miniaturas. A implementação usa as capturas reais, com seus recortes naturais, em lugar das miniaturas reinterpretadas pelo gerador. As evidências estão em `.impeccable/review/manual-comparison/`.

O fluxo automático `build-phase` não foi declarado integralmente aprovado: seu gate de materiais comparou o fundo de papel limpo com uma região que continha miniaturas e comparou uma captura completa Roger com uma região parcial da imagem de conceito. Esse gate também esperava uma nova rodada de aceite de materiais. O usuário já havia delegado a escolha e autorizado seguir com a 2; a execução reversível continuou com revisão visual e independente, preservando as fontes reais e sem simular um novo aceite humano nem usar `--force`. O estado intermediário e as medições ficam preservados; este relatório distingue seus resultados dos checks funcionais realmente concluídos.

## Evidências locais

- `.impeccable/review/desktop.png`: página completa de desktop.
- `.impeccable/review/hero-repro.png`: primeira tela de desktop.
- `.impeccable/review/mobile.png`: página completa em 390 px.
- `.impeccable/review/qa/`: matriz de larguras, axe e reinspeções.
- `docs/visual-study/material-prompts.json`: prompts das artes de produção.
- `docs/visual-study/references/sources.md`: origem das capturas dos projetos.
