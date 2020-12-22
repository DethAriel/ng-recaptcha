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

const globalSettings: RecaptchaSettings = {
  siteKey: "6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU",
};

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
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings,
    },
    { provide: RECAPTCHA_LANGUAGE, useValue: parseLangFromHref() },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: "6LeGCZAUAAAAADuhzcuvSB-lYDsxJBl9HUWtZkUM",
    },
  ],
})
export class DemoModule {}
