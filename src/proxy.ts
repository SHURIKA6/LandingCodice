import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { homeMarkdown, notFoundMarkdown, pageMarkdown, wantsMarkdown } from './lib/agent-markdown';

const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept',
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accept = request.headers.get('accept');

  const isAsset = pathname.startsWith('/_next') || /\.[a-z0-9]+$/i.test(pathname);

  if (!wantsMarkdown(accept) || isAsset) {
    const response = NextResponse.next();
    const existingVary = response.headers.get('Vary') ?? '';
    if (!/(^|,)\s*Accept\s*(,|$)/i.test(existingVary)) {
      response.headers.append('Vary', 'Accept');
    }
    return response;
  }

  if (pathname === '/') {
    return new NextResponse(homeMarkdown(), { status: 200, headers: MARKDOWN_HEADERS });
  }

  const known = ['/about', '/contact', '/privacy', '/docs', '/developers'];
  if (known.includes(pathname.replace(/\/$/, '') || '/')) {
    return new NextResponse(pageMarkdown(pathname), { status: 200, headers: MARKDOWN_HEADERS });
  }

  return new NextResponse(notFoundMarkdown(pathname), { status: 404, headers: MARKDOWN_HEADERS });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
