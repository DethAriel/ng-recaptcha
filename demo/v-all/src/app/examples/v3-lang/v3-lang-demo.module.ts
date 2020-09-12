import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RECAPTCHA_V3_SITE_KEY, RECAPTCHA_LANGUAGE, RecaptchaV3Module } from 'ng-recaptcha';

import { PAGE_SETTINGS } from '../../demo-wrapper/demo-wrapper.component';
import { DemoWrapperModule } from '../../demo-wrapper/demo-wrapper.module';
import { RecaptchaV3LangDemoComponent } from './v3-lang-demo.component';
import { settings } from './v3-lang-demo.data';

@NgModule({
  bootstrap: [RecaptchaV3LangDemoComponent],
  declarations: [RecaptchaV3LangDemoComponent],
  imports: [
    BrowserModule,
    RecaptchaV3Module,
    DemoWrapperModule,
  ],
  providers: [
    { provide: PAGE_SETTINGS, useValue: settings },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LeGCZAUAAAAADuhzcuvSB-lYDsxJBl9HUWtZkUM' },
    { provide: RECAPTCHA_LANGUAGE, useValue: 'fr' },
  ],
})
export class DemoModule { }
