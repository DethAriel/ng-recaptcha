import { forwardRef, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RecaptchaComponent } from './recaptcha.component';

export const RECAPTCHA_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RecaptchaValueAccessor),
    multi: true
};

@Directive({
  selector: 'recaptcha',
  host: {'(resolved)': 'onResolve($event)'},
  providers: [RECAPTCHA_VALUE_ACCESSOR]
})
export class RecaptchaValueAccessor implements ControlValueAccessor {
  /** @internal */
  onChange = (value: any) => {};
  /** @internal */
  onTouched = () => {};

  constructor(private host: RecaptchaComponent) { }

  writeValue(value: string): void {
    if (!value) {
      this.host.reset();
    }
  }

  /** @internal */
  private onResolve($event: any) {
      this.onChange($event);
      this.onTouched();
  }

  registerOnChange(fn: (value: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
