import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RecaptchaModule } from 'ng-recaptcha';

import { PAGE_SETTINGS } from '../../demo-wrapper/demo-wrapper.component';
import { DemoWrapperModule } from '../../demo-wrapper/demo-wrapper.module';
import { BasicDemoComponent } from './basic-demo.component';
import { settings } from './basic-demo.data';

@NgModule({
  bootstrap: [BasicDemoComponent],
  declarations: [BasicDemoComponent],
  imports: [
    RecaptchaModule.forRoot(),
    BrowserModule,
    DemoWrapperModule,
  ],
  providers: [
    { provide: PAGE_SETTINGS, useValue: settings },
  ],
})
export class DemoModule { }
