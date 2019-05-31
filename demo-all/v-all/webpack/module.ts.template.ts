function generate({
  webpackVersion,
}: {
  webpackVersion: '3' | '4',
}) {
  return `
${webpackVersion === '4'
      ? `import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';`
      : `import * as ExtractTextPlugin from 'extract-text-webpack-plugin';`}
import { resolve } from 'path';

export const moduleConfig = {
  rules: [
    {
      test: /\\.js$/,
      loader: 'angular2-template-loader',
    },
    {
      test: /(?:\\.ngfactory\\.js|\\.ngstyle\\.js)$/,
      loader: '@ngtools/webpack',
    },
    {
      test: /\\.html$/,
      loader: 'html-loader',
      options: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [[/#/, /(?:)/], [/\\*/, /(?:)/], [/\\[?\\(?/, /(?:)/]],
        customAttrAssign: [/\\)?\\]?=/],
      },
    },
    ${webpackVersion === '4'
      ? `
    {
      test: /\\.css$/,
      include: resolve(__dirname, 'src', 'app'),
      use: 'raw-loader',
    }, {
      test: /\\.css$/,
      exclude: resolve(__dirname, 'src', 'app'),
      use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: 'css-loader', options: { importLoaders: 1, modules: false } },
      ],
    },
      `.trim()
      : `
    {
      test: /\\.css$/,
      include: resolve(process.cwd(), 'src', 'app'),
      loaders: ['to-string-loader', 'css-loader'],
    },
    {
      test: /\\.css$/,
      exclude: resolve(process.cwd(), 'src', 'app'),
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      }),
    },
      `.trim()
    }
    {
      test: /\\.svg$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash:8].[ext]',
      },
    },
  ],
};`.trim();
}

export const v6 = generate({ webpackVersion: '3' });
export const v7 = generate({ webpackVersion: '4' });
export const v8 = generate({ webpackVersion: '4' });
