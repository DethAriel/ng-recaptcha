import { examples, Example } from './examples';
import { execSync } from "child_process";
import * as fs from 'fs';
import * as path from 'path';

const angularVersion = process.argv[2];
const isLatest = process.argv[3] === "--latest";

examples.forEach(buildExample)

function buildExample(example: Example) {
  const sourceDir = `../dist/ng-recaptcha/${angularVersion}-temp/`;
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
  angularSettings.projects[angularVersion].architect.build.options.outputPath = sourceDir;
  angularSettings.projects[angularVersion].architect.build.options.index = `src/${indexFileName}`;
  angularSettings.projects[angularVersion].architect.build.options.main = `src/app/examples/${example.name}/${example.name}-demo.main.ts`;
  fs.writeFileSync('./angular.json', JSON.stringify(angularSettings, null, 2), { encoding: 'utf-8' });

  fs.writeFileSync('./tsconfig.app.json', JSON.stringify({
    extends: "./tsconfig.app.base.json",
    files: [
      `src/app/examples/${example.name}/${example.name}-demo.main.ts`,
      "src/polyfill.ts"
    ]
  }, null, 2), { encoding: 'utf-8' });


  execSync('yarn ng build', { stdio: 'inherit' });
  const targetDir = `../dist/ng-recaptcha/${isLatest ? '' : `${angularVersion}/`}`;
  console.log(`Copying contents of "${sourceDir}" dir into "${targetDir}"`);
  copyDirRecursively(sourceDir, targetDir);
  if (fs.existsSync(sourceDir)) {
    execSync(`yarn rimraf ${sourceDir}`, { stdio: 'inherit' });
  }
}

function copyDirRecursively(sourceDir: string, targetDir: string) {
  readDirRecursively(sourceDir).forEach(file => {
    const destinationFilePath = path.join(targetDir, path.relative(sourceDir, file));
    const directory = path.dirname(destinationFilePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    fs.copyFileSync(file, destinationFilePath);
  });
}

function readDirRecursively(dir: string, filePathList: string[] = []): string[] {
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const fileOrDirPath = path.join(dir, entry);
    if (fs.statSync(fileOrDirPath).isDirectory()) {
      filePathList = readDirRecursively(fileOrDirPath, filePathList);
    } else {
      filePathList.push(fileOrDirPath);
    }
  });

  return filePathList;
}
