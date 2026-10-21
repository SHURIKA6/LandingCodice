# Codice — mobile cinematográfico

Data local: **21/10/2026, America/Cuiaba**. O usuário pediu muito mais movimento no telefone, escolheu a cena fixa de retratos/nomes e autorizou a implementação do [plano](../superpowers/plans/2026-10-21-mobile-motion.md) com **“gooo”**. A [spec](../superpowers/specs/2026-10-21-mobile-motion-design.md) preserva o roteiro aprovado; o [ledger](progress.md) acompanha sua execução.

**Estado: implementação e verificação local concluídas em 21/10/2026.** O estado inicial era QA em andamento. Build/typecheck, 11 geometrias, smoke 16/16, motion 6/6, mobile 18/18 em Chromium e 18/18 em WebKit passaram; os resultados e limites próprios desta versão ficam em [verification.md](verification.md). [Vídeo do percurso](mobile-tour.mp4). O QA anterior de Pessoas em cena continua como baseline histórica, sem validar automaticamente estas alterações. Entrega versionada na branch `feat/pessoas-em-cena`, sem push, deploy ou novo worktree.

## Experiência implementada

1. **Abertura cinética:** título por linhas e descrição em sequência, com introdução fora do sticky mobile.
2. **Pessoas em cena:** trilho único de 300svh no telefone em retrato. Fernando Riad → Eduardo Gobatto → Victor Rafael, com fotografias em camadas, nomes mascarados em sentido oposto e indicador de três etapas. Repousos em .08/.50/.92 e geometria pura/reversível, sem duplicar a árvore semântica.
3. **Passagem aos projetos:** campo suave e título têm camadas distintas; superfícies podem subir até 64 px, sem transformar ancestral do palco.
4. **Mídias em movimento:** Corretor e Roger acomodam escala, deslocamento e rotação em sentidos opostos. Somente a mídia se move; catálogo, descrições, links e foco ficam estáveis. Troca de captura aguarda carregamento/decodificação e conserva a anterior em lentidão/falha, com escolha mais recente e nova tentativa.
5. **Oferta editorial:** preço inteiro, título e inclusões chegam em grupos distintos, preservando R$ 1.500 e todas as condições aprovadas.
6. **Processo como percurso:** filete vertical e quatro etapas acompanham o scroll nos dois sentidos; descrições permanecem no fluxo.
7. **Fechamento e toque:** campo azul, frase de contato e letras de `codice` têm entradas próprias e finitas. Menu nativo com máscara/sequência, links acessíveis imediatamente, Escape/foco e resposta curta ao pressionar.

## Política responsiva

| Modo | Condição e comportamento |
| --- | --- |
| `mobile-story` | Largura <1024 px, retrato e altura ≥560 px, movimento permitido e três fotos prontas. Palco sticky abaixo do header; safe areas e composição compacta até 700 px. |
| `mobile-flow` | Landscape, altura <560 px, texto ampliado sem espaço no palco ou retratos ainda pendentes/falhos. Apresentação em fluxo, com movimentos locais de fotos/nomes. |
| `static` | HTML inicial/sem JavaScript, preferência reduzida ou falha da cena opcional desktop. Conteúdo completo em fluxo. |
| `desktop` | Cena existente a partir de 1024 px, sem movimento reduzido. Mantém duração e poses da versão desktop. |

Modo de movimento e renderizador são independentes. O celular usa HTML/CSS/Framer Motion, sem Three ou canvas. Three continua importado dinamicamente apenas no desktop elegível. Mudanças de modo procuram conservar a pessoa visível; preferência reduzida ao vivo cancela as animações, sem esconder conteúdo ou foco. Toque e pinch zoom continuam nativos, com `syncTouch:false` e sem captura global de gestos.

A neutralização de molduras no telefone registrada em 20–21/10 é **histórico substituído pela implementação autorizada atual**. Os blocos antigos foram preservados integralmente.

## Arquivos principais

| Caminho | Responsabilidade |
| --- | --- |
| `src/components/experience/useMotionMode.ts` | Política responsiva reativa e preferência reduzida. |
| `src/components/experience/mobilePortraitMotion.ts` | Poses puras, limites, leitura e reversão mobile. |
| `src/components/experience/Hero.tsx`, `PersonCard.tsx`, `mobile-hero.css` | Uma árvore de pessoas, prontidão das fotos, trilho/palco e âncora responsiva. |
| `src/components/experience/ScrollFrame.tsx`, `ProjectStage.tsx`, `project-motion.css` | Movimento só na mídia e troca de captura. |
| `src/components/experience/MotionChapter.tsx`, `Header.tsx`, `mobile-chapters.css` | Passagens, oferta, trilha, letras finais, menu e foco/toque. |
| `scripts/mobile-portrait-motion.test.mjs` | Contratos geométricos mobile. |
| `scripts/verify-mobile-motion.browser.js` | Cenários próprios desta execução, com capturas/relatórios. |
| `setup/isolated-playwright.mjs` | QA com perfil isolado e gravação por contexto; reutiliza runtime local existente. |

## Preservação e limites

Pessoas, ordem e originais de `public/team/` permanecem protegidos. Não foram criados rostos, removidos fundos ou acrescentados cargos/contatos. Oferta, classificação dos projetos, fontes/licenças, estudos, capturas e archives anteriores continuam preservados. A stack é a existente, sem dependências de aplicação novas. Artefatos de vídeo e captura são evidência da interface em execução, não novos assets publicados na landing.

O servidor usa o gerenciador local em `http://localhost:4321/`, restrito à máquina. Estado e comandos atuais ficam em [verification.md](verification.md). Homologação estética do usuário, aparelhos físicos e medições universais de desempenho são distintos da verificação local.
