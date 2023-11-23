declare global {
  interface Window {
    ng2recaptchaloaded: () => void;
  }
}

export type RenderMode = "explicit" | { key: string };

function loadScript(
  renderMode: RenderMode,
  onLoaded: (grecaptcha: ReCaptchaV2.ReCaptcha) => void,
  urlParams: string,
  url?: string,
  nonce?: string,
): void {
  window.ng2recaptchaloaded = () => {
    onLoaded(grecaptcha);
  };
  const script = document.createElement("script");
  script.innerHTML = "";
  const baseUrl = url || "https://www.google.com/recaptcha/api.js";

  script.src = `${baseUrl}?render=${
    renderMode === "explicit" ? renderMode : renderMode.key
  }&onload=ng2recaptchaloaded${urlParams}`;
  if (nonce) {
    script.setAttribute("nonce", nonce);
  }
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export const loader = { loadScript };
