import { NgModule } from '@angular/core';

import { RecaptchaCommonModule } from './recaptcha-common.module';
import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { RecaptchaComponent } from './recaptcha.component';

@NgModule({
  exports: [
    RecaptchaComponent,
  ],
  imports: [
    RecaptchaCommonModule,
  ],
  providers: [
    RecaptchaLoaderService,
  ],
})
export class RecaptchaModule {
  // We need this to maintain backwards-compatibility with v4. Removing this will be a breaking change
  public static forRoot() {
    return RecaptchaModule;
  }
}
