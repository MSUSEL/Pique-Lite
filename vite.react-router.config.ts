import baseConfig from "./vite.config";
import { defineConfig, mergeConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";
import path from "node:path";

const isGhPages = process.env.GH_PAGES === "1";

/** @type {import('vite').UserConfig} */
export default defineConfig(
  mergeConfig(baseConfig, {
    plugins: [!process.env.VITEST && reactRouter(), netlifyReactRouter()].filter(Boolean),

    // ✅ 只有 GH_PAGES=1 时才启用：把 framework 默认入口“映射”到 SPA/hash 入口
    resolve: isGhPages
      ? {
          alias: [
            {
              find: path.resolve("src/entry.client.tsx"),
              replacement: path.resolve("src/entry.client.gh-pages.tsx"),
            },
          ],
        }
      : undefined,
  })
);
