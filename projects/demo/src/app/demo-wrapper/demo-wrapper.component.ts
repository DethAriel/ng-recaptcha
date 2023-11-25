import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Component, Inject, InjectionToken, OnDestroy, OnInit, VERSION } from "@angular/core";
import { Title, DomSanitizer } from "@angular/platform-browser";
import { Router, ResolveEnd, ActivatedRouteSnapshot, Data } from "@angular/router";
import { MatIconRegistry } from "@angular/material/icon";

import { parseLangFromHref } from "../parse-lang-from-href";

export interface PageSettings {
  title: string;
  feature: string;
  content: {
    html: string;
    component: string;
    module: string;
  };
}
export interface NavLink {
  label: string;
  path: string;
  feature: string;
}
export const NAV_LINKS = new InjectionToken<NavLink[]>("NAV_LINKS");

function isPageSettings(value: unknown): value is PageSettings {
  if (value == null || typeof value !== "object") {
    return false;
  }

  return "title" in value;
}

@Component({
  selector: "recaptcha-demo-wrapper",
  styleUrls: ["./demo-wrapper.component.css"],
  templateUrl: "./demo-wrapper.component.html",
})
export class DemoWrapperComponent implements OnInit, OnDestroy {
  public site = {
    title: "ng-recaptcha",
    description: "Angular component for Google reCAPTCHA",
  };
  public logoTitle = `Angular v${VERSION.full}`;
  public page?: PageSettings;
  public mobileQuery: MediaQueryList;
  public sidebarOpened = false;

  public selectedLanguage: "" | "fr" | "de" = "";

  private mobileQueryListener: () => void;

  constructor(
    @Inject(NAV_LINKS) public navLinks: NavLink[],
    private titleService: Title,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this.mobileQueryListener);
    this.matIconRegistry.addSvgIcon(`octocat`, this.domSanitizer.bypassSecurityTrustResourceUrl(`images/octocat.svg`));
  }

  public ngOnInit(): void {
    this.selectedLanguage = parseLangFromHref();

    this.router.events.subscribe((data) => {
      if (data instanceof ResolveEnd) {
        const unifiedRouteData = (function gatherRecursively(
          children: ActivatedRouteSnapshot[],
          value: Data = {},
        ): Data {
          if (!children || children.length === 0) {
            return value;
          }

          return children.reduce(
            (acc, snapshot) => ({
              ...acc,
              ...snapshot.data,
              ...gatherRecursively(snapshot.children),
            }),
            value,
          );
        })(data.state.root.children);

        if (isPageSettings(unifiedRouteData.page)) {
          this.page = unifiedRouteData.page;
          this.titleService.setTitle(`${this.page.title} | ${this.site.title}`);
        } else {
          this.page = undefined;
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this.mobileQueryListener);
  }

  public onLangChange(newLang: string): void {
    const url = new URL(window.location.toString());

    if (newLang === "") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", newLang);
    }

    // TODO: issue a preload hint to the browser and issue next URL redirect based on Material animation duration
    setTimeout(() => window.location.assign(url), 500);
  }
}
