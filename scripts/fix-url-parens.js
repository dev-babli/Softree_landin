const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "src", "app", "landin", "landin.css");
let css = fs.readFileSync(cssPath, "utf-8");

// Fix url( functions missing closing parens
// Pattern: url('...';  -> url('...');
// Pattern: url("...";  -> url("...");
css = css.replace(/url\(['"]([^'"]+)['"]\s*;(?![^\n]*\))/g, "url('$1');");

// More specifically: find url( followed by string that ends with '; but not ');
// This regex handles multiline poorly. Let's do line by line.
const lines = css.split("\n");
const out = [];
for (let line of lines) {
  const trimmed = line.trimEnd();
  // If line contains url( and ends with '; but not '); or ");
  if (trimmed.includes("url(") && /['"]\s*;$/.test(trimmed) && !/['"]\);\s*$/.test(trimmed)) {
    line = trimmed.replace(/(['"])\s*;\s*$/, "'$1);");
  }
  out.push(line);
}
css = out.join("\n");

// Also fix var() url() combinations with extra )
// Pattern: '));); at end of line -> should be '));
css = css.replace(/\)\)\);;\s*$/gm, "));");
css = css.replace(/\)\)\)\);\s*$/gm, ")));");

// Another common issue: mask-image with url inside var has extra parens
// Let's look for lines that end with )))); which is likely wrong
css = css.split("\n").map(line => {
  const t = line.trimEnd();
  // Count parens
  let open = 0, close = 0;
  for (const ch of t) {
    if (ch === "(") open++;
    if (ch === ")") close++;
  }
  if (close > open && t.endsWith(";")) {
    const extra = close - open;
    return t.slice(0, -1).replace(/\)$/, "").repeat(extra) + ";";
  }
  return line;
}).join("\n");

fs.writeFileSync(cssPath, css);
console.log("Fixed URL parentheses.");

// Check for remaining url( without closing )
const checkLines = css.split("\n");
let issues = 0;
for (let i = 0; i < checkLines.length; i++) {
  const line = checkLines[i];
  if (line.includes("url(") && !line.includes("url(data:") && !line.includes("url('data:")) {
    const urlIdx = line.indexOf("url(");
    const afterUrl = line.slice(urlIdx + 4);
    // Check if there's a closing ) before ;
    const semiIdx = afterUrl.indexOf(";");
    const closeIdx = afterUrl.indexOf(")");
    if (semiIdx !== -1 && (closeIdx === -1 || closeIdx > semiIdx)) {
      console.log(`Line ${i+1}: possible unclosed url(: ${line.trim().slice(0, 120)}`);
      issues++;
    }
  }
}
console.log("Remaining url( issues:", issues);
