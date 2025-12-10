import baseConfig from "./vite.config";
import { defineConfig, mergeConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";

/** @type {import('vite').UserConfig} */
export default defineConfig(
  mergeConfig(baseConfig, {
    // Production-specific settings
    plugins: [!process.env.VITEST && reactRouter(),
      netlifyReactRouter()
    ].filter(Boolean)
  })
);
