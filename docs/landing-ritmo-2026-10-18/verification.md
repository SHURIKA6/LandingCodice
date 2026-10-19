# Verificação — landing final Ritmo

Data: 18/10/2026, horário de Cuiabá. Escopo: nova raiz `/`, não apenas a prévia do estudo. Nenhum deploy executado.

## Resultado técnico

- `npm run build`: passou na implementação e no fechamento. Cinco páginas estáticas geradas.
- Build temporário com `SITE_URL=https://codice-verification.invalid`: passou; sitemap contém somente a raiz, sem `/estudo/`. Canonical da raiz conferido. Variável restaurada em `finally` e build normal repetido com sucesso. [Resultado](sitemap-verification.json).
- HTML final sem `noindex` na raiz; título, descrição, tema escuro, favicon novo, preloads das duas fontes locais e JSON-LD da organização com os dois fundadores conferidos. Sem domínio fictício/canonical quando `SITE_URL` não está configurada. [Resultado](metadata-verification.json).
- Nenhum framework, dependência de animação, backend, API de IA ou framework de testes adicionado. O build não equivale a um typecheck completo: `@astrojs/check` não está configurado.

## Navegador

QA em Chromium, com contexto novo para evitar estado herdado do navegador de trabalho. [Resultados estruturados](browser-verification.json) e [procedimento reproduzível](verify-browser.js).

| Viewport | Overflow / imagens quebradas / âncoras ausentes | Case | CTA inicial |
| --- | --- | --- | --- |
| 320 × 900 | Nenhum | Fluxo normal | Visível, topo em 449 px |
| 390 × 900 | Nenhum | Fluxo normal | Visível, topo em 444 px |
| 768 × 900 | Nenhum | Fluxo normal | Visível, topo em 493 px |
| 1024 × 900 | Nenhum | Imagem sticky | Visível, topo em 296 px |
| 1440 × 900 | Nenhum | Imagem sticky | Visível, topo em 335 px |

As larguras de documento no JSON descontam a barra de rolagem do navegador. Preço, CTA, títulos e conteúdo foram conferidos sem cortes. Âncora de trabalho termina abaixo do cabeçalho sticky nas cinco larguras. Os controles visíveis têm pelo menos 24 px em ambas as dimensões.

Teclado: primeiro Tab revela o skip link; Enter move foco ao conteúdo; CTA tem outline visível; replay altera a composição. Rolagem nativa atualiza a tipografia, e a interação pausa fora da tela. Toque em contexto mobile: âncora, replay, CTA principal e os dois contatos individuais acionados. Os popups de WhatsApp foram **interceptados localmente**: os números e mensagens foram conferidos sem enviar mensagem nem validar cadastro dos números no provedor.

Alternativas verificadas em 390 px: sem JavaScript, movimento reduzido e sem IntersectionObserver. Oferta, termos e links continuam disponíveis; o replay indisponível fica oculto. Com movimento reduzido, as letras ficam sem transformações. Não houve erro de página nesses cenários nem na matriz principal.

Bloqueio simulado da imagem do case: altura preservada, texto alternativo e descrição factual presentes, preço e contato mantidos e sem overflow. Não há player nem controles inoperantes, porque não foi possível produzir uma gravação válida.

## Acessibilidade e contraste

Axe 4.14, regras WCAG 2 A/AA e 2.1 AA, em 390 e 1440 px: **zero violações detectadas**, 21 verificações aprovadas em cada execução. A análise automática de contraste ficou incompleta no eco decorativo da marca e nos dois títulos em contorno. O eco é `aria-hidden`; o contorno de texto grande usa a tinta `#151419` sobre `#b69aff`, com razão de 7,90:1. Os títulos foram inspecionados nas capturas.

| Texto / fundo | Razão |
| --- | --- |
| `#f5f1eb` / `#151419` | 16,29:1 |
| `#c2bacd` / `#151419` | 9,77:1 |
| `#151419` / `#b69aff` | 7,90:1 |
| `#151419` / hover `#d0bdff` | 10,82:1 |
| `#f5f1eb` / hover `#352b45` | 11,79:1 |

Não equivale a auditoria completa com leitor de tela, validação de todos os navegadores/dispositivos ou aprovação visual do usuário.

## Oferta, imagens e preservação

Revisão independente do conteúdo não encontrou omissões ou ambiguidades materiais nas condições aprovadas. A raiz explicita R$ 1.500, até seis seções, os dois pagamentos de R$ 750, acordo escrito, aprovação antes da publicação, materiais, revisão, defeitos, prazo na proposta, domínio/hospedagem do cliente e extras separados. O sistema imobiliário tem escopo próprio; a experiência autoral da Codice é diferenciada do pacote.

A demo pública da imobiliária estava indisponível; não foi produzido vídeo de demonstração. Usa-se a captura genuína histórica de 17/10, com proveniência em [media.md](media.md), sidecar em `public/media/corretor-poster.webp.json` e hashes em [media-manifest.json](media-manifest.json). A imagem não prova disponibilidade atual nem resultados comerciais. Scan de proveniência: um raster, zero sem origem; pixels e hash idênticos ao WebP original.

Antes de substituir a raiz, foram arquivadas as quatro fontes legadas. [Manifesto](archive/manifest.json): hashes das cópias conferidos após o build, sem alterações; `src/data/site.ts` também permanece idêntico. Imagens antigas, licenças, fontes, prompts, estudos e registros históricos permanecem preservados. `studyOffer` agora reexporta a oferta compartilhada de `offer.ts`, sem alterar os termos do estudo.

Smoke das quatro rotas `/estudo/`: preço e pagamentos preservados, `noindex,nofollow`, sem overflow ou imagem quebrada observada. A exclusão do sitemap também passou. A matriz ampla da primeira etapa continua documentada no relatório próprio; não foi reexecutada integralmente nesta etapa.

## Evidência visual e revisão

Capturas reais abertas e verificadas: [desktop](desktop.png), [mobile](mobile.png), [desktop completo](desktop-full.png), [mobile completo](mobile-full.png), mais `width-320.png`, `width-390.png`, `width-768.png`, `width-1024.png` e `width-1440.png`. Fontes e imagem carregadas antes das capturas completas. As imagens representam a página implementada; nenhuma arte de página foi gerada.

Detector Impeccable executado uma vez nos arquivos de produção alterados: [zero achados](detector.json). Revisão visual independente final: **ship**, conforme [review.md](review.md), sem problemas materiais identificados no escopo inspecionado.

O domínio final continua não informado. Não houve deploy, teste comercial de conversão ou promessa de prazo fixo/resultado/performance em segundos. Servidor local em background em `http://localhost:4321/`.

## Fechamento documental — 19/10/2026

Documentação vigente encerrada após a interrupção do agente de documentação; o implementador concluiu esse passe diretamente, usando as fontes como referência. `DESIGN.md` contém os tokens e padrões efetivamente implementados, acompanhado por `.impeccable/design.json`. Os documentos principais e o ledger registram a entrega concluída, preservando o briefing e os estados anteriores como histórico. O comp de Encadernação escura foi marcado como superado, com a aprovação histórica e cópia anterior preservadas; o pipeline antigo não foi reescrito como evidência da nova landing.

No fechamento, os links locais dos documentos, o JSON do sidecar e os hashes das fontes arquivadas foram conferidos. `npm run build` passou novamente em 19/10, sem alterações adicionais de interface. A raiz foi confirmada aberta no navegador, com a oferta e os dois contatos presentes; o servidor continua em background.
