import { Component } from "@angular/core";

@Component({
  selector: "recaptcha-demo",
  templateUrl: "./global-config-demo.component.html",
})
export class GlobalConfigDemoComponent {
  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
