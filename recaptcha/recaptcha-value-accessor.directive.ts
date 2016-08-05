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
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private host: RecaptchaComponent) { }

  writeValue(value: string): void {
    if (value == null) {
        this.host.reset();
    }
  }

  onResolve($event: any) {
      this.onChange($event);
      this.onTouched();
  }

  registerOnChange(fn: (value: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
