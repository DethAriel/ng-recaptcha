import { browser, by, element } from "protractor";

export class AppPage {
  async navigateTo(): Promise<unknown> {
    console.log(browser.baseUrl);

    return browser.get(browser.baseUrl);
  }

  async getPageTitleText(): Promise<string> {
    return element(by.css("[data-testid=page-title]")).getText();
  }
}
