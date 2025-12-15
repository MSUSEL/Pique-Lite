import fs from "node:fs";
import path from "node:path";

// GitHub Pages: https://msusel.github.io/Pique-Lite/
const BASE = "/Pique-Lite";

const OUT_DIR = path.resolve("build/client");
const VITE_MANIFEST_PATH = path.join(OUT_DIR, ".vite", "manifest.json");

function mustExist(p, hint) {
  if (!fs.existsSync(p)) throw new Error(`Missing ${p}${hint ? ` (${hint})` : ""}`);
}

function pickFirst(arr) {
  return Array.isArray(arr) && arr.length ? arr[0] : null;
}

function main() {
  mustExist(OUT_DIR, "Run build first");
  mustExist(VITE_MANIFEST_PATH, "Expect Vite manifest at build/client/.vite/manifest.json");

  const manifest = JSON.parse(fs.readFileSync(VITE_MANIFEST_PATH, "utf-8"));

  // Try to locate the main entry chunk.
  // Different setups name entry differently, so we search by isEntry.
  const entry = Object.values(manifest).find((v) => v && v.isEntry);

  if (!entry) {
    throw new Error(
      "Cannot find an entry in Vite manifest (no item with isEntry: true)."
    );
  }

  const entryFile = entry.file; // e.g. assets/entry.client-xxxx.js OR assets/index-xxxx.js
  const entryCss = pickFirst(entry.css); // optional

  // React Router framework build usually outputs a separate root route module.
  // We try to find a chunk whose name includes 'root' OR src includes root.tsx.
  const rootChunk =
    Object.values(manifest).find((v) => v?.name === "root") ||
    Object.values(manifest).find((v) => (v?.src || "").includes("root.tsx")) ||
    Object.values(manifest).find((v) => (v?.file || "").includes("root-"));

  if (!rootChunk?.file) {
    throw new Error(
      "Cannot locate root route module in manifest. Try searching for root.tsx/root-*.js in build/client/assets."
    );
  }

  const rootFile = rootChunk.file;
  const rootCss = pickFirst(rootChunk.css); // optional

  const preloadLinks = [
    `<link rel="modulepreload" href="${BASE}/${entryFile}"/>`,
    `<link rel="modulepreload" href="${BASE}/${rootFile}"/>`,
  ].join("\n  ");

  const cssLinks = [entryCss, rootCss]
    .filter(Boolean)
    .map((css) => `<link rel="stylesheet" href="${BASE}/${css}"/>`)
    .join("\n  ");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Pique LITE</title>

  ${preloadLinks}
  ${cssLinks}
</head>
<body>
  <div id="root"></div>

  <script>
    window.__reactRouterContext = {
      basename: "${BASE}",
      future: {},
      routeDiscovery: { mode: "initial" },
      ssr: false,
      isSpaMode: true
    };
    window.__reactRouterContext.stream = new ReadableStream({
      start(controller) { window.__reactRouterContext.streamController = controller; }
    }).pipeThrough(new TextEncoderStream());
  </script>

  <script type="module" async="">
    import * as route0 from "${BASE}/${rootFile}";
    window.__reactRouterRouteModules = { "root": route0 };
    import("${BASE}/${entryFile}");
  </script>

  <script>
    // close the stream for SPA shell
    window.__reactRouterContext.streamController?.enqueue("[{},\\"loaderData\\",{},\\"actionData\\",\\"errors\\"]\\n");
    window.__reactRouterContext.streamController?.close();
  </script>
</body>
</html>
`;

  fs.writeFileSync(path.join(OUT_DIR, "index.html"), html, "utf-8");
  fs.writeFileSync(path.join(OUT_DIR, "404.html"), html, "utf-8");

  console.log("[generate-gh-pages-entry] wrote build/client/index.html and 404.html");
  console.log({
    entryFile,
    entryCss,
    rootFile,
    rootCss,
    manifest: "build/client/.vite/manifest.json",
  });
}

main();
