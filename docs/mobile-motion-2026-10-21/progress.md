# Execution ledger — plan: docs/superpowers/plans/2026-10-21-mobile-motion.md

User authorized implementation with “gooo” on 21/10/2026. Existing dirty checkout retained on feat/pessoas-em-cena; no commit, push or deployment.

## Pre-flight

Tasks 1–2 share MotionMode and pure mobile poses. Task 3 only moves media; Task 4 owns chapter choreography. Root owns Hero/PersonCard/global structural CSS/page integration. Delegated work must use separate stylesheets to prevent overlapping edits.

Plan-specific record retained here because commits are outside scope; no destructive cleanup of historical or verification artifacts.

## Task 1

Geometry tests were written before implementation: the first run failed because the new geometry module did not exist. After implementation, five new tests passed; together with the six existing desktop geometry tests, the final run passed 11/11 on 21/10/2026. No testing dependency was added.

## Tasks 2–4

The first browser scenario required a mobile sticky stage and failed against the previous implementation (`Mobile has no cinematic stage: null`). Hero/PersonCard now share one semantic tree, with a 300svh mobile track, opposite photographic/name layers, three reading stops, compact layout and flowing fallback. Motion mode is separate from renderer; originals must decode before the pinned enhancement.

Project media motion and chapter choreography were implemented in parallel in separate files. Root integrated stable controls, the responsive policy and page attributes. Scope remained photographs/typography/media motion; commercial content and asset bytes were preserved.

## Verification corrections

- Native scroll snapshots preceded Motion's active-person update; the anchor now follows the settled person. Focus now prevents a queued chapter observer from restarting an entrance.
- Independent review found an opening animation moving the “Ver projetos” ancestor and a clipped landscape menu. The animation now belongs only to text/decorative layers; the menu scrolls within the viewport.
- A desktop reload smoke found the temporary SSR flow reinterpreting the browser's restored offset. Initial hydration now leaves native restoration intact. A separate mobile reload exposed an indicator that had missed an already sampled MotionValue; mode activation now synchronizes active state from measured scroll geometry.
- Text enlargement QA found clipped names at 200%. A measured text-size fallback restores the flowing layout, with accessible reflow for header, headings, price and footer. Finite CSS effects are canceled along with WAAPI when the page becomes hidden.
- The slow-catalogue test now waits for the original lazy-loaded screenshot to decode before testing its preservation during a replacement download. The negative Three network assertion now has a desktop positive control and recognizes the production minified renderer.

## Task 5

Final production browser suites and visual recording are in progress. Historical failures, intermediate captures and logs remain preserved. The current evidence ledger is [verification.md](verification.md); only that final table determines completed checks.

## Fechamento local — 21/10/2026

Build/typecheck e 11 geometrias passaram; build final servido pelo gerenciador em loopback, PID64376. A rodada final passou smoke16/16, motion6/6, mobile18/18 em Chromium e18/18 em WebKit; complementar Chromium4/4. Texto200% agora mantém largura390px, sem cortes. Oito frames extras comprovam três estados distintos de footer/menu; vídeo do percurso tem64,68s e decodificação FFmpeg válida. Retratos3/3 e archive21/21 preservados. A revisão independente e a inspeção final pelo coordenador estão detalhadas no relatório. Nenhum trabalho de implementação permanece pendente; aparelho físico e aceite estético não são afirmados. Sem commit/push/deploy.
