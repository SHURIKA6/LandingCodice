# Codice — motion cinematográfico no celular

Fechamento em 21/10/2026: implementação autorizada por “gooo” e QA local concluído. [Registro e limites](../../mobile-motion-2026-10-21/verification.md). O texto de proposta abaixo é preservado como histórico do design aprovado. Texto ampliado pode retornar ao fluxo; a aceitação estética do usuário e aparelhos físicos permanecem separados.

Data: 21/10/2026. **Proposta de design; implementação não iniciada.**

## Pedido e escolha confirmada

O usuário considera o movimento atual do celular insuficiente e pediu **“MUITOOOOO MUITO MSM”** motion, solicitando `/plan`. Escolheu explicitamente: **“Cena cinematográfica: retratos e nomes se transformam numa área fixa enquanto você rola.”**

O objetivo é sentir a página se transformar durante a navegação no telefone: apresentação das pessoas, passagem aos projetos, trabalhos, oferta, processo e fechamento. A identidade Pessoas em cena continua vigente. Lando Norris e KAIRN continuam referências de ritmo e continuidade, sem importar suas marcas ou imagens.

O palco fixo dos retratos é escolha confirmada do usuário. Os valores, as demais cenas e a arquitetura abaixo são propostas de execução da IA, sujeitas à revisão do plano. Esta etapa entrega documentos, sem alterar a aplicação ou publicar.

## Diagnóstico da implementação atual

- `Hero.tsx:13,53,96–98`: profundidade, palco de rolagem, nomes e indicador dependem do modo desktop, a partir de 1024 px.
- `globals.css:288–292`: retratos do telefone entram uma vez com 36 px e escala .965; nomes voltam a spans inline; molduras recebem `transform:none!important` até 767 px.
- `MotionChapter.tsx:25,36,55`: entrada mobile usa 24 px/600 ms, com apenas 15,6 px nos grupos comuns. São entradas finitas; o restante do percurso fica parado.
- `MotionChapter.tsx:25,84`: a escolha de amplitude mobile é capturada no efeito e não acompanha diretamente mudanças de largura/orientação.
- `page.tsx:29` e `ProjectStage.tsx`: a moldura animada envolve também os controles. Liberar esse movimento sem separar a mídia faria botões se moverem sob o dedo.
- `verify-motion.browser.js:136–144` atualmente exige moldura imóvel no celular. Essa expectativa precisa mudar junto do produto; permanecerá válida para movimento reduzido.

São evidências de leitura do checkout atual. A tentativa adicional de inspeção no navegador nesta etapa não abriu uma sessão (conexão Playwright encerrada); não constitui novo QA. Os resultados técnicos de 20–21/10 registrados no projeto pertencem à implementação existente.

## Direção: intensidade por cenas e continuidade

Movimentos grandes de fotografia, escala e tipografia durante a rolagem; entradas coordenadas quando o conteúdo é alcançado; controles com respostas curtas ao toque. As fotografias e os textos têm momentos claros de leitura entre as transformações. Não depender de hover para nenhum efeito principal.

### 1. Abertura cinética

Título chega por linhas com deslocamento de 110% de sua altura; `gente.` e descrição têm tempos distintos. Sequência total proposta: 1,1 s, com até 160 ms entre grupos. A primeira rolagem afasta título e descrição em velocidades diferentes, abrindo espaço para o palco. Conteúdo HTML já existe e os links podem ser usados durante a entrada.

### 2. Pessoas em um palco fixo

A introdução comercial fica antes do palco. No telefone em retrato, a sequência das três pessoas ocupa um trilho de **300svh**, com uma única área sticky abaixo do header. Não criar três travamentos separados. Desktop mantém seus 300svh atuais.

Progresso local do palco, de 0 a 1:

| Intervalo | Cena |
| --- | --- |
| 0–.18 | Fernando em repouso legível. |
| .18–.38 | Fernando se afasta; Eduardo atravessa o palco e assume a frente. |
| .38–.62 | Eduardo em repouso legível. |
| .62–.82 | Eduardo se afasta; Victor assume a frente. |
| .82–1 | Victor em repouso, preparando a passagem aos projetos. |

