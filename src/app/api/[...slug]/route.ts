import { jsonError } from '../../../lib/api-errors';
import { checkRateLimit } from '../../../lib/rate-limit';

function resourceNotFoundResponse(request?: Request): Response {
  const resolvedRequest = request ?? new Request('http://localhost:4321/api/not-real');
  const rateLimit = checkRateLimit(resolvedRequest);
  if (!rateLimit.allowed) {
    return jsonError(429, 'rate_limit_exceeded', 'Too many requests.', 'Retry after the number of seconds in the Retry-After header.', rateLimit.headers);
  }
  const { pathname } = new URL(resolvedRequest.url);
  return jsonError(
    404,
    'resource_not_found',
    `No API resource matches "${pathname}".`,
    'See /api for the endpoint index, /openapi.json for the full specification, or /docs for documentation.',
    rateLimit.headers,
  );
}

export function GET(request?: Request): Response {
  return resourceNotFoundResponse(request);
}

export const POST = resourceNotFoundResponse;
export const PUT = resourceNotFoundResponse;
export const PATCH = resourceNotFoundResponse;
export const DELETE = resourceNotFoundResponse;
