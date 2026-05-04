const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "src", "app", "landin", "landin.css");
let css = fs.readFileSync(cssPath, "utf-8");

// Fix calc( blocks that span multiple lines and are missing closing parens
// Pattern: calc(\n  ... \n    ... ;
// The ; should come after the closing )

// Simple approach: find all calc( and ensure they close before ;
function fixCalcBlocks(input) {
  const lines = input.split("\n");
  const out = [];
  let inCalc = false;
  let calcOpenLine = -1;
  let calcParens = 0;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    if (!inCalc && line.includes("calc(")) {
      inCalc = true;
      calcOpenLine = i;
      calcParens = 1;
      // Count parens on this line
      for (const ch of line) {
        if (ch === "(") calcParens++;
        if (ch === ")") calcParens--;
      }
      out.push(line);
      continue;
    }
    
    if (inCalc) {
      // Count parens on continuation lines
      for (const ch of line) {
        if (ch === "(") calcParens++;
        if (ch === ")") calcParens--;
      }
      
      // If line ends with ; and we're still in calc, close it
      const trimmed = line.trimEnd();
      if (trimmed.endsWith(";") && calcParens > 0) {
        // Insert missing ) before ;
        line = trimmed.slice(0, -1) + ")".repeat(calcParens) + ";";
        inCalc = false;
        calcParens = 0;
      } else if (calcParens <= 0) {
        inCalc = false;
        calcParens = 0;
      }
    }
    
    out.push(line);
  }
  
  return out.join("\n");
}

css = fixCalcBlocks(css);

// Also fix any other multiline expressions with missing parens
// Search for lines ending in ; that have unbalanced parens
css = css.split("\n").map(line => {
  const trimmed = line.trimEnd();
  if (trimmed.endsWith(";")) {
    let open = 0, close = 0;
    for (const ch of trimmed) {
      if (ch === "(") open++;
      if (ch === ")") close++;
    }
    if (open > close) {
      return trimmed.slice(0, -1) + ")".repeat(open - close) + ";";
    }
  }
  return line;
}).join("\n");

fs.writeFileSync(cssPath, css);
console.log("Fixed calc and parenthesis blocks.");

// Verify
const lines = css.split("\n");
let issues = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trimEnd();
  if (line.endsWith(";")) {
    let open = 0, close = 0;
    for (const ch of line) {
      if (ch === "(") open++;
      if (ch === ")") close++;
    }
    if (open > close) {
      console.log(`Line ${i + 1}: unbalanced parens (${open} vs ${close}): ${line.slice(0, 80)}`);
      issues++;
    }
  }
}
console.log("Remaining unbalanced parens on ; lines:", issues);
