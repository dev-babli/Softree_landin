import fs from 'fs';

const html = fs.readFileSync('d:/Softree_Projects/SOFTREE/src/app/fizens/fizens.html', 'utf8');
let out = '';
const log = (...a) => { out += a.join(' ') + '\n'; };
const origLog = console.log;
console.log = log;

const sections = [
  ['Addition Section', 'Benefit Section'],
  ['Benefit Section', 'Statics Section'],
  ['Statics Section', 'How It Work Section'],
  ['How It Work Section', 'Pricing Section'],
  ['Pricing Section', 'Blog Section'],
  ['Blog Section', 'FAQ Section'],
  ['FAQ Section', 'Footer'],
];

for (const [start, end] of sections) {
  const sIdx = html.indexOf(`data-framer-name="${start}"`);
  let eIdx = html.indexOf(`data-framer-name="${end}"`);
  if (eIdx === -1) eIdx = html.indexOf('CTA Section');
  if (eIdx === -1) eIdx = html.indexOf('</main>');
  if (sIdx === -1 || eIdx === -1) {
    console.log(`### ${start} - NOT FOUND ###\n`);
    continue;
  }
  const section = html.substring(sIdx, eIdx);
  const labels = [...new Set([...section.matchAll(/data-framer-name="([^"]+)"/g)].map(m => m[1]))];
  const heads = [...new Set([...section.matchAll(/<h[1-6][^>]*class="framer-text[^"]*"[^>]*>([^<]{3,250})<\/h[1-6]>/g)].map(m => m[1].trim().replace(/\s+/g, ' ')))];
  const texts = [...new Set([...section.matchAll(/<p[^>]*class="framer-text[^"]*"[^>]*>([^<]{3,300})<\/p>/g)].map(m => m[1].trim().replace(/\s+/g, ' ')))];
  const imgs = [...new Set([...section.matchAll(/src="(https:\/\/framerusercontent[^"]+\.(?:png|jpg|svg))[^"]*"/g)].map(m => m[1]))];
  
  console.log(`### ${start} (${section.length} chars) ###`);
  console.log('LABELS:', labels.slice(0, 50).join(' | '));
  console.log('HEADS:', heads.join(' | '));
  console.log('TEXTS:', texts.slice(0, 30).join(' | '));
  console.log('IMGS:', imgs.length, 'images');
  imgs.slice(0, 20).forEach(i => console.log('  ', i));
  console.log();
}
fs.writeFileSync('d:/Softree_Projects/SOFTREE/.section-data.md', out, 'utf8');
origLog('Wrote', out.length, 'chars');
