import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RECAPTCHA_V3_SITE_KEY, RECAPTCHA_LANGUAGE, RecaptchaV3Module } from 'ng-recaptcha';

import { RecaptchaV3LangDemoComponent } from './v3-lang-demo.component';
import { settings } from './v3-lang-demo.data';

const routes: Routes = [
  {
    path: '',
    component: RecaptchaV3LangDemoComponent,
    data: { page: settings },
  },
];

@NgModule({
  declarations: [RecaptchaV3LangDemoComponent],
  imports: [
    RouterModule.forChild(routes),
    RecaptchaV3Module,
    CommonModule,
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LeGCZAUAAAAADuhzcuvSB-lYDsxJBl9HUWtZkUM' },
    { provide: RECAPTCHA_LANGUAGE, useValue: 'fr' },
  ],
})
export class DemoModule { }
