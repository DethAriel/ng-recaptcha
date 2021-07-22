import { Directive, forwardRef, HostListener } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { RecaptchaComponent } from "./recaptcha.component";

@Directive({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => RecaptchaValueAccessorDirective),
    },
  ],
  // tslint:disable-next-line:directive-selector
  selector:
    "re-captcha[formControlName],re-captcha[formControl],re-captcha[ngModel]",
})
export class RecaptchaValueAccessorDirective implements ControlValueAccessor {
  /** @internal */
  private onChange: (value: string) => void;

  /** @internal */
  private onTouched: () => void;

  private requiresControllerReset = false;

  constructor(private host: RecaptchaComponent) {}

  public writeValue(value: string): void {
    if (!value) {
      this.host.reset();
    } else {
      // In this case, it is most likely that a form controller has requested to write a specific value into the component.
      // This isn't really a supported case - reCAPTCHA values are single-use, and, in a sense, readonly.
      // What this means is that the form controller has recaptcha control state of X, while reCAPTCHA itself can't "restore"
      // to that state. In order to make form controller aware of this discrepancy, and to fix the said misalignment,
      // we'll be telling the controller to "reset" the value back to null.
      if (
        this.host.__unsafe_widgetValue !== value &&
        Boolean(this.host.__unsafe_widgetValue) === false
      ) {
        this.requiresControllerReset = true;
      }
    }
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    if (this.requiresControllerReset) {
      this.requiresControllerReset = false;
      this.onChange(null);
    }
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  @HostListener("resolved", ["$event"]) public onResolve($event: string): void {
    if (this.onChange) {
      this.onChange($event);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
