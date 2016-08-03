import { bootstrap }    from '@angular/platform-browser-dynamic';
import {
  Component, 
  provide,
} from '@angular/core';
import { RecaptchaComponent } from './recaptcha.component';
import { RecaptchaLoaderService } from './recaptcha-loader.service';

@Component({
    selector: 'my-app',
    template: `
        <section *ngIf="!siteKey">
            <label>
                Use this site key:
                <input type="string" [(ngModel)]="enteredSiteKey" />
            </label>
            <button (click)="siteKey = enteredSiteKey">Apply</button>
        </section>

        <section *ngIf="siteKey">
            <recaptcha (resolved)="resolved(1, $event)" [siteKey]="siteKey"></recaptcha>
            <button (click)="secondCaptchaVisible = !secondCaptchaVisible">Toggle another captcha</button>
            <recaptcha *ngIf="secondCaptchaVisible" (resolved)="resolved(2, $event)" [siteKey]="siteKey"></recaptcha>
        </section>
    `,
    directives: [RecaptchaComponent],
}) export class MyApp {
    siteKey: string;
    secondCaptchaVisible = false;

    resolved(captchaIndex: number, captchaResponse: string) {
        console.log(`Resolved captcha #${captchaIndex} with response:`);
        console.log(captchaResponse);
    }
}

bootstrap(MyApp, [
    provide(RecaptchaLoaderService, {
        useValue: new RecaptchaLoaderService("fr"),
    })
]);
