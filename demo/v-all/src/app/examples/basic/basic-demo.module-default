import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RecaptchaModule } from 'ng-recaptcha';

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
})
export class DemoModule { }
