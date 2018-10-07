import path from 'path';

export default (paths) => {
  return {
    module: {
      rules: [
        {
          test: /(\.css|\.scss)$/,
          include: paths,
          use: [
            'style-loader',
            {
              loader: "css-loader",
              options: {
                root: path.resolve(__dirname, './source'),
              },
            }, {
              loader: 'sass-loader',
              options: {
                data: '@import "./source/static/styles/vars";',
                includePaths: [
                  path.resolve(__dirname, './source'),
                ],
              },
            },
          ],
        },
      ],
    },
  };
};