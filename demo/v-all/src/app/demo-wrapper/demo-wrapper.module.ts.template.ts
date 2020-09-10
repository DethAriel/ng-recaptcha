function generate({
  angularVersion,
}: {
  angularVersion: 'v6' | 'v7' | 'v8' | 'v9' | 'v10',
}) {
  const materialImportsForV8AndOlder = `
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
`.trim();
const materialImportsForV9AndNewer = `
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
`.trim();

  return `import { LayoutModule } from '@angular/cdk/layout'; // tslint:disable-line:no-submodule-imports
import { NgModule } from '@angular/core';
${['v6', 'v7', 'v8'].indexOf(angularVersion) >= 0 ? materialImportsForV8AndOlder : materialImportsForV9AndNewer}
import { BrowserModule } from '@angular/platform-browser';
// tslint:disable-next-line:no-submodule-imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DemoWrapperComponent, NAV_LINKS } from './demo-wrapper.component';
import { navLinks } from './demo-wrapper.data.auto-gen';

@NgModule({
  declarations: [DemoWrapperComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
  ],
  exports: [
    DemoWrapperComponent,
  ],
  providers: [
    { provide: NAV_LINKS, useValue: navLinks },
  ],
})
export class DemoWrapperModule { }
`;
}

export const v6 = generate({ angularVersion: 'v6' });
export const v7 = generate({ angularVersion: 'v7' });
export const v8 = generate({ angularVersion: 'v8'  });
export const v9 = generate({ angularVersion: 'v9' });
export const v10 = generate({ angularVersion: 'v10' });
