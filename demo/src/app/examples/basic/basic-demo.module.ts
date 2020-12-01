import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RecaptchaModule, RECAPTCHA_LANGUAGE, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

import { parseLangFromHref } from '../../parse-lang-from-href';
import { BasicDemoComponent } from './basic-demo.component';
import { settings } from './basic-demo.data';

const routes: Routes = [
  {
    path: '',
    component: BasicDemoComponent,
    data: { page: settings },
  },
];

@NgModule({
  declarations: [BasicDemoComponent],
  imports: [
    RouterModule.forChild(routes),
    RecaptchaModule,
    CommonModule,
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LeGCZAUAAAAADuhzcuvSB-lYDsxJBl9HUWtZkUM' },
    { provide: RECAPTCHA_LANGUAGE, useValue: parseLangFromHref() },
  ],
})
export class DemoModule { }
