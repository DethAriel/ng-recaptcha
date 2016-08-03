import { 
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    Output,
    Input,
    NgZone,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { RecaptchaLoaderService } from './recaptcha-loader.service';
import { Subscription } from 'rxjs/Subscription';

declare var grecaptcha: any;

export type RecaptchaTheme = "light" | "dark";
export type RecaptchaType = "image" | "audio";
export type RecaptchaSize = "normal" | "compact";

var nextId = 0;

@Component({
    selector: 'recaptcha',
    template: `<div [id]="id"></div>`,
})
export class RecaptchaComponent implements AfterViewInit, OnDestroy {
    @Input() id = `ngrecaptcha-${nextId++}`;

    @Input() siteKey: string;
    @Input() theme: RecaptchaTheme;
    @Input() type: RecaptchaType;
    @Input() size: RecaptchaSize;
    @Input() tabIndex: number;

    @Output() resolved = new EventEmitter<string>();
    private subscription: Subscription;
    private widget: any;
    private isResolved = false;

    constructor(
        private _el: ElementRef,
        private _loader: RecaptchaLoaderService, 
        private _zone: NgZone
    ) {
    }
    ngAfterViewInit() {
        this.subscription = this._loader.ready.subscribe(loaded => { 
            if (loaded) { 
                this._renderRecaptcha(); 
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    reset() {
        grecaptcha.reset(this.widget);
        this.isResolved = false;
        this.resolved.emit(null);
    }

    private captchaReponseCallback(response: string) {
        this.isResolved = true;
        this.resolved.emit(response);
    }

    private _renderRecaptcha() {
        this.widget = grecaptcha.render(this.id, {
            'callback': (response: string) => {
                this._zone.run(() => this.captchaReponseCallback(response));
            },
            'expired-callback': () => {
                this._zone.run(() => this.reset());
            },
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabIndex,
        });
    }
}
