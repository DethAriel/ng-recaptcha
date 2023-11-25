import { Injectable } from "@angular/core";

import { VAL_RECAPTCHA_SITE_KEY_V2, VAL_RECAPTCHA_SITE_KEY_V3, VAL_RECAPTCHA_SITE_KEY_V2_INVISIBLE } from "./site-key";

type Config = {
  siteKeyV2: string;
  siteKeyV2Invisible: string;
  siteKeyV3: string;
};

async function simulatedAsynchronousCall(): Promise<Config> {
  const SIMULATED_BACKEND_LATENCY_MILLIS = 50;
  await new Promise<void>((resolve) => setTimeout(resolve, SIMULATED_BACKEND_LATENCY_MILLIS));

  return {
    siteKeyV2: VAL_RECAPTCHA_SITE_KEY_V2,
    siteKeyV2Invisible: VAL_RECAPTCHA_SITE_KEY_V2_INVISIBLE,
    siteKeyV3: VAL_RECAPTCHA_SITE_KEY_V3,
  };
}

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private config: Config | null;

  public get recaptchaSiteKeyV2(): string {
    this.assertConfigLoaded(this.config);
    return this.config.siteKeyV2;
  }
  public get recaptchaSiteKeyV3(): string {
    this.assertConfigLoaded(this.config);
    return this.config.siteKeyV3;
  }
  public get recaptchaSiteKeyV2Invisible(): string {
    this.assertConfigLoaded(this.config);
    return this.config.siteKeyV2Invisible;
  }

  public async loadConfig(): Promise<void> {
    // This simulates an asynchronous mode of fetching the reCAPTCHA API token from the backend.
    // Since the support for this has been brought up multiple times, I decided to codify this as an example,
    // which would also ensure that documentation and demo site get updated when Angular semantics possibly change in future.
    this.config = await simulatedAsynchronousCall();
  }

  private assertConfigLoaded(config: Config | null): asserts config is Config {
    if (!config) throw new Error("Config hasn't loaded yet");
  }
}
