import { readFileSync } from 'node:fs'

const html = readFileSync('src/app/fizens/fizens.html', 'utf8')

// Extract all big text blocks (likely headings, stat numbers, etc.) by font-size in inline style
const re = /font-size:\s*(\d+(?:\.\d+)?)px[^"]*"[^>]*>([^<]+?)</g
const seen = new Set()
const out = []
let m
while ((m = re.exec(html))) {
  const size = parseFloat(m[1])
  if (size < 24 || size > 200) continue
  const text = m[2].replace(/\s+/g, ' ').trim()
  if (!text || text.length < 1 || text.length > 80) continue
  if (seen.has(text)) continue
  seen.add(text)
  out.push({ size, text })
}
console.log('=== big text blocks ===')
out.sort((a, b) => b.size - a.size).forEach((x) => console.log(`${x.size}px:`, x.text))

// Search for percentage/number patterns near "Statistics" section
const statRe = />(\d+(?:[.,]\d+)?)\s*([%KMB+]+|million|trillion)?</gi
console.log('\n=== numeric values found near data ===')
const stats = new Set()
let n
while ((n = statRe.exec(html))) {
  const t = n[0].slice(1, -1).trim()
  if (t.length < 1 || t.length > 12) continue
  if (/^[A-Za-z]+$/.test(t)) continue
  stats.add(t)
}
;[...stats].slice(0, 60).forEach((s) => console.log(' ', s))

// Find feature card titles (h6 with framer-text)
console.log('\n=== h6 titles ===')
const h6 = /<h6[^>]*class="[^"]*framer-text[^"]*"[^>]*>([^<]+)<\/h6>/g
const seenH = new Set()
while ((n = h6.exec(html))) {
  const t = n[1].replace(/\s+/g, ' ').trim()
  if (seenH.has(t)) continue
  seenH.add(t)
  console.log(' ', t)
}
