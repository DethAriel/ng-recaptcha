import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export const RECAPTCHA_LANGUAGE = new InjectionToken<string>('recaptcha-language');
export const RECAPTCHA_BASE_URL = new InjectionToken<string>('recaptcha-base-url');

@Injectable()
export class RecaptchaLoaderService {
  /**
   * @internal
   * @nocollapse
   */
  private static ready: BehaviorSubject<ReCaptchaV2.ReCaptcha> = null;

  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  /** @internal */
  private language: string;
  /** @internal */
  private baseUrl: string;

  constructor(
    // tslint:disable-next-line:no-any
    @Inject(PLATFORM_ID) private readonly platformId: any,
    @Optional() @Inject(RECAPTCHA_LANGUAGE) language?: string,
    @Optional() @Inject(RECAPTCHA_BASE_URL) baseUrl?: string,
  ) {
    this.language = language;
    this.baseUrl = baseUrl;
    this.init();
    this.ready = isPlatformBrowser(this.platformId) ? RecaptchaLoaderService.ready.asObservable() : of();
  }

  /** @internal */
  private init() {
    if (RecaptchaLoaderService.ready) {
      return;
    }
    if (isPlatformBrowser(this.platformId)) {
      window.ng2recaptchaloaded = () => {
        RecaptchaLoaderService.ready.next(grecaptcha);
      };
      RecaptchaLoaderService.ready = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(null);
      const script = document.createElement('script') as HTMLScriptElement;
      script.innerHTML = '';
      const langParam = this.language ? '&hl=' + this.language : '';
      const baseUrl = this.baseUrl || 'https://www.google.com/recaptcha/api.js';
      script.src = `${baseUrl}?render=explicit&onload=ng2recaptchaloaded${langParam}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }
}
