import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

const API_PATHNAME_REGEX = /^\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?api(?:\/|$)/;
const LOCALIZED_API_REWRITE_REGEX = /^\/(en|fr)\/api/;

const getRequestPathname = (requestUrl: string | undefined): string => {
  if (!requestUrl) {
    return "";
  }

  try {
    return new URL(requestUrl, "http://localhost").pathname;
  } catch {
    return requestUrl;
  }
};

export default defineConfig({
  plugins: [
    intlayerProxy(undefined, {
      ignore: (request) =>
        API_PATHNAME_REGEX.test(getRequestPathname(request.url)),
    }),
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.app.json"] }),
    intlayer(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routeFileIgnorePattern:
        ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
    }),
    react(),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "^/(en|fr)/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(LOCALIZED_API_REWRITE_REGEX, "/api"),
      },
    },
  },
});
