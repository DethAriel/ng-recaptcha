import { Injectable } from "@angular/core";

import { VAL_RECAPTCHA_SITE_KEY_V2, VAL_RECAPTCHA_SITE_KEY_V3, VAL_RECAPTCHA_SITE_KEY_V2_INVISIBLE } from "./site-key";

async function simulatedAsynchronousCall(): Promise<Record<"siteKeyV2" | "siteKeyV3" | "siteKeyV2Invisible", string>> {
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
  public recaptchaSiteKeyV2: string | null = null;
  public recaptchaSiteKeyV2Invisible: string | null = null;
  public recaptchaSiteKeyV3: string | null = null;

  public async loadConfig(): Promise<void> {
    // This simulates an asynchronous mode of fetching the reCAPTCHA API token from the backend.
    // Since the support for this has been brought up multiple times, I decided to codify this as an example,
    // which would also ensure that documentation and demo site get updated when Angular semantics possibly change in future.
    const { siteKeyV2, siteKeyV3, siteKeyV2Invisible } = await simulatedAsynchronousCall();
    this.recaptchaSiteKeyV2 = siteKeyV2;
    this.recaptchaSiteKeyV2Invisible = siteKeyV2Invisible;
    this.recaptchaSiteKeyV3 = siteKeyV3;
  }
}
