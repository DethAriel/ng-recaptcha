import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RecaptchaModule } from 'ng-recaptcha';

import { PAGE_SETTINGS } from '../../demo-wrapper/demo-wrapper.component';
import { DemoWrapperModule } from '../../demo-wrapper/demo-wrapper.module';
import { InvisibleDemoComponent } from './invisible-demo.component';
import { settings } from './invisible-demo.data';

@NgModule({
  bootstrap: [InvisibleDemoComponent],
  declarations: [InvisibleDemoComponent],
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
