import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RecaptchaModule } from 'ng-recaptcha';

import { InvisibleDemoComponent } from './invisible-demo.component';
import { settings } from './invisible-demo.data';

const routes: Routes = [
  {
    path: '',
    component: InvisibleDemoComponent,
    data: { page: settings },
  },
];

@NgModule({
  declarations: [InvisibleDemoComponent],
  imports: [
    RouterModule.forChild(routes),
    RecaptchaModule,
    CommonModule,
  ],
})
export class DemoModule { }
