import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  agentRules: false,
  async rewrites() {
    return ['', '/forma', '/fluxo', '/ritmo'].map(path => ({
      source: `/estudo${path}`,
      destination: `/estudo${path}/index.html`,
    }));
  },
  async headers() {
    return [{ source: '/estudo/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};
export default config;
