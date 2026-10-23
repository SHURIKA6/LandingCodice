export interface ApiErrorBody {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly code: string;
  readonly message: string;
  readonly detail: string;
  readonly resolution: string;
}

const API_ERROR_TYPE_URL = 'https://landing-codice.vercel.app/docs#errors';

const jsonResponseHeaders: HeadersInit = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};

function mergeHeaders(extra?: HeadersInit): HeadersInit {
  if (!extra) return jsonResponseHeaders;
  return { ...jsonResponseHeaders, ...extra };
}

export function jsonError(
  status: number,
  code: string,
  message: string,
  resolution: string,
  headers?: HeadersInit,
): Response {
  const body: ApiErrorBody = {
    type: API_ERROR_TYPE_URL,
    title: message,
    status,
    code,
    message,
    detail: message,
    resolution,
  };
  return Response.json(body, { status, headers: mergeHeaders(headers) });
}

export function apiJson(data: unknown, status = 200, headers?: HeadersInit): Response {
  return Response.json(data, { status, headers: mergeHeaders(headers) });
}

export function methodNotAllowed(allowed: readonly string[], headers?: HeadersInit): Response {
  return jsonError(
    405,
    'method_not_allowed',
    `This endpoint accepts ${allowed.join(', ')} only.`,
    `Retry the request with one of the allowed methods: ${allowed.join(', ')}.`,
    headers,
  );
}
