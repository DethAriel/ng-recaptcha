export interface Example {
  entry: string;
  name: string;
  path: string;
  label: string;
  title: string;
  index?: boolean;
  forms?: boolean;
  additional?: {
    filename: string,
    entry: string,
    title: string,
    type: string,
  };
}

export const examples: Example[] = [
  {
    entry: 'demo-basic',
    name: 'basic',
    path: '/',
    label: 'Basic',
    title: 'Basic Example',
    index: true,
  },
  {
    entry: 'demo-forms',
    name: 'forms',
    path: '/forms',
    label: 'Forms',
    title: 'Forms Example',
    forms: true,
  },
  {
    entry: 'demo-global-config',
    name: 'global-config',
    path: '/global-config',
    label: 'Global Config',
    title: 'Global Config Example',
  },
  {
    entry: 'demo-invisible',
    name: 'invisible',
    path: '/invisible',
    label: 'Invisible',
    title: 'Invisible reCAPTCHA API Example',
  },
  {
    entry: 'demo-language',
    name: 'language',
    path: '/language',
    label: 'Language',
    title: 'Language Example',
  },
  {
    entry: 'demo-preload-api',
    name: 'preload-api',
    path: '/preload-api',
    label: 'Preloaded',
    title: 'Preloaded reCAPTCHA API Example',
    additional: {
      filename: 'preload-api-demo.head',
      entry: 'head-preload-api',
      title: 'script.ts',
      type: 'ts',
    },
  },
];
