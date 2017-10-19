import { context } from './webpack/context';
import { devServer } from './webpack/dev-server';
import { entry } from './webpack/entry';
import { moduleConfig } from './webpack/module';
import { output } from './webpack/output';
import { plugins } from './webpack/plugins';
import { resolve } from './webpack/resolve';

// tslint:disable-next-line:no-default-export - default export is what webpack expects
export default {
  entry,
  context,
  output,
  module: moduleConfig,
  plugins,
  resolve,
  devServer,
  stats: 'errors-only',
  devtool: 'source-map',
};
