import { ModuleWithProviders, NgModule } from '@angular/core';

import { RecaptchaCommonModule } from './recaptcha-common.module';
import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { RecaptchaComponent } from './recaptcha.component';

@NgModule({
  exports: [RecaptchaComponent],
  imports: [RecaptchaCommonModule],
})
export class RecaptchaModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RecaptchaModule,
      providers: [
        RecaptchaLoaderService,
      ],
    };
  }
}
