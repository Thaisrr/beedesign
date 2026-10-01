import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // Les tests importent "@thaisrr/beedesign" comme le ferait un utilisateur de la lib.
            "@thaisrr/beedesign": fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        },
    },
    test: {
        environment: "jsdom",
        include: ["tests/**/*.test.ts"],
        setupFiles: ["tests/setup.ts"],
        root: fileURLToPath(new URL(".", import.meta.url)),
        coverage: {
            provider: "v8",
            include: ["src/**/*.{ts,vue}"],
            exclude: ["src/index.ts", "src/types.ts", "src/env.d.ts"],
            reporter: ["text", "html", "lcov"],
        },
    },
});