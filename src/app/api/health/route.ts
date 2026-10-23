import { apiJson, methodNotAllowed } from '../../../lib/api-errors';

export function GET(): Response {
  return apiJson({
    status: 'ok',
    service: 'Codice',
    version: '0.1.0',
    time: new Date().toISOString(),
  });
}

function methodNotAllowedResponse(): Response {
  return methodNotAllowed(['GET']);
}

export const POST = methodNotAllowedResponse;
export const PUT = methodNotAllowedResponse;
export const PATCH = methodNotAllowedResponse;
export const DELETE = methodNotAllowedResponse;
