import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import MillionLint from "@million/lint";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    react(),
    // MillionLint.vite()
  ],
});
