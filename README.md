# Angular component for Google reCAPTCHA

## ng-recaptcha [![npm version](https://badge.fury.io/js/ng-recaptcha.svg)](http://badge.fury.io/js/ng-recaptcha)

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/dethariel/ng-recaptcha/master/LICENSE)
[![Build Status](https://travis-ci.org/DethAriel/ng-recaptcha.svg?branch=master)](https://travis-ci.org/DethAriel/ng-recaptcha)

A simple, configurable, easy-to-start component for handling reCAPTCHA v2 and v3.

## Table of contents
1. [Installation](#installation)
2. [Basic Usage](#example-basic)
   * [Playground](#playground)
3. [Working with `@angular/forms`](#forms-ready)
4. [API](#api)
   * [Input Options](#api-options)
   * [Events](#api-events)
   * [Methods](#api-methods)
5. [Examples](#examples)
   * [Configuring the component globally](#example-global-config)
   * [Specifying a different language](#example-language)
   * [Loading the reCAPTCHA API by yourself](#example-preload-api)
   * [Usage with `required` in forms](#example-forms)
   * [Working with invisible reCAPTCHA](#example-invisible)
   * [Resizing](#example-resizing)
   * [SystemJS configuration](#example-systemjs)
   * [Loading from a different location](#example-different-url)
   * [Specifying nonce for Content-Security-Policy](#example-csp-nonce)
   * [Listening for all actions with reCAPTCHA v3](#example-v3-all-actions)

## <a name="installation"></a>Installation

The easiest way is to install through [yarn](https://yarnpkg.com/package/ng-recaptcha) or [npm](https://www.npmjs.com/package/ng-recaptcha):

```sh
yarn add ng-recaptcha
npm i ng-recaptcha --save
```

## <a name="example-basic"></a>Basic Usage [(see in action)](https://dethariel.github.io/ng-recaptcha/)

The below applies to reCAPTCHA v2, for basic usage with reCAPTCHA v3 scroll down to [here](#example-basic-v3).

To start with, you need to import the `RecaptchaModule` (more on that [later](#modules)):

```typescript
// app.module.ts
import { RecaptchaModule } from 'ng-recaptcha';
// if you need forms support:
// import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { BrowserModule }  from '@angular/platform-browser';
import { MyApp } from './app.component.ts';

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [
    BrowserModule,
    RecaptchaModule,
    // RecaptchaFormsModule, // if you need forms support
  ],
})
export class MyAppModule { }
```

Once you have done that, the rest is simple:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<re-captcha (resolved)="resolved($event)" siteKey="YOUR_SITE_KEY"></re-captcha>`,
}) export class MyApp {
    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
}
```

```typescript
// boot.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyAppModule } from './app.module.ts';

platformBrowserDynamic().bootstrapModule(MyAppModule);
```

### <a name="example-basic-v3"></a>reCAPTCHA v3 Usage [(see in action)](https://dethariel.github.io/ng-recaptcha/v3)

[reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) introduces a different way of bot protection. To work with v3 APIs, `ng-recaptcha` provides a service (as opposed to a component). To start with, you need to import the `RecaptchaV3Module` and provide your reCAPTCHA v3 site key using `RECAPTCHA_V3_SITE_KEY` injection token:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { MyApp } from './app.component.ts';

@NgModule({
  bootstrap: [MyApp],
  declarations: [MyApp],
  imports: [
    BrowserModule,
    RecaptchaV3Module,
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '<YOUR_SITE_KEY>' },
  ],
})
export class MyAppModule { }

```

In order to execute a reCAPTCHA v3 action, import the `ReCaptchaV3Service` into your desired component:

```ts
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'recaptcha-demo',
  template: `
    <button (click)="executeImportantAction()">Important action</button>
  `,
})
export class RecaptchaV3DemoComponent {
  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => this.handleToken(token));
  }
```

As always with subscriptions, please don't forget to **unsubscribe**.

A more advanced v3 usage scenario includes listening to all actions and their respectively emitted tokens. This is covered [later on this page](#example-v3-all-actions).

### <a name="playground"></a>Playground

You can also play with [this Stackblitz demo](https://stackblitz.com/edit/ng-recaptcha-example) to get a feel of how this component can be used.

## <a name="forms-ready"></a>Working with `@angular/forms`

There are two modules available for you:

```typescript
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
```

If you want your `<re-captcha>` element to work correctly with `[(ngModel)]` directive,
you need to import the `RecaptchaFormsModule` into your application module (pretty much
like with Angular own `'@angular/forms'` module).

## <a name="api"></a>API

### <a name="api-options"></a>Input Options

The component supports this options:

* `siteKey`
* `theme`
* `type`
* `size`
* `tabIndex`
* `badge`

They are all pretty well described either in the [reCAPTCHA docs](https://developers.google.com/recaptcha/docs/display), or in the [invisible reCAPTCHA docs](https://developers.google.com/recaptcha/docs/invisible),
so I won't duplicate it here.

Besides specifying these options on the component itself, you can provide a global `<re-captcha>` configuration - see [Configuring the component globally](#example-global-config) section below.

### <a name="api-events"></a>Events

* `resolved(response: string)`. Occurs when the captcha resolution value changed.
  When user resolves captcha, use `response` parameter to send to the server for verification.
  This parameter is equivalent to calling [`grecaptcha.getResponse`](https://developers.google.com/recaptcha/docs/display#js_api).

  If the captcha has expired prior to submitting its value to the server, the component
  will reset the captcha, and trigger the `resolved` event with `response === null`.

### <a name="api-methods"></a>Methods

* `reset()`. Performs a manual captcha reset. This method might be useful if your form
validation failed, and you need the user to re-enter the captcha.
* `execute()`. Executes the invisible recaptcha. Does nothing if component's size is not set to "invisible". See [Invisible reCAPTCHA developers guide](https://developers.google.com/recaptcha/docs/invisible#js_api) for more information.

## <a name="examples"></a>Examples

### <a name="example-global-config"></a>Configuring the component globally [(see in action)](https://dethariel.github.io/ng-recaptcha/global-config)

Some properties are global - including `siteKey`, `size`, and others. You can provide them at the module-level using the `RECAPTCHA_SETTINGS` provider:

```typescript
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

@NgModule({
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '<YOUR_KEY>' } as RecaptchaSettings,
    },
  ],
}) export class MyModule { }
```

Global properties can be overridden on a case-by-case basis - the values on the `<re-captcha>` component itself take precedence over global settings.

### <a name="example-language"></a>Specifying a different language [(see in action)](https://dethariel.github.io/ng-recaptcha/language)

`<re-captcha>` supports various languages. By default recaptcha will guess the user's language itself
(which is beyond the scope of this lib).
But you can override this behavior and provide a specific language to use.
The language setting is global, though, and cannot be set on a per-captcha basis.
It can be provided like this:

```typescript
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

@NgModule({
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'fr', // use French language
    },
  ],
}) export class MyModule { }
```

You can find the list of supported languages in [reCAPTCHA docs](https://developers.google.com/recaptcha/docs/language).

### <a name="example-preload-api"></a>Loading the reCAPTCHA API by yourself [(see in action)](https://dethariel.github.io/ng-recaptcha/preload-api)

By default, the component assumes that the reCAPTCHA API loading will be handled
by the `RecaptchaLoaderService`. However, you can override that by providing your
instance of this service to the Angular DI.

The below code snippet is an example of how such a provider can be implemented.

**TL;DR**: there should be an `Observable` that eventually resolves to a
`grecaptcha`-compatible object (e.g. `grecaptcha` itself).

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
import { RecaptchaLoaderService } from 'ng-recaptcha';

@Injectable()
export class PreloadedRecaptchaAPIService {
  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  constructor() {
    let readySubject = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(grecaptcha);
    this.ready = readySubject.asObservable();
  }
}

@NgModule({
  providers: [
    {
      provide: RecaptchaLoaderService,
      useValue: new PreloadedRecaptchaAPIService(),
    },
  ],
}) export class MyModule { }
```

### <a name="example-forms"></a>Usage with `required` in forms [(see in action)](https://dethariel.github.io/ng-recaptcha/forms)

It's very easy to put `<re-captcha>` in an Angular form and have it `require`d - just
add the `required` attribute to the `<re-captcha>` element. Do not forget to import `RecaptchaFormsModule` from `'ng-recaptcha'`!

```typescript
@Component({
  selector: 'my-form',
  template: `
  <form>
    <re-captcha
      [(ngModel)]="formModel.captcha"
      name="captcha"
      required
      siteKey="YOUR_SITE_KEY"
    ></re-captcha>
  </form>`,
}) export class MyForm {
  formModel = new MyFormModel();
}
```

A similar approach can be taken for reactive forms:

```typescript
@Component({
  selector: 'my-reactive-form',
  template: `
    <form [formGroup]="reactiveForm">
      <re-captcha formControlName="recaptchaReactive"></re-captcha>
      <button [disabled]="reactiveForm.invalid">Submit</button>
    </form>
  `,
}) export class MyReactiveForm {
  reactiveForm: FormGroup;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }
}
```

### <a name="example-invisible"></a>Working with invisible reCAPTCHA [(see in action)](https://dethariel.github.io/ng-recaptcha/invisible)

Working with [invisible reCAPTCHA](https://developers.google.com/recaptcha/docs/invisible) is almost the same as with regular one.
First, you need to provide the right size:

```html
<re-captcha size="invisible" ...></re-captcha>
```

You will also need to invoke the [`"execute()"`](https://developers.google.com/recaptcha/docs/invisible#programmatic_execute) method manually. This can be done by either obtaining a reference to `RecaptchaComponent` via `@ViewChild()`, or by using inline template reference:

```html
<re-captcha #captchaRef="reCaptcha" ...></re-captcha>
...
<button (click)="captchaRef.execute()">Submit</button>
```

Normally you would only submit a form when recaptcha response has been received. This can be achieved by reacting to `(resolved)` event and invoking submit logic when the captcha response is truthy (this will not try to submit the form when recaptcha response has expired). A sample implementation would look like this:

```typescript
@Component({
  selector: 'my-form',
  template: `
  <form>
    <re-captcha
      #captchaRef="reCaptcha"
      siteKey="YOUR_SITE_KEY"
      size="invisible"
      (resolved)="$event && submit($event)"
    ></re-captcha>
    <button (click)="captchaRef.execute()">Submit</button>
  </form>`,
}) export class MyForm {
  public submit(captchaResponse: string): void {
    this.http.post({
      captcha: captchaResponse,
      /* ... */
    });
  }
}
```

### <a name="example-resizing"></a>Resizing

Making reCAPTCHA responsive is sometimes necessary, especially when working with mobile devices. You can use css-transforms to achieve that as in [this StackOverflow answer](https://stackoverflow.com/a/29521983/2645305), which is also ell-described in [this blog post](https://geekgoddess.com/how-to-resize-the-google-nocaptcha-recaptcha/). You can also take a look at a [live example](https://stackblitz.com/edit/ng-recaptcha-example-uncvxq?file=src/app/app.component.html) of how this might be implemented. This boils down to

```html
<div style="transform:scale(0.7);transform-origin:0;">
  <re-captcha></re-captcha>
</div>
```

### <a name="example-systemjs"></a>SystemJS configuration

To configure the package to work with SystemJS, you would configure it approximately like that (assuming you've installed `ng-recaptcha` using `npm`):

```javascript
// SystemJS config file
(function () {
  System.config({
    paths: {
      'npm:': '/node_modules/',
    },
    map: {
      'ng-recaptcha': 'npm:ng-recaptcha',
    },
    packages: {
      'ng-recaptcha': { main: './index.js' },
    },
  });
})();
```

### <a name="example-different-url"></a>Loading from a different location

Since `"google.com"` domain might be unavailable in some countries, reCAPTCHA core team has a solution for that - using `"recaptcha.net"` domain. You can configure the component to use that by providing the `RECAPTCHA_BASE_URL` token, for example:

```javascript
import { RECAPTCHA_BASE_URL } from 'ng-recaptcha';

@NgModule({
  providers: [
    {
      provide: RECAPTCHA_BASE_URL,
      useValue: 'https://recaptcha.net/recaptcha/api.js', // use recaptcha.net script source for some of our users
    },
  ],
}) export class MyModule { }
```

### <a name="example-csp-nonce"></a>Specifying nonce for Content-Security-Policy

Per [reCAPTCHA FAQ on CSP](https://developers.google.com/recaptcha/docs/faq#im-using-content-security-policy-csp-on-my-website-how-can-i-configure-it-to-work-with-recaptcha), the recommended approach for that is to supply nonce to the script tag. This is possible by providing the `RECAPTCHA_NONCE` token, for example:

```javascript
import { RECAPTCHA_NONCE } from 'ng-recaptcha';

@NgModule({
  providers: [
    {
      provide: RECAPTCHA_NONCE,
      useValue: '<YOUR_NONCE_VALUE>',
    },
  ],
}) export class MyModule { }
```

### <a name="example-v3-all-actions"></a>Listening for all actions with reCAPTCHA v3

More often than not you will need to only get a reCAPTCHA token with the action the user is currently taking, and submit it to the backend at that time. However, having a single listener for all events will be desirable.

There is an `Observable` exactly for that purpose: `ReCaptchaV3Service.onExecute`. It emits a value every time a token is received from reCAPTCHA. The shape of payload it operates on is defined via `OnExecuteData` interface:

```ts
interface OnExecuteData {
  action: string;
  token: string;
}
```

where `action` is the name of the action that has been executed, and `token` is what reCAPTCHA v3 provided when executing that action.

Here's how you would potentially set this up:

```ts
import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'my-component',
  templateUrl: './v3-demo.component.html',
})
export class MyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  public ngOnInit() {
    this.subscription = this.recaptchaV3Service.onExecute
      .subscribe((data: OnExecuteData) => {
        this.handleRecaptchaExecute(data.action, data.token);
      });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

There are a couple things to keep in mind:

* `onExecute` will trigger for **all** actions. If you only need to bulk-process some actions, and not others - you will have to apply filtering yourself.
* `onExecute` observable will provide you with all the events emitted **after** you have subscribed to it - it doesn't keep references to the previously emitted actions. So make sure you add such a subscription as early in your code as you feel is necessary.
