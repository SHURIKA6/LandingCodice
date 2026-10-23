import type { NextConfig } from 'next';

// O Next bloqueia recursos internos do modo de desenvolvimento (HMR, fontes do overlay)
// quando a origem da requisição não está na lista. O servidor iniciado com --lan sobe
// em 0.0.0.0 e deixa de liberar o host inicial, o que impede a hidratação da página no
// celular e no 127.0.0.1 do próprio computador. Os endereços da rede local chegam pelo
// ambiente, montados por scripts/dev.mjs.
const allowedDevOrigins = [
  '127.0.0.1',
  '[::1]',
  ...(process.env.DEV_ALLOWED_ORIGINS ?? '').split(',').map(origin => origin.trim()).filter(Boolean),
];

const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  agentRules: false,
  allowedDevOrigins,
  async rewrites() {
    return [
      ...['', '/forma', '/fluxo', '/ritmo'].map(path => ({
        source: `/estudo${path}`,
        destination: `/estudo${path}/index.html`,
      })),
      { source: '/api/v1', destination: '/api' },
      { source: '/api/v1/:path*', destination: '/api/:path*' },
    ];
  },
  async headers() {
    return [{ source: '/estudo/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};
export default config;
