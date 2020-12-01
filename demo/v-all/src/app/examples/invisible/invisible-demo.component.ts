import { Component } from '@angular/core';

import { RecaptchaErrorParameters } from 'ng-recaptcha';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './invisible-demo.component.html',
})
export class InvisibleDemoComponent {
  public captchaResponse: string = '';
  public resolved(captchaResponse: string) {
    const newResponse = captchaResponse
      ? `${captchaResponse.substr(0, 7)}...${captchaResponse.substr(-7)}`
      : captchaResponse;
    this.captchaResponse += `${JSON.stringify(newResponse)}\n`;
  }

  public onError(errorDetails: RecaptchaErrorParameters) {
    this.captchaResponse += `ERROR; error details (if any) have been logged to console\n`;
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
