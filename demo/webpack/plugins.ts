import { AngularCompilerPlugin } from '@ngtools/webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import { examples } from '../bin/examples';

function chunksSortMode(a, b) {
  const order = examples.filter((e) => e.additional && e.additional.entry).map((e) => e.additional.entry)
    .concat(['manifest', 'polyfill', 'common'])
    .concat(examples.map((e) => e.entry));

  return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
}

export const plugins = [
  new webpack.ProgressPlugin(),
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)@angular/,
    path.join(process.cwd(), 'src'),
  ),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
  }),

  new AngularCompilerPlugin({
    tsConfigPath: 'tsconfig.json',
  }),
].concat(
  examples.map((e) => new HtmlWebpackPlugin({
    filename: e.index ? 'index.html' : e.name + '.html',
    favicon: 'favicon.ico',
    template: 'index.html',
    minify: { removeComments: true, collapseWhitespace: true },
    chunks: ['manifest', 'polyfill', 'common', e.entry]
      .concat(e.additional && e.additional.entry ? [e.additional.entry] : []),
    chunksSortMode,
  })),
);
