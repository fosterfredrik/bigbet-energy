import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Deleted posts
      {
        source: '/post/searle-cant-see-the-board',
        destination: '/',
        permanent: true,
      },
      // Migrated posts - old flat URLs to new date-based URLs
      {
        source: '/post/trump-third-term-2028',
        destination: '/2026/01/08/trump-third-term-2028',
        permanent: true,
      },
      {
        source: '/post/arsenal-champions-league-2026',
        destination: '/2026/01/08/arsenal-champions-league-2026',
        permanent: true,
      },
      // Catch-all for any other old post URLs (optional - sends to home)
      // {
      //   source: '/post/:slug',
      //   destination: '/',
      //   permanent: false,
      // },
    ]
  },
};

export default nextConfig;
