import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { MockGrecaptcha } from "./mock-grecaptcha";

@Injectable()
export class MockRecaptchaLoaderService {
  private readySubject: BehaviorSubject<ReCaptchaV2.ReCaptcha> = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(
    null
  );

  private mockGrecaptcha = new MockGrecaptcha();

  public ready: Observable<ReCaptchaV2.ReCaptcha> = this.readySubject.asObservable();

  public init(): void {
    this.readySubject.next(this.mockGrecaptcha);
  }

  public get grecaptchaMock(): MockGrecaptcha {
    return this.mockGrecaptcha;
  }
}
