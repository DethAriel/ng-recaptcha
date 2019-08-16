import { InjectionToken } from '@angular/core';

export interface RecaptchaSettings {
  siteKey?: string;
  theme?: ReCaptchaV2.Theme;
  type?: ReCaptchaV2.Type;
  size?: ReCaptchaV2.Size;
  badge?: ReCaptchaV2.Badge;
}

export const RECAPTCHA_SETTINGS = new InjectionToken<RecaptchaSettings>('recaptcha-settings');
export const RECAPTCHA_LANGUAGE = new InjectionToken<string>('recaptcha-language');
export const RECAPTCHA_BASE_URL = new InjectionToken<string>('recaptcha-base-url');
export const RECAPTCHA_NONCE = new InjectionToken<string>('recaptcha-nonce-tag');
export const RECAPTCHA_V3_SITE_KEY = new InjectionToken<string>('recaptcha-v3-site-key');
