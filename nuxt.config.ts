import pkg from "./package.json";
import getCommit from "./utils/getCommit";

const HOST = process.env.HOST;

const env = {
  HOST,
  VERSION: pkg.version,
  COMMIT:
    process.env.npm_package_gitHead ||
    process.env.VERCEL_GITHUB_COMMIT_SHA ||
    getCommit(),
  DATE_GENERATED: new Date().toISOString(),
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      ...env,
    },
  },
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "nuxt-icon", "nuxt-lodash"],
  css: ["@unocss/reset/tailwind.css"],

  app: {
    head: {
      title: "Mithaka Seed Key",
      viewport: "width=device-width,initial-scale=1",
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon-180x-180.png" },
        // { rel: "manifest", href: "/manifest.webmanifest" },
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Mithaka Seed Key" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
    },
  },
});
