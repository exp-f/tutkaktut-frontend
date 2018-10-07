export default () => {
  return {
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(js|vue)$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  }
};