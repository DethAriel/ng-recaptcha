import { AngularCompilerPlugin } from '@ngtools/webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import { examples } from '../bin/examples';

function chunksSortMode(a, b) {
  const order = examples.filter((e) => e.additional && e.additional.entry).map((e) => e.additional.entry)
    .concat(['polyfill', 'common'])
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
  new ExtractTextPlugin({
    allChunks: true,
    filename: '[name].[contenthash:8].css',
  }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: examples.map((e) => e.entry),
  }),
  new AngularCompilerPlugin({
    tsConfigPath: 'tsconfig.json',
  }),
].concat(
  examples.map((e) => new HtmlWebpackPlugin({
    filename: e.index ? 'index.html' : e.name + '.html',
    favicon: 'favicon.ico',
    template: 'index.html',
    chunks: ['polyfill', 'common', e.entry]
      .concat(e.additional && e.additional.entry ? [e.additional.entry] : []),
    chunksSortMode,
  })),
);
