const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "..", "src", "app", "landin", "landin.html");
const outDir = path.join(__dirname, "..", "public", "landin");

const html = fs.readFileSync(htmlPath, "utf-8");

// Extract styles from head
const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
const styles = styleMatches.map(s => {
  const inner = s.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  return inner ? inner[1] : "";
}).join("\n");

// Extract body innerHTML
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
const bodyHtml = bodyMatch ? bodyMatch[1] : "";

// Extract font links from head
const fontLinks = (html.match(/<link[^>]*fonts\.gstatic\.com[^>]*>/g) || []).join("\n");

// Write styles as a raw CSS file (NOT imported as module)
fs.writeFileSync(path.join(outDir, "styles.css"), styles);

// Write body HTML
fs.writeFileSync(path.join(outDir, "body-clean.html"), bodyHtml);

console.log("Extracted:", styles.length, "chars of CSS", bodyHtml.length, "chars of body HTML");
console.log("Font links:", fontLinks);
