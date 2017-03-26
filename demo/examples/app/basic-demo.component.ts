import { Component } from '@angular/core';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './examples/app/basic-demo.component.html',
})
export class BasicDemoComponent {
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}
