import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { RecaptchaComponent, RecaptchaLoaderService } from 'ng2-recaptcha/ng2-recaptcha';

@Component({
    selector: 'my-app',
    template: `
        <recaptcha (resolved)="resolved($event)" [siteKey]="mySiteKey"></recaptcha>
    `,
    directives: [RecaptchaComponent],
}) export class MyApp {
    mySiteKey = localStorage.getItem("sitekey");

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
}

bootstrap(MyApp, [
    provide(RecaptchaLoaderService, {
        useValue: new RecaptchaLoaderService("de"),
    })
]);
