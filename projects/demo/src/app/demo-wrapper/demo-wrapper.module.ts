import { LayoutModule } from "@angular/cdk/layout";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyListModule as MatListModule } from "@angular/material/legacy-list";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatLegacyRadioModule as MatRadioModule } from "@angular/material/legacy-radio";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatLegacyTabsModule as MatTabsModule } from "@angular/material/legacy-tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DemoWrapperComponent, NAV_LINKS } from "./demo-wrapper.component";
import { navLinks } from "./demo-wrapper.data.auto-gen";
import { DemoWrapperRoutingModule } from "./demo-wrapper-routing.module";

@NgModule({
  bootstrap: [DemoWrapperComponent],
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
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatRadioModule,
    LayoutModule,
    DemoWrapperRoutingModule,
  ],
  exports: [DemoWrapperComponent],
  providers: [{ provide: NAV_LINKS, useValue: navLinks }],
})
export class DemoWrapperModule {}
