import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { RecaptchaValueAccessorDirective } from './recaptcha-value-accessor.directive';
import { RecaptchaComponent } from './recaptcha.component';

@NgModule({
  declarations: [
    RecaptchaValueAccessorDirective,
    RecaptchaComponent,
  ],
  exports: [RecaptchaComponent, RecaptchaValueAccessorDirective],
  imports: [FormsModule],
})
export class RecaptchaModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RecaptchaModule,
      providers: [RecaptchaLoaderService],
    };
  }
}
