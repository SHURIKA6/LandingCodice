# QA da landing Codice

Data: 2026-10-17. Alvo: http://localhost:4321/. Browser Chromium por agent-browser CLI, sessões isoladas `codice-qa-isolated` e `codice-qa-nojs`.

## Execução

- Matriz de larguras 320, 390, 700, 768, 1024, 1280, 1440 e 1920 CSS px, altura 900 px.
- A matriz final não apresentou overflow horizontal, imagens quebradas ou âncoras sem destino. Evidência: `metrics-{largura}.json`. As duas imagens renderizaram com naturalWidth=1440.
- Inspeção visual inicial da matriz e reinspeção final em 320, 390 e 1440 px. Evidências finais: `final-320.png`, `final-390.png`, `final-1440.png`. As capturas numéricas sem prefixo são anteriores aos ajustes finais e algumas contêm a toolbar de desenvolvimento.
- Menu em 390 px: clique e Enter abrem; Tab alcança o primeiro link; Enter navega para Trabalhos e fecha o menu; Tab seguinte alcança o primeiro link do projeto. Escape a partir de link fecha o menu e devolve foco ao botão. `aria-expanded` acompanha o estado.
- Primeiro Tab revela o skip link com contorno de 3px; Enter navega para #conteudo e foca MAIN#conteudo. Links de projeto recebem contorno visível por teclado. Evidências: `skip-focus.png`, `menu-open.png`, `menu-keyboard-link.png`.
- Reduced motion emulado: media query reduce=true, scroll-behavior=auto e nenhuma animação ativa.
- JavaScript desabilitado no Chromium com `--blink-settings=scriptEnabled=false`: classe js ausente, botão Menu oculto e navegação principal visível. Em 320 px não houve overflow, imagem quebrada ou âncora ausente. Contato navegou para #contato. Evidência: `nojs-final-320.png`.
- Seis hrefs WhatsApp conferidos: Fernando 5566999356646 (quatro links) e Eduardo 556684184488 (dois links); todos usam target=_blank e rel=noopener noreferrer. WhatsApp não foi aberto e nenhuma mensagem foi enviada.
- Corretor aponta ao ambiente https://corretor-web-test.vercel.app/ e é chamado demonstração. Roger usa a copy corrigida sobre serviços, informações de atendimento e contato; não promete galeria de trabalhos autênticos.
- Nenhum erro JavaScript de página foi registrado. Console de desenvolvimento teve mensagens Vite/HMR, sem erro de aplicação.
- Axe 4.12.1 padrão: 34 passes, 54 inapplicable, um incomplete de contraste (background image impede cálculo automático) e uma violação best-practice moderada, descrita abaixo. Evidência: `axe.json`. A execução com --tags separado por vírgula retornou zero regras devido à interpretação do CLI e foi descartada.

## Achados originais, resolvidos na reinspeção

1. **Resolvido.** Em 1440 px, uma emenda horizontal da textura de papel atravessava o subtítulo do Roger, na faixa y=1078.55–1110.94. Evidência original: `final-1440.png`. A reinspeção visual em `resolved-1440.png` confirmou que a emenda não cruza mais o texto.
2. **Resolvido.** Axe region apontava `.hero-copy`, contendo H1 e CTA, fora de landmarks. Severidade original: moderate, best-practice. A nova auditoria padrão retornou zero violações.

## Reinspeção após correções

- Em 1440 px, textura sob Roger revisada visualmente: nenhuma emenda sobre título ou subtítulo e nenhuma toolbar de desenvolvimento. Evidência: `resolved-1440.png`.
- Axe 4.12.1 padrão: **zero violações**, 34 passes e 54 inapplicable. Permanece um incomplete de contraste devido às imagens de fundo, sem falha de contraste comprovada. Evidência: `axe-resolved.json`.
- Smoke em 390 px: Enter abre menu, Tab alcança Trabalhos, Escape fecha e devolve foco ao botão; aria-expanded acompanha estado. documentElement.scrollWidth=390. Evidência: `resolved-menu-390.png`.
- H1 extraído como texto contínuo: "Sites e sistemas sob medida para o seu negócio." Nenhum erro JavaScript na reinspeção.
- A matriz de oito larguras não foi repetida após estas duas correções locais; os resultados anteriores estão preservados acima.

## Limites

Teste desktop Chromium com emulação de viewport; não houve teste em aparelho real. Contraste sobre texturas foi inspecionado visualmente, mas não medido por todos os pixels. Destinos externos foram validados pelos hrefs; não foi feita navegação externa nesta rodada. Nenhum arquivo de aplicação foi editado por esta revisão. O servidor foi preservado.

