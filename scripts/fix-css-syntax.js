const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "src", "app", "landin", "landin.css");
let css = fs.readFileSync(cssPath, "utf-8");

// Fix 1: calc blocks with missing closing parens across multiple lines
function fixCalcBlocks(input) {
  const lines = input.split("\n");
  const out = [];
  let calcDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Track calc opens
    let idx = 0;
    while ((idx = line.indexOf("calc(", idx)) !== -1) {
      calcDepth++;
      idx += 5;
    }
    
    // Track general parens
    for (const ch of line) {
      if (ch === "(") calcDepth++;
      if (ch === ")") calcDepth--;
    }
    
    // If line ends with ; and calcDepth > 0, add missing )
    const trimmed = line.trimEnd();
    if (trimmed.endsWith(";") && calcDepth > 0) {
      line = trimmed.slice(0, -1) + ")".repeat(calcDepth) + ";";
      calcDepth = 0;
    } else if (trimmed.endsWith(";")) {
      calcDepth = 0;
    }
    
    out.push(line);
  }
  
  return out.join("\n");
}

css = fixCalcBlocks(css);

// Fix 2: Remove ); after plain property values that aren't functions
// e.g. "position: absolute);" -> "position: absolute;"
css = css.replace(/:\s*([^)(;]+)\);\s*$/gm, ": $1;");

// Fix 3: Fix double closing parens where there's no matching open
// This is tricky, let's do it line by line for property lines
const lines = css.split("\n");
const out = [];
for (let line of lines) {
  const trimmed = line.trimEnd();
  // For CSS property lines ending in ;
  if (/^\s+\S+:\s*.+;\s*$/.test(trimmed)) {
    let open = 0, close = 0;
    for (const ch of trimmed) {
      if (ch === "(") open++;
      if (ch === ")") close++;
    }
    if (close > open) {
      const extra = close - open;
      line = trimmed.slice(0, -1);
      // Remove extra ) before ;
      for (let i = 0; i < extra; i++) {
        line = line.replace(/\)(\s*)$/, "$1");
      }
      line = line + ";";
    }
  }
  out.push(line);
}
css = out.join("\n");

fs.writeFileSync(cssPath, css);
console.log("Fixed CSS syntax errors.");

// Verify
const verify = css.split("\n");
let issues = 0;
for (let i = 0; i < verify.length; i++) {
  const line = verify[i].trimEnd();
  if (/^\s+\S+:\s*.+;\s*$/.test(line)) {
    let open = 0, close = 0;
    for (const ch of line) {
      if (ch === "(") open++;
      if (ch === ")") close++;
    }
    if (close > open) {
      console.log(`Line ${i+1}: extra close parens: ${line.slice(0, 120)}`);
      issues++;
    }
  }
}
console.log("Remaining extra-close issues:", issues);
