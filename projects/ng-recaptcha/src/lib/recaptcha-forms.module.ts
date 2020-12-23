import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { RecaptchaCommonModule } from "./recaptcha-common.module";
import { RecaptchaValueAccessorDirective } from "./recaptcha-value-accessor.directive";

@NgModule({
  declarations: [RecaptchaValueAccessorDirective],
  exports: [RecaptchaValueAccessorDirective],
  imports: [FormsModule, RecaptchaCommonModule],
})
export class RecaptchaFormsModule {}
