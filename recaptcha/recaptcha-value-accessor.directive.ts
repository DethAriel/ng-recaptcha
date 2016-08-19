import {
  Directive,
  forwardRef,
  HostListener,
  Provider,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { RecaptchaComponent } from './recaptcha.component';

export const RECAPTCHA_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  multi: true,
  useExisting: forwardRef(() => RecaptchaValueAccessorDirective),
});

@Directive({
  providers: [RECAPTCHA_VALUE_ACCESSOR],
  selector: 'recaptcha',
})
export class RecaptchaValueAccessorDirective implements ControlValueAccessor {
  /** @internal */
  private onChange: (value: string) => void;

  /** @internal */
  private onTouched: () => void;

  constructor(private host: RecaptchaComponent) { }

  public writeValue(value: string): void {
    if (!value) {
      this.host.reset();
    }
  }

  public registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  public registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  /** @internal */
  // tslint:disable-next-line:no-unused-variable
  @HostListener('resolved', ['$event']) private onResolve($event: string) {
    if (this.onChange) {
      this.onChange($event);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
