import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const raw = fs.readFileSync(path.join(__dirname, "..", "src", "app", "framer.html"), "utf-8");

// Extract <style> blocks from head
const headStart = raw.indexOf("<head>") + 6;
const headEnd = raw.indexOf("</head>");
const head = raw.slice(headStart, headEnd);

// Extract style tags
const styles = [];
const styleRe = /<style[\s\S]*?<\/style>/gi;
let m;
while ((m = styleRe.exec(head)) !== null) {
  styles.push(m[0]);
}

// Extract link tags (fonts, icons, preconnect)
const links = [];
const linkRe = /<link\s+[^>]*>/gi;
while ((m = linkRe.exec(head)) !== null) {
  links.push(m[0]);
}

// Write CSS file (style tags contents)
const cssDir = path.join(__dirname, "..", "public");
fs.mkdirSync(cssDir, { recursive: true });
const allCss = styles.map(s => {
  const start = s.indexOf(">") + 1;
  const end = s.lastIndexOf("</style>");
  return s.slice(start, end);
}).join("\n");
fs.writeFileSync(path.join(cssDir, "housemood-framer.css"), allCss);

// Write links JSON
fs.writeFileSync(
  path.join(__dirname, "..", "src", "app", "housemood", "font-links.json"),
  JSON.stringify(links, null, 2)
);

console.log("Done styles", styles.length, "links", links.length, "css bytes", allCss.length);
