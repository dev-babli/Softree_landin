// Extract structured content from fizens.html for the clone build
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('src/app/fizens/fizens.html', 'utf8')

// All visible text inside framer-text spans / paragraphs / headings
function extractAllText() {
  const re = /<(p|span|h1|h2|h3|h4|h5|h6|a|li)[^>]*class="[^"]*framer-text[^"]*"[^>]*>([^<]+)<\/\1>/g
  const items = []
  const seen = new Set()
  let m
  while ((m = re.exec(html))) {
    const tag = m[1]
    const text = m[2].replace(/\s+/g, ' ').trim()
    if (text.length < 2) continue
    const key = tag + '|' + text
    if (seen.has(key)) continue
    seen.add(key)
    items.push({ tag, text })
  }
  return items
}

// Heading-like text (sized text in Framer is in heading components)
function extractHeadings() {
  // Framer uses big inline font-size in h2/h3
  const re = /font-size:\s*(\d+(?:\.\d+)?)px[^"]*"[^>]*>([^<]+)</g
  const big = []
  const seen = new Set()
  let m
  while ((m = re.exec(html))) {
    const size = parseFloat(m[1])
    const text = m[2].replace(/\s+/g, ' ').trim()
    if (size < 18) continue
    if (text.length < 3) continue
    if (seen.has(text)) continue
    seen.add(text)
    big.push({ size, text })
  }
  return big.sort((a, b) => b.size - a.size)
}

// Image URLs from Framer CDN
function extractImages() {
  const re = /https:\/\/framerusercontent\.com\/images\/[A-Za-z0-9]+\.[a-zA-Z0-9?=&%-]+/g
  const seen = new Set()
  for (const m of html.matchAll(re)) seen.add(m[0])
  return Array.from(seen)
}

// Section names
function extractSectionNames() {
  const re = /data-framer-name="([^"]+)"/g
  const counts = {}
  for (const m of html.matchAll(re)) {
    const n = m[1]
    counts[n] = (counts[n] || 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

// Anchor labels
function extractLinks() {
  const re = /<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g
  const seen = new Set()
  const out = []
  let m
  while ((m = re.exec(html))) {
    const href = m[1]
    const inner = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (inner.length < 1 || inner.length > 80) continue
    const key = href + '|' + inner
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ href, text: inner })
  }
  return out
}

// Pricing — find numbers near "$" or "/month"
function findPricingLines() {
  const re = />[^<>]*(\$\s?\d[\d,]*(?:\.\d+)?|\d+\s*\/\s*(?:month|year|mo|yr))[^<>]*</gi
  const seen = new Set()
  const out = []
  for (const m of html.matchAll(re)) {
    const t = m[0].slice(1, -1).replace(/\s+/g, ' ').trim()
    if (seen.has(t)) continue
    seen.add(t)
    out.push(t)
  }
  return out.slice(0, 30)
}

const result = {
  size_bytes: html.length,
  text_items: extractAllText(),
  headings_by_size: extractHeadings(),
  images: extractImages(),
  section_names: extractSectionNames(),
  links: extractLinks(),
  pricing_lines: findPricingLines(),
}

writeFileSync('scripts/fizens-content.json', JSON.stringify(result, null, 2))
console.log('text items:', result.text_items.length)
console.log('headings:', result.headings_by_size.length)
console.log('images:', result.images.length)
console.log('section names:', result.section_names.length)
console.log('links:', result.links.length)
console.log('written:', 'scripts/fizens-content.json')
