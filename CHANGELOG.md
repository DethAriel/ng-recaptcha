<a name="9.0.0"></a>

# [9.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v7.0.2...v9.0.0) (2021-11-16)

### Features

- **package:** upgrade to Angular 13 ([af08641](https://github.com/DethAriel/ng-recaptcha/commit/af08641)), closes [#245](https://github.com/DethAriel/ng-recaptcha/issues/245)

<a name="8.0.1"></a>

## [8.0.1](https://github.com/DethAriel/ng-recaptcha/compare/v8.0.0...v8.0.1) (2021-07-22)

### Bug Fixes

- **component:** reset form-bound captcha value after component destruction ([0e550c4](https://github.com/DethAriel/ng-recaptcha/commit/0e550c4)), closes [#201](https://github.com/DethAriel/ng-recaptcha/issues/201)

<a name="8.0.0"></a>

# [8.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v7.0.1...v8.0.0) (2021-05-14)

### Features

- **package:** add Angular 12 support ([a212a21](https://github.com/DethAriel/ng-recaptcha/commit/a212a21))

<a name="7.0.2"></a>

## [7.0.2](https://github.com/DethAriel/ng-recaptcha/compare/v7.0.1...v7.0.2) (2021-07-22)

### Bug Fixes

- **component:** reset form-bound captcha value after component destruction ([9e5c5e7](https://github.com/DethAriel/ng-recaptcha/commit/9e5c5e7)), closes [#201](https://github.com/DethAriel/ng-recaptcha/issues/201)

<a name="7.0.1"></a>

## [7.0.1](https://github.com/DethAriel/ng-recaptcha/compare/v7.0.0...v7.0.1) (2021-01-07)

### Bug Fixes

- **component:** fix component usages for Typescript strict mode ([a687d13](https://github.com/DethAriel/ng-recaptcha/commit/a687d13)), closes [#211](https://github.com/DethAriel/ng-recaptcha/issues/211)

<a name="7.0.0"></a>

# [7.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v6.1.0...v7.0.0) (2020-12-22)

### Bug Fixes

- **package:** make `@types/grecaptcha` a non-optional dependency ([bc5ad51](https://github.com/DethAriel/ng-recaptcha/commit/bc5ad51)), closes [#205](https://github.com/DethAriel/ng-recaptcha/issues/205)

### Features

- **component:** Add Angular 11 support ([918fe90](https://github.com/DethAriel/ng-recaptcha/commit/918fe90))
- **component:** remove deprecated `forRoot` method ([514beaf](https://github.com/DethAriel/ng-recaptcha/commit/514beaf))
- **package:** update `"@types/grecaptcha"` optional dependency version to ^3 ([e1ee7b9](https://github.com/DethAriel/ng-recaptcha/commit/e1ee7b9))

### BREAKING CHANGES

- **component:** Support for previous versions of Angular has been dropped. Starting from v7 only one version of Angular will be supported.
- **component:** The `RecaptchaModule.forRoot()` method has been obsolete since v4.1.0 (since it has no longer been required). It is now removed. To migrate your code, simply use `RecaptchaModule` where you previously used `RecaptchaModule.forRoot()`

<a name="6.1.0"></a>

# [6.1.0](https://github.com/DethAriel/ng-recaptcha/compare/v6.0.2...v6.1.0) (2020-12-01)

### Bug Fixes

- **component:** handle top-level `execute` errors for reCAPTCHA v3 ([c7d02ce](https://github.com/DethAriel/ng-recaptcha/commit/c7d02ce)), closes [#194](https://github.com/DethAriel/ng-recaptcha/issues/194)
- **component:** mark `forRoot()` method as deprecated ([dea31e5](https://github.com/DethAriel/ng-recaptcha/commit/dea31e5))

### Features

- **component:** add the ability to handle reCAPTCHA errors ([80c9e6e](https://github.com/DethAriel/ng-recaptcha/commit/80c9e6e)), closes [#199](https://github.com/DethAriel/ng-recaptcha/issues/199)

<a name="6.0.2"></a>

## [6.0.2](https://github.com/DethAriel/ng-recaptcha/compare/v6.0.1...v6.0.2) (2020-09-14)

### Bug Fixes

- **component:** fix custom languages for reCAPTCHA v3 ([a2b145d](https://github.com/DethAriel/ng-recaptcha/commit/a2b145d)), closes [#174](https://github.com/DethAriel/ng-recaptcha/issues/174)
- **component:** improve reCAPTCHA v2 and v3 interoperability ([79fc85b](https://github.com/DethAriel/ng-recaptcha/commit/79fc85b)), closes [#152](https://github.com/DethAriel/ng-recaptcha/issues/152)

<a name="6.0.1"></a>

## [6.0.1](https://github.com/DethAriel/ng-recaptcha/compare/v6.0.0...v6.0.1) (2020-09-12)

### Bug Fixes

- **component:** catch and propagate grecaptcha errors, closes [#175](https://github.com/DethAriel/ng-recaptcha/issues/175) ([075edd0](https://github.com/DethAriel/ng-recaptcha/commit/075edd0))

<a name="6.0.0"></a>

# [6.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v5.0.0...v6.0.0) (2020-09-10)

### Features

- **component:** make Angular 10.0.0 a supported peer dependency ([3d7756b](https://github.com/DethAriel/ng-recaptcha/commit/3d7756b)), closes [#177](https://github.com/DethAriel/ng-recaptcha/issues/177)
- **component:** make Angular 9.0.0 a supported peer dependency ([98edce6](https://github.com/DethAriel/ng-recaptcha/commit/98edce6)), closes [#168](https://github.com/DethAriel/ng-recaptcha/issues/168)

<a name="5.0.0"></a>

# [5.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v4.3.0...v5.0.0) (2019-08-09)

### Features

- **component:** make Angular 8.0.0 a supported peer dependency ([f003ff2](https://github.com/DethAriel/ng-recaptcha/commit/f003ff2))
- **package:** implement Angular Package format ([71340c4](https://github.com/DethAriel/ng-recaptcha/commit/71340c4))

### BREAKING CHANGES

- **package:** \* `ng-recaptcha/forms` entry point has been removed. `RecaptchaFormsModule` and `RecaptchaValueAccessorDirective` should now be imported directly from `ng-recaptcha`
- `tslib` is now a package dependency to ensure minimum possible bundle size. If your project doesn't yet have a dependency on `tslib`, run `npm install -D tslib@^1.9.0` (or `yarn add -D tslib@^1.9.0` if you use yarn)

<a name="4.3.0"></a>

# [4.3.0](https://github.com/DethAriel/ng-recaptcha/compare/v4.3.0-beta.1...v4.3.0) (2019-06-04)

### Bug Fixes

- **component-v3:** fix a potential metadata error in v3 service ([ed885b5](https://github.com/DethAriel/ng-recaptcha/commit/ed885b5))

<a name="4.3.0-beta.1"></a>

# [4.3.0-beta.1](https://github.com/DethAriel/ng-recaptcha/compare/v4.2.1...v4.3.0-beta.1) (2019-02-08)

### Features

- **component:** add support for reCAPTCHA v3 ([4a083c6](https://github.com/DethAriel/ng-recaptcha/commit/4a083c6)), closes [#129](https://github.com/DethAriel/ng-recaptcha/issues/129)

<a name="4.2.1"></a>

## [4.2.1](https://github.com/DethAriel/ng-recaptcha/compare/v4.2.0...v4.2.1) (2018-10-24)

### Bug Fixes

- **package:** fix publishing empty package ([e4685fe](https://github.com/DethAriel/ng-recaptcha/commit/e4685fe))

<a name="4.2.0"></a>

# [4.2.0](https://github.com/DethAriel/ng-recaptcha/compare/v4.1.1...v4.2.0) (2018-10-24)

### Features

- **component:** add the ability to provide `nonce` to the script tag ([8f55b19](https://github.com/DethAriel/ng-recaptcha/commit/8f55b19)), closes [#100](https://github.com/DethAriel/ng-recaptcha/issues/100)
- **component:** allow to specify a base url for loading recaptcha ([df505fd](https://github.com/DethAriel/ng-recaptcha/commit/df505fd)), closes [#101](https://github.com/DethAriel/ng-recaptcha/issues/101)

<a name="4.1.1"></a>

## [4.1.1](https://github.com/DethAriel/ng-recaptcha/compare/v4.1.0...v4.1.1) (2018-10-24)

### Bug Fixes

- **component:** delay invisible recaptcha execution until it's rendered ([99292b7](https://github.com/DethAriel/ng-recaptcha/commit/99292b7)), closes [#127](https://github.com/DethAriel/ng-recaptcha/issues/127)

<a name="4.1.0"></a>

# [4.1.0](https://github.com/DethAriel/ng-recaptcha/compare/v4.0.0...v4.1.0) (2018-10-24)

### Bug Fixes

- **component:** fix a potential error during recaptcha rendering ([1c395b5](https://github.com/DethAriel/ng-recaptcha/commit/1c395b5))

### Features

- **module:** skip `forRoot()` when importing `RecaptchaModule` ([7fb97fb](https://github.com/DethAriel/ng-recaptcha/commit/7fb97fb)), closes [#113](https://github.com/DethAriel/ng-recaptcha/issues/113) [#116](https://github.com/DethAriel/ng-recaptcha/issues/116)
- **package:** update peer dependencies to include Angular 7 ([929ef7a](https://github.com/DethAriel/ng-recaptcha/commit/929ef7a))

<a name="4.0.0"></a>

# [4.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v4.0.0-beta.1...v4.0.0) (2018-09-29)

<a name="4.0.0-beta.1"></a>

# [4.0.0-beta.1](https://github.com/DethAriel/ng-recaptcha/compare/v3.0.5...v4.0.0-beta.1) (2018-05-17)

### Features

- **component:** adjust dependencies for Angular 6 support ([736c7ae](https://github.com/DethAriel/ng-recaptcha/commit/736c7ae))

### BREAKING CHANGES

- **component:** The peer dependency for `@angular/core` has been bumped to `^6.0.0`

<a name="3.0.5"></a>

## [3.0.5](https://github.com/DethAriel/ng-recaptcha/compare/v3.0.3...v3.0.5) (2018-04-27)

### Bug Fixes

- **rxjs:** change import of `of` operator ([3e0bda6](https://github.com/DethAriel/ng-recaptcha/commit/3e0bda6)), closes [#95](https://github.com/DethAriel/ng-recaptcha/issues/95)

<a name="3.0.3"></a>

## [3.0.3](https://github.com/DethAriel/ng-recaptcha/compare/v3.0.2...v3.0.3) (2017-12-26)

### Bug Fixes

- **component:** use ElementRef to access component's native element ([d3a8409](https://github.com/DethAriel/ng-recaptcha/commit/d3a8409)), closes [#48](https://github.com/DethAriel/ng-recaptcha/issues/48) [#68](https://github.com/DethAriel/ng-recaptcha/issues/68)

<a name="3.0.2"></a>

## [3.0.2](https://github.com/DethAriel/ng-recaptcha/compare/v3.0.1...v3.0.2) (2017-10-18)

### Bug Fixes

- **build:** fix AoT builds ([921be50](https://github.com/DethAriel/ng-recaptcha/commit/921be50)), closes [#57](https://github.com/DethAriel/ng-recaptcha/issues/57) [#65](https://github.com/DethAriel/ng-recaptcha/issues/65)

<a name="3.0.1"></a>

## [3.0.1](https://github.com/DethAriel/ng-recaptcha/compare/v3.0.0...v3.0.1) (2017-09-29)

### Bug Fixes

- **component:** Replace `OpaqueToken` with `InjectionToken` ([2b7db9b](https://github.com/DethAriel/ng-recaptcha/commit/2b7db9b))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v2.2.0...v3.0.0) (2017-08-30)

### Bug Fixes

- **component:** fix server-side rendering ([7a5bc6c](https://github.com/DethAriel/ng-recaptcha/commit/7a5bc6c)), closes [#34](https://github.com/DethAriel/ng-recaptcha/issues/34)

### BREAKING CHANGES

- **component:** Angular v2.x.x is no longer supported due to dependency on Platform capabilities that were added in [v4.0.0-rc.1](https://github.com/angular/angular/blob/master/CHANGELOG.md#features-20)

<a name="2.2.0"></a>

# [2.2.0](https://github.com/DethAriel/ng-recaptcha/compare/v2.1.1...v2.2.0) (2017-08-18)

### Bug Fixes

- **component:** ensure that component is destroyed safely ([1e51d56](https://github.com/DethAriel/ng-recaptcha/commit/1e51d56)), closes [#46](https://github.com/DethAriel/ng-recaptcha/issues/46)

### Features

- **component:** add the ability to specify component props globally ([8a7b22d](https://github.com/DethAriel/ng-recaptcha/commit/8a7b22d)), closes [#45](https://github.com/DethAriel/ng-recaptcha/issues/45)

<a name="2.1.1"></a>

## [2.1.1](https://github.com/DethAriel/ng-recaptcha/compare/v2.1.0...v2.1.1) (2017-05-02)

### Bug Fixes

- **component:** unblock protractor tests after `<re-captcha>` destruction ([a5f2fe9](https://github.com/DethAriel/ng-recaptcha/commit/a5f2fe9))

<a name="2.1.0"></a>

# [2.1.0](https://github.com/DethAriel/ng-recaptcha/compare/v2.0.2...v2.1.0) (2017-05-01)

### Features

- **component:** add support for `badge` property ([5a16430](https://github.com/DethAriel/ng-recaptcha/commit/5a16430)), closes [#30](https://github.com/DethAriel/ng-recaptcha/issues/30)

### Bug Fixes

- **demo:** re-add a missing systemjs config file ([b51694a](https://github.com/DethAriel/ng-recaptcha/commit/b51694a))

<a name="2.0.2"></a>

## [2.0.2](https://github.com/DethAriel/ng-recaptcha/compare/v2.0.1...v2.0.2) (2017-03-26)

### Features

- **package:** update peer dependencies to include Angular v4 ([b2f04e8](https://github.com/DethAriel/ng-recaptcha/commit/b2f04e8))

<a name="2.0.1"></a>

## [2.0.1](https://github.com/DethAriel/ng-recaptcha/compare/v2.0.0...v2.0.1) (2017-03-17)

### Bug Fixes

- **module:** Adding the value accessor directive to the forms barrel, which was missing. ([ad73e2e](https://github.com/DethAriel/ng-recaptcha/commit/ad73e2e))

### Features

- **misc:** Annotating a static field with `@nocollapse` to avoid issues with closure compiler in advanced mode. ([55e5932](https://github.com/DethAriel/ng-recaptcha/commit/55e5932))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v1.7.0...v2.0.0) (2017-03-14)

### Features

- **component:** change component and directive selectors ([58a01b4](https://github.com/DethAriel/ng-recaptcha/commit/58a01b4))
- **module:** change the way recaptcha modules work ([6e13389](https://github.com/DethAriel/ng-recaptcha/commit/6e13389))

### BREAKING CHANGES

- component: component selector changed from `recaptcha` to `re-captcha`
- module: module handling has changed.
  Users of `RecaptchaNoFormsModule` should instead use `import { RecaptchaModule } from 'ng-recaptcha'`. Users of v1 `RecaptchaModule` should also `import { RecaptchaFormsModule } from 'ng-recaptcha/forms'`. SystemJS users must also re-setup module "main" file to `index.js`

<a name="1.7.0"></a>

# [1.7.0](https://github.com/DethAriel/ng2-recaptcha/compare/v1.6.1...v1.7.0) (2017-03-13)

### Bug Fixes

- **component:** handle id input parameter correctly ([b578fe5](https://github.com/DethAriel/ng2-recaptcha/commit/b578fe5))

### Features

- **component:** add `exportAs` annotation ([3e2e217](https://github.com/DethAriel/ng2-recaptcha/commit/3e2e217))
- **component:** add support for invisible reCAPTCHA ([c19489d](https://github.com/DethAriel/ng2-recaptcha/commit/c19489d)), closes [#18](https://github.com/DethAriel/ng2-recaptcha/issues/18)

<a name="1.6.1"></a>

## [1.6.1](https://github.com/DethAriel/ng2-recaptcha/compare/v1.6.0...v1.6.1) (2017-03-10)

### Enhancements

- **package:** expand wildcard exports to better support Google Closure Compiler ([8dd1a59](https://github.com/DethAriel/ng2-recaptcha/commit/8dd1a59))

<a name="1.6.0"></a>

# [1.6.0](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.4...v1.6.0) (2017-02-17)

### Features

- **package management:** add `[@types](https://github.com/types)/grecaptcha` as optional dependency ([85fbfba](https://github.com/DethAriel/ng2-recaptcha/commit/85fbfba))

<a name="1.5.4"></a>

## [1.5.4](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.3...v1.5.4) (2017-02-02)

### Bug Fixes

- **component:** correctly reset captcha during `ngOnDestroy` ([b31d57f](https://github.com/DethAriel/ng2-recaptcha/commit/b31d57f)), closes [#12](https://github.com/DethAriel/ng2-recaptcha/issues/12)

<a name="1.5.3"></a>

## [1.5.3](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.2...v1.5.3) (2017-02-01)

### Bug Fixes

- **component:** emit `resolved(null)` event when recaptcha expires ([491d99a](https://github.com/DethAriel/ng2-recaptcha/commit/491d99a)), closes [#11](https://github.com/DethAriel/ng2-recaptcha/issues/11)

<a name="1.5.2"></a>

## [1.5.2](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.1...v1.5.2) (2017-01-31)

### Bug Fixes

- **component:** reset the captcha when the component is destroyed ([e1441c8](https://github.com/DethAriel/ng2-recaptcha/commit/e1441c8)), closes [#10](https://github.com/DethAriel/ng2-recaptcha/issues/10)

<a name="1.5.1"></a>

## [1.5.1](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.0...v1.5.1) (2017-01-27)

<a name="1.5.0"></a>

# [1.5.0](https://github.com/DethAriel/ng2-recaptcha/compare/v1.4.0...v1.5.0) (2017-01-24)

### Bug Fixes

- **component:** correctly emit `resolved` event ([25d4246](https://github.com/DethAriel/ng2-recaptcha/commit/25d4246))

<a name="1.4.0"></a>

# [1.4.0](https://github.com/DethAriel/ng2-recaptcha/compare/v1.3.2...v1.4.0) (2016-10-28)

Added AoT compilation support
