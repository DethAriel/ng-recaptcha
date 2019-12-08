import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { loadScript, RECAPTCHA_BASE_URL, RECAPTCHA_NONCE } from './recaptcha-loader.service';

export const RECAPTCHA_V3_SITE_KEY = new InjectionToken<string>('recaptcha-v3-site-key');

export interface OnExecuteData {
  /**
   * The name of the action that has been executed.
   */
  action: string;
  /**
   * The token that reCAPTCHA v3 provided when executing the action.
   */
  token: string;
}

type ActionBacklogEntry = [string, Subject<string>];

/**
 * The main service for working with reCAPTCHA v3 APIs.
 *
 * Use the `execute` method for executing a single action, and
 * `onExecute` observable for listening to all actions at once.
 */
@Injectable()
export class ReCaptchaV3Service {
  /** @internal */
  private readonly isBrowser: boolean;
  /** @internal */
  private readonly siteKey: string;
  /** @internal */
  private readonly zone: NgZone;
  /** @internal */
  private actionBacklog: ActionBacklogEntry[] | undefined;
  /** @internal */
  private nonce: string;
  /** @internal */
  private baseUrl: string;
  /** @internal */
  private grecaptcha: ReCaptchaV2.ReCaptcha;

  /** @internal */
  private onExecuteSubject: Subject<OnExecuteData>;
  /** @internal */
  private onExecuteObservable: Observable<OnExecuteData>;

  constructor(
    zone: NgZone,
    @Inject(RECAPTCHA_V3_SITE_KEY) siteKey: string,
    // tslint:disable-next-line:no-any
    @Inject(PLATFORM_ID) platformId: any,
    @Optional() @Inject(RECAPTCHA_BASE_URL) baseUrl?: string,
    @Optional() @Inject(RECAPTCHA_NONCE) nonce?: string,
  ) {
    this.zone = zone;
    this.isBrowser = isPlatformBrowser(platformId);
    this.siteKey = siteKey;
    this.nonce = nonce;
    this.baseUrl = baseUrl;

    this.grecaptcha = this.initGrecaptcha();
  }

  public get onExecute(): Observable<OnExecuteData> {
    if (!this.onExecuteSubject) {
      this.onExecuteSubject = new Subject<OnExecuteData>();
      this.onExecuteObservable = this.onExecuteSubject.asObservable();
    }

    return this.onExecuteObservable;
  }

  /**
   * Executes the provided `action` with reCAPTCHA v3 API.
   * Use the emitted token value for verification purposes on the backend.
   *
   * For more information about reCAPTCHA v3 actions and tokens refer to the official documentation at
   * https://developers.google.com/recaptcha/docs/v3.
   *
   * @param {string} action the action to execute
   * @returns {Observable<string>} an `Observable` that will emit the reCAPTCHA v3 string `token` value whenever ready.
   * The returned `Observable` completes immediately after emitting a value.
   */
  public execute(action: string): Observable<string> {
    const subject = new Subject<string>();
    if (this.isBrowser) {
      if (!this.grecaptcha) {
        // todo: add to array of later executions
        if (!this.actionBacklog) {
          this.actionBacklog = [];
        }

        this.actionBacklog.push([action, subject]);
      } else {
        this.executeActionWithSubject(action, subject);
      }
    }

    return subject.asObservable();
  }

  /** @internal */
  private executeActionWithSubject(action: string, subject: Subject<string>): void {
    this.zone.runOutsideAngular(() => {
      // tslint:disable-next-line:no-any
      (this.grecaptcha.execute as any)(
        this.siteKey,
        { action },
      ).then((token: string) => {
        this.zone.run(() => {
          subject.next(token);
          subject.complete();
          if (this.onExecuteSubject) {
            this.onExecuteSubject.next({ action, token });
          }
        });
      });
    });
  }

  /** @internal */
  private initGrecaptcha(): ReCaptchaV2.ReCaptcha {
    if (this.isBrowser) {
      if ('grecaptcha' in window) {
        return grecaptcha;
      } else {
        loadScript(this.siteKey, this.onLoadComplete, '', this.baseUrl, this.nonce);
      }
    }
    return null;
  }

  /** @internal */
  private onLoadComplete = (grecaptcha: ReCaptchaV2.ReCaptcha) => {
    this.grecaptcha = grecaptcha;
    if (this.actionBacklog && this.actionBacklog.length > 0) {
      this.actionBacklog.forEach(([action, subject]) => this.executeActionWithSubject(action, subject));
      this.actionBacklog = undefined;
    }
  }
}
