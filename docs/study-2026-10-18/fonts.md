# Fontes locais da comparação visual — 18/10/2026

As três famílias foram obtidas diretamente do Google Fonts, sem conversão ou alteração dos binários. Os arquivos em `public/fonts/study/` permitem servir a comparação sem requisições de fontes a terceiros. Cada família acompanha sua licença SIL Open Font License 1.1 original, obtida do repositório oficial `google/fonts`.

## Origem e pesos

CSS oficial consultado com um User-Agent Chromium: [Google Fonts CSS2](https://fonts.googleapis.com/css2?family=Manrope:wght@400..800&family=Bricolage+Grotesque:wght@400..800&family=Archivo+Black&display=swap).

| Família CSS | Estilo | Declaração usada na comparação | Eixo do binário local |
| --- | --- | --- | --- |
| `Manrope` | normal | `font-weight: 400 800` | `wght`: 200–800; padrão interno 200 |
| `Bricolage Grotesque` | normal | `font-weight: 400 800`; `font-stretch: 100%` | `wght`: 200–800; padrão interno 800 |
| `Archivo Black` | normal | `font-weight: 400` | estática; `usWeightClass` 400 |

Manrope e Bricolage são variáveis, embora a comparação anuncie somente a faixa solicitada de 400–800. Archivo Black tem desenho visual pesado, mas seu peso CSS oficial é 400; não deve ser declarada como 900. O arquivo Bricolage fornecido por esta requisição tem somente o eixo variável `wght`; largura e tamanho óptico não estão expostos como eixos variáveis nesse arquivo.

## URLs exatas e integridade

| Arquivo local | Fonte oficial | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `manrope-latin.woff2` | [WOFF2 oficial](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2) | 24.836 | `a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972` |
| `bricolage-grotesque-latin.woff2` | [WOFF2 oficial](https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y9H6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiawA1Xp.woff2) | 41.344 | `a97804dc9fbe5fc972a08018c5eda4dab7ef2346f64c57e61419d05e6de4ea1c` |
| `archivo-black-latin.woff2` | [WOFF2 oficial](https://fonts.gstatic.com/s/archivoblack/v23/HTxqL289NzCGg4MzN6KJ7eW6CYyF_g.woff2) | 18.604 | `25f33e61cf995abd6be62931cf03bf427286259177b43618cc410ee0157cfd30` |
| `OFL-Manrope.txt` | [Licença oficial](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) | 4.387 | `58172e0c0fac2cda8a37b348164bb55e44b0e69051e557e92b1d3f6910141f7b` |
| `OFL-Bricolage-Grotesque.txt` | [Licença oficial](https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/OFL.txt) | 4.403 | `4b5a7d8f37f5602621c8a8d7358a6a2e71317e6c231c661e15aef0275d3e07ba` |
| `OFL-Archivo-Black.txt` | [Licença oficial](https://raw.githubusercontent.com/google/fonts/main/ofl/archivoblack/OFL.txt) | 4.492 | `3173acd82f8c6159b5b1037b539fcbd4edff68e65c2ea8b9412b5a5ca97b08ff` |

Repositórios de origem das famílias, conforme os avisos de copyright preservados nas licenças:

- Manrope: Copyright 2018 The Manrope Project Authors — [googlefonts/manrope](https://github.com/googlefonts/manrope); [distribuição Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope).
- Bricolage Grotesque: Copyright 2022 The Bricolage Grotesque Project Authors — [ateliertriay/bricolage](https://github.com/ateliertriay/bricolage); [distribuição Google Fonts](https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque).
- Archivo Black: Copyright 2017 The Archivo Black Project Authors — [Omnibus-Type/ArchivoBlack](https://github.com/Omnibus-Type/ArchivoBlack); [distribuição Google Fonts](https://github.com/google/fonts/tree/main/ofl/archivoblack).

## Declarações correspondentes

```css
@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400 800;
  font-display: swap;
  src: url('/fonts/study/manrope-latin.woff2') format('woff2');
}

@font-face {
  font-family: 'Bricolage Grotesque';
  font-style: normal;
  font-weight: 400 800;
  font-stretch: 100%;
  font-display: swap;
  src: url('/fonts/study/bricolage-grotesque-latin.woff2') format('woff2');
}

@font-face {
  font-family: 'Archivo Black';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/study/archivo-black-latin.woff2') format('woff2');
}
```

## Verificação e limites

Os três arquivos foram abertos e decodificados com `fontTools` 4.63.0. Todos têm assinatura `wOF2`, comprimento declarado no cabeçalho igual ao tamanho real e tabelas de fonte legíveis. Os metadados de `fvar` e `OS/2` foram conferidos para os pesos acima.

O mapa de caracteres de cada arquivo contém todos os caracteres portugueses pré-compostos verificados: `áàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ`. Assim, o subconjunto latino é suficiente para a redação em português da comparação; não foi necessário baixar `latin-ext`. A cobertura de marcas combinantes isoladas não é completa; os textos da comparação devem usar caracteres pré-compostos (normalização NFC). Estes arquivos não representam cobertura de todos os alfabetos nem incluem itálico. A verificação do binário não substitui a validação visual e de carregamento na página.
