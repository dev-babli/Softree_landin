const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "..", "src", "app", "framer.html"),
  "utf-8"
);

// Extract content between <section data-framer-name="X"> and its matching </section>
// We'll do a simple stack-based extraction for the 9 top-level sections
const sections = {};

const sectionStartRe = /<section\s+class="framer-[^"]+"\s+data-framer-name="([^"]+)"/g;
let m;
while ((m = sectionStartRe.exec(html)) !== null) {
  const name = m[1];
  const startIdx = m.index;
  let depth = 1;
  let i = startIdx + m[0].length;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<section", i);
    const nextClose = html.indexOf("</section>", i);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 8;
    } else {
      depth--;
      if (depth === 0) {
        const sectionHtml = html.slice(startIdx, nextClose + 10);
        sections[name] = sectionHtml.slice(0, 5000);
        break;
      }
      i = nextClose + 10;
    }
  }
}

fs.writeFileSync(
  path.join(__dirname, "framer-sections.json"),
  JSON.stringify(sections, null, 2)
);
console.log("Extracted sections:", Object.keys(sections));
