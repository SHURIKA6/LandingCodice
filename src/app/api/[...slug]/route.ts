import { jsonError } from '../../../lib/api-errors';

function resourceNotFoundResponse(request: Request): Response {
  const { pathname } = new URL(request.url);
  return jsonError(
    404,
    'resource_not_found',
    `No API resource matches "${pathname}".`,
    'See /api for the endpoint index, /openapi.json for the full specification, or /docs for documentation.',
  );
}

export async function GET(request: Request): Promise<Response> {
  return resourceNotFoundResponse(request);
}

export const POST = resourceNotFoundResponse;
export const PUT = resourceNotFoundResponse;
export const PATCH = resourceNotFoundResponse;
export const DELETE = resourceNotFoundResponse;
