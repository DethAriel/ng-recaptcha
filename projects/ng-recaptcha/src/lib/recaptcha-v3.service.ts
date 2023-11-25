import { Inject, Injectable, NgZone } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { RECAPTCHA_V3_SITE_KEY } from "./tokens";
import { RecaptchaLoaderService } from "./recaptcha-loader.service";

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

export interface OnExecuteErrorData {
  /**
   * The name of the action that has been executed.
   */
  action: string;
  /**
   * The error which was encountered
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
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
  private readonly siteKey: string;
  /** @internal */
  private readonly zone: NgZone;
  /** @internal */
  private actionBacklog: ActionBacklogEntry[] | undefined;
  /** @internal */
  private grecaptcha: ReCaptchaV2.ReCaptcha;

  /** @internal */
  private onExecuteSubject: Subject<OnExecuteData>;
  /** @internal */
  private onExecuteErrorSubject: Subject<OnExecuteErrorData>;
  /** @internal */
  private onExecuteObservable: Observable<OnExecuteData>;
  /** @internal */
  private onExecuteErrorObservable: Observable<OnExecuteErrorData>;

  constructor(
    zone: NgZone,
    public recaptchaLoader: RecaptchaLoaderService,
    @Inject(RECAPTCHA_V3_SITE_KEY) siteKey: string,
  ) {
    this.zone = zone;
    this.siteKey = siteKey;

    this.init();
  }

  public get onExecute(): Observable<OnExecuteData> {
    if (!this.onExecuteSubject) {
      this.onExecuteSubject = new Subject<OnExecuteData>();
      this.onExecuteObservable = this.onExecuteSubject.asObservable();
    }

    return this.onExecuteObservable;
  }

  public get onExecuteError(): Observable<OnExecuteErrorData> {
    if (!this.onExecuteErrorSubject) {
      this.onExecuteErrorSubject = new Subject<OnExecuteErrorData>();
      this.onExecuteErrorObservable = this.onExecuteErrorSubject.asObservable();
    }

    return this.onExecuteErrorObservable;
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
    if (!this.grecaptcha) {
      if (!this.actionBacklog) {
        this.actionBacklog = [];
      }

      this.actionBacklog.push([action, subject]);
    } else {
      this.executeActionWithSubject(action, subject);
    }

    return subject.asObservable();
  }

  /** @internal */
  private executeActionWithSubject(action: string, subject: Subject<string>): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = (error: any) => {
      this.zone.run(() => {
        subject.error(error);
        if (this.onExecuteErrorSubject) {
          // We don't know any better at this point, unfortunately, so have to resort to `any`
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          this.onExecuteErrorSubject.next({ action, error });
        }
      });
    };

    this.zone.runOutsideAngular(() => {
      try {
        this.grecaptcha.execute(this.siteKey, { action }).then((token: string) => {
          this.zone.run(() => {
            subject.next(token);
            subject.complete();
            if (this.onExecuteSubject) {
              this.onExecuteSubject.next({ action, token });
            }
          });
        }, onError);
      } catch (e) {
        onError(e);
      }
    });
  }

  /** @internal */
  private init() {
    this.recaptchaLoader.ready.subscribe((value) => {
      this.grecaptcha = value;
      if (this.actionBacklog && this.actionBacklog.length > 0) {
        this.actionBacklog.forEach(([action, subject]) => this.executeActionWithSubject(action, subject));
        this.actionBacklog = undefined;
      }
    });
  }
}
