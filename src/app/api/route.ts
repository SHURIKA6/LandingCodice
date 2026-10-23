import { apiJson, jsonError, methodNotAllowed } from '../../lib/api-errors';
import { checkRateLimit } from '../../lib/rate-limit';

const API_INDEX = {
  name: 'Codice',
  description: 'Public API of Codice, a web studio in Sinop, Mato Grosso, Brazil. Read-only and authentication-free.',
  version: '1.0.0',
  documentation: '/docs',
  openapi: '/openapi.json',
  endpoints: [
    { path: '/api', methods: ['GET'], description: 'Index of the public API.' },
    { path: '/api/health', methods: ['GET'], description: 'Health status and server version.' },
    { path: '/api/contacts', methods: ['GET'], description: 'Public team contact information.' },
  ],
};

export function GET(request?: Request): Response {
  const resolvedRequest = request ?? new Request('http://localhost:4321/api');
  const rateLimit = checkRateLimit(resolvedRequest);
  if (!rateLimit.allowed) {
    return jsonError(429, 'rate_limit_exceeded', 'Too many requests.', 'Retry after the number of seconds in the Retry-After header.', rateLimit.headers);
  }
  const format = new URL(resolvedRequest.url).searchParams.get('format');
  if (format !== null && format !== 'json') {
    return jsonError(400, 'unsupported_format', `Query parameter format must be "json", received "${format}".`, 'Omit the format parameter or send format=json.', rateLimit.headers);
  }
  return apiJson(API_INDEX, 200, rateLimit.headers);
}

function methodNotAllowedResponse(request?: Request): Response {
  const resolvedRequest = request ?? new Request('http://localhost:4321/api');
  const rateLimit = checkRateLimit(resolvedRequest);
  if (!rateLimit.allowed) {
    return jsonError(429, 'rate_limit_exceeded', 'Too many requests.', 'Retry after the number of seconds in the Retry-After header.', rateLimit.headers);
  }
  return methodNotAllowed(['GET'], rateLimit.headers);
}

export const POST = methodNotAllowedResponse;
export const PUT = methodNotAllowedResponse;
export const PATCH = methodNotAllowedResponse;
export const DELETE = methodNotAllowedResponse;
