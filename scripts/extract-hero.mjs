import fs from 'fs';

const html = fs.readFileSync('d:/Softree_Projects/SOFTREE/src/app/fizens/fizens.html', 'utf8');

// Find hero section
const start = html.indexOf('<section class="framer-1gplvv3" data-framer-name="Hero Section"');
const end = html.indexOf('</section>', html.indexOf('data-framer-name="Animation Trigger"')) + 10;
const heroHtml = html.substring(start, end);

fs.writeFileSync('d:/Softree_Projects/SOFTREE/public/fizens-html/hero-raw.html', heroHtml);
console.log('Hero HTML extracted:', heroHtml.length, 'chars');
