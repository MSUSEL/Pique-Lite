import baseConfig from "./vite.config";
import react from "@vitejs/plugin-react";
import { defineConfig, mergeConfig } from "vite";

/** @type {import('vite').UserConfig} */
export default defineConfig(
  mergeConfig(baseConfig, {
    // Production-specific settings
    plugins: [react()]
  })
);
