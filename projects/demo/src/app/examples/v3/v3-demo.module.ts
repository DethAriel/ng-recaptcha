import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaV3Module,
  RECAPTCHA_LANGUAGE,
  RecaptchaSettings,
  RECAPTCHA_SETTINGS,
} from "ng-recaptcha";

import { parseLangFromHref } from "../../parse-lang-from-href";
import { VAL_RECAPTCHA_SITE_KEY_V3, VAL_RECAPTCHA_SITE_KEY_V2 } from "../site-key";
import { RecaptchaV3DemoComponent } from "./v3-demo.component";
import { settings } from "./v3-demo.data";

const routes: Routes = [
  {
    path: "",
    component: RecaptchaV3DemoComponent,
    data: { page: settings },
  },
];

@NgModule({
  declarations: [RecaptchaV3DemoComponent],
  imports: [RouterModule.forChild(routes), RecaptchaV3Module, CommonModule],
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
