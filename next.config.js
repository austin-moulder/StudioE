/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['rnlubphxootnmsurnuvr.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development', // Use unoptimized in development for faster builds
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Ensure robots.txt and sitemap.xml are handled correctly
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

module.exports = nextConfig 