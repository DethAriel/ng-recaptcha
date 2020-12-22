import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import {
  RecaptchaModule,
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_V3_SITE_KEY,
} from "ng-recaptcha";

import { parseLangFromHref } from "../../parse-lang-from-href";
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
    { provide: RECAPTCHA_LANGUAGE, useValue: parseLangFromHref() },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: "6LeGCZAUAAAAADuhzcuvSB-lYDsxJBl9HUWtZkUM",
    },
  ],
})
export class DemoModule {}
