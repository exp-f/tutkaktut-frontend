const CompressionPlugin = require("compression-webpack-plugin");
const minify = require('babel-minify-webpack-plugin');

module.exports = function() {
    return {
        plugins: [

            new minify(),
            new CompressionPlugin({
                test: /\.js$|\.css$/,
                threshold: 10240,
                minRatio: 0
            }),
        ]
    };
};

