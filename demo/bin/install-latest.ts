/**
 * This script exists to workaround the following two yarn bugs:
 * - https://github.com/yarnpkg/yarn/issues/6811
 * - https://github.com/yarnpkg/yarn/issues/5357
 *
 * The original idea was borrowed from this comment:
 * - https://github.com/yarnpkg/yarn/issues/5357#issuecomment-490528542
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

updateToLatestLocalNgRecaptchaVersion();

function updateToLatestLocalNgRecaptchaVersion() {
  const timestampedName = `ng-recaptcha-${Date.now()}.tgz`;
  fs.copyFileSync(path.join(__dirname, '../../ng-recaptcha-latest.tgz'), path.join(__dirname, `../../${timestampedName}`));

  execSync(`yarn add ../${timestampedName} --force --update-checksums`, { stdio: 'inherit' });
}
