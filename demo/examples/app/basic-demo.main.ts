import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RecaptchaModule } from 'ng-recaptcha';

import { BasicDemoComponent } from './basic-demo.component';

@NgModule({
  bootstrap: [BasicDemoComponent],
  declarations: [BasicDemoComponent],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
})
export class DemoModule { }

platformBrowserDynamic().bootstrapModule(DemoModule);
