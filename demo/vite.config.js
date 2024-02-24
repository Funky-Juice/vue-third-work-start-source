import { fileURLToPath, URL } from "url";
// import path from 'path'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          '@import "./src/assets/scss/app";',
          "", // end with newline
        ].join("\n"),
      },
    },
  },
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src')
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 8081,
  },
});