Fotos funcionam como uma pilha editorial: deslocamento lateral de até 38% da largura do palco, deslocamento vertical de até 12% da área fotográfica, rotação no plano de até 6° e escala entre .82 e 1.04 durante a troca. No repouso, foto central em escala 1/rotação 0, nome completo e imagem com proporção original. Não deformar o rosto nem mover seus pixels independentemente da foto.

Nomes percorrem máscaras em direção oposta ao retrato; legenda e indicador de três segmentos acompanham a pessoa ativa. O indicador aparece também no celular. Durante a troca, não existe intervalo com todos os retratos invisíveis. Em .08/.50/.92, a leitura integral deve ser Fernando/Eduardo/Victor, respectivamente. Tudo reverte ao rolar para cima, sem acumular estado.

O link existente “Ver projetos” continua saltando diretamente ao portfólio. A ação comercial do header permanece disponível. Controles dentro do palco não recebem o movimento da fotografia.

### 3. Pessoas → projetos

A saída de Victor e a chegada do campo suave formam uma passagem única. A superfície do portfólio sobe, abre seus cantos e revela o título por linhas. Elementos de fundo podem deslocar até 64 px, com o texto em ritmo separado. Não transformar o ancestral do sticky nem criar uma camada que bloqueie o toque.

### 4. Corretor e Roger em movimento

No telefone, as mídias entram de escala .86 até 1, com até 64 px de deslocamento e até 2° de rotação. A leitura do projeto pode produzir deslocamento interno de até 24 px no wrapper, sem alterar o arquivo da captura. Roger tem acomodação em sentido oposto ao Corretor. Movimentos seguem o progresso local nos dois sentidos.

**Somente a mídia se move.** Botões do catálogo, descrição, links e foco ficam em uma camada estável. A troca de captura combina deslocamento horizontal de até 8% e crossfade de 350–450 ms, mantendo carregamento/decodificação, imagem anterior e escolha mais recente. Os botões continuam sendo o gesto principal; não é necessário implementar swipe nesta entrega.

### 5. Oferta editorial

Título, preço completo, divisor e inclusões entram em grupos distintos. O preço chega como **R$ 1.500**, sem contagem de números. Deslocamento de até 48 px; inclusões em grupos de no máximo três, com atraso total limitado a 240 ms. Condições, preço e CTA não aguardam uma sequência para poder ser lidos ou acionados. Não criar outro palco fixo.

### 6. Processo como percurso

As quatro etapas continuam no fluxo vertical. Um filete cresce com o progresso da seção, números se revelam e cada etapa se acomoda quando alcançada. A rolagem inversa reverte o percurso. Não esconder descrições anteriores, criar acordeões ou obrigar o visitante a selecionar uma etapa.

### 7. Fechamento e toque

Campo azul, frase de contato e palavra `codice` têm movimentos distintos. A palavra final se revela por letras, com atraso total até 300 ms, e encerra em repouso. Contatos ficam estáveis assim que recebem foco ou toque. Abertura do menu ganha máscara e sequência mais perceptíveis; painel continua nativo em `details/summary`, com links acessíveis imediatamente e Escape devolvendo foco. Botões respondem ao pressionar com escala .97, retorno curto e cancelamento em `pointercancel`.

## Política responsiva e arquitetura

