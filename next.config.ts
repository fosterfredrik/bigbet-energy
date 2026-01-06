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
      {
        source: '/post/searle-cant-see-the-board',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;