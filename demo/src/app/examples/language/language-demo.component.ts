import { Component } from '@angular/core';

@Component({
  selector: 'recaptcha-demo',
  templateUrl: './language-demo.component.html',
})
export class LanguageDemoComponent {
  public lang: string;

  constructor() {
    this.lang = 'fr';
  }
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}
