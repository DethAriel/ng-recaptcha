import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RecaptchaModule } from 'ng-recaptcha';

import { InvisibleDemoComponent } from './invisible-demo.component';

@NgModule({
  bootstrap: [InvisibleDemoComponent],
  declarations: [InvisibleDemoComponent],
  imports: [BrowserModule, RecaptchaModule.forRoot()],
})
export class DemoModule { }

platformBrowserDynamic().bootstrapModule(DemoModule);
