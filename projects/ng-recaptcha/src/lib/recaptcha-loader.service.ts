import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { filter } from "rxjs/operators";

import { loader } from "./load-script";
import {
  RECAPTCHA_LOADER_OPTIONS,
  RECAPTCHA_BASE_URL,
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_NONCE,
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaLoaderOptions,
} from "./tokens";

function toNonNullObservable<T>(subject: BehaviorSubject<T | null>): Observable<T> {
  return subject.asObservable().pipe(filter<T>((value) => value !== null));
}

@Injectable()
export class RecaptchaLoaderService {
  /**
   * @internal
   * @nocollapse
   */
  private static ready: BehaviorSubject<ReCaptchaV2.ReCaptcha | null> | null = null;

  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  /** @internal */
  private language?: string;
  /** @internal */
  private baseUrl?: string;
  /** @internal */
  private nonce?: string;
  /** @internal */
  private v3SiteKey?: string;
  /** @internal */
  private options?: RecaptchaLoaderOptions;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Optional() @Inject(RECAPTCHA_LANGUAGE) language?: string,
    @Optional() @Inject(RECAPTCHA_BASE_URL) baseUrl?: string,
    @Optional() @Inject(RECAPTCHA_NONCE) nonce?: string,
    @Optional() @Inject(RECAPTCHA_V3_SITE_KEY) v3SiteKey?: string,
    @Optional() @Inject(RECAPTCHA_LOADER_OPTIONS) options?: RecaptchaLoaderOptions,
  ) {
    this.language = language;
    this.baseUrl = baseUrl;
    this.nonce = nonce;
    this.v3SiteKey = v3SiteKey;
    this.options = options;
    const subject = this.init();
    this.ready = subject ? toNonNullObservable(subject) : of();
  }

  /** @internal */
  private init(): BehaviorSubject<ReCaptchaV2.ReCaptcha | null> | undefined {
    if (RecaptchaLoaderService.ready) {
      return RecaptchaLoaderService.ready;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return undefined;
    }

    const subject = new BehaviorSubject<ReCaptchaV2.ReCaptcha | null>(null);
    RecaptchaLoaderService.ready = subject;

    loader.newLoadScript({
      v3SiteKey: this.v3SiteKey,
      onBeforeLoad: (url) => {
        if (this.options?.onBeforeLoad) {
          return this.options.onBeforeLoad(url);
        }

        const newUrl = new URL(this.baseUrl ?? url);

        if (this.language) {
          newUrl.searchParams.set("hl", this.language);
        }

        return {
          url: newUrl,
          nonce: this.nonce,
        };
      },
      onLoaded: (recaptcha) => {
        let value = recaptcha;
        if (this.options?.onLoaded) {
          value = this.options.onLoaded(recaptcha);
        }

        subject.next(value);
      },
    });

    return subject;
  }
}
