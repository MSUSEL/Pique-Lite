import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    tailwindcss()
    // react()
    // MillionLint.vite()
  ],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "src/"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/components/hooks": path.resolve(__dirname, "src/components/hooks"),
      "@/components/lib": path.resolve(__dirname, "src/components/lib"),
      "@/components/ui": path.resolve(__dirname, "src/components/ui"),
      "@/state": path.resolve(__dirname, "src/state")
    }
  }
});
