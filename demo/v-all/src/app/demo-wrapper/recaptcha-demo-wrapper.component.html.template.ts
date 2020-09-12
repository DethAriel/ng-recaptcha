function generate({
  angularVersion,
}: {
  angularVersion: 'v6' | 'v7' | 'v8' | 'v9' | 'v10',
}) {
  const iconBasePath = ['v6', 'v7', 'v8'].indexOf(angularVersion) >= 0
    ? '../../'
    : '';

  return `<section class="recaptcha-demo-wrapper">
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <img src="${iconBasePath}images/angular.svg" height="40px" />
    <span>{{ site.title }}</span>
    <span class="filler"></span>

    <a *ngIf="!mobileQuery.matches" mat-button href="https://github.com/DethAriel/ng2-recaptcha">
      <img src="${iconBasePath}images/octocat.svg" height="26px" />
      <span>GitHub</span>
    </a>
    <a *ngIf="mobileQuery.matches" aria-label="GitHub repository" mat-icon-button href="https://github.com/DethAriel/ng2-recaptcha">
      <img src="${iconBasePath}images/octocat.svg" height="26px" />
    </a>
  </mat-toolbar-row>
</mat-toolbar>

<mat-sidenav-container>
  <mat-sidenav
    #sidenav
    (closed)="sidebarOpened = false"
    [opened]="!mobileQuery.matches || sidebarOpened"
    [mode]="mobileQuery.matches ? 'over' : 'side'"
    [fixedInViewport]="mobileQuery.matches"
    fixedTopGap="56"
  >
    <mat-nav-list>
      <h3>Examples</h3>
      <a
        mat-list-item
        *ngFor="let link of navLinks"
        [href]="site.baseurl + link.path"
        [class.active]="page.feature === link.feature"
      >
        {{ link.label }}
      </a>
   </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <div class="layout">
      <mat-toolbar color="primary">
        <button mat-icon-button *ngIf="mobileQuery.matches" (click)="sidebarOpened = true">
          <mat-icon aria-hidden="true">menu</mat-icon>
        </button>
        <span>{{ page.title }}</span>
      </mat-toolbar>
      <main>
        <div class="example-container">
          <ng-content></ng-content>
        </div>

        <mat-tab-group>
          <mat-tab>
            <ng-template mat-tab-label>
              <code>{{page.feature}}.component.html</code>
            </ng-template>
            <pre [innerHTML]="page.content.html"></pre>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <code>{{page.feature}}.component.ts</code>
            </ng-template>
            <pre [innerHTML]="page.content.component"></pre>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <code>main.ts</code>
            </ng-template>
            <pre [innerHTML]="page.content.module"></pre>
          </mat-tab>
          <mat-tab *ngIf="page.content.additional">
            <ng-template mat-tab-label>
              <code>{{ page.content.additional.title }}</code>
            </ng-template>
            <pre [innerHTML]="page.content.additional.content"></pre>
          </mat-tab>
        </mat-tab-group>
      </main>
      <footer>
        <div>
          <img src="${iconBasePath}images/angular.svg" height="32px" />
        </div>
        <div>
          <h3>{{ site.title }}</h3>
        </div>
        <span>{{ site.description }}</span>
      </footer>
    </div>
  </mat-sidenav-content>
</mat-sidenav-container>
</section>
`;
}

export const v6 = generate({ angularVersion: 'v6' });
export const v7 = generate({ angularVersion: 'v7' });
export const v8 = generate({ angularVersion: 'v8'  });
export const v9 = generate({ angularVersion: 'v9' });
export const v10 = generate({ angularVersion: 'v10' });
