function generate({
  webpackVersion,
  outSubdirectory,
}: {
  webpackVersion: '3' | '4',
  outSubdirectory?: string,
}) {
  return `
import { MediaMatcher } from '@angular/cdk/layout'; // tslint:disable-line:no-submodule-imports
import { ChangeDetectorRef, Component, Inject, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

${
    webpackVersion === '4'
      ? `
// "mini-css-extract-plugin" does not place nice with AngularCompilerPlugin,
// see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/186.
// We'll need to refactor that when the issue gets fixed
import './recaptcha-demo-wrapper.component.css';
    `.trim()
      : ''
    }

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
  ${webpackVersion === '3'
      ? `
  styleUrls: [
    './recaptcha-demo-wrapper.component.css',
  ],
  `.trim()
      : ''}
  templateUrl: './recaptcha-demo-wrapper.component.html',
})
export class DemoWrapperComponent implements OnInit, OnDestroy {
  public site = {
    title: 'ng-recaptcha',
    description: 'Angular component for Google reCAPTCHA',
    ${outSubdirectory
      ? `
    baseurl: '/ng-recaptcha/${outSubdirectory}',
      `.trim()
      : `
    baseurl: '/ng-recaptcha',
      `.trim()
    }
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
    this.titleService.setTitle(\`\${this.page.title} | \${this.site.title}\`);
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}`.trim();
}

export const v6 = generate({ webpackVersion: '3', outSubdirectory: 'v6' });
export const v7 = generate({ webpackVersion: '4', outSubdirectory: 'v7' });
export const v8 = generate({ webpackVersion: '4' });
