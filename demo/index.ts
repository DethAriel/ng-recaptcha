// tslint:disable no-require-imports
import fs from 'fs';
import merge from 'lodash.merge';
import path from 'path';

const supportedOlderVersions = ['v6', 'v7', 'v8'];

generateSourcesForOlderVersions();
generateSourcesForV9();
generateSourcesForV10();

function generateSourcesForV9() {
  readDirRecursively('v9-template').forEach((file) => processFileForVersions(file, ['v9']));
  readDirRecursively('v-all/bin').forEach((file) => processFileForVersions(file, ['v9']));
}

function generateSourcesForV10() {
  readDirRecursively('v10-template').forEach((file) => processFileForVersions(file, ['v10']));
  readDirRecursively('v-all/bin').forEach((file) => processFileForVersions(file, ['v10']));
}

function generateSourcesForOlderVersions() {
  readDirRecursively('v-all').forEach(processFileForOlderVersions);
}

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

function processFileForOlderVersions(file: string): void {
  processFileForVersions(file, supportedOlderVersions);
}

function processFileForVersions(file: string, versions: string[]): void {
  if (file.endsWith('.template.ts')) {
    const fileExports = require('./' + file);

    const actualRelativePath = stripFirstDir(stripSuffix(file, '.template.ts'));

    versions.forEach((version) => {
      if (fileExports[version]) {
        writeToDestination(`${version}/${actualRelativePath}`, fileExports[version]);
      }
    });
  } else if (file.endsWith('.json.merge')) {
    const actualRelativePath = stripFirstDir(stripSuffix(file, '.merge'));
    const commonContents = JSON.parse(fs.readFileSync(file, { encoding: 'UTF-8' }));

    versions.forEach((version) => {
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

    versions.forEach((version) => {
      copyToDestination(`${version}/${actualRelativePath}`, file);
    });
  } else {
    const actualRelativePath = stripFirstDir(file);

    versions.forEach((version) => {
      copyToDestination(`${version}/${actualRelativePath}`, file);
    });
  }
}
