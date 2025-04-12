import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // Fetch all blog posts
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true)

    // Start XML string
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Add static routes
    const staticRoutes = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: 'about', priority: '0.8', changefreq: 'monthly' },
      { url: 'instructors', priority: '0.9', changefreq: 'daily' },
      { url: 'blog', priority: '0.8', changefreq: 'weekly' },
      { url: 'dance-business-consulting', priority: '0.7', changefreq: 'monthly' },
      { url: 'dance-certifications', priority: '0.7', changefreq: 'monthly' },
      { url: 'contact', priority: '0.6', changefreq: 'monthly' },
    ]

    // Add static pages
    staticRoutes.forEach(route => {
      xml += `  <url>\n`
      xml += `    <loc>https://www.joinstudioe.com/${route.url}</loc>\n`
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`
      xml += `    <priority>${route.priority}</priority>\n`
      xml += `  </url>\n`
    })

    // Add blog posts
    if (posts) {
      posts.forEach(post => {
        xml += `  <url>\n`
        xml += `    <loc>https://www.joinstudioe.com/blog/${post.slug}</loc>\n`
        xml += `    <lastmod>${new Date(post.updated_at || Date.now()).toISOString()}</lastmod>\n`
        xml += `    <changefreq>monthly</changefreq>\n`
        xml += `    <priority>0.6</priority>\n`
        xml += `  </url>\n`
      })
    }

    xml += '</urlset>'

    // Return the XML with appropriate headers
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
} 