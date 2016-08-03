# Angular 2 + TypeScript component for Google reCAPTCHA

# Installation
**TBD**

# Usage

```typescript
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { RecaptchaComponent } from 'ng2-recaptcha/ng2-recaptcha';

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

bootstrap(MyApp);
```

# Options

# Events
