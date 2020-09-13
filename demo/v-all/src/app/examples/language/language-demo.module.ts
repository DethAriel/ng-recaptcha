import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RECAPTCHA_LANGUAGE, RecaptchaModule } from 'ng-recaptcha';

import { LanguageDemoComponent } from './language-demo.component';
import { settings } from './language-demo.data';

const routes: Routes = [
  {
    path: '',
    component: LanguageDemoComponent,
    data: { page: settings },
  },
];

@NgModule({
  declarations: [LanguageDemoComponent],
  imports: [
    RouterModule.forChild(routes),
    RecaptchaModule,
    CommonModule,
  ],
  providers: [
    { provide: RECAPTCHA_LANGUAGE, useValue: 'fr' },
  ],
})
export class DemoModule { }