- Separar **modo de movimento** (`static`, `mobile-story`, `mobile-flow`, `desktop`) de **renderizador** (`html`, `three`). HTML pode ter movimento forte sem WebGL.
- `mobile-story`: largura abaixo de 1024 px, orientação retrato, altura a partir de 560 px, movimento permitido e medições válidas. O palco usa `svh`, altura útil descontando header e safe area. Aplicar composição compacta até 700 px de altura: foto menor e nomes dimensionados para caber, preservando os três nomes/fotos e a navegação.
- `mobile-flow`: abaixo de 1024 px em landscape ou altura inferior a 560 px. Mesmas pessoas, entradas/saídas fortes por progresso de cada cartão e portfólio móvel, sem fixar um palco que não caiba.
- `static`: SSR, preferência reduzida, falha do aprimoramento ou medições inválidas. Conteúdo completo em fluxo. A preferência reduzida ao vivo cancela movimentos, não apenas os encobre com CSS.
- `desktop`: experiência existente, Three opcional a partir de 1024 px, sem aumentar o trilho e sem reescrever suas poses.
- Reutilizar uma única árvore semântica de pessoas. Não renderizar uma cópia desktop e outra mobile dos títulos/imagens.
- Introduzir um wrapper próprio do trilho e outro do palco dentro do hero. A introdução fica fora do sticky mobile; viewport, nomes e indicador ficam dentro. Nenhum ancestral do sticky recebe transform ou overflow acidental.
- Usar os MotionValues de Framer Motion já instalado. Cálculo puro e reversível para as poses mobile; estado React só nas mudanças de pessoa/etapa, não a cada frame.
- Política de largura/altura/orientação reativa; recalcular dimensões e restaurar a âncora da pessoa visível ao atravessar modos. O recolhimento da barra do navegador não reinicia a narrativa.
- Scroll nativo de toque, preservando `syncTouch:false`, rolagem vertical e pinch zoom. Nenhuma captura global de gestos.

Essas escolhas usam progresso por elemento, conforme [Motion useScroll](https://motion.dev/docs/react-use-scroll), e mantêm conteúdo de servidor com pequenas ilhas interativas, conforme [Next.js Server/Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components). A geometria usa unidades de viewport pequenas para manter o palco estável durante mudanças das barras do navegador, conforme [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length). Gestos nativos devem ser preservados conforme [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events).

## Contratos e orçamento

- Preservar `src/data/team.ts`, ordem Fernando → Eduardo → Victor, contatos comerciais literais, oferta e classificação dos projetos.
- Preservar bytes, MIME, dimensões, origem e hashes dos retratos; animar wrappers. Sem novos assets, rostos gerados, remoção de fundos ou vídeo de pessoas.
- Manter paleta, fontes locais/licenças e toda a stack. Sem dependências novas e sem importar Three/canvas no celular.
- A neutralização das molduras mobile descrita em 20–21/10 passa a ser **histórico a substituir na implementação autorizada**. O pedido atual autoriza planejar essa alteração; esta proposta não muda o código vigente.
- Entradas finitas iniciadas por visibilidade; animações ligadas à rolagem não ficam tocando sozinhas. Sem loop decorativo permanente, blur grande ou máscara de tela inteira recalculada a cada frame.
- Um autor de transform por nó; usar wrappers separados para scroll e entrada. `will-change` somente perto da cena ativa e removido ao sair.
- Aba oculta cancela entradas/springs; retorno recompõe o estado do scroll atual. Foco ou `pointerdown` estabiliza o ancestral de controles imediatamente.

## Prova de entrega

Para cada cena, registrar repouso e ao menos três frames intermediários, além de vídeo da navegação mobile completa. Estados finais sozinhos não demonstram a intensidade solicitada. Verificar rolagem normal e rápida, retorno, recarga intermediária, toque durante transição, orientação, preferência reduzida ao vivo e ausência de JS.

Matriz mínima: 320×568, 360×740, 390×844, 430×932, 768×1024, 844×390 e limites 767/768 e 1023/1024. Preservar regressões desktop. Exercitar Chromium e WebKit quando disponíveis; registrar separadamente aparelhos físicos e motores indisponíveis, sem descrevê-los como verificados. Não prometer FPS universal.

Aceite visual: durante uma passagem mobile completa, os sete momentos devem ser perceptíveis sem explicação; fotos/nomes legíveis nos repousos, controles estáveis, nenhum trecho que exija rolar um vazio para continuar. O usuário avalia a intensidade por vídeo e pela prévia local.
