export default () => {
  return {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(jpeg|jpg|png|svg|ico|gif|mp4|webm)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          },
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/i,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          }
        }
      ],
    }
  }
};