import baseConfig from "./vite.config";
import { defineConfig, mergeConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

/** @type {import('vite').UserConfig} */
export default defineConfig(
  mergeConfig(baseConfig, {
    // Production-specific settings
    plugins: [!process.env.VITEST && reactRouter()]
  })
);
