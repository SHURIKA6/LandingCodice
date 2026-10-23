import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Codice Developers — API, OpenAPI e recursos para desenvolvedores',
  description: 'API pública da Codice: endpoints versionados, especificação OpenAPI, manifest MCP, CLI e recursos para agentes.',
  keywords: ['Codice', 'Codice developers', 'Codice API', 'OpenAPI', 'MCP server', 'CLI'],
  alternates: { canonical: '/developers' },
};

export default function DevelopersPage() {
  return (
    <main id="conteudo" className="section-shell">
      <h1>API e recursos para desenvolvedores da Codice</h1>
      <p>
        Os recursos abaixo são públicos e legíveis por máquina, criados para que agentes e integrações acessem
        informações do estúdio sem registro e sem autenticação.
      </p>
      <p>
        A API é versionada: use <code>/api/v1</code> para um caminho estável; <code>/api</code> é o alias da
        versão atual. Descontinuações são anunciadas com <code>Deprecation</code> e <code>Sunset</code>. Todos os
        endpoints retornam <code>RateLimit-Limit</code>, <code>RateLimit-Remaining</code>,
        <code>RateLimit-Reset</code> e, em 429, <code>Retry-After</code>.
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
