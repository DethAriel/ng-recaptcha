import { execSync } from "child_process";
import * as fs from 'fs';
import * as path from 'path';

const angularVersion = process.argv[2];

const sourceDir = path.join(__dirname, `../dist/ng-recaptcha/${angularVersion}-temp/`);
const targetDir = path.join(__dirname, `../dist/ng-recaptcha/`);

console.log(`Copying contents of "${sourceDir}" dir into "${targetDir}"`);
copyDirRecursively(sourceDir, targetDir);
if (fs.existsSync(sourceDir)) {
  execSync(`yarn rimraf ${sourceDir}`, { stdio: 'inherit' });
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
