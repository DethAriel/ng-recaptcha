import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from './recaptcha-settings';

let nextId = 0;

@Component({
  exportAs: 'reCaptcha',
  selector: 're-captcha',
  template: ``,
})
export class RecaptchaComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input()
  @HostBinding('attr.id')
  public id = `ngrecaptcha-${nextId++}`;

  @Input() public siteKey: string;
  @Input() public theme: ReCaptchaV2.Theme;
  @Input() public type: ReCaptchaV2.Type;
  @Input() public size: ReCaptchaV2.Size;
  @Input() public tabIndex: number;
  @Input() public badge: ReCaptchaV2.Badge;
  @Input() public lang: string;

  @Output() public resolved = new EventEmitter<string>();

  /** @internal */
  private subscription: Subscription;
  /** @internal */
  private widget: number;
  /** @internal */
  private grecaptcha: ReCaptchaV2.ReCaptcha;

  private allowedLangs = [
    'ar', 'af', 'am', 'hy', 'az', 'eu', 'bn', 'bg', 'ca', 'zh-HK', 'zh-CN', 'zh-TW', 'hr', 'cs', 'da', 'nl', 'en-GB',
    'en', 'et', 'fil', 'fi', 'fr', 'fr-CA', 'gl', 'ka', 'de', 'de-AT', 'de-CH', 'el', 'gu', 'iw', 'hi', 'hu', 'is',
    'id', 'it', 'ja', 'kn', 'ko', 'lo', 'lv', 'lt', 'ms', 'ml', 'mr', 'mn', 'no', 'fa', 'pl', 'pt', 'pt-BR', 'pt-PT',
    'ro', 'ru', 'sr', 'si', 'sk', 'sl', 'es', 'es-419', 'sw', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'zu',
  ];

  constructor(
    private elementRef: ElementRef,
    private loader: RecaptchaLoaderService,
    private zone: NgZone,
    @Optional() @Inject(RECAPTCHA_SETTINGS) settings?: RecaptchaSettings,
  ) {
    if (settings) {
      this.siteKey = settings.siteKey;
      this.theme = settings.theme;
      this.type = settings.type;
      this.size = settings.size;
      this.badge = settings.badge;
      this.lang = settings.lang;
    }
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
    this.grecaptchaReset();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const prop: string = 'lang';
    if (changes != null && changes[prop] != null && changes[prop].currentValue !== changes[prop].previousValue) {
      this.useLang(changes[prop].currentValue);
    }
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
      this.grecaptcha.execute(this.widget);
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

      this.grecaptchaReset();
    }
  }

  /**
   * Change the widget language
   *
   * @internal
   */
  private useLang(lang: string): void {
    if (this.widget != null && this.elementRef != null && lang != null && this.allowedLangs.indexOf(lang) !== -1) {
      if (this.grecaptcha.getResponse(this.widget)) {
        this.resolved.emit(null);
      }
      const iframe = this.elementRef.nativeElement.querySelector('iframe');
      if (iframe && iframe.src) {
        let s = iframe.src;
        if (/[?&]hl=/.test(s)) {
            s = s.replace(/([?&]hl=)[\w-_]+(&.*)?$/, '$1' + lang + '$2');
        } else {
            s += ((s.indexOf('?') === -1) ? '?' : '&') + 'hl=' + lang;
        }
        iframe.src = s;
      }
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
  private grecaptchaReset() {
    if (this.widget != null) {
      this.zone.runOutsideAngular(() => this.grecaptcha.reset(this.widget));
    }
  }

  /** @internal */
  private renderRecaptcha() {
    this.widget = this.grecaptcha.render(this.elementRef.nativeElement, {
      badge: this.badge,
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
    this.useLang(this.lang);
  }
}
