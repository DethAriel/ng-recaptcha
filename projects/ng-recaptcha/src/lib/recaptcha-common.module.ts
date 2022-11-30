import { NgModule } from "@angular/core";

import { RecaptchaComponent } from "./recaptcha.component";

/**
 * @category Module
 */
@NgModule({
  declarations: [RecaptchaComponent],
  exports: [RecaptchaComponent],
})
export class RecaptchaCommonModule {}
