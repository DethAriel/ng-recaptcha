import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  RecaptchaLoaderService,
  RecaptchaModule,
} from 'ng-recaptcha';

import { PAGE_SETTINGS } from '../../demo-wrapper/demo-wrapper.component';
import { DemoWrapperModule } from '../../demo-wrapper/demo-wrapper.module';
import { LanguageDemoComponent } from './language-demo.component';
import { settings } from './language-demo.data';

@NgModule({
  bootstrap: [LanguageDemoComponent],
  declarations: [LanguageDemoComponent],
  imports: [
    BrowserModule,
    RecaptchaModule.forRoot(),
    DemoWrapperModule,
  ],
  providers: [
    { provide: PAGE_SETTINGS, useValue: settings },
  ],
})
export class DemoModule { }
