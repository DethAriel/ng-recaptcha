import { LayoutModule } from '@angular/cdk/layout'; // tslint:disable-line:no-submodule-imports
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
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
