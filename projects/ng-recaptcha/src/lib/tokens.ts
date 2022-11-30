import { InjectionToken } from "@angular/core";

import { RecaptchaSettings } from "./recaptcha-settings";

/**
 * @category Token
 */
export const RECAPTCHA_LANGUAGE = new InjectionToken<string>("recaptcha-language");

/**
 * @category Token
 */
export const RECAPTCHA_BASE_URL = new InjectionToken<string>("recaptcha-base-url");

/**
 * @category Token
 */
export const RECAPTCHA_NONCE = new InjectionToken<string>("recaptcha-nonce-tag");

/**
 * @category Token
 */
export const RECAPTCHA_SETTINGS = new InjectionToken<RecaptchaSettings>("recaptcha-settings");

/**
 * @category Token
 */
export const RECAPTCHA_V3_SITE_KEY = new InjectionToken<string>("recaptcha-v3-site-key");
