import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';

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
      include: path.resolve(process.cwd(), 'src', 'app'),
      loaders: ['to-string-loader', 'css-loader'],
    },
    {
      test: /\.css$/,
      exclude: path.resolve(process.cwd(), 'src', 'app'),
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
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
