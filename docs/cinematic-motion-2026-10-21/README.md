# Codice — coreografia da página inteira

## Versionamento posterior ao QA

Em **21/10/2026**, o usuário pediu **“Commit e push”** desta entrega em `main` para o remoto existente `origin`. Código, documentação, resultados, capturas e vídeos desta execução compõem o versionamento. O fechamento “sem commit, push ou deploy” abaixo é histórico da etapa de QA; envio Git não comprova deploy remoto.

Data local: **21/10/2026, America/Cuiaba**. O usuário pediu mais movimento usando frontend-design, Impeccable e UI/UX Pro Max e autorizou o plano com **“Implement the proposed plan.”** A direção continua Pessoas em cena. As opções recomendadas do planejamento foram adotadas: movimento cinematográfico ligado à rolagem, recomposição local das seções e pausas de leitura.

**Implementação e QA local concluídos em 21/10.** Build/typecheck, 11 geometrias, smoke 16/16, motion 6/6, mobile 18/18 por motor e coreografia 15/15 por motor passaram em Chromium/WebKit. Código e 30 capturas revisados. [Vídeo mobile](mobile-tour.mp4) · [Vídeo desktop](desktop-tour.mp4). Evidências, correções e limites em [verification.md](verification.md). Sem commit, push ou deploy.

## Implementação

- A escultura azul percorre um arco reversível de deslocamento, escala e rotação plana; ponteiro, entrada finita e scroll usam wrappers distintos. Continua sendo o raster autorizado, com os originais preservados.
- Passagens entre capítulos, tipografia, oferta, processo e fechamento recebem coreografia local. Superfícies decorativas e texto têm camadas próprias; caixas de links e botões não acompanham os efeitos de leitura.
- Molduras de Corretor e Roger acomodam-se com mais amplitude; suas capturas reais percorrem máscaras internas com escala uniforme. A troca do catálogo mantém carregamento/decodificação e seleção mais recente.
- O menu coordena entrada e saída curta acionada pelo botão. Navegação, Escape e clique externo continuam imediatos; novo acionamento pode reverter a saída.
- Setas e sublinhados respondem a hover/foco; o alvo clicável permanece no lugar.

## Contratos e prévia

Pessoas, ordem Fernando → Eduardo → Victor, fotos e manifestos, conteúdo, oferta, contatos, paleta, fontes e acervo permanecem preservados. O palco dos retratos continua com 300svh. Nenhum outro palco fixo, dependência de aplicação, API ou modelo 3D foi acrescentado.

SSR/sem JavaScript, movimento reduzido, texto ampliado e falha da cena mantêm conteúdo HTML e ações. Efeitos novos são removidos no modo estático; não há loop ambiente novo. A renderização Three continua sob demanda, apenas no desktop elegível.

Na inspeção inicial, a prévia de produção apontava para um CSS ausente no build em disco e retornava HTTP 500. Reiniciar pelo gerenciador em desenvolvimento restaurou os estilos; o QA final deve usar build/servidor coerentes e confirmar todos os CSS com HTTP 200. Isso não é evidência de defeito corrigido no CSS da aplicação.

## Verificação

Resultados atuais e limites ficam em [verification.md](verification.md). As aprovações das entregas anteriores são baseline histórica; não aprovam esta coreografia automaticamente. Servidor restrito à máquina em `http://localhost:4321/`, gerenciado por `npm run dev -- status`, `logs` e `stop`. Sem push ou deploy nesta execução.
