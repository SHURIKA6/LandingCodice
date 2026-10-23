import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API e recursos para desenvolvedores — Codice',
  description: 'API pública da Codice: endpoints, especificação OpenAPI, manifest MCP e recursos para agentes.',
  alternates: { canonical: '/developers' },
};

export default function DevelopersPage() {
  return (
    <main id="conteudo" className="section-shell">
      <h1>API e recursos para desenvolvedores</h1>
      <p>
        Os recursos abaixo são públicos e legíveis por máquina, criados para que agentes e integrações acessem
        informações do estúdio sem registro e sem autenticação.
      </p>
      <ul>
        <li><a href="/docs">docs — documentação e recursos técnicos</a></li>
        <li><a href="/openapi.json">openapi.json — especificação OpenAPI da API</a></li>
        <li><a href="/api">api — índice da API pública</a></li>
        <li><a href="/api/health">api/health — estado do serviço</a></li>
        <li><a href="/api/contacts">api/contacts — contatos públicos do estúdio</a></li>
        <li><a href="/.well-known/mcp">.well-known/mcp — servidor MCP, handshake JSON-RPC</a></li>
        <li><a href="/.well-known/mcp.json">.well-known/mcp.json — manifest MCP</a></li>
        <li><a href="/llms.txt">llms.txt — guia para agentes</a></li>
        <li><a href="/sitemap.xml">sitemap.xml — lista de URLs indexáveis</a></li>
      </ul>
      <p>
        A API é somente leitura e não exige autenticação. /api/health informa o estado do serviço e /api/contacts
        retorna os contatos públicos do estúdio. A especificação completa está em /openapi.json e o índice de
        endpoints em /api.
      </p>
    </main>
  );
}
