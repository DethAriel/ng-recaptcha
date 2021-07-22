module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    es6: true,
  },
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@angular-eslint/recommended",
        // This is required if you use inline templates in Components
        "plugin:@angular-eslint/template/process-inline-templates",
        "prettier",
      ],
      rules: {
        // this produces false-positives on `RecaptchaValueAccessorDirective.selector` (complains about absence of prefix in re-captcha[**formControlName])
        // "@angular-eslint/directive-selector": [
        //   "error",
        //   { type: "attribute", prefix: "re", style: "camelCase" },
        // ],
        "@angular-eslint/directive-selector": 0,
        "@angular-eslint/component-selector": [
          "error",
          { type: "element", prefix: "re", style: "kebab-case" },
        ],
      },
    },
    {
      files: ["*.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        /**
         * Any template/HTML related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */
      },
    },
  ],
};
