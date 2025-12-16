import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("build/client");
const MANIFEST = path.join(OUT_DIR, ".vite/manifest.json");
const INDEX = path.join(OUT_DIR, "index.html");
const NOT_FOUND = path.join(OUT_DIR, "404.html");

if (!fs.existsSync(MANIFEST)) {
  throw new Error(`Missing ${MANIFEST}. Run build first.`);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const entryKey = Object.keys(manifest).find((k) => manifest[k]?.isEntry);
if (!entryKey) {
  throw new Error(`No isEntry found in ${MANIFEST}`);
}

const entryFile = manifest[entryKey].file; // e.g. assets/entry.client.gh-pages-XXXX.js
const base = "/Pique-Lite";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PIQUE Lite</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${base}/${entryFile}"></script>
  </body>
</html>
`;

fs.writeFileSync(INDEX, html, "utf8");
fs.writeFileSync(NOT_FOUND, html, "utf8");
console.log(`[gh-pages] wrote ${INDEX} + ${NOT_FOUND}`);
console.log(`[gh-pages] entry: ${entryFile}`);
