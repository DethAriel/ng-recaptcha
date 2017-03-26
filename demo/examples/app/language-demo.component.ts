import { Component } from '@angular/core';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './examples/app/language-demo.component.html',
})
export class LanguageDemoComponent {
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}
