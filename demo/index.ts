// tslint:disable no-require-imports
import fs from 'fs';
import merge from 'lodash.merge';
import path from 'path';

const supportedVersions = ['v7', 'v8', 'v9', 'v10'];

readDirRecursively('v-all').forEach(processFile);

function readDirRecursively(dir: string, filePathList: string[] = []): string[] {
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const fileOrDirPath = dir + '/' + entry;
    if (fs.statSync(fileOrDirPath).isDirectory()) {
      filePathList = readDirRecursively(fileOrDirPath, filePathList);
    } else {
      filePathList.push(fileOrDirPath);
    }
  });

  return filePathList;
}

function stripFirstDir(filePath: string) {
  const [_baseDir, ...parts] = filePath.split('/');

  return parts.join('/');
}

function stripSuffix(filePath: string, suffix: string) {
  return filePath.substr(0, filePath.length - suffix.length);
}

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function writeToDestination(filePath: string, contents: string): void {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, contents);
}

function copyToDestination(filePath: string, from: string): void {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  ensureDirectoryExistence(filePath);
  fs.copyFileSync(from, filePath);
}

function processFile(file: string): void {
  if (file.endsWith('.template.ts')) {
    const fileExports = require('./' + file);

    const actualRelativePath = stripFirstDir(stripSuffix(file, '.template.ts'));

    supportedVersions.forEach((version) => {
      if (fileExports[version]) {
        writeToDestination(`${version}/${actualRelativePath}`, fileExports[version]);
      }
    });
  } else if (file.endsWith('.json.merge')) {
    const actualRelativePath = stripFirstDir(stripSuffix(file, '.merge'));
    const commonContents = JSON.parse(fs.readFileSync(file, { encoding: 'UTF-8' }));

    supportedVersions.forEach((version) => {
      const versionContents = JSON.parse(
        fs.readFileSync(
          `${version}/${actualRelativePath}.merge`,
          { encoding: 'UTF-8' },
        ),
      );

      const contents = JSON.stringify(
        merge({}, commonContents, versionContents),
        null,
        2,
      );

      writeToDestination(`${version}/${actualRelativePath}`, contents);
    });
  } else if (file.endsWith('.copy')) {
    const actualRelativePath = stripFirstDir(stripSuffix(file, '.copy'));

    supportedVersions.forEach((version) => {
      copyToDestination(`${version}/${actualRelativePath}`, file);
    });
  } else {
    const actualRelativePath = stripFirstDir(file);

    supportedVersions.forEach((version) => {
      copyToDestination(`${version}/${actualRelativePath}`, file);
    });
  }
}
