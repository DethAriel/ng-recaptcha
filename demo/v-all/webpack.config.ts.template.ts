function generate({
  webpackVersion,
  outSubdirectory,
}: {
  webpackVersion: '3' | '4',
  outSubdirectory?: string,
}) {
  return `
import * as path from 'path';

import { examples } from './bin/examples';
import { moduleConfig } from './webpack/module';
import { plugins } from './webpack/plugins';

const isProd = process.env.NODE_ENV === 'production';

const entries = {
  polyfill: './polyfill',
};
examples.forEach((e) => {
  entries[\`demo-\${e.name}\`] = \`./app/examples/\${e.name}/\${e.name}-demo.main\${isProd ? '' : '.dev'}\`;

  if (e.additional && e.additional.entry) {
    entries[e.additional.entry] = \`./app/examples/\${e.name}/\${e.additional.filename}\`;
  }
});

// tslint:disable-next-line:no-default-export - default export is what webpack expects
export default {
  ${webpackVersion === '4'
      ? `
  mode: isProd ? 'production' : 'development',
  `.trim()
      : ''
    }
  entry: entries,
  context: path.join(process.cwd(), 'src'),
  output: {
    ${outSubdirectory
      ? `
    path: path.join(process.cwd(), '..', 'dist', 'ng-recaptcha', '${outSubdirectory}'),
    `.trim()
      : `
    path: path.join(process.cwd(), '..', 'dist', 'ng-recaptcha'),
    `.trim()
    }
    filename: isProd ? '[name].[chunkhash].js' : '[name].js',
    ${webpackVersion === '4'
      ? `
    ...(isProd ? { chunkFilename: '[name].[chunkhash].js' } : {}),
    `.trim()
      : ''
    }
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
    ${outSubdirectory
      ? `
    publicPath: '/ng-recaptcha/${outSubdirectory}/',
    `.trim()
      : `
    publicPath: '/ng-recaptcha/',
    `.trim()
    }
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500,
    },
  },
  stats: isProd ? 'errors-only' : 'normal',
  devtool: isProd ? 'source-map' : 'eval',
  ${webpackVersion === '4'
      ? `
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
  },`.trim()
      : ''
    }
};`.trim();
}

export const v6 = generate({ webpackVersion: '3', outSubdirectory: 'v6' });
export const v7 = generate({ webpackVersion: '4', outSubdirectory: 'v7' });
export const v8 = generate({ webpackVersion: '4' });
