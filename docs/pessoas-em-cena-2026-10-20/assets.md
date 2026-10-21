# Retratos — Pessoas em cena

Registro de aquisição em **20/10/2026**, no fuso `America/Cuiaba`. As transferências ocorreram em 21/10/2026 entre 02:23:52 e 02:23:53 UTC, ainda em 20/10 no fuso local.

O usuário autorizou o uso das fotografias dos perfis GitHub indicados e forneceu o anexo de Victor Rafael. Os nomes e os textos alternativos seguem essas informações fornecidas; não houve identificação biométrica, atribuição de cargos ou criação de novos contatos. Os contatos comerciais existentes permanecem em `src/data/site.ts`.

## Origem e arquivos preservados

| Pessoa | Arquivo público | Origem | MIME | Dimensões | Bytes |
| --- | --- | --- | --- | --- | ---: |
| Fernando Riad | `public/team/fernando.jpg` | [Avatar original](https://avatars.githubusercontent.com/u/65686336?v=4) do [perfil SHURIKA6](https://github.com/SHURIKA6) | `image/jpeg` | 460 × 460 | 22.322 |
| Eduardo Gobatto | `public/team/eduardo.jpg` | [Avatar original](https://avatars.githubusercontent.com/u/215524121?v=4) do [perfil Edu4rdo-Gobatto](https://github.com/Edu4rdo-Gobatto) | `image/jpeg` | 460 × 460 | 18.468 |
| Victor Rafael | `public/team/victor.png` | Anexo fornecido pelo usuário: `codex-clipboard-b1b80861-1fd6-4066-936c-9ff28d25155f.png` | `image/png` | 640 × 641 | 290.717 |

Os três arquivos preservam os bytes recebidos. Não houve edição, reconstrução de rostos, remoção de fundo, recorte gravado, compressão ou conversão. O PNG de Victor foi copiado diretamente do anexo e comparado byte a byte com a origem.

## SHA-256

```text
2f6009e80cec8768c340907245ada145ae6f4f98fb5fe2ce1bf3c0684a006408  public/team/fernando.jpg
84e3fbd2301240c668f1fcfe6d6cafb303de2547fbff8b7618d8ca4fcf2bbb03  public/team/eduardo.jpg
1f1f7cc04f1697b83cd47a66fc6bfbd2dd83e54d5a13dcd4d9cca544344c7a31  public/team/victor.png
```

O arquivo `public/team/manifest.json` registra os mesmos dados, os instantes UTC, as URLs de origem e os cabeçalhos HTTP relevantes dos downloads. Os dados de apresentação ficam em `src/data/team.ts`, na ordem Fernando Riad, Eduardo Gobatto e Victor Rafael.

## Verificações executadas

- Os dois downloads retornaram HTTP `200`, com `Content-Type: image/jpeg` e `Content-Length` igual ao tamanho recebido.
- As assinaturas binárias JPEG/PNG corresponderam às extensões e ao MIME; a leitura e a verificação estrutural com Pillow confirmaram o formato e as dimensões.
- O manifesto foi relido como JSON; os tamanhos e os SHA-256 foram recalculados a partir dos arquivos salvos e comparados com cada registro.
- Os arquivos originais foram mantidos; novas aquisições devem registrar novos hashes antes de qualquer substituição.
