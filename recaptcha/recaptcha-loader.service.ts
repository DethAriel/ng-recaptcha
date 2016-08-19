import {
  Injectable,
  Optional,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecaptchaLoaderService {
  /** @internal */
  private static _ready: BehaviorSubject<ReCaptchaV2.ReCaptcha>;

  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  /** @internal */
  private _language: string;

  constructor( @Optional() language?: string) {
    this._language = language;
    this._init();
    this.ready = RecaptchaLoaderService._ready.asObservable();
  }

  /** @internal */
  private _init() {
    if (RecaptchaLoaderService._ready) {
      return;
    }
    window.ng2recaptchaloaded = () => {
      RecaptchaLoaderService._ready.next(grecaptcha);
    };
    RecaptchaLoaderService._ready = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(null);
    let head = <HTMLHeadElement> document.head;
    let script = <HTMLScriptElement> document.createElement('script');
    script.innerHTML = '';
    let langParam = this._language ? '&hl=' + this._language : '';
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded${langParam}`;
    script.async = true;
    script.defer = true;
    head.appendChild(script);
  }
}
