# Serviços dos sócios — 23/10/2026

Implementação autorizada com **"gooo"**, após escolha de **Cinemática 2 completa** e intensidade **cinematográfica** da etapa anterior e proposta nova do usuário: ao rolar após a equipe, mostrar meio-retrato de cada sócio com uma frase marcante sobre o que a Codice faz, depois o próximo sócio. Mantém a direção Pessoas em cena, as fotografias, os dados comerciais, o trilho de 300svh e os modos de fallback.

## Movimento implementado

- **Capítulo `#servico`** ("O que a gente faz") inserido entre `#a-gente` e `#trabalho`, envolvido por `MotionChapter` no padrão da página, com `id="servico"` e `labelledBy="servico-title"`.
- **Quatro painéis + parada final**: `ServicePanels.tsx` (cliente) lê `src/data/services.ts` e renderiza, por sócio, meio-retrato, kicker do serviço, frase marcante e assinatura "Sobrenome, Nome"; a parada final traz "A gente junta o que o seu negócio precisa." com link para `#trabalho`, sem retrato.
- **Desktop (enhanced)**: trilho próprio de `500vh` (`4 × 100vh` de painel + `1 × 100vh` de fechamento), palco `position: sticky` com `top: var(--site-header-height, 80px)` e `height: calc(100svh - var(--site-header-height, 80px))`; retratos deslizam da borda alternada (esquerda/direita), texto em contramovimento, opacidade em fade-through. Progresso 100% por rolagem — sem timer, sem loop ambiente. Apenas em desktop elegível (`mode === 'desktop'`).
- **Mobile / reduzido / sem JavaScript**: mesmo conteúdo em fluxo normal, empilhado, totalmente visível. O trilho `mobile-story` de 300svh não é tocado; os estilos pinned só ativam sob `[data-enhanced="true"]`.
- **Acessibilidade**: seção com `aria-label="O que a gente faz"`, painéis com `aria-labelledby` apontando para o `h3` da frase, imagens com `alt` de `team.ts`, link final com texto acessível. Estilos de movimento reduzido desativam sticky/absolute tanto pelo modo quanto pela media query.
- **Identidade visual**: base `#f7f9fc`, texto `#142033`, ação `#2f4bff`, campo suave `#dce5f3`; Bricolage Grotesque e Source Sans 3 servidas localmente.

## Conteúdo autorizado (registro)

Esta entrega acrescenta conteúdo que hoje não existia no repositório:

- **Lista de serviços** apresentada na cena: Consultoria, Software personalizado, Site profissional, Assistência técnica (v1 — computadores/rede). Registrada em `src/data/services.ts`.
- **Mapeamento sócio → serviço**, aprovado pelo usuário em 23/10/2026: Fernando Riad → Consultoria; Eduardo Gobatto → Software personalizado; Victor Rafael → Site profissional; Jose Vitor → Assistência técnica.
- **Frases marcantes** de cada painel e a parada final, aprovadas na mesma data.
- **Escopo da assistência técnica**: v1 (equipamentos — computador, rede). Se mudar para v2 (suporte aos sistemas entregues), atualizar `services.ts` e este registro.
- **Reutilização dos papéis confirmados em 21/10** (`opening.ts`: Arquitetura e Design, Engenharia e Produto, Experiencia e Sistemas, Infra e Redes) nesta nova cena. Até esta entrega eles valiam apenas na abertura; a partir de agora também aparecem implicitamente via assinatura de serviço, sem atribuir papel textual no painel (apenas "Sobrenome, Nome").

Contatos comerciais permanecem apenas os originais de `siteContent.founders` (Fernando `5566999356646`, Eduardo `556684184488`); o único link da cena é a âncora `#trabalho`. Nenhum contato para Victor ou Jose Vitor foi criado. `offer.ts` (pacote aprovado) não foi alterado.

## Preservação e limites

- `public/` (fotografias em `public/team/`, manifesto, escultura) intocado — bytes, origem, MIME, dimensões e hashes preservados; as fotos são referenciadas, não recortadas nem reconstruídas.
- `src/data/team.ts`, `src/data/offer.ts`, `src/data/site.ts`, `src/data/landing.ts` não foram alterados. `opening.ts` não foi alterado — os papéis seguem valendo na abertura.
- Dependências, configurações e acervos (`docs/`, `public/estudo/`, archives) não foram tocados.
- A versão anterior da página segue preservada nos archives existentes.

## Revisão de código (subagente GLM)

Revisão independente aplicou uma correção e registrou pendências:

- **Correção aplicada**: palco pinned passou a usar `top: var(--site-header-height, 80px)` e `height: calc(100svh - var(--site-header-height, 80px))`, evitando que o header fixo cobrisse o topo dos painéis. Typecheck limpo após a edição.
- **Pendências (decisão humana)**: (1) link final focável enquanto invisível (progresso < 0,8) — risco de foco em elemento invisível; (2) dip de opacidade entre paradas (fade-through, não crossfade); (3) asserção não-nula em `teamMembers.find(...)!` (dados hoje corretos); (4) recorte em desktops muito baixos; (5) salto de layout na hidratação (flow → pinned).
- **Veredito de conformidade com contratos**: conforme.

## Resultados e pendências

Resultados reais e pendências: [verification.md](verification.md). Branch `feat/cinematica-2` (entrega sobe sobre a cinemática 2); sem commit, push ou deploy nesta execução. Push não comprova homologação de deploy remoto.

## Capturas de repositórios (atualização 23/10/2026)

A mídia dos quatro painéis deixou de ser o retrato da pessoa e passou a ser uma captura (print) do repositório escolhido pelo usuário para cada sócio. Os retratos em `public/team/` e a cena da equipe seguem intocados.

- `public/services/panel-consultoria--minimal-api-dio.png` — `SHURIKA6/minimal-api-dio` (página do repositório, GitHub)
- `public/services/panel-software--cattle-counter.png` — `Edu4rdo-Gobatto/Cattle-counter` (página do repositório, GitHub)
- `public/services/panel-site--treino-pages.png` — `vict0r-rafael/treino` (site ao vivo no GitHub Pages)
- `public/services/panel-assistencia--netpulse.png` — `JoseVitor-net/NetPulse` (página do repositório, GitHub)

Proveniência registrada em `public/services/manifest.json` (schemaVersion 1), com origem, URL de captura, ferramenta (agent-browser 0.33.1 / Chromium), viewport 1600×1000, MIME, dimensões, bytes e SHA-256 de cada arquivo; `originalBytesPreserved: true`, `transformations: []`.

`src/data/site.ts` registrou `githubHref: 'https://github.com/vict0r-rafael'` para Victor Rafael (o único sócio que não tinha link). Ele agora aparece em `#contato` ("Trabalhos no GitHub") e no JSON-LD `sameAs`. Os demais links já existiam.

### Atualização da mídia de Victor (23/10/2026)

A captura do painel "Site profissional" foi trocada de `treino` (GitHub Pages) para `Projeto-e-commerce` (página do repositório). Arquivo: `public/services/panel-site--projeto-e-commerce.png` (1600×1000, sha256 `cf5ce1c0ed8524fad4eaf976ea31b576a6e9a67a5e42b476a68da829cd35d6ba`). A captura anterior do `treino` foi removida; proveniência atualizada em `public/services/manifest.json`.<|end|><|start|>write to=assistant<|channel|>analysis <|constrain|>xml<|message|><rfl:parameter name="path">
docs/servicos-socios-2026-10-23/verification.md