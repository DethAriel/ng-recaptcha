[ng-recaptcha](../README.md) / ReCaptchaV3Service

# Class: ReCaptchaV3Service

The main service for working with reCAPTCHA v3 APIs.

Use the `execute` method for executing a single action, and
`onExecute` observable for listening to all actions at once.

## Table of contents

### Constructors

- [constructor](ReCaptchaV3Service.md#constructor)

### Accessors

- [onExecute](ReCaptchaV3Service.md#onexecute)
- [onExecuteError](ReCaptchaV3Service.md#onexecuteerror)

### Methods

- [execute](ReCaptchaV3Service.md#execute)

## Constructors

### constructor

• **new ReCaptchaV3Service**(`zone`, `siteKey`, `platformId`, `baseUrl?`, `nonce?`, `language?`)

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `zone`       | `NgZone` |
| `siteKey`    | `string` |
| `platformId` | `Object` |
| `baseUrl?`   | `string` |
| `nonce?`     | `string` |
| `language?`  | `string` |

## Accessors

### onExecute

• `get` **onExecute**(): `Observable`<[`OnExecuteData`](../interfaces/OnExecuteData.md)\>

#### Returns

`Observable`<[`OnExecuteData`](../interfaces/OnExecuteData.md)\>

---

### onExecuteError

• `get` **onExecuteError**(): `Observable`<[`OnExecuteErrorData`](../interfaces/OnExecuteErrorData.md)\>

#### Returns

`Observable`<[`OnExecuteErrorData`](../interfaces/OnExecuteErrorData.md)\>

## Methods

### execute

▸ **execute**(`action`): `Observable`<`string`\>

Executes the provided `action` with reCAPTCHA v3 API.
Use the emitted token value for verification purposes on the backend.

For more information about reCAPTCHA v3 actions and tokens refer to the official documentation at
https://developers.google.com/recaptcha/docs/v3.

#### Parameters

| Name     | Type     | Description           |
| :------- | :------- | :-------------------- |
| `action` | `string` | the action to execute |

#### Returns

`Observable`<`string`\>

an `Observable` that will emit the reCAPTCHA v3 string `token` value whenever ready.
The returned `Observable` completes immediately after emitting a value.
