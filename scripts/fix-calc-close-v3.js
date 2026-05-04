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
    // Three closing parens before semicolon in calc block = one extra
    if (/\)\)\);\s*$/.test(trimmed)) {
      line = line.replace(/\)\)\);(\s*)$/, "));$1");
      inCalc = false;
    } else if (/\);\s*$/.test(trimmed)) {
      // Single paren close = probably fine if it's var(); inside calc... actually calc needs 2
      // But let's not over-correct
      inCalc = false;
    }
  }
  
  out.push(line);
}

css = out.join("\n");

fs.writeFileSync(cssPath, css);
console.log("Fixed calc closing parens v3.");

// Verify specific lines
const checkLines = css.split("\n");
for (let i = 433; i <= 437; i++) {
  console.log(`Line ${i+1}: ${JSON.stringify(checkLines[i])}`);
}
