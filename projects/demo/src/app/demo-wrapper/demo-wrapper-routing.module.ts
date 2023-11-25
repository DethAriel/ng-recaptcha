import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { examples } from "../../../bin/examples";

const routes: Routes = [
  ...examples.map((e) => ({
    path: e.name,
    loadChildren: () =>
      import(`../examples/${e.name}/${e.name}-demo.module`).then(
        // eslint-disable-next-line
        (m) => m.DemoModule,
      ),
  })),
  {
    path: "",
    redirectTo: `/${examples.find((e) => e.index)!.name}`,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DemoWrapperRoutingModule {}
