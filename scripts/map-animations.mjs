import fs from "fs";
const html = fs.readFileSync("src/app/framer.html", "utf8");

// Find elements with data-framer-appear-id
const matches = [...html.matchAll(/data-framer-appear-id="([^"]+)"/g)];
const ids = [...new Set(matches.map(m => m[1]))];
console.log("appear IDs found:", ids.length);
console.log(ids.slice(0, 20));

// Map animation IDs to elements nearby
ids.slice(0, 10).forEach(id => {
  const idx = html.indexOf(`data-framer-appear-id="${id}"`);
  const snippet = html.slice(Math.max(0, idx - 200), idx + 200);
  console.log("\n---", id, "---");
  console.log(snippet);
});
