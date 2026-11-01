# Prévia de compartilhamento — 01/11/2026

## Escolha vigente — v1 lateral

O usuário esclareceu explicitamente que prefere a v1: marca/texto à esquerda e escultura à direita. Usar `public/media/codice-share-v1.png` nos metadados do endereço original, com ou sem barra final, sem exigir parâmetros. A fonte editável atual [card.html](card.html) corresponde a essa composição.

## Histórico — v2 central para miniaturas

- **Saída histórica:** `public/media/codice-share-v2.png`, PNG opaco de 1200 × 630 px, anteriormente usado em Open Graph e Twitter.
- **Fonte dessa composição:** preservada no histórico Git do commit `bc5227e`.
- **Composição:** marca, escultura e frase em uma coluna central; conteúdo dentro do quadrado de 630 px entre as posições horizontais 285 e 915, para acomodar recortes centrais. Marca de 104 px, escultura de 240 px e frase de 56 px, com margens verticais de pelo menos 64 px.
- **Identidade:** mesmas cores e fontes da primeira versão. Nenhuma alteração na página, em contatos, na URL canônica ou nos assets originais.

## Primeira versão preservada

- **Saída:** `public/media/codice-share-v1.png`, PNG estático opaco de 1200 × 630 px, publicado no caminho `/media/codice-share-v1.png`.
- **Fonte da primeira versão:** [card.html](card.html), também preservada no histórico Git do commit `3a42005`.
- **Composição:** marca textual atual `codice` com quadrado azul; frase exata “Sites e sistemas” e “sob medida.” em duas linhas; escultura azul/cromada de dois Cs entrelaçados à direita, com 430 px; margens de pelo menos 64 px.
- **Identidade:** Bricolage Grotesque local, base `#f7f9fc`, texto `#142033` e azul `#2f4bff`. Preservar os bytes e a proveniência dos assets originais.

## Metadados

Open Graph e Twitter devem apontar para o mesmo asset próprio, com dimensões coerentes e texto alternativo **“Codice — sites e sistemas sob medida, com escultura azul de dois Cs entrelaçados.”** A imagem deve ser acessível por HTTP e constar no HTML renderizado pelo servidor, sem depender de JavaScript do cliente.

Alterações locais precisam ser publicadas para afetar o link compartilhado; o cache do WhatsApp pode conservar a prévia anterior.

## Editar e exportar novamente

Editar `card.html`; as referências relativas apontam para os assets originais do repositório. Para uma prévia fiel, servir a raiz do checkout em loopback, por exemplo `python -m http.server 4322 --bind 127.0.0.1`, e abrir `http://127.0.0.1:4322/docs/sharing-preview-2026-11-01/card.html`. Esse servidor é apenas uma ferramenta temporária de composição, não uma rota da aplicação.

No navegador automatizado, aguardar `document.fonts.ready` e `decode()` da imagem; capturar somente `.card` com escala CSS de 1 pixel e viewport de 1200 × 630. Salvar a captura PNG em `public/media/codice-share-v1.png`. Aguardar os recursos evita exportar fontes substitutas ou uma escultura ainda não carregada. Encerrar o servidor temporário com `Ctrl+C`.
