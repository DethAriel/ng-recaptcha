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
import { BasicDemoComponent } from "./basic-demo.component";
import { settings } from "./basic-demo.data";
import { ConfigService } from "../config.service";

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
