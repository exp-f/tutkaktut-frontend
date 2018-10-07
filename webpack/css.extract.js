import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

export default (paths) => {
  return {
    module: {
      rules: [
        {
          test: /(\.css|\.scss)$/,
          include: paths,
          loader: ExtractTextPlugin.extract({
            publicPath: '../',
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  root: path.resolve(__dirname, './source'),
                },
              }, {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [
                    autoprefixer({
                      browsers: ['ie >= 10', 'last 4 version']
                    })
                  ]
                }
              }, {
                loader: 'sass-loader',
                options: {
                  data: '@import "./source/static/styles/vars";',
                  includePaths: [
                    path.resolve(__dirname, './source'),
                  ],
                },
              }
            ]
          })
        }
      ],
    },
    plugins: [
      new ExtractTextPlugin('./css/[name].css'),
    ],
  };
};