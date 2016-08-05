# Angular 2 + TypeScript component for Google reCAPTCHA

## ng2-recaptcha [![npm version](https://badge.fury.io/js/ng2-recaptcha.svg)](http://badge.fury.io/js/ng2-recaptcha) [![npm downloads](https://img.shields.io/npm/dm/ng2-recaptcha.svg)](https://npmjs.org/ng2-recaptcha)

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/dethariel/ng2-recaptcha/master/LICENSE)
[![Build Status](https://travis-ci.org/DethAriel/ng2-recaptcha.svg?branch=master)](https://travis-ci.org/DethAriel/ng2-recaptcha)
[![devDependency Status](https://david-dm.org/dethariel/ng2-recaptcha/dev-status.svg)](https://david-dm.org/dethariel/ng2-recaptcha?type=dev)

A simple, configurable, easy-to-start component for handling reCAPTCHA. 

## Installation

The easiest way is to install trough [npm](https://www.npmjs.com/package/ng2-recaptcha):
```
npm i ng2-recaptcha --save
```

## <a name="example-basic"></a>Usage [(see in action)](https://dethariel.github.io/ng2-recaptcha/basic)

```typescript
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { RecaptchaComponent, RecaptchaLoaderService } from 'ng2-recaptcha/ng2-recaptcha';

@Component({
    selector: 'my-app',
    template: `
        <recaptcha (resolved)="resolved($event)" siteKey="YOUR_SITE_KEY"></recaptcha>
    `,
    directives: [RecaptchaComponent],
}) export class MyApp {
    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
}

bootstrap(MyApp, [RecaptchaLoaderService]);
```

## Options

The component supports this options:

* `siteKey`
* `theme`
* `type`
* `size`
* `tabIndex`

They are all pretty well described in the [reCAPTCHA docs](https://developers.google.com/recaptcha/docs/display),
so I won't duplicate it here.

## Events

* `resolved(response: string)`. Occurs when the captcha resolution value changed. 
  When user resolves captcha, use `response` parameter to send to the server for verification.
  This parameter is equivalent to calling [`grecaptcha.getResponse`](https://developers.google.com/recaptcha/docs/display#js_api).

  If the captcha has expired prior to submitting its value to the server, the component
  will reset the captcha, and trigger the `resolved` event with `response === null`.

## Methods

* `reset`. Performs a manual captcha reset. This method might be useful if your form
validation failed, and you need the user to re-enter the captcha.

## <a name="example-language"></a>Specifying a different language [(see in action)](https://dethariel.github.io/ng2-recaptcha/language)

`<recaptcha>` supports various languages. But this settings is global, and cannot be set
on a per-captcha basis. An example below shows you how can the default behavior be overridden.

```typescript
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, provide } from '@angular/core';
import { RecaptchaLoaderService } from 'ng2-recaptcha/ng2-recaptcha';

@Component({
    selector: 'my-app',
    templateUrl: 'my-app.html',
}) export class MyApp {}

bootstrap(MyApp, [
    provide(RecaptchaLoaderService, {
        useValue: new RecaptchaLoaderService("fr"),
    })
]);

``` 

## <a name="example-preload-api"></a>Loading the reCAPTCHA API by yourself [(see in action)](https://dethariel.github.io/ng2-recaptcha/preload-api)

By default, the component assumes that the reCAPTCHA API loading will be handled
by the `RecaptchaLoaderService`. However, you can override that by providing your
instance of this service to the Angular DI.

The below code snippet is an example of how such a provider can be implemented:

```html
<script src="https://www.google.com/recaptcha/api.js?render=explicit&amp;onload=onloadCallback"></script>

<script>
    // bootstrap the application once the reCAPTCHA api has loaded 
    function onloadCallback() {
        System.import('app').catch(function(err) { console.error(err); });
    }
</script>
```

```typescript
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, Injectable, provide } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { RecaptchaComponent, RecaptchaLoaderService } from 'ng2-recaptcha/ng2-recaptcha';

@Injectable()
export class PreloadedRecaptchaAPIService {
    public ready: Observable<boolean>;

    constructor() { 
        let readySubject = new BehaviorSubject<boolean>(true);
        this.ready = readySubject.asObservable();
    }
}

@Component({
    selector: 'my-app',
    templateUrl: 'my-app.html',
}) 
export class MyApp {}

bootstrap(MyApp, [
    provide(RecaptchaLoaderService, {
        useValue: new PreloadedRecaptchaAPIService(),
    })
]);

```

## <a name="example-forms"></a>Usage with `required` in forms [(see in action)](https://dethariel.github.io/ng2-recaptcha/forms)

It's very easy to put `recaptcha` in an Angular2 form and have it `require`d.

* Import value accessor so that forms library known how to handle `recaptcha`:

  ```typescript
  import { RecaptchaValueAccessor } from 'ng2-recaptcha/ng2-recaptcha.forms';
  ```
* Add a `RecaptchaValueAccessor` directive to the list of your form component directives:

  ```typescript
  @Component({
    selector: 'my-form',
    template: `
    <form #captchaProtectedForm="ngForm">
      <recaptcha
        [(ngModel)]="formModel.captcha"
        name="captcha"
        required
        siteKey="YOUR_SITE_KEY"
        #captcha="ngModel"
      ></recaptcha>
      <div [hidden]="captcha.valid || captcha.pristine" class="error">Captcha must be solved</div>
    </form>
    `,
    directives: [RecaptchaComponent, RecaptchaValueAccessor],
  }) 
  export class MyForm { 
    formModel = new MyFormModel();
  }
  ``` 
* You're done!
