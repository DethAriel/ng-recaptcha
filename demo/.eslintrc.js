module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
      },
      extends: ["../.eslintrc.js"],
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          { type: "attribute", prefix: "recaptcha", style: "camelCase" },
        ],
        "@angular-eslint/component-selector": [
          "error",
          { type: "element", prefix: "recaptcha", style: "kebab-case" },
        ],
      },
    },
    {
      files: ["*.html"],
      extends: ["../.eslintrc.js"],
      rules: {},
    },
  ],
};
