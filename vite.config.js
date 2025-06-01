import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  root: "./",
  base: "./",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "docs",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        cardInvitation: resolve(
          __dirname,
          "src/components/card-invitation/card-invitation.html"
        ),
        createLink: resolve(
          __dirname,
          "src/components/create-link/create-link.html"
        ),
        linkSentModal: resolve(
          __dirname,
          "src/components/link-sent-modal/link-sent-modal.html"
        ),
      },
    },
  },
  plugins: [tailwindcss()],
});
