import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { register, registerHooks } from 'node:module';
import test from 'node:test';

import { jsonError, methodNotAllowed } from '../src/lib/api-errors.ts';
import { handleMcp } from '../src/lib/mcp-handler.ts';

const NODE_ESM_TYPESCRIPT_RESOLVER = `
export function resolve(specifier, context, nextResolve) {
  const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
  const hasFileExtension = /\\.[^./]+$/.test(specifier);
  if (isRelative && !hasFileExtension) {
    try {
      return nextResolve(specifier + '.ts', context);
    } catch {}
  }
  return nextResolve(specifier, context);
}
`;

// Node ESM resolves relative import specifiers verbatim, but the route sources in
// src/app/ import sibling lib/data modules without the .ts extension. This resolver
// retries extensionless relative specifiers with .ts so the handlers stay testable
// without editing protected src/ files. Only modules imported after registration
// go through it, which is why the route modules below are imported dynamically.
if (typeof registerHooks === 'function') {
  const { resolve } = await import(`data:text/javascript,${encodeURIComponent(NODE_ESM_TYPESCRIPT_RESOLVER)}`);
  registerHooks({ resolve });
} else {
  // Legacy fallback (before the synchronous hook API): the same resolver source is
  // loaded by module.register on a dedicated hooks thread.
  register(`data:text/javascript,${encodeURIComponent(NODE_ESM_TYPESCRIPT_RESOLVER)}`, import.meta.url);
  await new Promise((continuation) => setImmediate(continuation));
}

const [
  { GET: getApiIndex },
  { GET: getHealth, POST: postHealth },
  { GET: getContacts, POST: postContacts },
  { GET: getUnknownApiPath, POST: postUnknownApiPath },
] = await Promise.all([
  import('../src/app/api/route.ts'),
  import('../src/app/api/health/route.ts'),
  import('../src/app/api/contacts/route.ts'),
  import('../src/app/api/[...slug]/route.ts'),
]);

const publicFileUrl = (relativePath) => new URL(`../public/${relativePath}`, import.meta.url);
const [openApiText, mcpManifestText, agentGuide] = await Promise.all([
  readFile(publicFileUrl('openapi.json'), 'utf8'),
  readFile(publicFileUrl('.well-known/mcp.json'), 'utf8'),
  readFile(publicFileUrl('llms.txt'), 'utf8'),
]);
const openApiSpec = JSON.parse(openApiText);
const mcpManifest = JSON.parse(mcpManifestText);
const baseUrl = 'https://landing-codice.vercel.app';
const requestAt = (path, init) => new Request(`${baseUrl}${path}`, init);
const operationMethods = ['get', 'post', 'put', 'patch', 'delete'];

const openApiOperations = Object.entries(openApiSpec.paths).flatMap(([apiPath, pathItem]) =>
  operationMethods
    .filter((method) => method in pathItem)
    .map((method) => ({ apiPath, method: method.toUpperCase(), operation: pathItem[method] })),
);

async function jsonBody(response) {
  assert.match(response.headers.get('content-type'), /application\/json/, 'expected a JSON response');
  return response.json();
}

test('openapi specification parses with the Codice title and OpenAPI 3.1.0', () => {
  assert.equal(openApiSpec.openapi, '3.1.0');
  assert.match(openApiSpec.info.title, /Codice/i);
  assert.ok(openApiSpec.info.version && openApiSpec.info.version.length > 0);
});

test('every openapi operation has a unique operationId and a description', () => {
  const operationIds = [];
  for (const { apiPath, method, operation } of openApiOperations) {
    assert.ok(typeof operation.operationId === 'string' && operation.operationId.length > 0, `${method} ${apiPath} operationId`);
    assert.ok(typeof operation.description === 'string' && operation.description.length > 0, `${method} ${apiPath} description`);
    operationIds.push(operation.operationId);
  }
  assert.ok(operationIds.length > 0, 'the specification declares operations');
  assert.equal(new Set(operationIds).size, operationIds.length, 'operationIds must be unique');
});

