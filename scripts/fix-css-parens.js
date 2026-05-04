const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "src", "app", "landin", "landin.css");
let css = fs.readFileSync(cssPath, "utf-8");

// Fix lines that look like:
// var( A, var(B);   -> missing closing )
// Strategy: for each line that has 'var(' but doesn't end with matching ), add them
function fixUnclosedVars(input) {
  const lines = input.split("\n");
  const out = [];
  
  for (let line of lines) {
    const trimmed = line.trimEnd();
    
    // Check if line contains var( and ends with ;
    if (trimmed.includes("var(") && trimmed.endsWith(";")) {
      // Count open and close parens on this line only
      let openCount = 0;
      let closeCount = 0;
      for (const ch of trimmed) {
        if (ch === "(") openCount++;
        if (ch === ")") closeCount++;
      }
      
      if (openCount > closeCount) {
        const missing = openCount - closeCount;
        line = trimmed.slice(0, -1) + ")".repeat(missing) + ";";
      }
    }
    
    out.push(line);
  }
  
  return out.join("\n");
}

css = fixUnclosedVars(css);

// Also fix any remaining double spaces and weird formatting
css = css.replace(/var\(\s+/g, "var(");
css = css.replace(/,\s+/g, ", ");
css = css.replace(/\)\s+\)/g, "))");

fs.writeFileSync(cssPath, css);
console.log("Fixed unclosed var() parentheses.");

// Verify
const lines = css.split("\n");
let issues = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trimEnd();
  if (line.includes("var(") && line.endsWith(";")) {
    let open = 0, close = 0;
    for (const ch of line) {
      if (ch === "(") open++;
      if (ch === ")") close++;
    }
    if (open !== close) {
      console.log(`Line ${i + 1}: ${open} open, ${close} close`);
      issues++;
    }
  }
}
console.log("Remaining issues:", issues);
