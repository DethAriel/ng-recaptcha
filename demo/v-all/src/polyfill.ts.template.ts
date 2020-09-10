function generate({
  angularVersion,
}: {
  angularVersion: 'v6' | 'v7' | 'v8' | 'v9' | 'v10',
}) {
  if (['v6', 'v7', 'v8'].indexOf(angularVersion) >= 0) {
    return `import 'core-js/client/shim';

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone'; // tslint:disable-line:ordered-imports

import './styles.css';`;
  }

  return `import 'zone.js/dist/zone';
`;
}

export const v6 = generate({ angularVersion: 'v6' });
export const v7 = generate({ angularVersion: 'v7' });
export const v8 = generate({ angularVersion: 'v8'  });
export const v9 = generate({ angularVersion: 'v9' });
export const v10 = generate({ angularVersion: 'v10' });
