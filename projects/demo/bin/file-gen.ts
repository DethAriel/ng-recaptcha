import * as fs from "fs";
import * as path from "path";
import highlightJs from "highlight.js";

import { examples, Example } from "./examples";

const sourceDir = path.join(process.cwd(), "projects/demo/src");
generateFiles();

function writeExampleFile(featureName: string, fileName: string, contents: string) {
  const location = path.join(sourceDir, "app", "examples", featureName, fileName);

  fs.writeFileSync(location, contents, { encoding: "utf-8" });
}

function highlightRequire(file: string, lang: string) {
  return JSON.stringify(highlightCode(fs.readFileSync(file, { encoding: "utf-8" }), lang));

  function highlightCode(code: string, lang: string | undefined) {
    if (lang) {
      return highlightJs.highlight(code, { language: lang }).value;
    }

    return highlightJs.highlightAuto(code).value;
  }
}

function generateData(example: Example) {
  const featureName = example.name;
  const contents = `import { PageSettings } from '../../demo-wrapper/demo-wrapper.component';

export const settings: PageSettings = {
  feature: '${featureName}',
  title: '${example.title}',
  content: {
    component: ${highlightRequire(`${sourceDir}/app/examples/${featureName}/${featureName}-demo.component.ts`, "ts")},
    html: ${highlightRequire(`${sourceDir}/app/examples/${featureName}/${featureName}-demo.component.html`, "html")},
    module: {
      '': ${highlightRequire(`${sourceDir}/app/examples/${featureName}/${featureName}-demo.module-default`, "ts")},
      'fr': ${highlightRequire(`${sourceDir}/app/examples/${featureName}/${featureName}-demo.module-fr`, "ts")},
      'de': ${highlightRequire(`${sourceDir}/app/examples/${featureName}/${featureName}-demo.module-de`, "ts")},
    },
  },
};
`;

  writeExampleFile(featureName, `${featureName}-demo.data.ts`, contents);
}

function generateLinks() {
  const location = path.join(sourceDir, "app", "demo-wrapper", "demo-wrapper.data.auto-gen.ts");
  const contents = `export const navLinks = [
  ${examples
    .map(
      (e) => `{
    label: '${e.label}',
    path: '${e.name}',
    feature: '${e.name}',
  },`,
    )
    .join("\n  ")}
];
`;

  fs.writeFileSync(location, contents, { encoding: "utf-8" });
}

function generateFiles() {
  examples.forEach(generateData);
  generateLinks();
}
