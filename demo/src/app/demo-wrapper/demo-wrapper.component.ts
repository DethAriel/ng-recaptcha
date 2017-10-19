import { MediaMatcher } from '@angular/cdk/layout'; // tslint:disable-line:no-submodule-imports
import { ChangeDetectorRef, Component, Inject, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

export interface PageSettings {
  title: string;
  feature: string;
  content: {
    html: string;
    component: string;
    module: string;
    additional?: {
      title: string;
      type: string;
      content: string;
    }
  };
}
export interface NavLink {
  label: string;
  path: string;
  feature: string;
}
export const PAGE_SETTINGS = new InjectionToken<PageSettings>('PAGE_SETTINGS');
export const NAV_LINKS = new InjectionToken<NavLink[]>('NAV_LINKS');

@Component({
  selector: 'recaptcha-demo-wrapper',
  styleUrls: [
    './recaptcha-demo-wrapper.component.css',
  ],
  templateUrl: './recaptcha-demo-wrapper.component.html',
})
export class DemoWrapperComponent implements OnInit, OnDestroy {
  public site = {
    title: 'ng-recaptcha',
    description: 'Angular component for Google reCAPTCHA',
    baseurl: '/ng-recaptcha',
  };
  public mobileQuery: MediaQueryList;
  public sidebarOpened: boolean = false;

  private mobileQueryListener: () => void;

  constructor(
    @Inject(PAGE_SETTINGS) public page: PageSettings,
    @Inject(NAV_LINKS) public navLinks: NavLink[],
    private titleService: Title,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  public ngOnInit() {
    this.titleService.setTitle(`${this.page.title} | ${this.site.title}`);
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
