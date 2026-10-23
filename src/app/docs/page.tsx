import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentação e recursos para desenvolvedores — Codice',
  description: 'Recursos técnicos da Codice: informações de contato, manifest MCP, sitemap e guia para agentes.',
  alternates: { canonical: '/docs' },
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
        <li><a href="/openapi.json">openapi.json — especificação OpenAPI da API pública</a></li>
        <li><a href="/api">api — índice de endpoints públicos</a></li>
        <li><a href="/api/health">api/health — estado do serviço</a></li>
        <li><a href="/api/contacts">api/contacts — contatos públicos do estúdio</a></li>
        <li><a href="/.well-known/mcp.json">.well-known/mcp.json — manifest MCP</a></li>
        <li><a href="/developers">developers — API e recursos para desenvolvedores</a></li>
        <li><a href="/about">Sobre a Codice</a></li>
        <li><a href="/contact">Contato</a></li>
        <li><a href="/privacy">Privacidade</a></li>
      </ul>
      <p>
        A API pública é somente leitura e não exige autenticação. /api/health retorna o estado do serviço e
        /api/contacts retorna os contatos públicos do estúdio. A especificação completa está em /openapi.json e o
        índice de endpoints em /api. O manifest MCP expõe a ferramenta get_codice_contact com os contatos
        públicos da equipe.
      </p>
    </main>
  );
}