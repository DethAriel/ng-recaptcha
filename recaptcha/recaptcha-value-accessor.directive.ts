import {
    Directive,
    forwardRef,
    Provider,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { RecaptchaComponent } from './recaptcha.component';

export const RECAPTCHA_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
    multi: true,
    useExisting: forwardRef(() => RecaptchaValueAccessor),
});

@Directive({
  selector: 'recaptcha',
  host: {'(resolved)': 'onResolve($event)'},
  providers: [RECAPTCHA_VALUE_ACCESSOR],
})
export class RecaptchaValueAccessor implements ControlValueAccessor {
  /** @internal */
  onChange: (value: string) => void;
  /** @internal */
  onTouched: () => void;

  constructor(private host: RecaptchaComponent) { }

  writeValue(value: string): void {
    if (!value) {
      this.host.reset();
    }
  }

  /** @internal */
  // tslint:disable-next-line:no-unused-variable
  private onResolve($event: string) {
      if (this.onChange) {
          this.onChange($event);
      }
      if (this.onTouched) {
          this.onTouched();
      }
  }

  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
