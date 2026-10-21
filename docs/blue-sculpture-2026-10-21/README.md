# Codice — escultura antiga em azul

Data local: **21/10/2026, America/Cuiaba**. O usuário confirmou a escultura dos dois Cs entrelaçados da estética anterior, pediu a troca do verde pelo azul da Codice, escolheu recolocá-la **na abertura** e autorizou o plano com **“Implement the proposed plan.”**

**Estado: imagem editada, integração implementada e QA local concluído em 21/10/2026.** O registro começou com verificações em execução. Build/typecheck, 11 geometrias, layout 11/11, smoke 16/16, motion 6/6, mobile 18/18 em Chromium e 18/18 em WebKit e revisão independente 13/13 passaram; evidências e limites ficam em [verification.md](verification.md). [Vídeo da abertura](opening-tour.mp4). As aprovações anteriores de Pessoas em cena e do mobile são baseline histórica, sem validar automaticamente esta alteração. Entrega versionada na branch `feat/pessoas-em-cena`, sem push ou deploy.

## Visual e arquivos

A peça anterior combina uma faixa cromada com uma faixa de esmalte verde-lima. A nova edição troca o esmalte por azul de base **`#2f4bff`**, preservando a leitura de cromado, volume, formato, perspectiva e fundo transparente. É uma imagem raster decorativa, não um modelo 3D interativo ou produto de cliente.

O recurso nativo **`image_gen.imagegen`** editou o PNG original já inspecionado. Não foi usada a API por CLI nem alterado o original. O [prompt integral](prompt.txt) e o [manifesto de proveniência](../../public/brand/codice-sculpture-blue.json) registram a geração, a fonte e os hashes.

| Asset novo | Dimensões | Bytes | Uso |
| --- | --- | --- | --- |
| [PNG](../../public/brand/codice-sculpture-blue.png) | 1254×1254, RGBA | 1.431.514 | Saída editada preservada. |
| [WebP](../../public/brand/codice-sculpture-blue.webp) | 800×800, RGBA | 108.282 | Arquivo servido pela landing. |

O WebP é uma conversão mecânica por FFmpeg, Lanczos 800×800, `libwebp`, qualidade 90, compressão 6, preset `picture`, formato `yuva420p`. O PNG tem alfa de 0 a 255 e quatro cantos com alfa 0. O WebP preserva transparência e alfa de 0 a 255; seus cantos têm alfa `[1, 1, 0, 0]`, conforme o manifesto, sem afirmar identidade de pixels entre formatos.

Os originais verde/cromado e seus registros anteriores continuam em `public/brand/`, preservados. Os retratos de Fernando Riad, Eduardo Gobatto e Victor Rafael e seus manifestos não fazem parte da edição.

## Integração aprovada

- Desktop: três colunas, título → escultura → descrição; peça entre 128 e 176 px. A altura da introdução se manteve igual à [baseline medida](intro-baseline.json) nos cinco tamanhos desktop conferidos, conforme a [verificação atual](verification.md).
- Celular/tablet abaixo de 1024 px: peça centralizada antes do título, com 160 px; composição compacta de 112 px em altura até 700 px. Texto ampliado mantém reflow.
- Abertura com entrada finita de 850 ms e parallax limitado a 24 px em wrappers separados. Não há loop, novo canvas ou transformação de ancestral do palco/controles.
- Imagem decorativa com `alt=""`, `aria-hidden`, dimensões reservadas e apresentação estática com movimento reduzido ou sem JavaScript.
- Retratos, sequência Fernando → Eduardo → Victor, trilho de 300svh, contatos, oferta, marca da navegação e favicon permanecem no contrato atual. Three continua exclusivo do desktop elegível; nenhuma dependência nova.

Os componentes são `Hero.tsx` e `HeroSculpture.tsx`, com estilos isolados em `hero-sculpture.css`. A imagem não substitui conteúdo HTML, navegação ou ações comerciais.

## Verificar e revisar

Consultar o [relatório desta execução](verification.md) para conferir resultados e limites. A prévia final segue o gerenciador local em `http://localhost:4321/`, produção, PID 47248, restrita a `127.0.0.1`. As nove capturas, três frames intermediários e o vídeo novos mostram a abertura e a continuidade para os retratos; a revisão foi concluída sem reaproveitar evidências visuais da versão anterior como prova da escultura. Integridade 28/28 e detector sem achados foram registrados. Aparelho físico e aceite estético continuam distintos do QA local.
