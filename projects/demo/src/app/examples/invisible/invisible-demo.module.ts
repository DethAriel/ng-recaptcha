import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import {
  RecaptchaModule,
  RecaptchaSettings,
  RecaptchaLoaderOptions,
  RECAPTCHA_LOADER_OPTIONS,
  RECAPTCHA_SETTINGS,
  RECAPTCHA_V3_SITE_KEY,
} from "ng-recaptcha";

import { parseLangFromHref } from "../../parse-lang-from-href";
import { InvisibleDemoComponent } from "./invisible-demo.component";
import { settings } from "./invisible-demo.data";
import { ConfigService } from "../config.service";

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
      useFactory: (config: ConfigService) => {
        return config.recaptchaSiteKeyV3;
      },
      deps: [ConfigService],
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useFactory: (config: ConfigService): RecaptchaSettings => {
        return { siteKey: config.recaptchaSiteKeyV2Invisible };
      },
      deps: [ConfigService],
    },
    {
      provide: RECAPTCHA_LOADER_OPTIONS,
      useValue: {
        onBeforeLoad(url) {
          const langOverride = parseLangFromHref();
          if (langOverride) url.searchParams.set("hl", langOverride);

          return { url };
        },
      } as RecaptchaLoaderOptions,
    },
  ],
})
export class DemoModule {}
