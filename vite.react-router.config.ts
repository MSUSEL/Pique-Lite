import baseConfig from "./vite.config";
import { defineConfig, mergeConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";

export default defineConfig(() => {
  const isGhPages = process.env.GH_PAGES === "1";

  if (isGhPages) {
    // ✅ GH Pages：纯 SPA（hash router）入口
    return defineConfig(
      mergeConfig(baseConfig as any, {
        base: "/Pique-Lite/",
        resolve: {
          alias: {
            "@": path.resolve(__dirname, "./src"),
          },
        },
        plugins: [
          // ✅ 必须显式启用 React 插件，否则可能出现 React is not defined
          react({ jsxRuntime: "automatic" }),
        ],
        build: {
          outDir: "build/client",
          emptyOutDir: true,
          manifest: true,
          rollupOptions: {
            // ✅ 强制入口：你的 GH Pages SPA 入口
            input: path.resolve(__dirname, "src/entry.client.gh-pages.tsx"),
          },
        },
      })
    );
  }

  // ✅ 非 GH Pages：保留原来的 framework/Netlify 构建链
  return defineConfig(
    mergeConfig(baseConfig as any, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      plugins: [react(), !process.env.VITEST && reactRouter(), netlifyReactRouter()].filter(
        Boolean
      ),
    })
  );
});
