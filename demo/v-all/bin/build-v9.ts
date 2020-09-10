import { examples, Example } from './examples';
import { execSync } from "child_process";
import * as fs from 'fs';

examples.forEach(buildExample)
execSync('rm -rf ../dist/ng-recaptcha/v9-temp', { stdio: 'inherit' })

function buildExample(example: Example) {
  if (example.additional) {
    // FIXME "ng build" supports multiple entry points out of the box.
    // However, that should be possible. And once we figure out how to do this properly,
    // this function should also generate resources for such examples
    return;
  }

  const indexFileName = example.index ? 'index.html' : example.name + '.html';

  if (!fs.existsSync(`src/${indexFileName}`)) {
    fs.copyFileSync('src/index.html', `src/${indexFileName}`);
  }

  const angularSettings = JSON.parse(fs.readFileSync('./angular.json', { encoding: 'utf-8' }));
  angularSettings.projects.v9.architect.build.options.outputPath = `../dist/ng-recaptcha/v9-temp`;
  angularSettings.projects.v9.architect.build.options.index = `src/${indexFileName}`;
  angularSettings.projects.v9.architect.build.options.main = `src/app/examples/${example.name}/${example.name}-demo.main.ts`;
  fs.writeFileSync('./angular.json', JSON.stringify(angularSettings, null, 2), { encoding: 'utf-8' });

  const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.app.json', { encoding: 'utf-8' }));
  tsConfig.files = [
    `src/app/examples/${example.name}/${example.name}-demo.main.ts`,
    "src/polyfills.ts"
  ];
  fs.writeFileSync('./tsconfig.app.json', JSON.stringify(tsConfig, null, 2), { encoding: 'utf-8' });


  execSync('yarn ng-build', { stdio: 'inherit' });
  execSync('cp -R ../dist/ng-recaptcha/v9-temp/ ../dist/ng-recaptcha', { stdio: 'inherit' });
}
