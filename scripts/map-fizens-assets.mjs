// Map every Framer image to the section/heading it lives near.
// Output a JSON that tells us which URL to use in each section.
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync('src/app/fizens/fizens.html', 'utf8')

// Find all <img> with framerusercontent src OR data-framer-background-image src
const imgRe = /<img[^>]*(?:src|srcSet|srcset)="([^"]*framerusercontent\.com[^"]+)"[^>]*>/gi
const bgRe = /data-framer-background-image-wrapper="true"[\s\S]{0,500}?src="([^"]+)"/g
const hrefRe = /src="(https:\/\/framerusercontent\.com\/images\/[^"]+)"/g

function findNearest(str, idx, pattern, before = true) {
  if (before) {
    const slice = str.slice(Math.max(0, idx - 15000), idx)
    let m, last = null
    while ((m = pattern.exec(slice))) last = m
    return last
  } else {
    pattern.lastIndex = idx
    return pattern.exec(str)
  }
}

function findSectionName(str, idx) {
  // walk backwards looking for the closest section with a data-framer-name="...Section..."
  const before = str.slice(Math.max(0, idx - 60000), idx)
  const matches = [...before.matchAll(/data-framer-name="([^"]+Section[^"]*)"/g)]
  if (matches.length === 0) {
    // fallback: any data-framer-name
    const fm = [...before.matchAll(/data-framer-name="([^"]+)"/g)]
    return fm.length ? fm[fm.length - 1][1] : null
  }
  return matches[matches.length - 1][1]
}

function findNearestHeading(str, idx) {
  const before = str.slice(Math.max(0, idx - 30000), idx)
  // find the closest h1/h2/h3/h4/h5/h6 with framer-text class
  const matches = [...before.matchAll(/<(h[1-6])[^>]*class="[^"]*framer-text[^"]*"[^>]*>([^<]+)<\/\1>/g)]
  if (matches.length === 0) return null
  return matches[matches.length - 1][2].replace(/\s+/g, ' ').trim()
}

const all = []
const seenSrc = new Set()
let m
while ((m = hrefRe.exec(html))) {
  const src = m[1]
  if (seenSrc.has(src)) continue
  seenSrc.add(src)
  const idx = m.index
  const section = findSectionName(html, idx)
  const heading = findNearestHeading(html, idx)
  all.push({ src, idx, section, heading })
}

// Group by section + nearest heading
const grouped = {}
for (const a of all) {
  const key = `${a.section} | ${a.heading ?? '?'}`
  if (!grouped[key]) grouped[key] = []
  grouped[key].push(a.src)
}

writeFileSync('scripts/fizens-assets-map.json', JSON.stringify(grouped, null, 2))
console.log('total images:', all.length)
console.log('groups:', Object.keys(grouped).length)
console.log('→ scripts/fizens-assets-map.json')
