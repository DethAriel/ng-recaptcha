import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { PAGE_SETTINGS } from '../../demo-wrapper/demo-wrapper.component';
import { DemoWrapperModule } from '../../demo-wrapper/demo-wrapper.module';
import { RecaptchaV3DemoComponent } from './v3-demo.component';
import { settings } from './v3-demo.data';

@NgModule({
  bootstrap: [RecaptchaV3DemoComponent],
  declarations: [RecaptchaV3DemoComponent],
  imports: [
    BrowserModule,
    RecaptchaV3Module,
    DemoWrapperModule,
  ],
  providers: [
    { provide: PAGE_SETTINGS, useValue: settings },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LeGCZAUAAAAADuhzcuvSB-lYDsxJBl9HUWtZkUM' },
  ],
})
export class DemoModule { }
