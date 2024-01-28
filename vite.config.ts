import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app-hooks": path.resolve(__dirname, "./src/hooks"),
      "@app-components": path.resolve(__dirname, "./src/components"),
      "@app-assets": path.resolve(__dirname, "./src/assets"),
      "@app-utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
