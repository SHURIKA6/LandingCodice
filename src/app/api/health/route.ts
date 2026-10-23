import { apiJson, jsonError, methodNotAllowed } from '../../../lib/api-errors';
import { checkRateLimit } from '../../../lib/rate-limit';

export function GET(request?: Request): Response {
  const resolvedRequest = request ?? new Request('http://localhost:4321/api/health');
  const rateLimit = checkRateLimit(resolvedRequest);
  if (!rateLimit.allowed) {
    return jsonError(429, 'rate_limit_exceeded', 'Too many requests.', 'Retry after the number of seconds in the Retry-After header.', rateLimit.headers);
  }
  const format = new URL(resolvedRequest.url).searchParams.get('format');
  if (format !== null && format !== 'json') {
    return jsonError(400, 'unsupported_format', `Query parameter format must be "json", received "${format}".`, 'Omit the format parameter or send format=json.', rateLimit.headers);
  }
  return apiJson({
    status: 'ok',
    service: 'Codice',
    version: '0.1.0',
    time: new Date().toISOString(),
  }, 200, rateLimit.headers);
}

function methodNotAllowedResponse(request?: Request): Response {
  const resolvedRequest = request ?? new Request('http://localhost:4321/api/health');
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
