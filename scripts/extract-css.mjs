import fs from 'fs';

const html = fs.readFileSync('d:/Softree_Projects/SOFTREE/src/app/fizens/fizens.html', 'utf8');
const classes = process.argv.slice(2);

for (const cls of classes) {
  // Find rule like: .framer-lv5cj .framer-XYZ {
  const re = new RegExp(`\\.framer-[A-Za-z0-9]+(?:\\s+\\.framer-[A-Za-z0-9]+)*\\s+\\.framer-${cls}[^{]*\\{[^}]*\\}|\\.framer-${cls}\\s*\\{[^}]*\\}`, 'g');
  const matches = html.match(re);
  if (matches) {
    console.log(`/* ── .framer-${cls} ── */`);
    matches.forEach(m => console.log(m.replace(/\.framer-lv5cj\s+/g, '')));
    console.log();
  } else {
    console.log(`/* ── .framer-${cls}: NOT FOUND ── */\n`);
  }
}
