# Verificação — prontidão agêntica (23/10/2026)

Executada no checkout `main`, alterações locais sem commit, push ou deploy. Servidor dev via
gerenciador local (`npm run dev -- --background`, pid 38092, http://localhost:4321).

## Build e tipos

| Check | Resultado |
|---|---|
| `npm run typecheck` | ✅ limpo |
| `npm run build` | ✅ Next.js 16.4.2 (Turbopack); rotas registradas: `ƒ /api`, `ƒ /api/[...slug]`, `ƒ /api/contacts`, `ƒ /api/health`, `ƒ /.well-known/mcp`, `○ /developers`, páginas estáticas e Proxy |

## Testes

| Suite | Resultado |
|---|---|
| `node --experimental-strip-types --test scripts/api-contracts.test.mjs` (nova) | ✅ 21/21 |
| `node --experimental-strip-types --test scripts/agent-readiness.test.mjs` (6 pré-existentes + 2 novas) | ✅ 8/8 |
| `scripts/portrait-motion.test.mjs` | ✅ 9/9 |
| `scripts/mobile-portrait-motion.test.mjs` | ✅ 5/5 |
| `scripts/opening-state.test.mjs` | ✅ 6/6 |
| `scripts/styles.test.mjs` | ✅ 3/3 |

## Smoke HTTP (curl.exe contra o localhost)

| Requisição | Resultado |
|---|---|
| `GET /openapi.json` | ✅ 200 `application/json; charset=UTF-8`, OpenAPI 3.1.0 |
| `GET /api` | ✅ 200 JSON, índice + `Vary: Accept`, `access-control-allow-origin: *` |
| `GET /api/health` | ✅ 200 `{"status":"ok","service":"Codice","version":"0.1.0",...}` |
| `GET /api/contacts` | ✅ 200 com os 4 contatos; Fernando `wa.me/5566999356646`, Eduardo `wa.me/556684184488` verbatim |
| `GET /api/contacts?format=xml` | ✅ 400 JSON `code: unsupported_format` + `resolution` |
| `POST /api/health` | ✅ 405 JSON `code: method_not_allowed` |
| `GET /api/not-real-endpoint` | ✅ 404 JSON `code: resource_not_found` (sem HTML) |
| `GET /.well-known/mcp.json` | ✅ 200 JSON manifest (`transport: streamable-http`) |
| `GET /.well-known/mcp` | ✅ 200 JSON com `transport`, `documentation`, `openapi`, `manifest` |
| `POST /.well-known/mcp` (initialize) | ✅ 200 JSON-RPC result, `serverInfo.name: "Codice"` |
| `GET /developers` | ✅ 200 HTML com os 9 recursos |
| `GET /developers` com `Accept: text/markdown` | ✅ 200 `text/markdown` |
| `GET /` | ✅ título "Codice — Estúdio de web design em Sinop"; link do rodapé `/docs` presente |
| `GET /` com `Accept: text/markdown` | ✅ 200 `text/markdown` + `Vary: Accept` |
| `GET /__ora-404-probe-agentic` com `Accept: text/markdown` | ✅ 404 `text/markdown` com ≥20 caracteres e links |
| Páginas `/`, `/about`, `/contact`, `/privacy`, `/docs`, `/developers`, `/llms.txt`, `/robots.txt`, `/sitemap.xml`, `/estudo` | ✅ 200 |
| `/sitemap.xml` | ✅ contém `/developers` |
| `canonical` em `/docs` (e demais páginas após a correção) | ✅ aponta para a própria página |

## Verificação visual

Capturas em `C:\Users\ferna\AppData\Local\Temp\opencode` (`footer-desktop.png`, `footer-mobile.png`):

- Desktop 1264×625: rodapé mantém a linha única — "De volta ao início ↑ · Documentação e API ↑ · Sinop, Mato Grosso · © 2026 Codice".
- Mobile 390×844: links empilhados em largura integral, meta row preservada; hero da história mobile renderiza sem regressão.

## Pendências que este QA não cobre

- Re-auditoria "Is Agentic" do domínio publicado (o resultado vem de um scan externo e pode levar tempo para reprocessar).
- Ranking real de busca ("Codice web design") — depende de indexação e menções externas, não resolvido por código.
- Aparelho físico / Safari iOS não homologados.
- Deploy remoto (Vercel) não verificado nesta execução; os smoke acima são locais.
- Servidor dev deixado em execução (gerenciador local) para prévia; `npm run dev -- stop` encerra.
