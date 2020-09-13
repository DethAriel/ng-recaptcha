import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DemoWrapperModule } from './demo-wrapper.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(DemoWrapperModule)
  .catch(err => console.error(err));
