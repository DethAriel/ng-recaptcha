import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, Injectable, provide } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { RecaptchaComponent, RecaptchaLoaderService } from 'ng2-recaptcha/ng2-recaptcha';

@Injectable()
export class PreloadedRecaptchaAPIService {
    public ready: Observable<boolean>;

    constructor() { 
        let readySubject = new BehaviorSubject<boolean>(true);
        this.ready = readySubject.asObservable();
    }
}

@Component({
    selector: 'my-app',
    template: `
        <recaptcha (resolved)="resolved($event)" [siteKey]="mySiteKey"></recaptcha>
    `,
    directives: [RecaptchaComponent],
}) 
export class MyApp {
    mySiteKey = localStorage.getItem("sitekey");

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
}

bootstrap(MyApp, [
    provide(RecaptchaLoaderService, {
        useValue: new PreloadedRecaptchaAPIService(),
    })
]);
