import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raw = fs.readFileSync(path.join(__dirname, "..", "src", "app", "framer.html"), "utf-8");

// Extract head styles + fonts
const headStart = raw.indexOf("<head>") + 6;
const headEnd = raw.indexOf("</head>");
let head = raw.slice(headStart, headEnd);
// Remove <script> from head
head = head.replace(/<script[\s\S]*?<\/script>/gi, "");
// Remove <meta charset> since Next.js handles it
head = head.replace(/<meta\s+charset="[^"]*"\s*\/?>/gi, "");
// Remove <meta viewport since Next.js handles it
head = head.replace(/<meta\s+name="viewport"[^>]*\/?>/gi, "");
// Remove <title> since Next.js handles it
head = head.replace(/<title>[\s\S]*?<\/title>/gi, "");

// Extract body
const start = raw.indexOf("<body>") + 6;
const end = raw.indexOf("</body>");
let body = raw.slice(start, end);
// Remove Framer badge + event scripts + all inline scripts
body = body.replace(/<script[^>]*src="https:\/\/events\.framer\.com[^"]*"[^>]*><\/script>/g, "");
body = body.replace(/<div id="__framer-badge-container"[^>]*>[\s\S]*?<\/div>/gi, "");
body = body.replace(/<!--\$-->/g, "").replace(/<!--\/\$-->/g, "");
// Remove all remaining script tags (Framer runtime, appear animations, etc.)
body = body.replace(/<script[\s\S]*?<\/script>/gi, "");

const outDir = path.join(__dirname, "..", "src", "app", "housemood");
fs.mkdirSync(outDir, { recursive: true });

const outHead = `export const headContent = ${JSON.stringify(head)};`;
fs.writeFileSync(path.join(outDir, "head-content.ts"), outHead);

const out = `export default ${JSON.stringify(body)};`;
fs.writeFileSync(path.join(outDir, "body-content.ts"), out);
console.log("Done head", head.length, "body", body.length);
