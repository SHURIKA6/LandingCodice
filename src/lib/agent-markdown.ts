const siteUrl = process.env.SITE_URL || 'https://landing-codice.vercel.app';

export function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  return /(^|,|\s)text\/markdown(\s*;|$)/i.test(accept);
}

export function homeMarkdown(): string {
  return `# Codice — programação e web design em Mato Grosso

Codice is a programming and web design studio in Sinop, Mato Grosso, Brazil, serving the whole state: custom websites
and systems built by its devs and programmers, technology consulting, and maintenance of PCs, notebooks and networks.
Fernando Riad, Eduardo Gobatto, Victor Rafael and Jose Vitor help businesses present their services, organize their
work and make contact with clients easier.

## When to use this

Use Codice when a business anywhere in Mato Grosso needs programmers or devs for a professional website, a custom
system, technology consulting or maintenance of PCs, notebooks and network equipment. The packaged offer is a one-page
website with up to six sections, a defined scope and deadline, published on the client's own domain and hosting
accounts. Custom software, consulting and maintenance are quoted separately.

## Services

- Packaged offer: a one-page website with up to six sections, organized copy and real business photos.
- Custom websites and systems, quoted separately.
- Technology consulting, quoted separately.
- Maintenance and repair of PCs, notebooks and network equipment, quoted separately.
- Publication on the client's domain and hosting accounts.

## FAQ

- Programmers? Yes — devs and programmers in Sinop serving all of Mato Grosso.
- Service area? All of Mato Grosso, remotely via WhatsApp.
- Price and deadline? Quoted in the proposal; domain and hosting are paid separately.
- Computer repair? Yes — PCs, notebooks and networks, quoted separately.
- Full answers: ${siteUrl}/#faq and ${siteUrl}/llms-full.txt

## Contact

- WhatsApp Fernando Riad: +55 (66) 99935-6646 — https://wa.me/5566999356646
- WhatsApp Eduardo Gobatto: +55 (66) 8418-4488 — https://wa.me/556684184488
- Base: Sinop, Mato Grosso, Brazil — serving all of Mato Grosso.

## Resources

- About: ${siteUrl}/about
- Contact: ${siteUrl}/contact
- Privacy: ${siteUrl}/privacy
- Documentation: ${siteUrl}/docs
- Sitemap: ${siteUrl}/sitemap.xml
- Agent guide: ${siteUrl}/llms.txt
- Full agent guide: ${siteUrl}/llms-full.txt
- MCP server: ${siteUrl}/.well-known/mcp
- OpenAPI specification: ${siteUrl}/openapi.json
- API index: ${siteUrl}/api
- Developers: ${siteUrl}/developers

## Projects

- Corretor: real estate website and system with a property catalog and a management area.
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
  if (clean === '/about') return `# About Codice\n\nCodice is a programming and web design studio in Sinop, Mato Grosso, Brazil, serving the whole state: custom websites and systems by its devs and programmers, consulting, and maintenance of PCs, notebooks and networks. The packaged offer is a one-page website; custom software, consulting and maintenance are quoted separately. Team: Fernando Riad, Eduardo Gobatto, Victor Rafael and Jose Vitor.\n\nHomepage: ${siteUrl}/\n`;
  if (clean === '/contact') return `# Contact Codice\n\nWhatsApp Fernando: https://wa.me/5566999356646\nWhatsApp Eduardo: https://wa.me/556684184488\nBase: Sinop, Mato Grosso — serving all of Mato Grosso.\n`;
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