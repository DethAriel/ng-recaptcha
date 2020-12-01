import * as fs from 'fs';
import * as path from 'path';

import { examples } from './examples';

copyEntryPoints();

function copyEntryPoints() {
  const angularOptions = JSON.parse(fs.readFileSync(path.join(__dirname, "../angular.json"), { encoding: 'utf-8' }));
  const angularDistDirSetting = angularOptions.projects['v-demo'].architect.build.options.outputPath;
  const angularDistDir = path.join(__dirname, '..', angularDistDirSetting);

  const indexHtmlFile = path.join(angularDistDir, 'index.html');

  examples.forEach(e => {
    fs.copyFileSync(indexHtmlFile, path.join(angularDistDir, `${e.name}.html`));
  });
}
