module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                    exclude: [/node_modules/, /vendors/]
                }
            ],
        },
    };
};