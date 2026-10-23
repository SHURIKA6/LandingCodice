import { apiJson, methodNotAllowed } from '../../lib/api-errors';

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

export function GET(): Response {
  return apiJson(API_INDEX);
}

function methodNotAllowedResponse(): Response {
  return methodNotAllowed(['GET']);
}

export const POST = methodNotAllowedResponse;
export const PUT = methodNotAllowedResponse;
export const PATCH = methodNotAllowedResponse;
export const DELETE = methodNotAllowedResponse;
