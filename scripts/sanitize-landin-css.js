const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "src", "app", "landin", "landin.css");
let css = fs.readFileSync(cssPath, "utf-8");

// Fix var(var(...)) -> var(...)
// Pattern: var(\n\s*var(\n\s*...\n\s*)\n\s*)
// This is tricky with multiline, let's do a regex replace
css = css.replace(/var\(\s*var\(/g, "var(");

// Also fix trailing ) that would be extra
// After replacing var( var( we might have double closing ), but let's handle carefully
// The specific pattern is: var(\n  var(\n    --name,\n    fallback\n  )\n)
// We want: var(\n  --name,\n  fallback\n)

// Remove extra closing paren after var replacement
css = css.replace(/(\))\s*\n\s*\);/g, "$1);");

// Write back
fs.writeFileSync(cssPath, css);
console.log("CSS sanitized.");

// Check for remaining issues
const remaining = (css.match(/var\(\s*var\(/g) || []).length;
console.log("Remaining var(var(:", remaining);
