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
  /**
   * @deprecated Using `forRoot()` method has not been necessary since v4.1.0. This method will be removed in `ng-recatcha@7`.
   */
  public static forRoot() {
    return RecaptchaModule;
  }
}
