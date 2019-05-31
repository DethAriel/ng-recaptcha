import { examples } from '../bin/examples';

const prod = process.env.NODE_ENV === 'production';
const entries = {
  polyfill: './polyfill',
};
examples.forEach((e) => {
  entries[`demo-${e.name}`] = `./app/examples/${e.name}/${e.name}-demo.main${prod ? '' : '.dev'}`;
  if (e.additional && e.additional.entry) {
    entries[e.additional.entry] = `./app/examples/${e.name}/${e.additional.filename}`;
  }
});

export const entry = entries;
