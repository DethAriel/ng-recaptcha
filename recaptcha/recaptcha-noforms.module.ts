import { ModuleWithProviders, NgModule } from '@angular/core';

import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { RecaptchaComponent } from './recaptcha.component';

@NgModule({
  declarations: [ RecaptchaComponent ],
  exports: [ RecaptchaComponent ],
})
export class RecaptchaNoFormsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RecaptchaNoFormsModule,
      providers: [
        RecaptchaLoaderService,
      ],
    };
  }
}
