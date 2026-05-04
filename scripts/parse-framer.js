const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "..", "src", "app", "framer.html"),
  "utf-8"
);

// 1. Extract CSS tokens
const tokenMatches = [...html.matchAll(/var\(\s*(--token-[\w-]+)\s*,\s*([^)]+)\)/g)];
const tokens = {};
for (const m of tokenMatches) {
  const [_, name, val] = m;
  if (!tokens[name]) tokens[name] = val.trim();
}

// 2. Extract image URLs
const imgMatches = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'\s]+/g)];
const images = [...new Set(imgMatches.map((m) => m[0]))];

// 3. Extract sections by finding <section class="..." data-framer-name="...">
const sectionRegex = /<section[^>]*data-framer-name="([^"]+)"[^>]*>/g;
const sectionNames = [...new Set([...html.matchAll(sectionRegex)].map((m) => m[1]))];

// 4. Extract RichTextContainer text blocks per section context
const textRegex = /data-framer-component-type="RichTextContainer"[^>]*>([\s\S]*?)<\/div>/g;
const textBlocks = [];
let tm;
while ((tm = textRegex.exec(html)) !== null) {
  const inner = tm[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (inner.length > 2) textBlocks.push(inner);
}

// 5. Extract SVG defs
const svgRegex = /<svg[^>]*>([\s\S]*?)<\/svg>/g;
const svgs = [];
let sm;
while ((sm = svgRegex.exec(html)) !== null) {
  const idMatch = sm[0].match(/id="([^"]+)"/);
  if (idMatch && sm[0].length < 5000) {
    svgs.push({ id: idMatch[1], content: sm[0].replace(/\n\s*/g, " ").slice(0, 500) });
  }
}

// 6. Extract data-framer-name attributes for structural nodes
const nameRegex = /data-framer-name="([^"]+)"/g;
const allNames = [...new Set([...html.matchAll(nameRegex)].map((m) => m[1]))];

const output = {
  tokens,
  images: images.slice(0, 200),
  sectionNames,
  textBlocks: [...new Set(textBlocks)].slice(0, 100),
  svgs: svgs.slice(0, 30),
  allNames: allNames.slice(0, 300),
};

fs.writeFileSync(
  path.join(__dirname, "framer-extracted.json"),
  JSON.stringify(output, null, 2)
);
console.log("Done. Wrote framer-extracted.json");
console.log("Sections:", sectionNames.length);
console.log("Images:", images.length);
console.log("Tokens:", Object.keys(tokens).length);
