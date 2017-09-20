import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export const RECAPTCHA_LANGUAGE = new InjectionToken<string>('recaptcha-language');

@Injectable()
export class RecaptchaLoaderService {
  /**
   * @internal
   * @nocollapse
   */
  private static ready: BehaviorSubject<ReCaptchaV2.ReCaptcha>;

  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  /** @internal */
  private language: string;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: {},
    @Optional() @Inject(RECAPTCHA_LANGUAGE) language?: string,
  ) {
    this.language = language;
    this.init();
    this.ready = isPlatformBrowser(this.platformId) ? RecaptchaLoaderService.ready.asObservable() : Observable.of();
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
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded${langParam}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }
}
