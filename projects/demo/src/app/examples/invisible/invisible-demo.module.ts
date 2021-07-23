import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import {
  RecaptchaModule,
  RecaptchaSettings,
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_SETTINGS,
  RECAPTCHA_V3_SITE_KEY,
} from "ng-recaptcha";

import { parseLangFromHref } from "../../parse-lang-from-href";
import { VAL_RECAPTCHA_SITE_KEY_V3, VAL_RECAPTCHA_SITE_KEY_V2 } from "../site-key";
import { InvisibleDemoComponent } from "./invisible-demo.component";
import { settings } from "./invisible-demo.data";

const routes: Routes = [
  {
    path: "",
    component: InvisibleDemoComponent,
    data: { page: settings },
  },
];

@NgModule({
  declarations: [InvisibleDemoComponent],
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
