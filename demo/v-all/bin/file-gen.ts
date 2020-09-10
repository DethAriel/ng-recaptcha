import * as fs from 'fs';
import * as path from 'path';
import { examples } from './examples';

const sourceDir = path.join(process.cwd(), 'src');

function writeExampleFile(featureName, fileName, contents) {
  const location = path.join(sourceDir, 'app', 'examples', featureName, fileName);

  fs.writeFileSync(location, contents, { encoding: 'UTF8' });
}

function generateMain(featureName) {
  const contents = `import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { DemoModuleNgFactory } from './${featureName}-demo.module.ngfactory';

enableProdMode();
platformBrowser().bootstrapModuleFactory(DemoModuleNgFactory);
`;

  writeExampleFile(featureName, `${featureName}-demo.main.ts`, contents);
}

function generateData(example) {
  const featureName = example.name;
  const additionalContents = !example.additional ? '' : `
    additional: {
      content: require('!highlight-loader?raw=true&lang=${example.additional.type}!./${example.additional.filename}.ts'),
      title: '${example.additional.title}',
      type: '${example.additional.type}',
    },`;
  const contents = `// tslint:disable no-require-imports no-submodule-imports
import { PageSettings } from '../../demo-wrapper/demo-wrapper.component';

export const settings: PageSettings = {
  feature: '${featureName}',
  title: '${example.title}',
  content: {
    component: require('!highlight-loader?raw=true&lang=ts!./${featureName}-demo.component.ts'),
    html: require('!highlight-loader?raw=true&lang=html!./${featureName}-demo.component.html'),
    module: require('!highlight-loader?raw=true&lang=ts!./${featureName}-demo.module.ts'),${additionalContents}
  },
};
`;

  writeExampleFile(featureName, `${featureName}-demo.data.ts`, contents);
}

function generateLinks() {
  const location = path.join(sourceDir, 'app', 'demo-wrapper', 'demo-wrapper.data.auto-gen.ts');
  const contents = `export const navLinks = [
  ${examples.map((e) => `{
    label: '${e.label}',
    path: '${e.path}',
    feature: '${e.name}',
  },`).join('\n  ')}
];
`;

  fs.writeFileSync(location, contents, { encoding: 'UTF8' });
}

function generateFiles() {
  examples.map((e) => e.name).forEach(generateMain);
  examples.forEach(generateData);
  generateLinks();
}

generateFiles();
