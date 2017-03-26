import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  RECAPTCHA_LANGUAGE,
  RecaptchaLoaderService,
  RecaptchaModule,
} from 'ng-recaptcha';

import { LanguageDemoComponent } from './language-demo.component';

@NgModule({
  bootstrap: [LanguageDemoComponent],
  declarations: [LanguageDemoComponent],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'fr',
    },
  ],
})
export class DemoModule { }

platformBrowserDynamic().bootstrapModule(DemoModule);
