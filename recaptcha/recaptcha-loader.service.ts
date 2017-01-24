import {
  Inject,
  Injectable,
  OpaqueToken,
  Optional,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export const RECAPTCHA_LANGUAGE = new OpaqueToken('recaptcha-language');

@Injectable()
export class RecaptchaLoaderService {
  /** @internal */
  private static ready: BehaviorSubject<ReCaptchaV2.ReCaptcha>;

  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  /** @internal */
  private language: string;

  constructor( @Optional() @Inject(RECAPTCHA_LANGUAGE) language?: string) {
    this.language = language;
    this.init();
    this.ready = RecaptchaLoaderService.ready.asObservable();
  }

  /** @internal */
  private init() {
    if (RecaptchaLoaderService.ready) {
      return;
    }
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
