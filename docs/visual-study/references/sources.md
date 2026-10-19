# Capturas reais de referência — 17/10/2026

> **Atualização de contexto comercial — 18/10/2026.** Os arquivos, datas, URLs e observações técnicas abaixo são preservados como provenance das capturas feitas em 17/10; não representam nova consulta dos endereços. Corretor é trabalho efetivamente desenvolvido, sem resultados comerciais comprovados neste acervo. Roger é um projeto demonstrativo desenvolvido para um prospect que desistiu, sem contrato; a captura real da interface não o torna cliente contratado nem case de resultado. A comparação visual vigente está em [../../study-2026-10-18/README.md](../../study-2026-10-18/README.md).

Estas imagens são capturas diretas das interfaces públicas existentes, obtidas com Chromium por `agent-browser`, sem navegador visível na imagem, sem recriar a interface e sem alterar o CSS dos projetos. A sessão era isolada, sem login. Nenhuma área administrativa foi aberta e nenhum formulário foi enviado. Não houve uso de imagens geradas, fixtures locais nem alteração dos projetos de origem.

## Fontes verificadas

- [README atual de Corretor-web](https://github.com/Edu4rdo-Gobatto/Corretor-web#readme): a seção Publicação documenta `https://corretor-web-test.vercel.app` como ambiente de teste. O endereço `https://corretor-web-mu.vercel.app` ainda aparece no About do repositório, mas ao navegar nesta data retornou `404: NOT_FOUND / DEPLOYMENT_NOT_FOUND`. Esse erro não foi usado como imagem de case.
- [README atual de Roger Estética Automotiva](https://github.com/SHURIKA6/roger-estetica-automotiva#readme) e About: projeto e endereço público conferidos. O deploy em `https://roger-estetica-automotiva.vercel.app/` abriu normalmente.

## Arquivos

Todas as capturas de viewport têm **1440 × 900 px**. As capturas completas usam o mesmo viewport e a altura total da página indicada abaixo. As dimensões dos PNGs foram conferidas após salvar.

| Arquivo | URL realmente capturada | Dimensões | Estado |
| --- | --- | --- | --- |
| `corretor-public-desktop-1440x900.png` | https://corretor-web-test.vercel.app/ | 1440 × 900 | Home pública, topo, tema escuro, catálogo carregado, sem filtros; ambiente de teste público documentado. |
| `corretor-catalog-desktop-1440x900.png` | https://corretor-web-test.vercel.app/ | 1440 × 900 | Mesma home, scrollY = 550, primeira linha de imóveis; cabeçalho fixo preservado. |
| `corretor-public-full.png` | https://corretor-web-test.vercel.app/ | 1440 × 3225 | Página pública completa no estado carregado. |
| `roger-public-desktop-1440x900.png` | https://roger-estetica-automotiva.vercel.app/ | 1440 × 900 | Topo da landing publicada, hero e começo dos serviços. |
| `roger-services-desktop-1440x900.png` | https://roger-estetica-automotiva.vercel.app/ | 1440 × 900 | Landing publicada, scrollY = 400, título e sete serviços visíveis, cabeçalho fixo preservado. |
| `roger-public-full.png` | https://roger-estetica-automotiva.vercel.app/ | 1440 × 2325 | Landing pública completa no estado carregado. |

## Observações de fidelidade

- Corretor: título da página observado: “Imóveis para alugar e comprar em Juara-MT e região | Lucas Gobatto”. O catálogo exibiu 14 imóveis encontrados. O domínio `-test` não é apresentado aqui como produção oficial. A captura demonstra a interface pública real desse ambiente, sem validar a autenticidade comercial dos anúncios.
- Roger: título da página observado: “Estética Automotiva em Sinop | Roger”. O hero publicado contém um bloco branco com “Sua imagem aqui”; ele foi preservado. A captura de serviços oferece outro enquadramento real, sem substituir o bloco por uma fotografia inventada.
- Roger: os títulos parecem esmaecidos porque a cor publicada computada de `h1` e `h2` é `rgb(120, 120, 119)`, com `opacity: 1`. Foram conferidos após o carregamento das fontes; não havia animação de entrada nos títulos. A única animação CSS ativa observada foi `gallery-marquee`. Não houve correção de cores, contraste ou estilos para a captura.
- Roger: o próprio README informa que as fotografias de serviços e carrossel são ilustrativas, de stock, e não representam trabalhos realizados pela empresa. A captura mantém essa interface e não transforma essas fotos em evidência de serviços reais.
- Navegações foram aguardadas até `networkidle`; o estado das fontes foi conferido como `loaded`. Os recortes com scroll foram salvos após confirmar a posição final. As imagens foram inspecionadas visualmente.
- As referências servem ao estudo visual da Codice. A composição futura de um mockup com essas imagens continua sendo uma proposta visual, não uma nova captura do produto Codice implementado.
