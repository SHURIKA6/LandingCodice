import { siteContent } from '../../../data/site';
import { apiJson, jsonError, methodNotAllowed } from '../../../lib/api-errors';

function contactsPayload() {
  return {
    studio: 'Codice',
    location: 'Sinop, Mato Grosso, Brazil',
    contacts: siteContent.founders.map(founder => ({
      name: founder.name,
      phone: founder.phoneLabel,
      whatsapp: `https://wa.me/${founder.whatsappNumber}`,
      ...(founder.githubHref ? { github: founder.githubHref } : {}),
    })),
  };
}

export async function GET(request: Request): Promise<Response> {
  const format = new URL(request.url).searchParams.get('format');
  if (format !== null && format !== 'json') {
    return jsonError(
      400,
      'unsupported_format',
      `Query parameter format must be "json", received "${format}".`,
      'Omit the format parameter or send format=json.',
    );
  }
  return apiJson(contactsPayload());
}

function methodNotAllowedResponse(): Response {
  return methodNotAllowed(['GET']);
}

export const POST = methodNotAllowedResponse;
export const PUT = methodNotAllowedResponse;
export const PATCH = methodNotAllowedResponse;
export const DELETE = methodNotAllowedResponse;
