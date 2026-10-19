# Mídia do Corretor — landing Ritmo

## Resultado — 18/10/2026

Foi feita uma tentativa de gravação real da interface pública em `https://corretor-web-test.vercel.app/`, sem login. Na consulta desta etapa, aproximadamente às 23h40 de 18/10/2026, horário de Cuiabá (UTC−04), o título retornado foi **“Serviço temporariamente indisponível | Lucas Gobatto”**. A página exibiu “RECONECTANDO”, “Não foi possível carregar esta página” e aguardava uma nova tentativa automática. O catálogo carregado não estava disponível.

Por isso, a gravação foi interrompida antes das ações planejadas. **Não existe vídeo de demonstração publicado em `public/media/corretor-demo.webm` nesta entrega.** A landing deve usar uma imagem real estática, sem player ou vídeo sintetizado a partir da captura.

## Imagem publicada

- Arquivo: [`../../public/media/corretor-poster.webp`](../../public/media/corretor-poster.webp).
- Origem imediata: cópia idêntica de [`../../public/images/corretor-public.webp`](../../public/images/corretor-public.webp), sem nova composição, alteração visual ou geração de imagem.
- Origem da interface: captura pública real feita em **17/10/2026**, em `https://corretor-web-test.vercel.app/`, viewport de **1440 × 900 px**. É a home com catálogo carregado e sem filtros, conforme [`../visual-study/references/sources.md`](../visual-study/references/sources.md).
- Original PNG: [`../visual-study/references/corretor-public-desktop-1440x900.png`](../visual-study/references/corretor-public-desktop-1440x900.png).
- Dimensões conferidas do WebP: **1440 × 900 px**; tamanho: **141.700 bytes**.
- SHA-256, igual na origem imediata e na cópia: `ED94D39FEE4FE45E33342C4DE3A0E1F16F6B112C97B94B70765A19B2C3E8790B`.
- A imagem foi aberta e inspecionada nesta etapa. Ela mostra a interface real no estado histórico documentado; não demonstra disponibilidade atual do ambiente nem resultados comerciais.

## Procedimento e limites

1. A tentativa inicial com `browser_run_code_unsafe` não iniciou navegação: o serviço informou que o perfil do navegador já estava em uso. Esse navegador não foi encerrado nem alterado.
2. Foi usado o Playwright já instalado no projeto irmão Corretor-web, com um Chromium isolado, viewport de 1440 × 900 px, `recordVideo`, esquema de cores escuro e espera de fontes/rede. Não foram instaladas dependências.
3. A única ação na aplicação foi abrir a URL pública e ler título, conteúdo e estado das imagens. A verificação de catálogo carregado falhou; portanto **não houve rolagem, uso de filtros, abertura de anúncios, envio de formulários, login ou acesso administrativo** nesta tentativa.
4. O navegador isolado foi encerrado. O arquivo bruto da tentativa, que contém o estado de indisponibilidade e não deve ser usado como demonstração, permanece em [`media-source/page@b5c09a83a792dd839485b46e7d71be9a.webm`](media-source/page@b5c09a83a792dd839485b46e7d71be9a.webm), fora de `public/`.
5. Não foi feita outra tentativa externa. Não foram alterados o Corretor-web, sua API ou seus dados. Não se afirma qual commit está publicado.

Se uma gravação for acrescentada posteriormente, ela deve mostrar navegação pública realmente executada e documentar data, URL, ações e condições. O endereço é um **ambiente de demonstração/teste**, conforme a documentação local do Corretor-web, e não deve ser apresentado como domínio de produção comercial confirmado.
