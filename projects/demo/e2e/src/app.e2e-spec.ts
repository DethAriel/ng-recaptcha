import { AppPage } from "./app.po";
import { browser, logging } from "protractor";

describe("Demo app", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should be able to open basic example page", async () => {
    await page.navigateTo();
    expect(await page.getPageTitleText()).toEqual("Basic Example");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry),
    );
  });
});
