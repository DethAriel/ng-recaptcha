import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RecaptchaLoaderService } from './recaptcha-loader.service';

let nextId = 0;

@Component({
  selector: 'recaptcha',
  template: `<div [id]="id"></div>`,
})
export class RecaptchaComponent implements AfterViewInit, OnDestroy {
  @Input() public id = `ngrecaptcha-${nextId++}`;

  @Input() public siteKey: string;
  @Input() public theme: ReCaptchaV2.Theme;
  @Input() public type: ReCaptchaV2.Type;
  @Input() public size: ReCaptchaV2.Size;
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
      size: this.size,
      tabindex: this.tabIndex,
      theme: this.theme,
      type: this.type,
    });
  }
}
