const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "..", "src", "app", "landin", "landin.html"),
  "utf-8"
);

// 1. Extract CSS tokens from :root/body
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

// 4. Extract text blocks
const textRegex = /data-framer-component-type="RichTextContainer"[^>]*>([\s\S]*?)<\/div>/g;
const textBlocks = [];
let tm;
while ((tm = textRegex.exec(html)) !== null) {
  const inner = tm[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (inner.length > 2) textBlocks.push(inner);
}

// 5. Extract all data-framer-name values
const nameRegex = /data-framer-name="([^"]+)"/g;
const allNames = [...new Set([...html.matchAll(nameRegex)].map((m) => m[1]))];

// 6. Extract data-framer-appear-id values
const appearRegex = /data-framer-appear-id="([^"]+)"/g;
const appearIds = [...new Set([...html.matchAll(appearRegex)].map((m) => m[1]))];

// 7. Extract script blocks (animations)
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
const scripts = [];
let sm;
while ((sm = scriptRegex.exec(html)) !== null) {
  if (sm[1].includes("framer") || sm[1].includes("animate") || sm[1].includes("motion")) {
    scripts.push(sm[1].slice(0, 2000));
  }
}

// 8. Extract font links
const fontLinkRegex = /<link[^>]*fonts\.gstatic\.com[^>]*>/g;
const fontLinks = [...html.matchAll(fontLinkRegex)].map(m => m[0]);

// 9. Extract SVG defs
const svgRegex = /<svg[^>]*>([\s\S]*?)<\/svg>/g;
const svgs = [];
let svgm;
while ((svgm = svgRegex.exec(html)) !== null) {
  const idMatch = svgm[0].match(/id="([^"]+)"/);
  if (idMatch && svgm[0].length < 5000) {
    svgs.push({ id: idMatch[1], content: svgm[0].replace(/\n\s*/g, " ").slice(0, 500) });
  }
}

const output = {
  tokens,
  images: images.slice(0, 300),
  sectionNames,
  textBlocks: [...new Set(textBlocks)].slice(0, 100),
  allNames: allNames.slice(0, 400),
  appearIds: appearIds.slice(0, 200),
  scripts: scripts.slice(0, 20),
  fontLinks,
  svgs: svgs.slice(0, 50),
};

fs.writeFileSync(
  path.join(__dirname, "landin-extracted.json"),
  JSON.stringify(output, null, 2)
);
console.log("Done. Wrote landin-extracted.json");
console.log("Sections:", sectionNames.length);
console.log("Images:", images.length);
console.log("Tokens:", Object.keys(tokens).length);
console.log("Appear IDs:", appearIds.length);
console.log("Names:", allNames.length);
console.log("Scripts:", scripts.length);
