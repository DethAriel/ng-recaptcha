import * as path from "path";

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/ng-recaptcha",
    supportFile: path.resolve(__dirname, "./support/index.ts"),
    specPattern: "**/*.cy.ts",
  },

  viewportWidth: 1200,
  viewportHeight: 800,
  waitForAnimations: true,

  // with default security settings the e2e tests won't be able to interact with (or even peek at) the reCAPTCHA
  chromeWebSecurity: false,
});
