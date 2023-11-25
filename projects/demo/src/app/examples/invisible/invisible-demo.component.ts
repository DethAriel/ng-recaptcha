import { Component } from "@angular/core";

import { RecaptchaErrorParameters } from "ng-recaptcha";

@Component({
  selector: "recaptcha-demo",
  templateUrl: "./invisible-demo.component.html",
})
export class InvisibleDemoComponent {
  public captchaResponse = "";
  public resolved(captchaResponse: string): void {
    const newResponse = captchaResponse
      ? `${captchaResponse.substring(0, 7)}...${captchaResponse.substring(captchaResponse.length - 7)}`
      : captchaResponse;
    this.captchaResponse += `${JSON.stringify(newResponse)}\n`;
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    this.captchaResponse += `ERROR; error details (if any) have been logged to console\n`;
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }
}
