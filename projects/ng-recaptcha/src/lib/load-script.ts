declare global {
  interface Window {
    ng2recaptchaloaded: () => void;
  }
}

export type RenderMode = "explicit" | { key: string };

function loadScript(
  renderMode: RenderMode,
  onLoaded: (grecaptcha: ReCaptchaV2.ReCaptcha) => void,
  { url, lang, nonce }: { url?: string; lang?: string; nonce?: string } = {},
): void {
  window.ng2recaptchaloaded = () => {
    onLoaded(grecaptcha);
  };
  const script = document.createElement("script");
  script.innerHTML = "";

  const baseUrl = new URL(url || "https://www.google.com/recaptcha/api.js");
  baseUrl.searchParams.set("render", renderMode === "explicit" ? renderMode : renderMode.key);
  baseUrl.searchParams.set("onload", "ng2recaptchaloaded");
  baseUrl.searchParams.set("trustedtypes", "true");
  if (lang) {
    baseUrl.searchParams.set("hl", lang);
  }

  script.src = baseUrl.href;
  if (nonce) {
    script.setAttribute("nonce", nonce);
  }
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export const loader = { loadScript };
