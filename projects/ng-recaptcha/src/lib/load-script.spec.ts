import { loader } from "./load-script";
import { MockGrecaptcha } from "./test-utils/mock-grecaptcha";

describe("script loader", () => {
  let mockLoadScript: (...params: Parameters<(typeof loader)["loadScript"]>) => {
    scriptTag: HTMLScriptElement;
    scriptUrl: URL;
    scriptUrlSearchParams: URLSearchParams;
  };

  beforeEach(() => {
    const scriptAppendSpy = spyOn(document.head, "appendChild").and.stub();
    mockLoadScript = (...params) => {
      loader.loadScript(...params);

      expect(scriptAppendSpy).toHaveBeenCalledTimes(1);

      const scriptTag = scriptAppendSpy.calls.mostRecent().args[0] as HTMLScriptElement;
      const scriptUrl = new URL(scriptTag.src);
      const scriptUrlSearchParams = new URLSearchParams(scriptUrl.searchParams);

      return {
        scriptTag,
        scriptUrl,
        scriptUrlSearchParams,
      };
    };
  });

  afterEach(() => {
    delete window.ng2recaptchaloaded;
    delete window.grecaptcha;
  });

  it("should add a script to document head", () => {
    // Arrange + Act + Assert
    mockLoadScript("explicit", () => void 0);
  });

  it("should setup script tag with nonce if provided", () => {
    // Arrange + Act
    const { scriptTag } = mockLoadScript("explicit", () => void 0, { nonce: "testNonce" });

    // Assert
    expect(scriptTag.nonce).toEqual("testNonce");
  });

  it("should load recaptcha from the correct domain", () => {
    // Arrange + Act
    const { scriptUrl } = mockLoadScript("explicit", () => void 0);

    // Assert
    expect(scriptUrl.host).toEqual("www.google.com");
  });

  it("should load recaptcha with explicit render mode by default", () => {
    // Arrange + Act
    const { scriptUrlSearchParams } = mockLoadScript("explicit", () => void 0);

    // Assert
    expect(scriptUrlSearchParams.get("render")).toEqual("explicit");
  });

  it("should load recaptcha with correct language when the lang param is provided", () => {
    // Arrange + Act
    const { scriptUrlSearchParams } = mockLoadScript("explicit", () => void 0, { lang: "TEST-LANG" });

    // Assert
    expect(scriptUrlSearchParams.get("hl")).toEqual("TEST-LANG");
  });

  it("should load recaptcha with site key render mode when key is provided", () => {
    // Arrange + Act
    const { scriptUrlSearchParams } = mockLoadScript({ key: "test-key" }, () => void 0);

    // Assert
    expect(scriptUrlSearchParams.get("render")).toEqual("test-key");
  });

  it("should load recaptcha from the correct base url when one is provided domain", () => {
    // Arrange + Act
    const { scriptUrl } = mockLoadScript("explicit", () => void 0, { url: "https://www.test-base-url.com/script.js" });

    // Assert
    expect(scriptUrl.protocol).toEqual("https:");
    expect(scriptUrl.host).toEqual("www.test-base-url.com");
    expect(scriptUrl.pathname).toEqual("/script.js");
  });

  it("should load recaptcha with trusted types", () => {
    // Note: see https://developers.google.com/recaptcha/docs/v3#tips
    // Arrange + Act
    const { scriptUrlSearchParams } = mockLoadScript("explicit", () => void 0);

    // Assert
    expect(scriptUrlSearchParams.get("trustedtypes")).toEqual("true");
  });

  it("should setup onload callback via a window global", () => {
    // Arrange + Act
    const { scriptUrlSearchParams } = mockLoadScript("explicit", () => void 0);

    // Assert
    expect(scriptUrlSearchParams.get("onload")).toEqual("ng2recaptchaloaded");
    expect(window.ng2recaptchaloaded).toBeInstanceOf(Function);
  });

  it("should invoke provided onload callback via window global", () => {
    // Arrange
    const onLoadedSpy = jasmine.createSpy();
    const mockGrecaptchaValue = new MockGrecaptcha();

    // Act
    mockLoadScript("explicit", onLoadedSpy);
    window.grecaptcha = mockGrecaptchaValue;
    window.ng2recaptchaloaded();

    // Assert
    expect(onLoadedSpy).toHaveBeenCalledWith(mockGrecaptchaValue);
  });
});
