import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { PAGE_SETTINGS } from '../../demo-wrapper/demo-wrapper.component';
import { DemoWrapperModule } from '../../demo-wrapper/demo-wrapper.module';
import { FormsDemoComponent } from './forms-demo.component';
import { settings } from './forms-demo.data';

@NgModule({
  bootstrap: [FormsDemoComponent],
  declarations: [FormsDemoComponent],
  imports: [
    RecaptchaModule,
    RecaptchaFormsModule,
    BrowserModule,
    FormsModule,
    DemoWrapperModule,
  ],
  providers: [
    { provide: PAGE_SETTINGS, useValue: settings },
  ],
})
export class DemoModule { }
