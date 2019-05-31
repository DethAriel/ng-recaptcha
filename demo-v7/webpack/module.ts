import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { resolve } from 'path';

export const moduleConfig = {
  rules: [
    {
      test: /\.js$/,
      loader: 'angular2-template-loader',
    },
    {
      test: /(?:\.ngfactory\.js|\.ngstyle\.js)$/,
      loader: '@ngtools/webpack',
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
      options: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
        customAttrAssign: [/\)?\]?=/],
      },
    },
    {
      test: /\.css$/,
      include: resolve(__dirname, 'src', 'app'),
      use: 'raw-loader',
    }, {
      test: /\.css$/,
      exclude: resolve(__dirname, 'src', 'app'),
      use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: 'css-loader', options: { importLoaders: 1, modules: false } },
      ],
    },
    {
      test: /\.svg$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash:8].[ext]',
      },
    },
  ],
};
