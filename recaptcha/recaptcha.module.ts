import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RecaptchaCommonModule } from './recaptcha-common.module';
import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { RecaptchaValueAccessorDirective } from './recaptcha-value-accessor.directive';
import { RecaptchaComponent } from './recaptcha.component';

@NgModule({
  declarations: [
    RecaptchaValueAccessorDirective,
  ],
  exports: [RecaptchaComponent, RecaptchaValueAccessorDirective],
  imports: [FormsModule, RecaptchaCommonModule],
})
export class RecaptchaModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RecaptchaModule,
      providers: [RecaptchaLoaderService],
    };
  }
}
