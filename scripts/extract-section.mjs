import fs from 'fs';

const args = process.argv.slice(2);
const startName = args[0] || 'Features Section';
const endName = args[1] || 'Addition Section';

const html = fs.readFileSync('d:/Softree_Projects/SOFTREE/src/app/fizens/fizens.html', 'utf8');
const start = html.indexOf(startName);
const end = html.indexOf(endName);
if (start === -1 || end === -1) {
  console.error('Section not found');
  process.exit(1);
}
const section = html.substring(start, end);

const labels = [...section.matchAll(/data-framer-name="([^"]+)"/g)].map(m => m[1]);
const texts = [...section.matchAll(/<p[^>]*class="framer-text[^"]*"[^>]*>([^<]{5,250})<\/p>/g)].map(m => m[1].trim().replace(/\s+/g, ' '));
const heads = [...section.matchAll(/<h[1-6][^>]*class="framer-text[^"]*"[^>]*>([^<]{5,250})<\/h[1-6]>/g)].map(m => m[1].trim().replace(/\s+/g, ' '));
const imgs = [...section.matchAll(/src="(https:\/\/framerusercontent[^"]+\.(?:png|jpg|svg))[^"]*"/g)].map(m => m[1]);
const classes = [...section.matchAll(/class="framer-([a-z0-9]+)[^"]*"/g)].map(m => m[1]);

console.log('=== LABELS (unique) ===');
console.log([...new Set(labels)].join('\n'));
console.log('\n=== HEADINGS ===');
console.log([...new Set(heads)].join('\n'));
console.log('\n=== TEXTS ===');
console.log([...new Set(texts)].join('\n'));
console.log('\n=== IMAGES (unique) ===');
console.log([...new Set(imgs)].join('\n'));
console.log('\n=== KEY CLASSES (top 30) ===');
const counts = {};
classes.forEach(c => counts[c] = (counts[c]||0)+1);
console.log(Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,30).map(([c,n])=>`${c}:${n}`).join(', '));
console.log('\n=== SIZE ===');
console.log(section.length, 'chars,', section.split('\n').length, 'lines');
