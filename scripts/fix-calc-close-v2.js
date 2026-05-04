const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "src", "app", "landin", "landin.css");
let css = fs.readFileSync(cssPath, "utf-8");

const lines = css.split("\n");
const out = [];
let inCalc = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (line.includes("calc(")) {
    inCalc = true;
  }
  
  if (inCalc) {
    const trimmed = line.trimEnd();
    // Check if line ends with ))) followed by ; (possibly with spaces)
    if (/\)\)\)\);\s*$/.test(trimmed)) {
      line = line.replace(/\)\)\)\);(\s*)$/, "));$1");
      inCalc = false;
    } else if (/\)\);\s*$/.test(trimmed)) {
      inCalc = false;
    }
  }
  
  out.push(line);
}

css = out.join("\n");

fs.writeFileSync(cssPath, css);
console.log("Fixed calc closing parens v2.");

// Verify calc blocks
const checkLines = css.split("\n");
let calcActive = false;
let issues = 0;
for (let i = 0; i < checkLines.length; i++) {
  const line = checkLines[i];
  if (line.includes("calc(")) calcActive = true;
  if (calcActive) {
    const trimmed = line.trimEnd();
    if (trimmed.endsWith(";")) {
      const beforeSemi = trimmed.slice(0, -1);
      const closeCount = (beforeSemi.match(/\)/g) || []).length;
      const openCount = (line.match(/\(/g) || []).length;
      // In a calc block, we expect close = open + 1 (the calc itself was opened earlier)
      // Actually it's hard to track across lines. Just check for )))); which is suspicious in calc
      if (/\)\)\)\);/.test(trimmed)) {
        console.log(`Line ${i+1}: still has )))): ${trimmed.slice(0, 100)}`);
        issues++;
      }
      calcActive = false;
    }
  }
}
console.log("Remaining issues:", issues);
