import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("build/client");
const manifestPath = path.join(OUT_DIR, ".vite/manifest.json");

if (!fs.existsSync(manifestPath)) {
  throw new Error(`Missing ${manifestPath}. Run build:demo first.`);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// 找到 isEntry 的入口（一般就是 entry.client-xxxx.js）
const entryKey = Object.keys(manifest).find((k) => manifest[k]?.isEntry);
if (!entryKey) {
  throw new Error(`No entry found in manifest.json (isEntry=true).`);
}

const entry = manifest[entryKey];

// GitHub Pages repo 名：Pique-Lite
const BASE = "/Pique-Lite/";

// 入口脚本
const entryJs = BASE + entry.file;

// CSS：Vite manifest 可能把 css 放在 entry.css，也可能通过 imports 间接带出来
const cssFiles = new Set();
if (Array.isArray(entry.css)) entry.css.forEach((c) => cssFiles.add(c));

function collectCssFromImports(e) {
  if (!e?.imports) return;
  for (const ik of e.imports) {
    const imp = manifest[ik];
    if (imp?.css) imp.css.forEach((c) => cssFiles.add(c));
    collectCssFromImports(imp);
  }
}
collectCssFromImports(entry);

const cssLinks = [...cssFiles]
  .map((c) => `    <link rel="stylesheet" href="${BASE + c}">`)
  .join("\n");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PIQUE Lite</title>
${cssLinks}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entryJs}"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(OUT_DIR, "index.html"), html, "utf8");
fs.writeFileSync(path.join(OUT_DIR, "404.html"), html, "utf8");
console.log(`[gh-pages] wrote ${OUT_DIR}/index.html and 404.html using ${entry.file}`);
