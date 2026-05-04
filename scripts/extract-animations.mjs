import fs from "fs";
const r = fs.readFileSync("src/app/framer.html", "utf8");

// Extract appear animations
const appearMatch = r.match(/<script type="framer\/appear" id="__framer__appearAnimationsContent">([\s\S]*?)<\/script>/);
if (appearMatch) {
  fs.writeFileSync("scripts/framer-animations.json", appearMatch[1].trim());
  console.log("Wrote framer-animations.json", appearMatch[1].length, "bytes");
} else {
  console.log("No appear animations found");
}

// Extract breakpoints
const bpMatch = r.match(/<script type="framer\/appear" id="__framer__breakpoints">([\s\S]*?)<\/script>/);
if (bpMatch) {
  fs.writeFileSync("scripts/framer-breakpoints.json", bpMatch[1].trim());
  console.log("Wrote framer-breakpoints.json", bpMatch[1].length, "bytes");
} else {
  console.log("No breakpoints found");
}

// Extract CSS custom properties / tokens
const styleMatch = r.match(/<style>\s*([\s\S]*?:root[\s\S]*?)<\/style>/);
if (styleMatch) {
  fs.writeFileSync("scripts/framer-root-styles.css", styleMatch[1]);
  console.log("Wrote framer-root-styles.css", styleMatch[1].length, "bytes");
} else {
  console.log("No root styles found");
}
