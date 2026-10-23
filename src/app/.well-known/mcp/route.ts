import { handleMcp } from '../../../lib/mcp-handler';
import { jsonError } from '../../../lib/api-errors';
import { checkRateLimit } from '../../../lib/rate-limit';

export const dynamic = 'force-dynamic';

async function withRateLimit(request: Request, handler: (request: Request) => Promise<Response>): Promise<Response> {
  const rateLimit = checkRateLimit(request);
  if (!rateLimit.allowed) {
    return jsonError(429, 'rate_limit_exceeded', 'Too many requests.', 'Retry after the number of seconds in the Retry-After header.', rateLimit.headers);
  }
  const response = await handler(request);
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(rateLimit.headers)) {
    headers.set(key, value);
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export async function GET(request: Request) {
  return withRateLimit(request, handleMcp);
}

export async function POST(request: Request) {
  return withRateLimit(request, handleMcp);
}

export async function OPTIONS(request: Request) {
  return withRateLimit(request, handleMcp);
}
