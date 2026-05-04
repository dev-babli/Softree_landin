const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(
  path.join(__dirname, "..", "src", "app", "landin", "landin.html"),
  "utf-8"
);

// Extract body content
const bodyStart = html.indexOf("<body>") + 6;
const bodyEnd = html.lastIndexOf("</body>");
const body = html.slice(bodyStart, bodyEnd);

// Extract all style blocks
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
const styles = [];
let m;
while ((m = styleRegex.exec(html)) !== null) {
  styles.push(m[1]);
}

// Extract animation JSON from scripts
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
let animData = null;
let sm;
while ((sm = scriptRegex.exec(html)) !== null) {
  const content = sm[1];
  if (content.includes("__framer__appearAnimationsContent")) {
    // Find the JSON string
    const jsonMatch = content.match(/window\.__framer__appearAnimationsContent\.text\s*=\s*'([^']+)'/);
    if (jsonMatch) {
      animData = JSON.parse(jsonMatch[1]);
    }
  }
}

// Extract breakpoints
let breakpoints = null;
const bpScript = html.match(/window\.__framer__breakpoints\.text\s*=\s*'([^']+)'/);
if (bpScript) {
  breakpoints = JSON.parse(bpScript[1]);
}

fs.writeFileSync(
  path.join(__dirname, "landin-body.html"),
  body
);

fs.writeFileSync(
  path.join(__dirname, "landin-styles.css"),
  styles.join("\n\n")
);

fs.writeFileSync(
  path.join(__dirname, "landin-animations.json"),
  JSON.stringify(animData, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, "landin-breakpoints.json"),
  JSON.stringify(breakpoints, null, 2)
);

console.log("Body length:", body.length);
console.log("Styles blocks:", styles.length);
console.log("Animation IDs:", animData ? Object.keys(animData) : 0);
console.log("Breakpoints:", breakpoints ? Object.keys(breakpoints) : 0);
