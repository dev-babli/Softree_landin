const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "public", "landin", "body-clean.html");
const outputPath = path.join(__dirname, "..", "public", "landin", "body-processed.html");

let html = fs.readFileSync(inputPath, "utf-8");

// 1. Replace text content: Landin -> Softree, but preserve CSS classes and attributes
html = html.replace(/>([^<]*?)Landin([^<]*?)</g, ">$1Softree$2<");
html = html.replace(/>([^<]*?)landin([^<]*?)</g, ">$1softree$2<");

// 2. Replace logo images with Softree logo
// The original Framer site uses a logo image - we need to find and replace it
// Looking for the main logo in the nav
const softreeLogoLight = "/brand/Softree-Technology-Final-Logo-Light-BG.png";
const softreeLogoDark = "/brand/softree-logo-dark-bg.png";

// Replace any framerusercontent logo images with Softree logo
html = html.replace(
  /https:\/\/framerusercontent\.com\/images\/[^"'\s]+/g,
  (match) => {
    // If it looks like a logo image (check context), replace with Softree
    // For now, replace specific known Framer logo patterns
    if (match.includes("icon") || match.includes("logo")) {
      return softreeLogoLight;
    }
    return match;
  }
);

// 3. Strip inline animation-final styles from elements with data-framer-appear-id
// These have style="opacity: 1; will-change: transform; transform: none" which breaks GSAP
html = html.replace(
  /(<[^>]+data-framer-appear-id=["'][^"']+["'][^>]*)style=["'][^"']*opacity:\s*1[^"']*["']/gi,
  (match, prefix) => {
    // Keep the element but remove the inline style that sets final animation state
    // The style attribute may contain other things we want to preserve
    // For simplicity, we'll let GSAP handle all opacity/transform
    return prefix + 'style="will-change: transform, opacity"';
  }
);

// 4. Also clean up any remaining inline opacity:1 that might conflict
html = html.replace(/opacity:\s*1;?/g, "");
html = html.replace(/transform:\s*none;?/g, "");

// 5. Clean up empty style attributes
html = html.replace(/style=["']\s*["']/g, "");
html = html.replace(/style=["']\s*will-change:\s*transform,?\s*["']/g, 'style="will-change: transform, opacity"');

fs.writeFileSync(outputPath, html);
console.log("Processed HTML saved to body-processed.html");
console.log("Replacements made:");
console.log("- Landin -> Softree");
console.log("- Logo images -> Softree logo");
console.log("- Inline animation styles cleaned for GSAP control");
