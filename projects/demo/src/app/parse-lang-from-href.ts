import { parse } from "query-string";

export function parseLangFromHref(): "fr" | "de" | "" {
  const { lang } = parse(window.location.search);
  if (lang === "fr" || lang === "de") {
    return lang;
  }

  return "";
}
