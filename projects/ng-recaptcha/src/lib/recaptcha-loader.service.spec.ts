import { NgModule, PLATFORM_ID, Provider } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Observable } from "rxjs";

import {
  RecaptchaLoaderService,
  RECAPTCHA_BASE_URL,
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_NONCE,
  RECAPTCHA_V3_SITE_KEY,
} from "..";
import { loader } from "./load-script";
import { MockGrecaptcha } from "./test-utils/mock-grecaptcha";

describe("RecaptchaLoaderService", () => {
  let loadScriptStub: jasmine.Spy;
  beforeEach(() => {
    loadScriptStub = spyOn(loader, "loadScript").and.stub();
  });

  afterEach(() => {
    // @ts-expect-error we are deliberately resetting this to allow for better unit test isolation
    RecaptchaLoaderService.ready = null;
  });

  function initService(additionalProviders: Provider[] = []) {
    TestBed.configureTestingModule({
      providers: [RecaptchaLoaderService, ...additionalProviders],
    });
    const service = TestBed.inject(RecaptchaLoaderService);

    return service;
  }

  it("should have a 'ready' observable", () => {
    // Arrange
    const service = initService();

    // Act

    // Assert
    expect(service.ready).not.toBeNull();
    expect(service.ready).toBeInstanceOf(Observable);
  });

  it("should invoke script loader upon initialization", () => {
    // Arrange
    initService();

    // Act

    // Assert
    expect(loader.loadScript).toHaveBeenCalled();
  });

  it("should invoke script loader passing injected arguments through", () => {
    // Arrange
    initService([
      {
        provide: RECAPTCHA_LANGUAGE,
        useValue: "testLang",
      },
      {
        provide: RECAPTCHA_BASE_URL,
        useValue: "testUrl",
      },
      {
        provide: RECAPTCHA_NONCE,
        useValue: "testNonce",
      },
    ]);

    // Act

    // Assert
    expect(loader.loadScript).toHaveBeenCalledWith(
      "explicit",
      jasmine.any(Function),
      "&hl=testLang",
      "testUrl",
      "testNonce"
    );
  });

  it("should invoke script loader with v3 site key if provided", () => {
    // Arrange
    initService([
      {
        provide: RECAPTCHA_V3_SITE_KEY,
        useValue: "testSiteKeyV3",
      },
    ]);

    // Act

    // Assert
    expect(loader.loadScript).toHaveBeenCalledWith(
      "testSiteKeyV3",
      jasmine.any(Function),
      "",
      null,
      null
    );
  });

  it("should not invoke script loader if platform is not browser", () => {
    // Arrange
    initService([
      {
        provide: PLATFORM_ID,
        useValue: {},
      },
    ]);

    // Act

    // Assert
    expect(loader.loadScript).not.toHaveBeenCalled();
  });

  it("should emit grecaptcha through observable after script loading finished", () => {
    // Arrange
    const service = initService();
    let resolvedValue: ReCaptchaV2.ReCaptcha;
    service.ready.subscribe((value) => (resolvedValue = value));
    const mockGrecaptchaValue = new MockGrecaptcha();

    // Act
    const callArgs = loadScriptStub.calls.mostRecent().args as Parameters<
      typeof loader["loadScript"]
    >;
    callArgs[1](mockGrecaptchaValue);

    // Assert
    expect(resolvedValue).toBeTruthy();
    expect(resolvedValue === mockGrecaptchaValue).toBeTrue();
  });

  it("should not invoke script loader more than once if service was created multiple times through different modules", () => {
    // Arrange
    let service1: RecaptchaLoaderService;
    let service2: RecaptchaLoaderService;
    @NgModule({
      providers: [
        {
          provide: RecaptchaLoaderService,
          useFactory(platformId: unknown) {
            service1 = new RecaptchaLoaderService(platformId);
            return service1;
          },
          deps: [PLATFORM_ID],
          multi: true,
        },
      ],
    })
    class TestModule1 {}
    TestBed.configureTestingModule({
      imports: [TestModule1],
      providers: [
        {
          provide: RecaptchaLoaderService,
          useFactory(platformId: unknown) {
            service2 = new RecaptchaLoaderService(platformId);
            return service2;
          },
          deps: [PLATFORM_ID],
          multi: true,
        },
      ],
    });

    // Act
    TestBed.inject(RecaptchaLoaderService);

    // Assert
    expect(service1).toBeTruthy();
    expect(service2).toBeTruthy();
    expect(service1 !== service2).toBeTrue();
    expect(loader.loadScript).toHaveBeenCalledTimes(1);
  });
});
