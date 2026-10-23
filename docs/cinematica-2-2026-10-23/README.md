# Cinemática 2 — 23/10/2026

## Versionamento posterior ao fechamento local

O pedido **“commit e push”** autorizou versionar esta entrega e enviar a branch `feat/cinematica-2` ao `origin`. As menções abaixo a ausência de commit/push registram o fechamento local anterior. Este envio não representa merge em `main`, deploy ou homologação de WebKit.

Implementação autorizada com **“go”**, após escolha de **Cinemática 2 completa** e intensidade **cinematográfica**. Mantém a direção Pessoas em cena e o conteúdo presente no checkout de partida `48309d1`, incluindo as quatro pessoas já cadastradas. Não reinterpreta os registros históricos de três pessoas nem restaura preços/contatos antigos.

## Movimento implementado

- **Pessoas como momento principal:** câmera com dolly reversível de 4,9–5,3, desvio lateral e planos com profundidade de 2,2 por posição. Giro comum de até 0,32 **radianos**, não graus, conserva os planos paralelos e as proporções das fotos. Fotos entram por baixo e saem por cima. Renderização continua sob demanda, DPR até 1,5 e módulo Three dinâmico apenas no desktop elegível.
- **Ponteiro por profundidade:** frente com até 26 px e planos recuados com deslocamento progressivamente menor. `usePointerMotion.ts` compartilha somente o comportamento estável entre pessoas e quadros: mola, mouse, viewport, foco, blur, texto ampliado e visibilidade. Não adiciona loop de renderização.
- **Nomes e progresso:** a máscara existente do nome ganhou contraponto lateral/skew; indicador com uma parada por pessoa, preenchimento reversível e contador rolante em linha de tamanho fixo. Seta decorativa acompanha até 10 px da rolagem; sua ação permanece imóvel.
- **Passagens de capítulos:** lâmina azul na costura, skew decrescente nos títulos e deriva independente na cópia. Tudo volta a repouso para leitura; o foco estabiliza o capítulo.
- **Projetos:** tilt de mouse de até 2,5° em camada separada do scroll. Corretor tem overscan proporcional de 16% e pan de até 13%, sem alterar os pixels de origem. Barra acompanha com uma pequena defasagem de **progresso**, não um timer. Controles, descrições e links não entram no quadro móvel.
- **Feedback:** rótulos rolantes do header com duplicatas decorativas ocultas à acessibilidade; sweep nos botões; elevação apenas da superfície pintada dos contatos, sem mover seus links; letras decorativas do wordmark respondem à proximidade do ponteiro.
- **Abertura:** plate e vídeo existente percorrem a mesma camada; o scrim de leitura fica estável. Parallax de até 48 px no desktop e 24 px no `mobile-flow`. Não há loop novo ou palco fixo adicional.

## Preservação e limites

`public/`, dados de equipe/abertura/oferta/contatos, dependências e configurações foram fotografados por hash em `preservation-baseline.json`. `archive/` conserva as fontes anteriores alteradas e seu manifesto. Nenhum asset, estudo, licença ou archive anterior foi excluído.

300svh e os modos existentes permanecem. Texto ampliado desativa também a cena de desktop; mobile com fotos ainda não decodificadas permanece em fluxo. Reduced motion é observado ao vivo. HTML, ações, navegação e catálogo noscript continuam completos. Atributo de pausa impede que os resets abram novas transições CSS em aba oculta, sem rearmar a entrada da abertura.

Os briefings/verificações antigos citados em `AGENTS.md` que não existem neste checkout não foram recriados. A baseline consultada foi o código atual, `PRODUCT.md`, `DESIGN.md` e `docs/code-cleanup-2026-10-22/verification.md`.

Resultados reais e pendências: [verification.md](verification.md). Branch `feat/cinematica-2`; sem commit, push ou deploy nesta execução.
