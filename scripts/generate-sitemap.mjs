// scripts/generate-sitemap.mjs
import { writeFileSync } from 'fs'

const BASE = 'https://raulast.github.io'
const locales = ['en', 'es']
const date = new Date().toISOString().split('T')[0]

const urlEntries = locales.map(locale => `
  <url>
    <loc>${BASE}/${locale}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}/en"/>
    <xhtml:link rel="alternate" hreflang="es" href="${BASE}/es"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/en"/>
  </url>`).join('')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlEntries}
</urlset>`

writeFileSync('dist/sitemap.xml', xml)
console.log('sitemap.xml generated')
