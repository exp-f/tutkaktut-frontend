export default () => {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          loaders: 'pug-loader',
          options: {
            pretty: true,
          }
        }
      ]
    }
  }
}
