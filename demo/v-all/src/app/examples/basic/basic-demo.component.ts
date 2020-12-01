import { Component } from '@angular/core';

import { RecaptchaErrorParameters } from 'ng-recaptcha';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './basic-demo.component.html',
})
export class BasicDemoComponent {
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters) {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
