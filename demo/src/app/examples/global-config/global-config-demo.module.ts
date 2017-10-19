import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  RECAPTCHA_SETTINGS,
  RecaptchaLoaderService,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

import { PAGE_SETTINGS } from '../../demo-wrapper/demo-wrapper.component';
import { DemoWrapperModule } from '../../demo-wrapper/demo-wrapper.module';
import { GlobalConfigDemoComponent } from './global-config-demo.component';
import { settings } from './global-config-demo.data';

const globalSettings: RecaptchaSettings = { siteKey: '6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU' };

@NgModule({
  bootstrap: [GlobalConfigDemoComponent],
  declarations: [GlobalConfigDemoComponent],
  imports: [
    BrowserModule,
    RecaptchaModule.forRoot(),
    DemoWrapperModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings,
    },
    { provide: PAGE_SETTINGS, useValue: settings },
  ],
})
export class DemoModule { }
