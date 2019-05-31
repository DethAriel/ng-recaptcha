function generate({
  webpackVersion,
}: {
  webpackVersion: '3' | '4',
}) {
  return `
import { AngularCompilerPlugin } from '@ngtools/webpack';
${webpackVersion === '3'
      ? `import * as ExtractTextPlugin from 'extract-text-webpack-plugin';`
      : ''}
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
${webpackVersion === '4'
      ? `import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';`
      : ''}
import * as path from 'path';
import * as webpack from 'webpack';
import { examples } from '../bin/examples';

function chunksSortMode(a, b) {
  const order = examples.filter((e) => e.additional && e.additional.entry).map((e) => e.additional.entry)
    ${webpackVersion === '4'
      ? `.concat(['manifest', 'polyfill', 'common'])`
      : `.concat(['polyfill', 'common'])`}
    .concat(examples.map((e) => e.entry));

  return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
}

export const plugins = [
  new webpack.ProgressPlugin(),
  new webpack.ContextReplacementPlugin(
    // The (\\\\|\\/) piece accounts for path separators in *nix and Windows
    /angular(\\\\|\\/)core(\\\\|\\/)@angular/,
    path.join(process.cwd(), 'src'),
  ),
  ${webpackVersion === '4'
      ? `
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
  }),
    `.trim()
      : `
  new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].[contenthash:8].css',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: examples.map((e) => e.entry),
  }),
    `.trim()
    }

  new AngularCompilerPlugin({
    tsConfigPath: 'tsconfig.json',
  }),
].concat(
  examples.map((e) => new HtmlWebpackPlugin({
    filename: e.index ? 'index.html' : e.name + '.html',
    favicon: 'favicon.ico',
    template: 'index.html',
    ${webpackVersion === '4'
      ? `
    minify: { removeComments: true, collapseWhitespace: true },
    `.trim()
      : ''
    }
    ${webpackVersion === '4'
      ? `
    chunks: ['manifest', 'polyfill', 'common', e.entry]
    `.trim()
      : `
    chunks: ['polyfill', 'common', e.entry]
    `.trim()
    }
      .concat(e.additional && e.additional.entry ? [e.additional.entry] : []),
    chunksSortMode,
  })),
);`.trim();
}

export const v6 = generate({ webpackVersion: '3' });
export const v7 = generate({ webpackVersion: '4' });
export const v8 = generate({ webpackVersion: '4' });
