# Codice — Pessoas em cena com Three.js

Data do briefing: 20/10/2026. Plano aprovado pelo usuário nesta conversa.

## Escultura azul posterior — 21/10/2026

O usuário confirmou a escultura antiga dos dois Cs entrelaçados e autorizou recolocá-la na abertura, com esmalte azul **`#2f4bff`**, cromado e transparência. A introdução recebe a peça decorativa antes da sequência de retratos; fotos, conteúdo e palco de 300svh permanecem protegidos. Os originais verde/cromado continuam preservados. [Registro da integração](../blue-sculpture-2026-10-21/README.md) e [QA próprio concluído em 21/10](../blue-sculpture-2026-10-21/verification.md), após o estado inicial em execução, com build/typecheck, geometrias, regressão, mobile Chromium/WebKit, integridade e revisão aprovados; as evidências anteriores abaixo não a validam automaticamente. Sem commit, push ou deploy.

## Execução mobile — 21/10/2026

O **“gooo”** autorizou implementar o plano descrito no registro abaixo. O novo [mobile cinematográfico](../mobile-motion-2026-10-21/README.md) usa palco único de 300svh em retrato, introdução fora do sticky, fotos/nomes/indicador reversíveis e movimento em fluxo para landscape/altura curta. Corretor/Roger passam a mover somente suas mídias; controles permanecem estáveis. Oferta, trilha do processo, fechamento e menu têm coreografias próprias. Stack, fotos, ordem das pessoas, contatos, oferta e desktop permanecem protegidos.

A antiga neutralização de molduras no telefone é substituída nesta execução autorizada. **QA local concluído em 21/10**, após a fase inicial em andamento, no [relatório mobile](../mobile-motion-2026-10-21/verification.md); os checks da versão anterior abaixo continuam preservados, sem validar automaticamente as novas alterações. Texto ampliado conserva fluxo sem cortes. Sem commit, push ou deploy.

## Histórico do plano mobile — 21/10/2026, antes da implementação

O usuário considerou o movimento mobile insuficiente, pediu `/plan` e escolheu retratos/nomes em uma cena fixa transformada pela rolagem. Foram preparados a [spec de design](../superpowers/specs/2026-10-21-mobile-motion-design.md) e o [plano técnico](../superpowers/plans/2026-10-21-mobile-motion.md). A proposta inclui sete momentos de movimento forte e revê a neutralização das molduras no telefone. **Nenhuma implementação ou nova aprovação de QA deste mobile nesta etapa.** Os registros abaixo descrevem a versão existente.

## Ampliação de movimento — 20/10/2026

**Fechamento em 21/10/2026:** build e typecheck finais, seis testes de geometria, 16 cenários do smoke e seis cenários adicionais de motion passaram. Três tamanhos de notebook baixo também foram conferidos; revisão independente final de código e capturas aprovada. Evidências e limites em [verification.md](verification.md).

O usuário elogiou a landing Pessoas em cena e pediu mais movimentos e transições com referências em [Lando Norris](https://landonorris.com/) e [KAIRN no MotionSites](https://motionsites.ai/?prompt=kairn). A resposta **“pode seguir”** delegou a escolha da coreografia e autorizou a implementação. O [roteiro de movimento](motion.md) documenta essa ampliação; os blocos Contrato, Execução e Decisões abaixo preservam o registro da primeira entrega e sua baseline de 16 cenários.

- Hero com título por linhas, nomes animados, indicador de três etapas e maior profundidade; resposta discreta ao ponteiro com mola e reset fora da tela/aba oculta, mantendo os 300svh.
- `MotionChapter` para abrir contornos de 64 px para 0 com a rolagem, entradas finitas de títulos e leitura, sequência do processo e palavra de fechamento.
- `ScrollFrame` para acomodar as molduras de Corretor e Roger de forma reversível em desktop, neutralizada no celular.
- Menu com painel e links coordenados, preservando `details`/`summary`, teclado e foco; catálogo com a captura anterior visível até a próxima carregar/decodificar, crossfade curto e tratamento de seleção rápida/falha.
- Identidade, stack, retratos originais, contatos e oferta preservados. HTML completo, movimento reduzido ao vivo e alternativas às falhas da cena continuam obrigatórios.

**Executado nesta ampliação:** typecheck e build com exit 0; seis testes de movimento aprovados; `scripts/verify-people.browser.js` com seletor atualizado para a imagem ativa, executado novamente com **16/16 cenários aprovados** contra o build de produção em `http://localhost:4321/`, restrito à máquina; revisão estática independente aprovada. Detector com exit 0 e dez avisos advisory referentes a cores preexistentes, agora documentadas em `DESIGN.md`, sem alteração do CSS ou sidecar por esse registro. O estado final do QA adicional de movimento, rede e toque está em [verification.md](verification.md); não é inferido dos checks anteriores. Sem commit, push ou deploy.

## Contrato

- Redesenhar a página inteira com identidade clara (branco frio, grafite azulado, cobalto), Bricolage Grotesque e Source Sans 3 locais.
- Abertura individual por rolagem: Fernando Riad → Eduardo Gobatto → Victor Rafael. Avatares dos GitHubs autorizados e foto original enviada de Victor. Não inferir funções ou contatos.
- Three.js direto, carregado sob demanda em cliente, desktop a partir de 1024 px; retratos planos, sem deformar as fotos, nomes e ações em HTML.
- Celular, movimento reduzido, ausência de JS, falha de textura ou WebGL: apresentação completa em HTML. Rolagem natural, foco visível e contatos acessíveis.
- Depois: Corretor real → Roger explicitamente demonstrativo → oferta vigente de R$ 1.500 → processo e contatos. Sem backend, novas APIs ou publicação.
- Recursos da GPU, observadores, eventos e frames devem ser liberados. Pausar fora da tela/aba oculta e limitar a resolução.
- Preservar acervo e alterações locais; documentação atualizada sem apagar histórico.

## Execução

- [x] Baseline: typecheck passou; teste de aceitação no navegador falhou pela ausência de Victor, como esperado.
- [x] Branch `feat/pessoas-em-cena`; 21 arquivos da versão anterior arquivados com SHA-256 em `archive/manifest.json`, incluindo a modificação preexistente de `next-env.d.ts`.
- [x] Fotos e dados de apresentação separados dos contatos.
- [x] Nova página e sistema visual responsivo.
- [x] Cena Three.js e alternativas HTML.
- [x] Typecheck, build, seis testes de movimento e 16 cenários de navegador.
- [x] Documentação e revisão independente de código e capturas concluídas.

## Decisões de execução

- Reutilizar o checkout atual em uma branch própria. Não criar worktree adicional nem fazer commit/push/deploy nesta entrega.
- Os contatos comerciais existentes de Fernando e Eduardo permanecem literais. Victor é integrante da apresentação; não recebe contato nem função fictícia.
- O contrato entre abertura e cena é uma lista de URLs de retratos, progresso 0–1 e callbacks de primeiro frame/falha. A cena não controla a navegação nem desenha os nomes.
- Revisar o resultado local antes de afirmar aprovação técnica. Homologação estética do usuário é uma etapa distinta.

## Registro

A verificação final e seus limites serão registrados em `verification.md`; as origens das fotos estão em `assets.md`. Os arquivos anteriores e o acervo de estudos permanecem preservados.
