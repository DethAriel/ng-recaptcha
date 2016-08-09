import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    Output,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { RecaptchaLoaderService } from './recaptcha-loader.service';

let nextId = 0;

@Component({
    selector: 'recaptcha',
    template: `<div [id]="id"></div>`,
})
export class RecaptchaComponent implements AfterViewInit, OnDestroy {
    @Input() id = `ngrecaptcha-${nextId++}`;

    @Input() siteKey: string;
    @Input() theme: ReCaptchaV2.Theme;
    @Input() type: ReCaptchaV2.Type;
    @Input() size: ReCaptchaV2.Size;
    @Input() tabIndex: number;

    @Output() resolved = new EventEmitter<string>();

    /** @internal */
    private subscription: Subscription;
    /** @internal */
    private widget: number;
    /** @internal */
    private _grecaptcha: ReCaptchaV2.ReCaptcha;

    constructor(
        private _el: ElementRef,
        private _loader: RecaptchaLoaderService,
        private _zone: NgZone
    ) {
    }
    ngAfterViewInit() {
        this.subscription = this._loader.ready.subscribe(grecaptcha => {
            if (grecaptcha != null) {
                this._grecaptcha = grecaptcha;
                this._renderRecaptcha();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    reset() {
        if (this.widget != null) {
            this._grecaptcha.reset(this.widget);
            this.resolved.emit(null);
        }
    }

    /** @internal */
    private captchaReponseCallback(response: string) {
        this.resolved.emit(response);
    }

    /** @internal */
    private _renderRecaptcha() {
        this.widget = this._grecaptcha.render(this.id, {
            callback: (response: string) => {
                this._zone.run(() => this.captchaReponseCallback(response));
            },
            'expired-callback': () => {
                this._zone.run(() => this.reset());
            },
            sitekey: this.siteKey,
            size: this.size,
            tabindex: this.tabIndex,
            theme: this.theme,
            type: this.type,
        });
    }
}
