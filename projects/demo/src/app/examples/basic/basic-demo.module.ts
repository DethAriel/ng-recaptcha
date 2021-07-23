import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import {
  RecaptchaModule,
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RECAPTCHA_V3_SITE_KEY,
} from "ng-recaptcha";

import { parseLangFromHref } from "../../parse-lang-from-href";
import { VAL_RECAPTCHA_SITE_KEY_V2, VAL_RECAPTCHA_SITE_KEY_V3 } from "../site-key";
import { BasicDemoComponent } from "./basic-demo.component";
import { settings } from "./basic-demo.data";

const routes: Routes = [
  {
    path: "",
    component: BasicDemoComponent,
    data: { page: settings },
  },
];

@NgModule({
  declarations: [BasicDemoComponent],
  imports: [RouterModule.forChild(routes), RecaptchaModule, CommonModule],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: VAL_RECAPTCHA_SITE_KEY_V3,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: VAL_RECAPTCHA_SITE_KEY_V2 } as RecaptchaSettings,
    },
    { provide: RECAPTCHA_LANGUAGE, useValue: parseLangFromHref() },
  ],
})
export class DemoModule {}