test('every GET operation declares a JSON schema for its 200 response', () => {
  for (const { apiPath, method, operation } of openApiOperations) {
    if (method !== 'GET') continue;
    const schema = operation.responses?.['200']?.content?.['application/json']?.schema;
    assert.ok(
      typeof schema === 'object' && schema !== null && ('$ref' in schema || typeof schema.type === 'string'),
      `${method} ${apiPath} 200 response schema`,
    );
  }
});

test('every 400, 404 and 405 response references the ErrorResponse schema', () => {
  const errorStatuses = ['400', '404', '405'];
  for (const { apiPath, method, operation } of openApiOperations) {
    for (const status of Object.keys(operation.responses)) {
      if (!errorStatuses.includes(status)) continue;
      const schema = operation.responses[status]?.content?.['application/json']?.schema;
      assert.equal(
        schema?.$ref,
        '#/components/schemas/ErrorResponse',
        `${method} ${apiPath} ${status} response`,
      );
    }
  }
});

test('openapi paths cover the API index, health and contacts endpoints', () => {
  for (const expectedPath of ['/api', '/api/health', '/api/contacts']) {
    assert.ok(expectedPath in openApiSpec.paths, `missing path ${expectedPath}`);
  }
});

test('jsonError returns a JSON problem document with code and resolution hints', async () => {
  const errorScenarios = [
    { status: 400, code: 'unsupported_format' },
    { status: 404, code: 'resource_not_found' },
  ];
  for (const { status, code } of errorScenarios) {
    const response = jsonError(status, code, 'Something is wrong.', 'Fix it this way.');
    assert.equal(response.status, status);
    const body = await jsonBody(response);
    assert.equal(body.status, status);
    assert.equal(body.code, code);
    assert.ok(typeof body.type === 'string' && body.type.length > 0);
    assert.ok(typeof body.title === 'string' && body.title.length > 0);
    assert.ok(typeof body.message === 'string' && body.message.length > 0);
    assert.ok(typeof body.detail === 'string' && body.detail.length > 0);
    assert.ok(typeof body.resolution === 'string' && body.resolution.length > 0, 'resolution must be a nonempty string');
  }
});

test('methodNotAllowed returns 405 JSON with the method_not_allowed code', async () => {
  const response = methodNotAllowed(['GET']);
  assert.equal(response.status, 405);
  assert.match(response.headers.get('content-type'), /application\/json/);
  const body = await jsonBody(response);
  assert.equal(body.code, 'method_not_allowed');
  assert.ok(body.resolution.includes('GET'));
});

test('API index returns the openapi pointer and the public endpoints', async () => {
  const response = getApiIndex();
  assert.equal(response.status, 200);
  const body = await jsonBody(response);
  assert.equal(body.openapi, '/openapi.json');
  assert.ok(Array.isArray(body.endpoints));
  const endpointPaths = body.endpoints.map((endpoint) => endpoint.path);
  for (const expectedPath of ['/api/health', '/api/contacts']) {
    assert.ok(endpointPaths.includes(expectedPath), `index must advertise ${expectedPath}`);
  }
});

test('every path advertised by the API index exists in the openapi specification', async () => {
  const body = await getApiIndex().json();
  for (const endpoint of body.endpoints) {
    assert.ok(endpoint.path in openApiSpec.paths, `${endpoint.path} is missing from the specification`);
  }
});

test('health endpoint reports ok status, service name, version and ISO time', async () => {
  const response = getHealth();
  assert.equal(response.status, 200);
  const body = await jsonBody(response);
  assert.equal(body.status, 'ok');
  assert.equal(body.service, 'Codice');
  assert.ok(body.version && body.version.length > 0);
  assert.ok(!Number.isNaN(Date.parse(body.time)), 'time must parse as a date');
});

test('health endpoint rejects POST with a JSON method-not-allowed error', async () => {
  const response = postHealth(requestAt('/api/health', { method: 'POST' }));
  assert.equal(response.status, 405);
  const body = await jsonBody(response);
  assert.equal(body.code, 'method_not_allowed');
});

test('contacts endpoint returns the four founders in the canonical order', async () => {
  const response = await getContacts(requestAt('/api/contacts'));
  assert.equal(response.status, 200);
  const body = await jsonBody(response);
  assert.equal(body.studio, 'Codice');
  assert.equal(body.contacts.length, 4);
  assert.deepEqual(
    body.contacts.map((contact) => contact.name),
    ['Fernando Riad', 'Eduardo Gobatto', 'Victor Rafael', 'Jose Vitor'],
  );
});

