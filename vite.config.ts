import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~app": path.resolve("src/app"),
      "~entities": path.resolve("src/entities"),
      "~features": path.resolve("src/features"),
      "~pages": path.resolve("src/pages"),
      "~shared": path.resolve("src/shared"),
      "~widgets": path.resolve("src/widgets"),
    },
  },
});
