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
export const RECAPTCHA_NONCE = new InjectionToken<string>('recaptcha-nonce-tag');

export function loadScript(
  renderMode: 'explicit' | string,
  onLoaded: (grecaptcha: ReCaptchaV2.ReCaptcha) => void,
  urlParams: string,
  url?: string,
  nonce?: string,
) {
  window.ng2recaptchaloaded = () => {
    onLoaded(grecaptcha);
  };
  const script = document.createElement('script');
  script.innerHTML = '';
  const baseUrl = url || 'https://www.google.com/recaptcha/api.js';

  script.src = `${baseUrl}?render=${renderMode}&onload=ng2recaptchaloaded${urlParams}`;
  if (nonce) {
    // tslint:disable-next-line:no-any Remove "any" cast once we upgrade Angular to 7 and TypeScript along with it
    (script as any).nonce = nonce;
  }
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

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
  /** @internal */
  private nonce: string;

  constructor(
    // tslint:disable-next-line:no-any
    @Inject(PLATFORM_ID) private readonly platformId: any,
    @Optional() @Inject(RECAPTCHA_LANGUAGE) language?: string,
    @Optional() @Inject(RECAPTCHA_BASE_URL) baseUrl?: string,
    @Optional() @Inject(RECAPTCHA_NONCE) nonce?: string,
  ) {
    this.language = language;
    this.baseUrl = baseUrl;
    this.nonce = nonce;
    this.init();
    this.ready = isPlatformBrowser(this.platformId) ? RecaptchaLoaderService.ready.asObservable() : of();
  }

  /** @internal */
  private init() {
    if (RecaptchaLoaderService.ready) {
      return;
    }
    if (isPlatformBrowser(this.platformId)) {
      const subject = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(null);
      RecaptchaLoaderService.ready = subject;
      const langParam = this.language ? '&hl=' + this.language : '';
      loadScript('explicit', (grecaptcha) => subject.next(grecaptcha), langParam, this.baseUrl, this.nonce);
    }
  }
}
