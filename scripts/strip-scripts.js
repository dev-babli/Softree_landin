const fs = require("fs");
const path = require("path");

const bodyPath = path.join(__dirname, "..", "public", "landin", "body-clean.html");
let html = fs.readFileSync(bodyPath, "utf-8");

// Remove all script tags
html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

// Remove module preload links that were for framer bundles
html = html.replace(/<link[^>]*framerusercontent[^>]*script_main[^>]*>/gi, "");

fs.writeFileSync(bodyPath, html);
console.log("Stripped scripts from body-clean.html");
console.log("New length:", html.length);
