module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader'
        },
        {
          test: /\.(jpeg|jpg|png|ico|gif|svg)$/i,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          },
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/i,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: '../',
          }
        }
      ],
    },
  };
};