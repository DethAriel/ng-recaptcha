import * as path from 'path';

import { entry } from './webpack/entry';
import { moduleConfig } from './webpack/module';
import { plugins } from './webpack/plugins';

const isProd = process.env.NODE_ENV === 'production';

// tslint:disable-next-line:no-default-export - default export is what webpack expects
export default {
  entry,
  context: path.join(process.cwd(), 'src'),
  output: {
    path: path.join(process.cwd(), 'dist', 'ng-recaptcha'),
    filename: isProd ? '[name].[chunkhash:8].js' : '[name].js',
  },
  module: moduleConfig,
  plugins,
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js'],
  },
  devServer: {
    port: 9000,
    inline: true,
    stats: 'normal',
    publicPath: '/ng-recaptcha/',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500,
    },
  },
  stats: isProd ? 'errors-only' : 'normal',
  devtool: isProd ? 'source-map' : 'eval',
};
