import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaLoaderService,
  RecaptchaModule,
} from 'ng-recaptcha';

import { GlobalConfigDemoComponent } from './global-config-demo.component';

const globalSettings: RecaptchaSettings = { siteKey: '6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU' };

@NgModule({
  bootstrap: [GlobalConfigDemoComponent],
  declarations: [GlobalConfigDemoComponent],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings,
    },
  ],
})
export class DemoModule { }

platformBrowserDynamic().bootstrapModule(DemoModule);
