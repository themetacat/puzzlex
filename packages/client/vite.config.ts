import { defineConfig } from "vite";
import { resolve } from "path"
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 配置路径别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // 配置Scss
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },
  build: {
    target: "es2022",
    minify: true,
    sourcemap: true,
  },
});
