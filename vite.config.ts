import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      // Seulement les sources : ni les fichiers de config ni les tests.
      include: ["src"],
      exclude: ["src/env.d.ts"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      // ESM uniquement : Vite, Nuxt et Vitest consomment tous de l'ESM.
      formats: ["es"],
      fileName: "beedesign",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        assetFileNames: "beedesign.[ext]",
      },
    },
  },
});