test('contacts endpoint preserves the commercial phone and WhatsApp numbers', async () => {
  const body = await (await getContacts(requestAt('/api/contacts'))).json();
  for (const contact of body.contacts) {
    assert.ok(contact.name && contact.name.length > 0, 'each contact has a name');
    assert.ok(contact.phone && contact.phone.length > 0, 'each contact has a phone');
    assert.match(contact.whatsapp, /^https:\/\/wa\.me\//, 'each contact has a WhatsApp link');
  }
  const fernando = body.contacts.find((contact) => contact.name === 'Fernando Riad');
  assert.equal(fernando.whatsapp, 'https://wa.me/5566999356646');
  assert.equal(fernando.phone, '+55 (66) 99935-6646');
  const eduardo = body.contacts.find((contact) => contact.name === 'Eduardo Gobatto');
  assert.equal(eduardo.whatsapp, 'https://wa.me/556684184488');
});

test('contacts endpoint exposes github profiles for the members that have one', async () => {
  const body = await (await getContacts(requestAt('/api/contacts'))).json();
  for (const contact of body.contacts) {
    assert.ok(contact.github && contact.github.startsWith('https://github.com/'), `${contact.name} has a GitHub profile`);
  }
});

test('contacts endpoint rejects unsupported formats with a JSON 400 and resolution', async () => {
  const response = await getContacts(requestAt('/api/contacts?format=xml'));
  assert.equal(response.status, 400);
  const body = await jsonBody(response);
  assert.equal(body.code, 'unsupported_format');
  assert.ok(typeof body.resolution === 'string' && body.resolution.length > 0);
});

test('contacts endpoint rejects POST with a JSON method-not-allowed error', async () => {
  const response = postContacts(requestAt('/api/contacts', { method: 'POST' }));
  assert.equal(response.status, 405);
  const body = await jsonBody(response);
  assert.equal(body.code, 'method_not_allowed');
});

test('unknown API paths return a JSON 404 that points to the index or specification', async () => {
  const response = await getUnknownApiPath(requestAt('/api/not-real'));
  assert.equal(response.status, 404);
  const body = await jsonBody(response);
  assert.equal(body.code, 'resource_not_found');
  assert.match(body.resolution, /\/(api\b|openapi\.json)/);
});

test('unknown API paths also answer POST with JSON instead of HTML', async () => {
  const response = await postUnknownApiPath(requestAt('/api/not-real', { method: 'POST' }));
  assert.equal(response.status, 404);
  await jsonBody(response);
  assert.doesNotMatch(response.headers.get('content-type'), /text\/html/);
});

test('MCP server advertises transport, manifest, specification and tools over GET', async () => {
  const response = await handleMcp(requestAt('/.well-known/mcp'));
  assert.equal(response.status, 200);
  const body = await jsonBody(response);
  assert.equal(body.transport, 'streamable-http');
  assert.equal(body.openapi, '/openapi.json');
  assert.equal(body.manifest, '/.well-known/mcp.json');
  assert.match(body.endpoint, /\/\.well-known\/mcp/);
  assert.ok(body.tools.includes('get_codice_contact'));
});

test('MCP manifest file describes the Codice MCP server', () => {
  assert.equal(mcpManifest.name, 'Codice');
  assert.equal(mcpManifest.transport, 'streamable-http');
  assert.match(mcpManifest.endpoint, /\/\.well-known\/mcp/);
  assert.equal(mcpManifest.tools[0].name, 'get_codice_contact');
  assert.ok(typeof mcpManifest.documentation === 'string' && mcpManifest.documentation.length > 0);
  assert.match(mcpManifest.documentation, /\/docs/);
  assert.ok(typeof mcpManifest.openapi === 'string' && mcpManifest.openapi.length > 0);
  assert.match(mcpManifest.openapi, /openapi\.json/);
});

test('llms.txt advertises the machine-readable developer surfaces', () => {
  assert.match(agentGuide, /openapi\.json/);
  assert.match(agentGuide, /\/api\b/);
  assert.match(agentGuide, /\.well-known\/mcp\.json/);
  assert.match(agentGuide, /\/developers/);
});
