import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event).only(['_path', 'title']).find()

  const baseUrl = 'https://cli-tutorial.megaport.com'

  const urls = docs
    .filter(d => d._path && d._path !== '/')
    .map(d => `  <url><loc>${baseUrl}${d._path}</loc><changefreq>weekly</changefreq></url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${urls}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
