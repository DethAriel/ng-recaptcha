export const devServer = {
  port: 9000,
  inline: true,
  stats: 'errors-only',
  publicPath: '/ng-recaptcha/',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500,
  },
};
