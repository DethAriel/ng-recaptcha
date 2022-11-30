import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";

import { loader } from "./load-script";
import { RECAPTCHA_BASE_URL, RECAPTCHA_LANGUAGE, RECAPTCHA_NONCE, RECAPTCHA_V3_SITE_KEY } from "./tokens";

/**
 * @category Service
 */
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
  /** @internal */
  private v3SiteKey: string;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Optional() @Inject(RECAPTCHA_LANGUAGE) language?: string,
    @Optional() @Inject(RECAPTCHA_BASE_URL) baseUrl?: string,
    @Optional() @Inject(RECAPTCHA_NONCE) nonce?: string,
    @Optional() @Inject(RECAPTCHA_V3_SITE_KEY) v3SiteKey?: string
  ) {
    this.language = language;
    this.baseUrl = baseUrl;
    this.nonce = nonce;
    this.v3SiteKey = v3SiteKey;
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
      const langParam = this.language ? "&hl=" + this.language : "";

      const renderMode = this.v3SiteKey || "explicit";
      loader.loadScript(renderMode, (grecaptcha) => subject.next(grecaptcha), langParam, this.baseUrl, this.nonce);
    }
  }
}
