const siteUrl = process.env.SITE_URL || 'https://landing-codice.vercel.app';

export function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  return /(^|,|\s)text\/markdown(\s*;|$)/i.test(accept);
}

export function homeMarkdown(): string {
  return `# Codice — Estúdio de web design em Sinop

Codice is a web studio in Sinop, Mato Grosso, Brazil, that builds professional one-page websites for local businesses.
Fernando Riad, Eduardo Gobatto, Victor Rafael and Jose Vitor help businesses present their services, show their work
and make contact with clients easier.

## When to use this

Use Codice when a local business needs a professional one-page website to present services, portfolio and contact
information, with a defined scope, deadline and publication on the client's own domain and hosting accounts.
Codice is a good fit for service businesses, professionals and small companies that want a clear, custom presentation
instead of a generic template. Do not use Codice for e-commerce, multi-page systems or applications; those are quoted
separately.

## Services

- One-page website with up to six sections.
- Custom presentation, organized copy and real business photos.
- Publication on the client's domain and hosting accounts.
- Separate quotes for systems and automations.

## Contact

- WhatsApp Fernando Riad: +55 (66) 99935-6646 — https://wa.me/5566999356646
- WhatsApp Eduardo Gobatto: +55 (66) 8418-4488 — https://wa.me/556684184488
- Location: Sinop, Mato Grosso, Brazil.

## Resources

- About: ${siteUrl}/about
- Contact: ${siteUrl}/contact
- Privacy: ${siteUrl}/privacy
- Documentation: ${siteUrl}/docs
- Sitemap: ${siteUrl}/sitemap.xml
- Agent guide: ${siteUrl}/llms.txt
- MCP server: ${siteUrl}/.well-known/mcp
- OpenAPI specification: ${siteUrl}/openapi.json
- API index: ${siteUrl}/api
- Developers: ${siteUrl}/developers

## Projects

- Corretor: real estate catalog and management system (https://corretor-web-eta.vercel.app/).
- Roger Estética Automotiva: demonstrative portfolio project, no commercial result claims.
`;
}

export function notFoundMarkdown(pathname: string): string {
  return `# Page not found

The path \`${pathname}\` does not exist on the Codice website.

Return to the homepage: ${siteUrl}/

See the sitemap for all available pages: ${siteUrl}/sitemap.xml
See the agent guide: ${siteUrl}/llms.txt
`;
}

export function pageMarkdown(pathname: string): string {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (clean === '/about') return `# About Codice\n\nCodice is a web studio in Sinop, Mato Grosso, Brazil. Team: Fernando Riad, Eduardo Gobatto, Victor Rafael and Jose Vitor.\n\nHomepage: ${siteUrl}/\n`;
  if (clean === '/contact') return `# Contact Codice\n\nWhatsApp Fernando: https://wa.me/5566999356646\nWhatsApp Eduardo: https://wa.me/556684184488\nLocation: Sinop, Mato Grosso, Brazil.\n`;
  if (clean === '/privacy') return `# Privacy — Codice\n\nCodice collects only information you send voluntarily when contacting the team and uses it only for service and proposals.\n`;
  if (clean === '/docs') return `# Documentation — Codice\n\nResources: ${siteUrl}/llms.txt, ${siteUrl}/sitemap.xml, ${siteUrl}/.well-known/mcp, ${siteUrl}/openapi.json, ${siteUrl}/api, ${siteUrl}/developers.\n`;
  if (clean === '/developers') {
    return `# Developers — Codice

Public, read-only API without authentication.

- Documentation: ${siteUrl}/docs
- OpenAPI specification: ${siteUrl}/openapi.json
- API index: ${siteUrl}/api
- API health: ${siteUrl}/api/health
- Public contacts: ${siteUrl}/api/contacts
- MCP server: ${siteUrl}/.well-known/mcp
`;
  }
  return notFoundMarkdown(pathname);
}