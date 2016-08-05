import { 
    Injectable, 
    EventEmitter,
    Optional,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecaptchaLoaderService {
    /** @internal */
    private _language: string;
    /** @internal */
    private static _ready: BehaviorSubject<boolean>;
    public ready: Observable<boolean>;

    constructor(@Optional() language?: string) { 
        this._language = language;
        this._init();
        this.ready =  RecaptchaLoaderService._ready.asObservable();
    }

    /** @internal */
    private _init() {
        if (RecaptchaLoaderService._ready) {
            return;
        }
        (<any>window).ng2recaptchaloaded = () => {
            RecaptchaLoaderService._ready.next(true);
        };
        RecaptchaLoaderService._ready = new BehaviorSubject<boolean>(false);
        var head = <HTMLHeadElement> document.head;
        var script = <HTMLScriptElement>document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=ng2recaptchaloaded' + (this._language ? '&hl=' + this._language : '');
        script.async = true;
        script.defer = true;
        head.appendChild(script);
    }
}
