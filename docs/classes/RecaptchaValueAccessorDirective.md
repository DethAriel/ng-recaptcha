[ng-recaptcha](../README.md) / RecaptchaValueAccessorDirective

# Class: RecaptchaValueAccessorDirective

## Implements

- `ControlValueAccessor`

## Table of contents

### Constructors

- [constructor](RecaptchaValueAccessorDirective.md#constructor)

### Methods

- [onResolve](RecaptchaValueAccessorDirective.md#onresolve)
- [registerOnChange](RecaptchaValueAccessorDirective.md#registeronchange)
- [registerOnTouched](RecaptchaValueAccessorDirective.md#registerontouched)
- [writeValue](RecaptchaValueAccessorDirective.md#writevalue)

## Constructors

### constructor

• **new RecaptchaValueAccessorDirective**(`host`)

#### Parameters

| Name   | Type                                          |
| :----- | :-------------------------------------------- |
| `host` | [`RecaptchaComponent`](RecaptchaComponent.md) |

## Methods

### onResolve

▸ **onResolve**(`$event`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `$event` | `string` |

#### Returns

`void`

---

### registerOnChange

▸ **registerOnChange**(`fn`): `void`

#### Parameters

| Name | Type                          |
| :--- | :---------------------------- |
| `fn` | (`value`: `string`) => `void` |

#### Returns

`void`

#### Implementation of

ControlValueAccessor.registerOnChange

---

### registerOnTouched

▸ **registerOnTouched**(`fn`): `void`

#### Parameters

| Name | Type         |
| :--- | :----------- |
| `fn` | () => `void` |

#### Returns

`void`

#### Implementation of

ControlValueAccessor.registerOnTouched

---

### writeValue

▸ **writeValue**(`value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

#### Returns

`void`

#### Implementation of

ControlValueAccessor.writeValue
