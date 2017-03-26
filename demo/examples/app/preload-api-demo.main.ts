import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { RecaptchaLoaderService, RecaptchaModule } from 'ng-recaptcha';

import { PreloadApiDemoComponent } from './preload-api-demo.component';

@Injectable()
export class PreloadedRecaptchaAPIService {
  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  constructor() {
    const readySubject = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(grecaptcha);
    this.ready = readySubject.asObservable();
  }
}

@NgModule({
  bootstrap: [PreloadApiDemoComponent],
  declarations: [PreloadApiDemoComponent],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
  providers: [
    {
      provide: RecaptchaLoaderService,
      useValue: new PreloadedRecaptchaAPIService(),
    },
  ],
})
export class DemoModule { }

platformBrowserDynamic().bootstrapModule(DemoModule);
