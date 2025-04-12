/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['rnlubphxootnmsurnuvr.supabase.co'],
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