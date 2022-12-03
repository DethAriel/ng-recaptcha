import { LayoutModule } from "@angular/cdk/layout";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatRadioModule } from "@angular/material/radio";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
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
    HttpClientModule,
  ],
  exports: [DemoWrapperComponent],
  providers: [{ provide: NAV_LINKS, useValue: navLinks }],
})
export class DemoWrapperModule {}
