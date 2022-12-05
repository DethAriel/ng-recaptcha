export function parseLangFromHref(): "fr" | "de" | "" {
  const [lang] = new URLSearchParams(window.location.search).getAll("lang");

  if (lang === "fr" || lang === "de") {
    return lang;
  }

  return "";
}
