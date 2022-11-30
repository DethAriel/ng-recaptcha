[ng-recaptcha](../README.md) / RecaptchaComponent

# Class: RecaptchaComponent

## Implements

- `AfterViewInit`
- `OnDestroy`

## Table of contents

### Properties

- [badge](RecaptchaComponent.md#badge)
- [error](RecaptchaComponent.md#error)
- [errorMode](RecaptchaComponent.md#errormode)
- [id](RecaptchaComponent.md#id)
- [resolved](RecaptchaComponent.md#resolved)
- [siteKey](RecaptchaComponent.md#sitekey)
- [size](RecaptchaComponent.md#size)
- [tabIndex](RecaptchaComponent.md#tabindex)
- [theme](RecaptchaComponent.md#theme)
- [type](RecaptchaComponent.md#type)

### Methods

- [execute](RecaptchaComponent.md#execute)
- [reset](RecaptchaComponent.md#reset)

## Properties

### badge

• **badge**: `Badge`

Only applies to invisible reCAPTCHA (when [size](RecaptchaComponent.md#size) is set to `invisible`).

See [`badge` parameter documentation](https://developers.google.com/recaptcha/docs/invisible#render_param) in official reCAPTCHA docs.

---

### error

• **error**: `EventEmitter`<[]\>

---

### errorMode

• **errorMode**: `"default"` \| `"handled"` = `"default"`

---

### id

• **id**: `string`

---

### resolved

• **resolved**: `EventEmitter`<`string`\>

---

### siteKey

• **siteKey**: `string`

---

### size

• **size**: `Size`

---

### tabIndex

• **tabIndex**: `number`

---

### theme

• **theme**: `Theme`

---

### type

• **type**: `Type`

## Methods

### execute

▸ **execute**(): `void`

Executes the invisible recaptcha.
Does nothing if component's size is not set to "invisible".

#### Returns

`void`

---

### reset

▸ **reset**(): `void`

#### Returns

`void`
