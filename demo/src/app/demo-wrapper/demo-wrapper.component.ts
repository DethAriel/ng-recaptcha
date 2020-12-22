import { MediaMatcher } from "@angular/cdk/layout"; // tslint:disable-line:no-submodule-imports
import {
  ChangeDetectorRef,
  Component,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ResolveEnd } from "@angular/router";
import { parse, stringify } from "query-string";

import { parseLangFromHref } from "../parse-lang-from-href";

export interface PageSettings {
  title: string;
  feature: string;
  content: {
    html: string;
    component: string;
    module: {
      "": string;
      fr: string;
      de: string;
    };
  };
}
export interface NavLink {
  label: string;
  path: string;
  feature: string;
}
export const NAV_LINKS = new InjectionToken<NavLink[]>("NAV_LINKS");

@Component({
  selector: "recaptcha-demo-wrapper",
  styleUrls: ["./recaptcha-demo-wrapper.component.css"],
  templateUrl: "./recaptcha-demo-wrapper.component.html",
})
export class DemoWrapperComponent implements OnInit, OnDestroy {
  public site = {
    title: "ng-recaptcha",
    description: "Angular component for Google reCAPTCHA",
  };
  public page?: PageSettings;
  public mobileQuery: MediaQueryList;
  public sidebarOpened: boolean = false;

  public selectedLanguage: "" | "fr" | "de" = "";

  private mobileQueryListener: () => void;

  constructor(
    @Inject(NAV_LINKS) public navLinks: NavLink[],
    private titleService: Title,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  public ngOnInit() {
    this.selectedLanguage = parseLangFromHref();

    this.router.events.subscribe((data) => {
      if (data instanceof ResolveEnd) {
        const unifiedRouteData = (function gatherRecursively(
          children,
          value = {}
        ) {
          if (!children || children.length === 0) {
            return value;
          }

          return children.reduce(
            (acc, snapshot) => ({
              ...acc,
              ...snapshot.data,
              ...gatherRecursively(snapshot.children),
            }),
            value
          );
        })(data.state.root.children);

        this.page = unifiedRouteData.page;
        if (this.page) {
          this.titleService.setTitle(`${this.page.title} | ${this.site.title}`);
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public onLangChange(newLang): void {
    const { pathname, search } = window.location;

    const currentSearch = parse(search);

    if (newLang === "") {
      delete currentSearch.lang;
    } else {
      currentSearch.lang = newLang;
    }

    const newSearch = stringify(currentSearch);
    const newLocation =
      pathname + (newSearch.length === 0 ? "" : `?${newSearch}`);

    window.location.assign(newLocation);
  }
}
