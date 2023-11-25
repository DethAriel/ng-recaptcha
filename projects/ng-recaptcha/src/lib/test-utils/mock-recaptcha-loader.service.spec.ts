import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { MockGrecaptcha } from "./mock-grecaptcha.spec";

@Injectable()
export class MockRecaptchaLoaderService {
  private readySubject: BehaviorSubject<ReCaptchaV2.ReCaptcha | null> =
    new BehaviorSubject<ReCaptchaV2.ReCaptcha | null>(null);

  private mockGrecaptcha = new MockGrecaptcha();

  public ready: Observable<ReCaptchaV2.ReCaptcha> = this.readySubject
    .asObservable()
    .pipe(filter<ReCaptchaV2.ReCaptcha>((v) => v != null));

  public init(): void {
    this.readySubject.next(this.mockGrecaptcha);
  }

  public get grecaptchaMock(): MockGrecaptcha {
    return this.mockGrecaptcha;
  }
}
