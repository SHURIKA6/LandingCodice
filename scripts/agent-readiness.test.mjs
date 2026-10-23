import assert from 'node:assert/strict';
import test from 'node:test';
import { homeMarkdown, notFoundMarkdown, pageMarkdown, wantsMarkdown } from '../src/lib/agent-markdown.ts';
import { handleMcp } from '../src/lib/mcp-handler.ts';

test('wantsMarkdown detects text/markdown accept header', () => {
  assert.equal(wantsMarkdown('text/markdown'), true);
  assert.equal(wantsMarkdown('text/html, text/markdown;q=0.9'), true);
  assert.equal(wantsMarkdown('text/html'), false);
  assert.equal(wantsMarkdown(null), false);
});

test('home markdown is nonempty and links to sitemap and llms.txt', () => {
  const markdown = homeMarkdown();
  assert.ok(markdown.length > 100);
  assert.match(markdown, /sitemap\.xml/);
  assert.match(markdown, /llms\.txt/);
  assert.match(markdown, /When to use this/);
});

test('not-found markdown has at least 20 chars and a documentation link', () => {
  const markdown = notFoundMarkdown('/nope');
  assert.ok(markdown.length >= 20);
  assert.match(markdown, /sitemap\.xml|llms\.txt|docs/);
});

test('page markdown covers trust and developer pages', () => {
  assert.match(pageMarkdown('/about'), /Codice/);
  assert.match(pageMarkdown('/contact'), /wa\.me/);
});

test('MCP handler answers initialize handshake', async () => {
  const request = new Request('https://example.com/.well-known/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'test', version: '1.0' } } }),
  });
  const response = await handleMcp(request);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.result.serverInfo.name, 'Codice');
  assert.ok(body.result.capabilities);
});

test('MCP handler lists tools and returns contact data', async () => {
  const listRequest = new Request('https://example.com/.well-known/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }),
  });
  const listResponse = await handleMcp(listRequest);
  const listBody = await listResponse.json();
  assert.ok(Array.isArray(listBody.result.tools));
  assert.ok(listBody.result.tools.some((tool) => tool.name === 'get_codice_contact'));

  const callRequest = new Request('https://example.com/.well-known/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'get_codice_contact', arguments: {} } }),
  });
  const callResponse = await handleMcp(callRequest);
  const callBody = await callResponse.json();
  assert.match(callBody.result.content[0].text, /Fernando Riad/);
});

test('home markdown advertises the OpenAPI, API and developer surfaces', () => {
  const markdown = homeMarkdown();
  assert.match(markdown, /openapi\.json/);
  assert.match(markdown, /\/api\b/);
  assert.match(markdown, /\/developers/);
});

test('markdown for /docs and /developers lists the machine-readable resources', () => {
  assert.match(pageMarkdown('/docs'), /openapi\.json/);
  assert.match(pageMarkdown('/docs'), /\.well-known\/mcp/);
  assert.match(pageMarkdown('/developers'), /openapi\.json/);
  assert.match(pageMarkdown('/developers'), /api\/health/);
});