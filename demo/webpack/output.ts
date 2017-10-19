import * as path from 'path';

export const output = {
  path: path.join(process.cwd(), 'dist', 'ng-recaptcha'),
  filename: '[name].[chunkhash:8].js',
};
