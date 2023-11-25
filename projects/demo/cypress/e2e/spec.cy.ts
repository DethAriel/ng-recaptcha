const pageObject = {
  navigateHome() {
    cy.visit("/");
  },
  navigateToInvisible() {
    cy.visit("/invisible");
  },
  navigateToV3() {
    cy.visit("/v3");
  },
  selectLanguage(language: "" | "fr" | "de") {
    cy.waitForPageReloadAfter(() => {
      cy.get(`[data-cy="language-settings-menu"]`).click();
      cy.get(`input[type=radio][value="${language}"]`).click();
    });
  },
  get recaptchaIframeBody() {
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
    pageObject.recaptchaIframeBody.should("contain.text", "I'm not a robot");
  });

  it("should be able to change reCAPTCHA language on the website to French", () => {
    pageObject.navigateHome();
    pageObject.selectLanguage("fr");
    pageObject.recaptchaIframeBody.should("contain.text", "Je ne suis pas un robot");
  });

  it("should be able to load invisible reCAPTCHA", () => {
    pageObject.navigateToInvisible();
    pageObject.recaptchaIframeBody.should("contain.text", "protected by reCAPTCHA");
  });

  it("should be able to load v3 reCAPTCHA successfully", () => {
    pageObject.navigateToV3();
    pageObject.demoExampleTitle.should("have.text", "reCAPTCHA v3 Example");
  });
});
