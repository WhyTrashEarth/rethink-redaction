import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://rethinkredaction.org",
  integrations: [sitemap()],
});