# Movimento — ampliação de 20/10/2026

O usuário elogiou a direção Pessoas em cena e pediu mais movimento e transições, citando [Lando Norris](https://landonorris.com/) e [KAIRN no MotionSites](https://motionsites.ai/?prompt=kairn). Respondeu **“pode seguir”**, delegando a coreografia e autorizando a implementação. É uma ampliação da direção atual, sem trocar identidade, oferta, pessoas ou fotografias.

## Escultura azul na abertura — 21/10/2026

A recuperação da antiga escultura, confirmada pelo usuário e autorizada no plano, acrescenta uma peça azul/cromada à abertura. Entrada finita de 850 ms e parallax limitado a 24 px operam em wrappers próprios da imagem raster, sem loop, novo canvas ou movimento em controles/ancestrais do palco. Texto ampliado, HTML sem JS e movimento reduzido mantêm a alternativa legível. Os retratos e seus 300svh seguem na sequência. [Registro](../blue-sculpture-2026-10-21/README.md) e [verificação desta integração concluída em 21/10](../blue-sculpture-2026-10-21/verification.md), encerrando a fase em execução, com vídeo e três estados intermediários de entrada inspecionados; preservar o roteiro e as evidências anteriores como histórico.

## Execução mobile autorizada — 21/10/2026

O **“gooo”** autorizou executar o plano. O [registro mobile](../mobile-motion-2026-10-21/README.md) descreve as sete cenas implementadas: abertura, palco único de 300svh com introdução fora do sticky, passagem, mídias dos projetos, oferta, percurso vertical e fechamento/menu. `mobile-story` e `mobile-flow` dão movimento ao HTML independentemente do renderizador; o palco aguarda as três fotos prontas, e a preferência reduzida ao vivo cancela efeitos. Controles ficam na camada estável. Three continua exclusivo do desktop elegível.

A política anterior de neutralizar as molduras no telefone, preservada no roteiro abaixo, foi substituída por movimento somente nas mídias. O [QA desta execução](../mobile-motion-2026-10-21/verification.md) foi concluído localmente em 21/10, encerrando a fase em andamento; os resultados anteriores não são usados como aprovação do mobile novo. Texto ampliado retorna a fluxo; efeitos finitos CSS/WAAPI são cancelados ao ocultar a aba. Sem mudanças em fotos, conteúdo, oferta, contatos ou dependências da aplicação.

## Histórico da solicitação mobile — 21/10/2026, antes da implementação

O usuário pediu `/plan` para movimento muito mais intenso no telefone e escolheu uma cena fixa de retratos/nomes controlada pela rolagem. A [spec](../superpowers/specs/2026-10-21-mobile-motion-design.md) e o [plano](../superpowers/plans/2026-10-21-mobile-motion.md) propõem essa evolução. A neutralização mobile descrita no roteiro anterior abaixo é a política implementada a ser substituída na próxima execução autorizada; o novo pedido nesta etapa entrega planejamento, sem mudanças na aplicação.

## Roteiro

- **Momento focal:** apresentação editorial em três retratos. Título chega por linhas; nomes acompanham a troca de fotografia; planos paralelos ganham profundidade e resposta pequena ao ponteiro. Indicador de três etapas traduz a rolagem. A duração de 300svh não aumenta.
- **Continuidade:** campos suave e azul chegam com contornos que se abrem na rolagem. Moldura do Corretor entra como superfície; Roger acomoda sua inclinação. Oferta preserva preço/CTA claros; processo entra como sequência; palavra de fechamento tem uma revelação própria.
- **Feedback:** menu abre com painel e links coordenados; seletor do catálogo mantém a imagem anterior enquanto prepara a seguinte e só então faz a transição. Setas respondem aos controles.
- **Orçamento:** stack existente, sem dependências; animações de entrada finitas, observadas uma vez. Cena continua sob demanda, DPR 1,5, sem loop próprio. Com movimento reduzido, sem JS e em falha da cena o HTML continua completo. Eventos, observadores e animações liberados ao desmontar; aba oculta cancela efeitos de entrada. As molduras de Corretor e Roger acompanham a rolagem nos dois sentidos; o celular neutraliza essa transformação.

## Referências e limites

KAIRN foi consultado no navegador e pelo briefing público da página: entrada editorial em sequência, linhas de título, mídia e ações em tempos diferentes. A foto/vídeo e a marca da referência não são reutilizados. Lando é referência de profundidade, escala e continuidade de rolagem. Próprias fotos autorizadas continuam byte-idênticas. Documentação oficial de Next.js App Router, Server/Client Components e Three.js consultada antes da implementação.

## Validação prevista

Typecheck, build, testes existentes de movimento, QA atual de desktop/celular, teclado/toque, preferência reduzida ao vivo, sem JavaScript, falha de módulo/textura/WebGL e perda de contexto. Conferir transições, seleção rápida, mídia lenta, integridade dos arquivos preservados e console. Registrar somente resultados executados em `verification.md`.
