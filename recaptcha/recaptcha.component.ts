import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RecaptchaLoaderService } from './recaptcha-loader.service';

let nextId = 0;

@Component({
  exportAs: 'reCaptcha',
  selector: 'recaptcha',
  template: ``,
})
export class RecaptchaComponent implements AfterViewInit, OnDestroy {
  @Input()
  @HostBinding('attr.id')
  public id = `ngrecaptcha-${nextId++}`;

  @Input() public siteKey: string;
  @Input() public theme: ReCaptchaV2.Theme;
  @Input() public type: ReCaptchaV2.Type;
  @Input() public size: ReCaptchaV2.Size | 'invisible';
  @Input() public tabIndex: number;

  @Output() public resolved = new EventEmitter<string>();

  /** @internal */
  private subscription: Subscription;
  /** @internal */
  private widget: number;
  /** @internal */
  private grecaptcha: ReCaptchaV2.ReCaptcha;

  constructor(
    private loader: RecaptchaLoaderService,
    private zone: NgZone,
  ) {
  }

  public ngAfterViewInit() {
    this.subscription = this.loader.ready.subscribe((grecaptcha: ReCaptchaV2.ReCaptcha) => {
      if (grecaptcha != null) {
        this.grecaptcha = grecaptcha;
        this.renderRecaptcha();
      }
    });
  }

  public ngOnDestroy() {
    // reset the captcha to ensure it does not leave anything behind
    // after the component is no longer needed
    if (this.widget != null) {
      this.grecaptcha.reset(this.widget);
    }
    this.subscription.unsubscribe();
  }

  /**
   * Executes the invisible recaptcha.
   * Does nothing if component's size is not set to "invisible".
   */
  public execute(): void {
    if (this.size !== 'invisible') {
      return;
    }

    if (this.widget != null) {
      // tslint:disable-next-line:no-any
      (this.grecaptcha as any).execute(this.widget);
    }
  }

  public reset() {
    if (this.widget != null) {
      if (this.grecaptcha.getResponse(this.widget)) {
        // Only emit an event in case if something would actually change.
        // That way we do not trigger "touching" of the control if someone does a "reset"
        // on a non-resolved captcha.
        this.resolved.emit(null);
      }

      this.grecaptcha.reset(this.widget);
    }
  }

  /** @internal */
  private expired() {
    this.resolved.emit(null);
  }

  /** @internal */
  private captchaReponseCallback(response: string) {
    this.resolved.emit(response);
  }

  /** @internal */
  private renderRecaptcha() {
    this.widget = this.grecaptcha.render(this.id, {
      callback: (response: string) => {
        this.zone.run(() => this.captchaReponseCallback(response));
      },
      'expired-callback': () => {
        this.zone.run(() => this.expired());
      },
      sitekey: this.siteKey,
      // tslint:disable-next-line:no-any
      size: this.size as any,
      tabindex: this.tabIndex,
      theme: this.theme,
      type: this.type,
    });
  }
}
