const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "..", "src", "app", "landin", "landin.css");
let css = fs.readFileSync(cssPath, "utf-8");

// Remove all newlines inside var() declarations to make parsing easier
// Strategy: find all var(... ) blocks and flatten them
function flattenVarBlocks(input) {
  let result = "";
  let depth = 0;
  let inVar = false;
  let varStart = -1;
  
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    
    if (input.slice(i, i + 4) === "var(" && !inVar) {
      inVar = true;
      varStart = i;
      depth = 1;
      result += "var(";
      i += 3;
      continue;
    }
    
    if (inVar) {
      if (ch === "(") depth++;
      if (ch === ")") depth--;
      
      if (depth === 0) {
        inVar = false;
        result += ")";
        continue;
      }
      
      // Skip whitespace/newlines inside var()
      if (ch === "\n" || ch === "\r") {
        result += " ";
        continue;
      }
      
      // Skip extra spaces
      if (ch === " " && result[result.length - 1] === " ") {
        continue;
      }
      
      result += ch;
    } else {
      result += ch;
    }
  }
  
  return result;
}

css = flattenVarBlocks(css);

// Fix any remaining double closing parens like )); -> );
css = css.replace(/\);\s*\)/g, ");");
css = css.replace(/\)\s*\);/g, ");");

// Fix nested var( var( -> just the inner
// After flattening, var( var( A, B ) ) should be var( A, B )
// But flattenVarBlocks should have handled this... let's do regex cleanup
css = css.replace(/var\(var\(([^)]*)\)\)/g, "var($1)");

// Write back
fs.writeFileSync(cssPath, css);
console.log("CSS sanitized v2.");
console.log("Size:", css.length);
