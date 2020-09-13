import { examples, Example } from "../../../bin/examples";

function generate({
  angularVersion,
}: {
  angularVersion: 'v6' | 'v7' | 'v8' | 'v9' | 'v10',
}) {
  function getLoadChildrenString(e: Example) {
    if (angularVersion === 'v6') {
      return `loadChildren: 'src/app/examples/${e.name}/${e.name}-demo.module#DemoModule'`;
    }

    if (angularVersion === 'v7') {
      return `loadChildren: '../examples/${e.name}/${e.name}-demo.module#DemoModule'`;
    }

    return `loadChildren: () => import('../examples/${e.name}/${e.name}-demo.module').then(m => m.DemoModule)`;
  }

  return `import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
${examples.map(e => `  {
    path: '${e.name}',
    ${getLoadChildrenString(e)},
  }`).join(',\n')},
  { path: '', redirectTo: '/${examples.find(e => e.index)!.name}', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DemoWrapperRoutingModule { }
`;
}

export const v6 = generate({ angularVersion: 'v6' });
export const v7 = generate({ angularVersion: 'v7' });
export const v8 = generate({ angularVersion: 'v8'  });
export const v9 = generate({ angularVersion: 'v9' });
export const v10 = generate({ angularVersion: 'v10' });
