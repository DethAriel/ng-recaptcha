import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { loadScript, RECAPTCHA_BASE_URL, RECAPTCHA_NONCE } from './recaptcha-loader.service';

export const RECAPTCHA_V3_SITE_KEY = new InjectionToken<string>('recaptcha-v3-site-key');

export interface OnExecuteData {
  action: string;
  token: string;
}

type ActionBacklogEntry = [string, Subject<string>];

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
    @Inject(PLATFORM_ID) platformId: {},
    @Optional() @Inject(RECAPTCHA_BASE_URL) baseUrl?: string,
    @Optional() @Inject(RECAPTCHA_NONCE) nonce?: string,
  ) {
    this.zone = zone;
    this.isBrowser = isPlatformBrowser(platformId);
    this.siteKey = siteKey;
    this.nonce = nonce;
    this.baseUrl = baseUrl;

    this.init();
  }

  public get onExecute(): Observable<OnExecuteData> {
    if (!this.onExecuteSubject) {
      this.onExecuteSubject = new Subject<OnExecuteData>();
      this.onExecuteObservable = this.onExecuteSubject.asObservable();
    }

    return this.onExecuteObservable;
  }

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
  private init() {
    if (this.isBrowser) {
      if ('grecaptcha' in window) {
        this.grecaptcha = grecaptcha;
      } else {
        loadScript(this.siteKey, this.onLoadComplete, '', this.baseUrl, this.nonce);
      }
    }
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
