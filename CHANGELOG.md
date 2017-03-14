<a name="2.0.0"></a>
# [2.0.0](https://github.com/DethAriel/ng-recaptcha/compare/v1.7.0...v2.0.0) (2017-03-14)


### Features

* **component:** change component and directive selectors ([58a01b4](https://github.com/DethAriel/ng-recaptcha/commit/58a01b4))
* **module:** change the way recaptcha modules work ([6e13389](https://github.com/DethAriel/ng-recaptcha/commit/6e13389))


### BREAKING CHANGES

* component: component selector changed from `recaptcha` to `re-captcha`
* module: module handling has changed.
Users of `RecaptchaNoFormsModule` should instead use `import { RecaptchaModule } from 'ng-recaptcha'`. Users of v1 `RecaptchaModule` should also `import { RecaptchaFormsModule } from 'ng-recaptcha/forms'`. SystemJS users must also re-setup module "main" file to `index.js`



<a name="1.7.0"></a>
# [1.7.0](https://github.com/DethAriel/ng2-recaptcha/compare/v1.6.1...v1.7.0) (2017-03-13)


### Bug Fixes

* **component:** handle id input parameter correctly ([b578fe5](https://github.com/DethAriel/ng2-recaptcha/commit/b578fe5))


### Features

* **component:** add `exportAs` annotation ([3e2e217](https://github.com/DethAriel/ng2-recaptcha/commit/3e2e217))
* **component:** add support for invisible reCAPTCHA ([c19489d](https://github.com/DethAriel/ng2-recaptcha/commit/c19489d)), closes [#18](https://github.com/DethAriel/ng2-recaptcha/issues/18)



<a name="1.6.1"></a>
## [1.6.1](https://github.com/DethAriel/ng2-recaptcha/compare/v1.6.0...v1.6.1) (2017-03-10)


### Enhancements

* **package:** expand wildcard exports to better support Google Closure Compiler ([8dd1a59](https://github.com/DethAriel/ng2-recaptcha/commit/8dd1a59))

<a name="1.6.0"></a>
# [1.6.0](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.4...v1.6.0) (2017-02-17)


### Features

* **package management:** add `[@types](https://github.com/types)/grecaptcha` as optional dependency ([85fbfba](https://github.com/DethAriel/ng2-recaptcha/commit/85fbfba))



<a name="1.5.4"></a>
## [1.5.4](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.3...v1.5.4) (2017-02-02)


### Bug Fixes

* **component:** correctly reset captcha during `ngOnDestroy` ([b31d57f](https://github.com/DethAriel/ng2-recaptcha/commit/b31d57f)), closes [#12](https://github.com/DethAriel/ng2-recaptcha/issues/12)



<a name="1.5.3"></a>
## [1.5.3](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.2...v1.5.3) (2017-02-01)


### Bug Fixes

* **component:** emit `resolved(null)` event when recaptcha expires ([491d99a](https://github.com/DethAriel/ng2-recaptcha/commit/491d99a)), closes [#11](https://github.com/DethAriel/ng2-recaptcha/issues/11)



<a name="1.5.2"></a>
## [1.5.2](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.1...v1.5.2) (2017-01-31)


### Bug Fixes

* **component:** reset the captcha when the component is destroyed ([e1441c8](https://github.com/DethAriel/ng2-recaptcha/commit/e1441c8)), closes [#10](https://github.com/DethAriel/ng2-recaptcha/issues/10)



<a name="1.5.1"></a>
## [1.5.1](https://github.com/DethAriel/ng2-recaptcha/compare/v1.5.0...v1.5.1) (2017-01-27)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/DethAriel/ng2-recaptcha/compare/v1.4.0...v1.5.0) (2017-01-24)


### Bug Fixes

* **component:** correctly emit `resolved` event ([25d4246](https://github.com/DethAriel/ng2-recaptcha/commit/25d4246))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/DethAriel/ng2-recaptcha/compare/v1.3.2...v1.4.0) (2016-10-28)

Added AoT compilation support
