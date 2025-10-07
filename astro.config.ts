import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import config from "./src/site.config";
import remarkReadingTime from "./src/plugins/remark-reading-time";

// https://astro.build/config
export default defineConfig({
  site: config.site,
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  integrations: [
    react(),
    sitemap(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
});
