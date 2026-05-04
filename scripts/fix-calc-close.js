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
  
  if (inCalc && line.trimEnd().endsWith(")));")) {
    // Inside a calc block, ))) is too many. Should be ));
    // But count carefully: we need to close the var() on this line + the calc()
    // So replace trailing ))); with ));
    line = line.replace(/\)\)\)\);$/, "));");
    inCalc = false;
  } else if (inCalc && line.trimEnd().endsWith("));")) {
    // calc properly closed
    inCalc = false;
  }
  
  out.push(line);
}

css = out.join("\n");

// Also fix any line with 4+ closing parens before semicolon that's NOT in a calc
// Actually let's just verify no lines have )))); incorrectly
// Line 774 is the non-calc one with 4 nested vars - that's correct

fs.writeFileSync(cssPath, css);
console.log("Fixed calc closing parens.");

// Verify calc blocks
const checkLines = css.split("\n");
let calcActive = false;
for (let i = 0; i < checkLines.length; i++) {
  const line = checkLines[i];
  if (line.includes("calc(")) calcActive = true;
  if (calcActive) {
    const trimmed = line.trimEnd();
    if (trimmed.endsWith(";")) {
      const beforeSemi = trimmed.slice(0, -1);
      const closeCount = (beforeSemi.match(/\)/g) || []).length;
      const openCount = (line.match(/\(/g) || []).length;
      if (closeCount > openCount + 1) {
        console.log(`Line ${i+1}: possible extra close: ${trimmed.slice(0, 100)}`);
      }
      calcActive = false;
    }
  }
}
