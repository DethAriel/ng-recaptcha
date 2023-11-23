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
import { RecaptchaV3DemoComponent } from "./v3-demo.component";
import { settings } from "./v3-demo.data";
import { ConfigService } from "../config.service";

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
      useFactory: (config: ConfigService) => {
        return config.recaptchaSiteKeyV3;
      },
      deps: [ConfigService],
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useFactory: (config: ConfigService): RecaptchaSettings => {
        return { siteKey: config.recaptchaSiteKeyV2 };
      },
      deps: [ConfigService],
    },
    { provide: RECAPTCHA_LANGUAGE, useValue: parseLangFromHref() },
  ],
})
export class DemoModule {}
