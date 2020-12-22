export interface Example {
  entry: string;
  name: string;
  path: string;
  label: string;
  title: string;
  index?: boolean;
}

export const examples: Example[] = [
  {
    entry: "demo-basic",
    name: "basic",
    path: "/",
    label: "Basic",
    title: "Basic Example",
    index: true,
  },
  {
    entry: "demo-forms",
    name: "forms",
    path: "/forms",
    label: "Forms",
    title: "Forms Example",
  },
  {
    entry: "demo-global-config",
    name: "global-config",
    path: "/global-config",
    label: "Global Config",
    title: "Global Config Example",
  },
  {
    entry: "demo-invisible",
    name: "invisible",
    path: "/invisible",
    label: "Invisible",
    title: "Invisible reCAPTCHA API Example",
  },
  {
    entry: "demo-v3",
    name: "v3",
    path: "/v3",
    label: "reCAPTCHA v3",
    title: "reCAPTCHA v3 Example",
  },
  {
    entry: "demo-preload-api",
    name: "preload-api",
    path: "/preload-api",
    label: "Preloaded",
    title: "Preloaded reCAPTCHA API Example",
  },
];
