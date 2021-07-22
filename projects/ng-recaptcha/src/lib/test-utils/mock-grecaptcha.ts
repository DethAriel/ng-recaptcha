export type GrecaptchaMockedMethods = Record<
  keyof ReCaptchaV2.ReCaptcha,
  jasmine.Spy
>;
export type MockGrecaptchaType = GrecaptchaMockedMethods & {
  enterprise: GrecaptchaMockedMethods;
};

export class MockGrecaptcha implements MockGrecaptchaType {
  private mockWidgetId = 0;
  private latestResponse: string | null = null;
  private executionMap = new Map<
    string,
    { resolve(value: string): void; reject(reason: unknown): void }
  >();

  public execute = jasmine
    .createSpy("grecaptcha.execute")
    .and.callFake((...args: Parameters<ReCaptchaV2.ReCaptcha["execute"]>) => {
      if (args.length > 1) {
        return this.grecaptchaExecute(args[0], args[1]);
      }

      return undefined;
    });
  public getResponse = jasmine
    .createSpy("grecaptcha.getResponse")
    .and.callFake(() => this.latestResponse);
  public ready = jasmine.createSpy("grecaptcha.ready");
  public render = jasmine
    .createSpy("grecaptcha.render")
    .and.callFake(() => ++this.mockWidgetId);
  public reset = jasmine
    .createSpy("grecaptcha.reset")
    .and.callFake(() => (this.latestResponse = null));

  public get enterprise(): GrecaptchaMockedMethods {
    return this;
  }

  public emitGrecaptchaResponse(response: string): void {
    this.latestResponse = response;
    this.mostRecentRenderParams[1].callback(response);
  }

  public expireGrecaptchaResponse(): void {
    this.latestResponse = null;
    this.mostRecentRenderParams[1]["expired-callback"]();
  }

  public emitGrecaptchaError(): void {
    this.mostRecentRenderParams[1]["error-callback"]();
  }

  public expectNoErrorCallback(): void {
    expect(this.mostRecentRenderParams[1]["error-callback"]).toBeUndefined();
  }

  public executionFulfil(action: string, value: string): void {
    this.executionMap.get(action).resolve(value);
    this.executionMap.delete(action);
  }

  public executionReject(action: string, reason: unknown): void {
    this.executionMap.get(action).reject(reason);
    this.executionMap.delete(action);
  }

  private grecaptchaExecute(
    _siteKey: string,
    { action }: ReCaptchaV2.Action
  ): PromiseLike<string> {
    let resolve: (value: string) => void;
    let reject: () => void;
    const promise = new Promise<string>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    this.executionMap.set(action, { resolve, reject });

    return promise;
  }

  private get mostRecentRenderParams(): Parameters<
    ReCaptchaV2.ReCaptcha["render"]
  > {
    expect(this.render).toHaveBeenCalledTimes(1);
    const callArgs = this.render.calls.mostRecent().args as Parameters<
      ReCaptchaV2.ReCaptcha["render"]
    >;
    expect(callArgs.length).toEqual(2);

    return callArgs;
  }
}
