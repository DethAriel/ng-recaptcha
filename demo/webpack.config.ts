import * as path from 'path';

import { examples } from './bin/examples';
import { moduleConfig } from './webpack/module';
import { plugins } from './webpack/plugins';

const isProd = process.env.NODE_ENV === 'production';

const entries = {
  polyfill: './polyfill',
};
examples.forEach((e) => {
  entries[`demo-${e.name}`] = `./app/examples/${e.name}/${e.name}-demo.main${isProd ? '' : '.dev'}`;

  if (e.additional && e.additional.entry) {
    entries[e.additional.entry] = `./app/examples/${e.name}/${e.additional.filename}`;
  }
});

// tslint:disable-next-line:no-default-export - default export is what webpack expects
export default {
  mode: isProd ? 'production' : 'development',
  entry: entries,
  context: path.join(process.cwd(), 'src'),
  output: {
    path: path.join(process.cwd(), 'dist', 'ng-recaptcha'),
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    ...(isProd ? { chunkFilename: `[name].[chunkhash].js` } : {}),
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
  optimization: {
    minimize: isProd,
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },
};
