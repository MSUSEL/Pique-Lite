import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import MillionLint from "@million/lint";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss(),
    // react(),
    // MillionLint.vite()
  ],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "src/"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/components/hooks": path.resolve(__dirname, "src/components/hooks"),
      "@/components/lib": path.resolve(__dirname, "src/components/lib"),
      "@/components/ui": path.resolve(__dirname, "src/components/ui"),
    },
  },
});
