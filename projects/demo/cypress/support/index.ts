import "./commands";

let consoleErrorSpy: ReturnType<typeof cy.spy>;
let consoleWarnSpy: ReturnType<typeof cy.spy>;

function setupConsoleSpies(win: Cypress.AUTWindow) {
  consoleErrorSpy = cy.spy(win.console, "error");
  consoleWarnSpy = cy.spy(win.console, "warn");
}

function expectNoConsoleCalls() {
  expect(consoleErrorSpy != null).to.equal(true, "cypress error spy was not set up properly");
  expect(consoleWarnSpy != null).to.equal(true, "cypress warn spy was not set up properly");

  expect(consoleErrorSpy).to.have.callCount(0);

  const relevantConsoleWarnCalls = consoleWarnSpy
    .getCalls()
    .filter((call) => !call.args.some((arg) => typeof arg === "string" && arg.includes("webpack-dev-server")));

  expect(relevantConsoleWarnCalls).to.have.length(0);
}

Cypress.on("window:before:load", (win) => {
  setupConsoleSpies(win);
});

afterEach(() => {
  cy.window().then(expectNoConsoleCalls);
});
