const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "..", "src", "app", "landin", "landin.html"),
  "utf-8"
);

// Extract head styles
const headStart = html.indexOf("<head>") + 6;
const headEnd = html.indexOf("</head>");
const headContent = html.slice(headStart, headEnd);

// Extract all style blocks from head
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
const styles = [];
let m;
while ((m = styleRegex.exec(headContent)) !== null) {
  styles.push(m[1]);
}

// Extract body content
const bodyStart = html.indexOf("<body>") + 6;
const bodyEnd = html.lastIndexOf("</body>");
let body = html.slice(bodyStart, bodyEnd);

// Remove Framer scripts from body end
const scriptStart = body.lastIndexOf('<script');
if (scriptStart > body.length - 5000) {
  body = body.slice(0, scriptStart);
}

// Also remove SVGs at the very end (they are templates)
const lastSvg = body.lastIndexOf('<svg');
if (lastSvg > body.length - 5000) {
  // Keep SVGs if they're part of content, but the template SVGs at end are not needed
}

// Extract animation data
const animMatch = html.match(/<script type="framer\/appear" id="__framer__appearAnimationsContent">\s*([\s\S]*?)\s*<\/script>/);
let animData = {};
if (animMatch) {
  try {
    animData = JSON.parse(animMatch[1]);
  } catch (e) {
    console.error("Failed to parse anim data");
  }
}

// Write CSS
const cssDir = path.join(__dirname, "..", "src", "app", "landin");
fs.mkdirSync(cssDir, { recursive: true });
fs.writeFileSync(path.join(cssDir, "landin.css"), styles.join("\n\n"));

// Write body HTML to public for fetching
const publicDir = path.join(__dirname, "..", "public", "landin");
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "body.html"), body.trim());

// Write animation data
fs.writeFileSync(
  path.join(cssDir, "animations.json"),
  JSON.stringify(animData, null, 2)
);

console.log("CSS written:", styles.length, "blocks");
console.log("Body HTML written:", body.length, "chars");
console.log("Animation IDs:", Object.keys(animData));
