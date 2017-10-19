import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { RecaptchaLoaderService, RecaptchaModule } from 'ng-recaptcha';

import { PAGE_SETTINGS } from '../../demo-wrapper/demo-wrapper.component';
import { DemoWrapperModule } from '../../demo-wrapper/demo-wrapper.module';
import { PreloadApiDemoComponent } from './preload-api-demo.component';
import { settings } from './preload-api-demo.data';

@Injectable()
export class PreloadedRecaptchaAPIService {
  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  constructor() {
    const readySubject = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(null);
    this.ready = readySubject.asObservable();

    const interval = setInterval(() => {
      if (typeof grecaptcha === 'undefined') {
        return;
      }

      clearInterval(interval);
      readySubject.next(grecaptcha);
    }, 50);
  }
}

export const service = new PreloadedRecaptchaAPIService();

@NgModule({
  bootstrap: [PreloadApiDemoComponent],
  declarations: [PreloadApiDemoComponent],
  imports: [
    BrowserModule,
    RecaptchaModule.forRoot(),
    DemoWrapperModule,
  ],
  providers: [
    {
      provide: RecaptchaLoaderService,
      useValue: service,
    },
    { provide: PAGE_SETTINGS, useValue: settings },
  ],
})
export class DemoModule { }
