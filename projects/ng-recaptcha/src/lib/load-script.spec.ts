import { loader } from "./load-script";
import { MockGrecaptcha } from "./test-utils/mock-grecaptcha";

describe("script loader", () => {
  let scriptAppendSpy: jasmine.Spy;
  beforeEach(() => {
    scriptAppendSpy = spyOn(document.head, "appendChild").and.stub();
  });

  afterEach(() => {
    delete window.ng2recaptchaloaded;
    delete window.grecaptcha;
  });

  it("should add a script to document head", () => {
    // Arrange

    // Act
    loader.loadScript("explicit", () => void 0, "");

    // Assert
    expect(scriptAppendSpy).toHaveBeenCalled();
  });

  it("should setup script tag with nonce if provided", () => {
    // Arrange

    // Act
    loader.loadScript("explicit", () => void 0, "", undefined, "testNonce");

    // Assert
    expect(scriptAppendSpy).toHaveBeenCalled();
    const el = scriptAppendSpy.calls.mostRecent().args[0] as HTMLScriptElement;
    expect(el.nonce).toEqual("testNonce");
  });

  it("should setup onload callback via a window global", () => {
    // Arrange

    // Act
    loader.loadScript("explicit", () => void 0, "");

    // Assert
    expect(scriptAppendSpy).toHaveBeenCalled();
    const el = scriptAppendSpy.calls.mostRecent().args[0] as HTMLScriptElement;
    expect(el.src).toContain("onload=ng2recaptchaloaded");
    expect(window.ng2recaptchaloaded).toBeInstanceOf(Function);
  });

  it("should invoke provided onload callback via window global", () => {
    // Arrange
    const onLoadedSpy = jasmine.createSpy();
    const mockGrecaptchaValue = new MockGrecaptcha();

    // Act
    loader.loadScript("explicit", onLoadedSpy, "");
    window.grecaptcha = mockGrecaptchaValue;
    window.ng2recaptchaloaded();

    // Assert
    expect(onLoadedSpy).toHaveBeenCalledWith(mockGrecaptchaValue);
  });
});
