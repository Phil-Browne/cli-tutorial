import { serverQueryContent } from '#content/server'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=86400')

  try {
    const docs = await serverQueryContent(event).only(['_path', 'title']).find()

    const rawBaseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://tutorials.megaport.com/cli'
    const baseUrl = escapeXml(rawBaseUrl.replace(/\/+$/, ''))
    const lastmod = new Date().toISOString().split('T')[0]

    const urls = docs
      // Drop the root and underscore-prefixed paths (_dir.yml section configs, partials)
      .filter(d => d._path && d._path !== '/' && !d._path.includes('/_'))
      .map(d => `  <url><loc>${baseUrl}${escapeXml(d._path!)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq></url>`)
      .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
${urls}
</urlset>`
  } catch (err) {
    console.error('sitemap generation failed:', err)
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`
  }
})
