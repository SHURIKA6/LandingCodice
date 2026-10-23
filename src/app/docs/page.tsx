import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentação e recursos para desenvolvedores — Codice',
  description: 'Recursos técnicos da Codice: informações de contato, manifest MCP, sitemap e guia para agentes.',
};

export default function DocsPage() {
  return (
    <main id="conteudo" className="section-shell">
      <h1>Documentação e recursos para desenvolvedores</h1>
      <p>
        A Codice é um estúdio de sites profissionais em Sinop. Esta página reúne os recursos técnicos e os
        documentos legíveis por agentes e desenvolvedores.
      </p>
      <ul>
        <li><a href="/llms.txt">llms.txt — guia para agentes e modelos de linguagem</a></li>
        <li><a href="/sitemap.xml">sitemap.xml — lista de URLs indexáveis</a></li>
        <li><a href="/robots.txt">robots.txt — regras de rastreamento</a></li>
        <li><a href="/.well-known/mcp">MCP server — handshake JSON-RPC e informações de contato</a></li>
        <li><a href="/about">Sobre a Codice</a></li>
        <li><a href="/contact">Contato</a></li>
        <li><a href="/privacy">Privacidade</a></li>
      </ul>
      <p>
        Não há API pública nem SDK neste momento. Para integrar ou solicitar acesso, fale com a equipe pela página
        de contato. O manifest MCP expõe a ferramenta get_codice_contact com os contatos públicos da equipe.
      </p>
    </main>
  );
}