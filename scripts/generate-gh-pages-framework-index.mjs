import fs from "fs";
import path from "path";
import process from "process";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "build", "client");
const MANIFEST = path.join(DIST, ".vite", "manifest.json");

if (!fs.existsSync(MANIFEST)) {
  throw new Error(`Missing ${MANIFEST}. Run "bun run build:demo" first.`);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf-8"));

// 1️⃣ 找 entry.client-*.js
const entryKey = Object.keys(manifest).find(
  (k) => manifest[k].isEntry && k.includes("entry.client")
);

if (!entryKey) {
  throw new Error("Cannot find entry.client in Vite manifest");
}

const entry = manifest[entryKey].file;

// 2️⃣ 收集 CSS（entry + root）
const css = new Set();
if (manifest[entryKey].css) {
  manifest[entryKey].css.forEach((c) => css.add(c));
}

for (const k of Object.keys(manifest)) {
  if (k.includes("root") && manifest[k].css) {
    manifest[k].css.forEach((c) => css.add(c));
  }
}

// 3️⃣ 生成 HTML
const cssLinks = [...css]
  .map((c) => `<link rel="stylesheet" href="/Pique-Lite/${c}">`)
  .join("\n    ");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pique Lite</title>
    ${cssLinks}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/Pique-Lite/${entry}"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(DIST, "index.html"), html);
fs.writeFileSync(path.join(DIST, "404.html"), html);

console.log("[gh-pages] wrote index.html and 404.html");
console.log("[gh-pages] entry:", entry);
console.log("[gh-pages] css:", [...css].join(", "));
