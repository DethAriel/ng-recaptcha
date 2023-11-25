export type GrecaptchaMockedMethods = Record<keyof ReCaptchaV2.ReCaptcha, jasmine.Spy>;
export type MockGrecaptchaType = GrecaptchaMockedMethods & {
  enterprise: GrecaptchaMockedMethods;
};

export class MockGrecaptcha implements MockGrecaptchaType, ReCaptchaV2.ReCaptcha {
  private mockWidgetId = 0;
  private latestResponse: string | null = null;
  private executionMap = new Map<string, { resolve(value: string): void; reject(reason: unknown): void }>();

  public execute = jasmine
    .createSpy("grecaptcha.execute")
    .and.callFake((...args: Parameters<ReCaptchaV2.ReCaptcha["execute"]>) => {
      if (args.length > 1) {
        return this.grecaptchaExecute(args[0], args[1]);
      }

      return undefined;
    });
  public getResponse = jasmine.createSpy("grecaptcha.getResponse").and.callFake(() => this.latestResponse);
  public ready = jasmine.createSpy("grecaptcha.ready");
  public render = jasmine.createSpy("grecaptcha.render").and.callFake(() => ++this.mockWidgetId);
  public reset = jasmine.createSpy("grecaptcha.reset").and.callFake(() => (this.latestResponse = null));

  public get enterprise(): GrecaptchaMockedMethods {
    return this;
  }

  public emitGrecaptchaResponse(response: string): void {
    this.latestResponse = response;
    const callback = this.mostRecentRenderParams["callback"];
    if (typeof callback !== "function") {
      throw new Error(`Expected 'callback' to be a function, but got "${typeof callback}" instead`);
    }
    callback(response);
  }

  public expireGrecaptchaResponse(): void {
    this.latestResponse = null;

    const expiredCallback = this.mostRecentRenderParams["expired-callback"];
    if (typeof expiredCallback !== "function") {
      throw new Error(`Expected 'expiredCallback' to be a function, but got "${typeof expiredCallback}" instead`);
    }
    expiredCallback();
  }

  public emitGrecaptchaError(): void {
    const errorCallback = this.mostRecentRenderParams["error-callback"];
    if (typeof errorCallback !== "function") {
      throw new Error(`Expected 'errorCallback' to be a function, but got "${typeof errorCallback}" instead`);
    }

    errorCallback();
  }

  public expectNoErrorCallback(): void {
    const errorCallback = this.mostRecentRenderParams["error-callback"];
    expect(errorCallback).toBeUndefined();
  }

  public executionFulfil(action: string, value: string): void {
    const actionPromiseCallbacks = this.executionMap.get(action);
    if (actionPromiseCallbacks == null) {
      throw new Error(`Expected "${action}" to be present, but it can't be found`);
    }
    actionPromiseCallbacks.resolve(value);
    this.executionMap.delete(action);
  }

  public executionReject(action: string, reason: unknown): void {
    const actionPromiseCallbacks = this.executionMap.get(action);
    if (actionPromiseCallbacks == null) {
      throw new Error(`Expected "${action}" to be present, but it can't be found`);
    }
    actionPromiseCallbacks.reject(reason);
    this.executionMap.delete(action);
  }

  private grecaptchaExecute(_siteKey: string, { action }: ReCaptchaV2.Action): PromiseLike<string> {
    let resolve: (value: string) => void;
    let reject: () => void;
    const promise = new Promise<string>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    // @ts-expect-error Typescript thinks that the variable is used before being assigned, but this isn't how promise construction works. `Promise.withResolvers()` should address this issue - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
    this.executionMap.set(action, { resolve, reject });

    return promise;
  }

  private get mostRecentRenderParams(): ReCaptchaV2.Parameters {
    expect(this.render).toHaveBeenCalledTimes(1);
    const callArgs = this.render.calls.mostRecent().args as Parameters<ReCaptchaV2.ReCaptcha["render"]>;
    expect(callArgs.length).toEqual(2);

    return callArgs[1]!;
  }
}
