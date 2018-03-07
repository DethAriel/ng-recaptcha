import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecaptchaLoaderService {
  /**
   * @internal
   * @nocollapse
   */
  private static ready: BehaviorSubject<ReCaptchaV2.ReCaptcha> = null;

  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  constructor(
    // tslint:disable-next-line:no-any
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) {
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
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }
}
