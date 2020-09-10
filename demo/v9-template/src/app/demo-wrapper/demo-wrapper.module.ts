import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
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
