declare global {
  interface Window {
    ng2recaptchaloaded: () => void;
  }
}

export function loadScript(
  renderMode: 'explicit' | string,
  onLoaded: (grecaptcha: ReCaptchaV2.ReCaptcha) => void,
  urlParams: string,
  url?: string,
  nonce?: string,
) {
  window.ng2recaptchaloaded = () => {
    onLoaded(grecaptcha);
  };
  const script = document.createElement('script');
  script.innerHTML = '';
  const baseUrl = url || 'https://www.google.com/recaptcha/api.js';

  script.src = `${baseUrl}?render=${renderMode}&onload=ng2recaptchaloaded${urlParams}`;
  if (nonce) {
    // TODO: Remove "any" cast once we drop Angular 6 support (and thus upgrade to a newer TypeScript version)
    (script as any).nonce = nonce;
  }
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}
