import * as fs from 'fs';
import * as path from 'path';
import { examples } from './examples';

const sourceDir = path.join(process.cwd(), 'src');

function writeExampleFile(featureName, fileName, contents) {
  const location = path.join(sourceDir, 'app', 'examples', featureName, fileName);

  fs.writeFileSync(location, contents, { encoding: 'UTF8' });
}

function highlightRequire(file: string, lang: string) {
  var hl = require('highlight.js');
  var highlightAuto = hl.highlightAuto;
  var highlight = hl.highlight;

  const data = JSON.stringify(highlightCode(fs.readFileSync(file, { encoding: 'utf-8' }), lang))

  function highlightCode(code: string, lang: string | undefined) {
    if(lang) {
      return highlight(lang, code).value;
    }

    return highlightAuto(code).value;
  }

  return data;
}

function generateMain(featureName) {
  const contents = `import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DemoModule } from './${featureName}-demo.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(DemoModule);
`;

  writeExampleFile(featureName, `${featureName}-demo.main.ts`, contents);
}

function generateData(example) {
  const featureName = example.name;
  const additionalContents = !example.additional ? '' : `
    additional: {
      content: ${highlightRequire(`./src/app/examples/${featureName}/${example.additional.filename}.ts`, example.additional.type)},
      title: '${example.additional.title}',
      type: '${example.additional.type}',
    },`;
  const contents = `// tslint:disable no-require-imports no-submodule-imports
import { PageSettings } from '../../demo-wrapper/demo-wrapper.component';

export const settings: PageSettings = {
  feature: '${featureName}',
  title: '${example.title}',
  content: {
    component: ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.component.ts`, 'ts')},
    html: ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.component.html`, 'html')},
    module: ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.module.ts`, 'ts')},${additionalContents}
  },
};
`;

  writeExampleFile(featureName, `${featureName}-demo.data.ts`, contents);
}

function generateLinks() {
  const location = path.join(sourceDir, 'app', 'demo-wrapper', 'demo-wrapper.data.auto-gen.ts');
  const contents = `export const navLinks = [
  ${examples.filter(e => !e.additional).map((e) => `{
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
