const pageObject = {
  navigateHome() {
    cy.visit("/");
  },
  selectLanguage(language: "" | "fr" | "de") {
    cy.waitForPageReloadAfter(() => {
      cy.get(`[data-cy="language-settings-menu"]`).click();
      cy.get(`input[type=radio][value="${language}"]`).click();
    });
  },
  get recaptchaCheckboxLabel() {
    return cy.getRecaptchaIframeBody();
  },
  get demoExampleTitle() {
    return cy.get(`[data-cy="page-title"]`);
  },
};

describe("Demo app", () => {
  it("should be able to open basic example page", () => {
    pageObject.navigateHome();
    pageObject.demoExampleTitle.should("have.text", "Basic Example");
  });

  it("should load reCAPTCHA checkbox", () => {
    pageObject.navigateHome();
    pageObject.recaptchaCheckboxLabel.should("contain.text", "I'm not a robot");
  });

  it("should be able to change reCAPTCHA language on the website to French", () => {
    pageObject.navigateHome();
    pageObject.selectLanguage("fr");
    pageObject.recaptchaCheckboxLabel.should("contain.text", "Je ne suis pas un robot");
  });
});
