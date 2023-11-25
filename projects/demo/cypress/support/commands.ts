declare namespace Cypress {
  interface Chainable {
    getRecaptchaIframeBody(): Chainable<JQuery<HTMLBodyElement>>;
    waitForPageReloadAfter(action: () => void): void;
  }
}

Cypress.Commands.add("getRecaptchaIframeBody", () => {
  cy.log("Getting reCAPTCHA iframe body");

  return (
    cy
      .get("iframe[title=reCAPTCHA]", { log: false })
      .its("0.contentDocument.body", { log: false })
      .should("not.be.empty", { log: false })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .then((el) => cy.wrap<HTMLBodyElement>(el, { log: false }))
  );
});

Cypress.Commands.add("waitForPageReloadAfter", (action) => {
  const RELOAD_INDICATOR_PROP_NAME = "cypress-reload-indicator";
  cy.window({ log: false }).then((win) => (win[RELOAD_INDICATOR_PROP_NAME] = "not reloaded"));

  action();

  cy.window().should("not.have.property", RELOAD_INDICATOR_PROP_NAME);
});
