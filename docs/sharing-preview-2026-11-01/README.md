# Prévia de compartilhamento — 01/11/2026

## Arte e arquivos

- **Saída:** `public/media/codice-share-v1.png`, PNG estático opaco de 1200 × 630 px, publicado no caminho `/media/codice-share-v1.png`.
- **Fonte editável:** [card.html](card.html), sem dependências novas, com as fontes locais e a escultura azul existente.
- **Composição:** marca textual atual `codice` com quadrado azul; frase exata “Sites e sistemas” e “sob medida.” em duas linhas; escultura azul/cromada de dois Cs entrelaçados à direita, com 430 px; margens de pelo menos 64 px.
- **Identidade:** Bricolage Grotesque local, base `#f7f9fc`, texto `#142033` e azul `#2f4bff`. Preservar os bytes e a proveniência dos assets originais.

## Metadados

Open Graph e Twitter devem apontar para o mesmo asset próprio, com dimensões coerentes e texto alternativo **“Codice — sites e sistemas sob medida, com escultura azul de dois Cs entrelaçados.”** A imagem deve ser acessível por HTTP e constar no HTML renderizado pelo servidor, sem depender de JavaScript do cliente.

Alterações locais precisam ser publicadas para afetar o link compartilhado; o cache do WhatsApp pode conservar a prévia anterior.

## Editar e exportar novamente

Editar `card.html`; as referências relativas apontam para os assets originais do repositório. Para uma prévia fiel, servir a raiz do checkout em loopback, por exemplo `python -m http.server 4322 --bind 127.0.0.1`, e abrir `http://127.0.0.1:4322/docs/sharing-preview-2026-11-01/card.html`. Esse servidor é apenas uma ferramenta temporária de composição, não uma rota da aplicação.

No navegador automatizado, aguardar `document.fonts.ready` e `decode()` da imagem; capturar somente `.card` com escala CSS de 1 pixel e viewport de 1200 × 630. Salvar a captura PNG em `public/media/codice-share-v1.png`. Aguardar os recursos evita exportar fontes substitutas ou uma escultura ainda não carregada. Encerrar o servidor temporário com `Ctrl+C`.
