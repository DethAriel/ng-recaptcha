import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import {
  RECAPTCHA_SETTINGS,
  RecaptchaModule,
  RecaptchaSettings,
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_V3_SITE_KEY,
} from "ng-recaptcha";

import { parseLangFromHref } from "../../parse-lang-from-href";
import { GlobalConfigDemoComponent } from "./global-config-demo.component";
import { settings } from "./global-config-demo.data";
import { ConfigService } from "../config.service";

const routes: Routes = [
  {
    path: "",
    component: GlobalConfigDemoComponent,
    data: { page: settings },
  },
];

@NgModule({
  declarations: [GlobalConfigDemoComponent],
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
