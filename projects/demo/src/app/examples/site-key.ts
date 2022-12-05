import { environment } from "../../environments/environment";

const TESTING_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

export const VAL_RECAPTCHA_SITE_KEY_V2 = environment.production
  ? "6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU"
  : TESTING_KEY;

export const VAL_RECAPTCHA_SITE_KEY_V2_INVISIBLE = environment.production
  ? "6Ldp0xgUAAAAAF_iIss_hpFaVrjLbPGjwyfJwebB"
  : TESTING_KEY;

export const VAL_RECAPTCHA_SITE_KEY_V3 = "6LeGCZAUAAAAADuhzcuvSB-lYDsxJBl9HUWtZkUM";
