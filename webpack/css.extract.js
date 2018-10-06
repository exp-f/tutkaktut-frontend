const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = function (paths) {
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
                                    sourceMap: true,
                                    minimize: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers: ['ie >= 10', 'last 4 version']
                                        })
                                    ],
                                    // sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    // sourceMap: true
                                }
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