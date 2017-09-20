import { InjectionToken } from '@angular/core';

export const RECAPTCHA_SETTINGS = new InjectionToken<RecaptchaSettings>('recaptcha-settings');

export interface RecaptchaSettings {
  siteKey?: string;
  theme?: ReCaptchaV2.Theme;
  type?: ReCaptchaV2.Type;
  size?: ReCaptchaV2.Size;
  badge?: ReCaptchaV2.Badge;
}
