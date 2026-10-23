# Prontidão agêntica — 23/10/2026

## Contexto

A auditoria "Is Agentic" de https://landing-codice.vercel.app marcou 77/100. O usuário pediu a
implementação das correções em ordem de prioridade (falhas primeiro, depois avisos), com verificação
de todos os endpoints e arquivos legíveis por máquina. Nenhuma mudança visual de produto: o único
toque na página é um link de rodapé na homepage.

## O que foi implementado

| # | Item da auditoria | Resultado |
|---|---|---|
| 1 | OpenAPI specification published (Essential, Failed) | `public/openapi.json` (OpenAPI 3.1.0, servida em `/openapi.json`) |
| 2 | JSON error responses (Essential, Failed) | `src/lib/api-errors.ts` + rotas: todos os erros de `/api/**` são JSON com `code`, `message`, `detail`, `resolution` |
| 3 | Brand name discoverability (Recommended, Failed) | Título/descrição da homepage agora contêm "web design" (`src/data/landing.ts`); canonical próprio por página |
| 4 | API schema complexity analysis (Recommended, Failed) | OpenAPI com `operationId` + `description` por operação, parâmetros tipados, esquemas com `required` e exemplos |
| 5 | Function calling compatibility (Recommended, Failed) | Operações auto-descritivas e sem autenticação (`security: []`), adequadas a function calling |
| 6 | Developer resource discoverability (Recommended, Partial) | `/developers` nova página + `/docs` atualizada + `llms.txt` listando OpenAPI/API/MCP manifest |
| 7 | Public API/docs linked from homepage (Recommended, Partial) | Link "Documentação e API" no rodapé da homepage |
| 8 | MCP server / manifest (Recommended, Partial) | `public/.well-known/mcp.json` + GET de `/.well-known/mcp` agora declara `transport: 'streamable-http'`, `documentation`, `openapi`, `manifest` |

Colateral (mantido pequeno e alinhado à auditoria):

- API pública somente leitura, para dar substância ao OpenAPI:
  - `GET /api` — índice dos endpoints.
  - `GET /api/health` — estado do serviço.
  - `GET /api/contacts` — contatos públicos vindos verbatim de `siteContent.founders`
    (nenhum dígito foi digitado ou inferido; `wa.me` montado a partir de `whatsappNumber`).
  - `src/app/api/[...slug]/route.ts` — 404 JSON para qualquer `/api/*` desconhecido.
- `src/proxy.ts`: `/developers` entra na negociação `Accept: text/markdown`.
- `src/app/sitemap.ts`: `/developers` adicionada.
- Canonical por página em `about`, `contact`, `privacy`, `docs` e `developers` — antes todas apontavam
  para `/` (descoberto no smoke), o que mascarava as subpáginas em buscadores.

## Contratos preservados

- Pessoas, contatos comerciais (`5566999356646`, `556684184488` e os originais de Victor/Jose Vitor),
  oferta e projetos intactos — `/api/contacts` deriva de `src/data/site.ts` sem nova fonte.
- Nenhuma mudança nas fotografias, na duração de 300svh, nos modos de movimento ou nos fallbacks.
- Identidade visual intacta; único toque é o link do rodapé (mesmo padrão de markup dos irmãos,
  verificado visualmente em desktop (1264×625) e mobile (390×844)).
- MCP `initialize`/`tools/list`/`tools/call` inalterados (testes pré-existentes seguem verdes).

## Verificação

Veja [verification.md](verification.md) com os resultados reais desta execução.
