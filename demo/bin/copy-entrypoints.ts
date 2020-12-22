import * as fs from "fs";
import * as path from "path";

import { examples } from "./examples";

copyEntryPoints();

function assertHasProp<T extends string>(
  value: unknown,
  prop: T
): asserts value is Record<T, unknown> {
  if (!value || typeof value !== "object" || !(prop in value)) {
    throw new Error(
      `Expected value to be an object containing property "${prop}", but it did not.`
    );
  }
}

function getProp<T extends string[]>(value: unknown, ...propPath: T): unknown {
  let current = value;
  for (const prop of propPath) {
    assertHasProp(current, prop);
    current = current[prop];
  }

  return current;
}

function readOutputPath(angularConfiguration: unknown): string {
  const outputPath = getProp(
    angularConfiguration,
    "projects",
    "demo",
    "architect",
    "build",
    "options",
    "outputPath"
  );

  if (typeof outputPath !== "string") {
    throw new Error(
      `Expected outputPath to be of type string but got this type instead: ${typeof outputPath}`
    );
  }

  return outputPath;
}

function copyEntryPoints() {
  const angularOptions: unknown = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../angular.json"), {
      encoding: "utf-8",
    })
  );
  const angularDistDirSetting = readOutputPath(angularOptions);
  const angularDistDir = path.join(__dirname, "..", angularDistDirSetting);

  const indexHtmlFile = path.join(angularDistDir, "index.html");

  examples.forEach((e) => {
    fs.copyFileSync(indexHtmlFile, path.join(angularDistDir, `${e.name}.html`));
  });
}
