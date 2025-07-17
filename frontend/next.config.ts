import type { NextConfig } from 'next';

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true /* Disable ESLint checks during production builds to improve build performance. */,
  },
  trailingSlash: false /* Do not append a trailing slash to URLs, maintaining consistency in routing. */,
  poweredByHeader: false /* Disable the "X-Powered-By: Next.js" header to prevent exposing framework details for security purposes. */,
  reactStrictMode: true /* Enable React's strict mode to highlight potential issues in the application during development. */,
  output:
    'standalone' /* Generate a standalone build which creates a self-contained output for easier deployment. */,
  skipTrailingSlashRedirect: true /* Skip automatic redirects from URLs with a trailing slash to those without one. */,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default config;
