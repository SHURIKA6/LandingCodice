# Fontes locais — Encadernação escura

Preparadas em 17/10/2026 para a direção visual aprovada. Os arquivos WOFF2 foram obtidos diretamente do Google Fonts, sem dependências de pacote e sem alteração dos binários. O site pode servi-los pela própria origem; a consulta à API abaixo registra a procedência e não precisa ser executada pelo navegador da landing.

## Arquivos e pesos

| Arquivo público | Família e estilo | Pesos previstos | Intervalo real do arquivo | Bytes |
| --- | --- | --- | --- | ---: |
| `/fonts/cormorant-garamond-latin-wght-normal.woff2` | Cormorant Garamond, normal | 400 e 500 | Variável, `wght` 300–700 | 37.640 |
| `/fonts/cormorant-garamond-latin-400-italic.woff2` | Cormorant Garamond, itálico | 400 | Estático, 400 | 23.660 |
| `/fonts/source-sans-3-latin-wght-normal.woff2` | Source Sans 3, normal | 400, 500 e 600 | Variável, `wght` 200–900 | 28.872 |

Total dos três WOFF2: **90.172 bytes**. Todos são o subset `latin`, incluindo as letras acentuadas precompostas do português em U+0000–00FF. A presença de `ÀÁÂÃÇÉÊÍÓÔÕÚÜàáâãçéêíóôõúü` foi confirmada no mapa de caracteres de cada arquivo. Outros alfabetos podem exigir arquivos adicionais.

## Declarações sugeridas

Os intervalos abaixo correspondem ao uso previsto pela landing. Os intervalos reais acima permanecem disponíveis se o projeto precisar de outros pesos mais tarde.

```css
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: normal;
  font-weight: 400 500;
  font-display: swap;
  src: url('/fonts/cormorant-garamond-latin-wght-normal.woff2') format('woff2');
}

@font-face {
  font-family: 'Cormorant Garamond';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/cormorant-garamond-latin-400-italic.woff2') format('woff2');
}

@font-face {
  font-family: 'Source Sans 3';
  font-style: normal;
  font-weight: 400 600;
  font-display: swap;
  src: url('/fonts/source-sans-3-latin-wght-normal.woff2') format('woff2');
}
```

Sugestão de fallback: `'Cormorant Garamond', Georgia, serif` para títulos e `'Source Sans 3', 'Segoe UI', sans-serif` para o corpo. O arquivo itálico permite apenas 400; evitar solicitar itálico 500 ou 600 para impedir síntese de peso.

## Procedência e licenças

- Consulta oficial: [Google Fonts CSS API](https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..500;1,400&family=Source+Sans+3:wght@400..600&display=swap), com user-agent Chrome moderno para receber WOFF2.
- Referência técnica: [Google Fonts CSS API v2](https://developers.google.com/fonts/docs/css2), que documenta a solicitação de intervalos de pesos.
- Cormorant Garamond normal: [binário servido pelo Google Fonts, versão v21](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2).
- Cormorant Garamond itálico: [binário servido pelo Google Fonts, versão v21](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-iNM8.woff2).
- Source Sans 3 normal: [binário servido pelo Google Fonts, versão v20](https://fonts.gstatic.com/s/sourcesans3/v20/nwpStKy2OAdR1K-IwhWudF-R3w8aZQ.woff2).
- Cormorant Garamond: Copyright 2015 The Cormorant Project Authors (github.com/CatharsisFonts/Cormorant). [Projeto original](https://github.com/CatharsisFonts/Cormorant) e [licença no repositório Google Fonts](https://github.com/google/fonts/blob/main/ofl/cormorantgaramond/OFL.txt). Cópia integral preservada em `public/fonts/OFL-Cormorant-Garamond.txt`.
- Source Sans 3: Copyright 2010–2020 Adobe, com nome reservado “Source”. [Projeto original](https://github.com/adobe-fonts/source-sans) e [licença no repositório Google Fonts](https://github.com/google/fonts/blob/main/ofl/sourcesans3/OFL.txt). Cópia integral preservada em `public/fonts/OFL-Source-Sans-3.txt`.

Ambas as famílias usam **SIL Open Font License 1.1**. As cópias de licença acompanham os binários públicos, incluindo seus avisos de copyright. Os nomes de arquivo locais foram escolhidos para identificar família, subset e estilo; os metadados internos das fontes não foram modificados.

## Verificação executada

- Downloads concluídos com conteúdo não vazio; as respostas dos três binários informaram `Content-Type: font/woff2` e as duas licenças `text/plain; charset=utf-8`.
- Extensões `.woff2` e assinatura binária `wOF2` confirmadas nos três arquivos.
- Arquivos abertos com `fontTools.ttLib.TTFont`, verificando formato WOFF2, estilo, mapa de caracteres e eixo variável `wght` quando presente.
- Pesos de uso confirmados: Cormorant 400/500 e Source Sans 3 400/500/600 por instanciação em memória; itálico Cormorant com `usWeightClass: 400` e flag itálica ativa.
- Esta preparação verifica os arquivos. A aparência e o carregamento pela página devem ser conferidos após integrar as declarações CSS na landing.

### Integridade SHA-256

| Arquivo | SHA-256 |
| --- | --- |
| `cormorant-garamond-latin-wght-normal.woff2` | `D80DF8FF5AECD299A61549F9E29AB1ED0B9B05F4EA71D50FE978E07D5240B235` |
| `cormorant-garamond-latin-400-italic.woff2` | `E48E58027030DF56869B795CA6F19B7012158275F7AD7CDE1900B4A0B68D02E2` |
| `source-sans-3-latin-wght-normal.woff2` | `19143DCA075972BC84E3FD9EAB7416DD40CC565DCCB2435A044BDFABE060C7D5` |
| `OFL-Cormorant-Garamond.txt` | `60700D351CAC4650C51F3F9DB318D2A420F8B45052DBA2715EB5FEC41F0F6956` |
| `OFL-Source-Sans-3.txt` | `09746787287A289323B0EC3CFF4D1A4A801331B82B7207C1E186F5D26619A392` |
