import * as fs from 'fs';
import * as path from 'path';
import { examples, Example } from './examples';

const sourceDir = path.join(process.cwd(), 'src');

generateFiles();

function writeExampleFile(featureName: string, fileName: string, contents: string) {
  const location = path.join(sourceDir, 'app', 'examples', featureName, fileName);

  fs.writeFileSync(location, contents, { encoding: 'UTF8' });
}

function highlightRequire(file: string, lang: string) {
  var hl = require('highlight.js');
  var highlightAuto = hl.highlightAuto;
  var highlight = hl.highlight;

  return JSON.stringify(highlightCode(fs.readFileSync(file, { encoding: 'utf-8' }), lang))

  function highlightCode(code: string, lang: string | undefined) {
    if(lang) {
      return highlight(lang, code).value;
    }

    return highlightAuto(code).value;
  }
}

function generateData(example: Example) {
  const featureName = example.name;
  const contents = `// tslint:disable no-require-imports no-submodule-imports
import { PageSettings } from '../../demo-wrapper/demo-wrapper.component';

export const settings: PageSettings = {
  feature: '${featureName}',
  title: '${example.title}',
  content: {
    component: ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.component.ts`, 'ts')},
    html: ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.component.html`, 'html')},
    module: ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.module.ts`, 'ts')},
    module2: {
      '': ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.module.ts`, 'ts')},
      'fr': ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.module.ts`, 'ts')},
      'de': ${highlightRequire(`./src/app/examples/${featureName}/${featureName}-demo.module.ts`, 'ts')},
    },
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
    path: '${e.name}',
    feature: '${e.name}',
  },`).join('\n  ')}
];
`;

  fs.writeFileSync(location, contents, { encoding: 'UTF8' });
}

function generateFiles() {
  examples.forEach(generateData);
  generateLinks();
}
