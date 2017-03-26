import { Component } from '@angular/core';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './examples/app/invisible-demo.component.html',
})
export class InvisibleDemoComponent {
  public captchaResponse: string = '';
  public resolved(captchaResponse: string) {
    const newResponse = captchaResponse
      ? `${captchaResponse.substr(0, 7)}...${captchaResponse.substr(-7)}`
      : captchaResponse;
    this.captchaResponse += `${JSON.stringify(newResponse)}\n`;
  }
}
