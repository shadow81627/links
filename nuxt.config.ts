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
  modules: ["@unocss/nuxt", "nuxt-icon"],
  css: ["@unocss/reset/tailwind.css"],
});
