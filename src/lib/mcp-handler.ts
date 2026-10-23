const CONTACTS = [
  { name: 'Fernando Riad', phone: '+55 (66) 99935-6646', whatsapp: 'https://wa.me/5566999356646', github: 'https://github.com/SHURIKA6' },
  { name: 'Eduardo Gobatto', phone: '+55 (66) 8418-4488', whatsapp: 'https://wa.me/556684184488', github: 'https://github.com/Edu4rdo-Gobatto' },
  { name: 'Victor Rafael', phone: '+55 (66) 9959-8519', whatsapp: 'https://wa.me/556699598519', github: 'https://github.com/vict0r-rafael' },
  { name: 'Jose Vitor', phone: '+55 (66) 8106-3600', whatsapp: 'https://wa.me/556681063600', github: 'https://github.com/JoseVitor-net' },
];

const TOOLS = [
  {
    name: 'get_codice_contact',
    description: 'Return public contact information for the Codice web studio in Sinop, Mato Grosso, Brazil.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
];

function jsonRpcError(id: unknown, code: number, message: string) {
  return { jsonrpc: '2.0', id: id ?? null, error: { code, message } };
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
  };
}

export async function handleMcp(request: Request): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...corsHeaders(),
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method === 'GET') {
    return Response.json(
      {
        name: 'Codice',
        version: '0.1.0',
        description: 'Web studio in Sinop, Mato Grosso, Brazil. Professional one-page websites for local businesses.',
        protocol: 'mcp',
        transport: 'streamable-http',
        endpoint: '/.well-known/mcp',
        documentation: '/docs',
        openapi: '/openapi.json',
        manifest: '/.well-known/mcp.json',
        tools: TOOLS.map(tool => tool.name),
      },
      { headers },
    );
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers });
  }

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return Response.json(jsonRpcError(null, -32700, 'Parse error'), { status: 400, headers });
  }

  const isArray = Array.isArray(parsed);
  const messages = isArray ? (parsed as unknown[]) : [parsed];
  const responses: unknown[] = [];

  for (const message of messages) {
    if (!message || typeof message !== 'object') {
      responses.push(jsonRpcError(null, -32600, 'Invalid Request'));
      continue;
    }
    const { id, method, params } = message as { id?: unknown; method?: unknown; params?: unknown };
    if (typeof method !== 'string') {
      responses.push(jsonRpcError(id, -32600, 'Invalid Request'));
      continue;
    }

    if (method === 'initialize') {
      responses.push({
        jsonrpc: '2.0',
        id: id ?? null,
        result: {
          protocolVersion: '2025-03-26',
          capabilities: { tools: {} },
          serverInfo: { name: 'Codice', version: '0.1.0' },
        },
      });
    } else if (method.startsWith('notifications/')) {
      // Notifications do not receive responses.
    } else if (method === 'ping') {
      responses.push({ jsonrpc: '2.0', id: id ?? null, result: {} });
    } else if (method === 'tools/list') {
      responses.push({ jsonrpc: '2.0', id: id ?? null, result: { tools: TOOLS } });
    } else if (method === 'tools/call') {
      const toolName = (params as { name?: string } | undefined)?.name;
      if (toolName === 'get_codice_contact') {
        responses.push({
          jsonrpc: '2.0',
          id: id ?? null,
          result: {
            content: [{ type: 'text', text: JSON.stringify({ studio: 'Codice', location: 'Sinop, Mato Grosso, Brazil', contacts: CONTACTS }) }],
          },
        });
      } else {
        responses.push(jsonRpcError(id, -32602, 'Unknown tool'));
      }
    } else {
      if (id !== undefined) responses.push(jsonRpcError(id, -32601, 'Method not found'));
    }
  }

  if (responses.length === 0) {
    return new Response(null, { status: 202, headers });
  }

  const body = isArray ? responses : responses[0];
  return Response.json(body, { headers });
}