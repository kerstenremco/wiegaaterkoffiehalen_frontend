import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import version from "vite-plugin-package-version";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    version(),
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "remco-0b",
      project: "wiegaaterkoffiehalen"
    })
  ],

  define: {
    global: {}
  },

  build: {
    sourcemap: true
  }
});
