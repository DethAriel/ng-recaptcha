import { NgModule } from "@angular/core";

import { RecaptchaCommonModule } from "./recaptcha-common.module";
import { RecaptchaLoaderService } from "./recaptcha-loader.service";
import { RecaptchaComponent } from "./recaptcha.component";

@NgModule({
  exports: [RecaptchaComponent],
  imports: [RecaptchaCommonModule],
  providers: [RecaptchaLoaderService],
})
export class RecaptchaModule {}
