'use strict';

const path = require('path');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const babel = require('./webpack/babel');
const extractCSS = require('./webpack/css.extract');
const files = require('./webpack/files');
const jsProd = require('./webpack/js.prod');
const progressBar = require('progress-bar-webpack-plugin');
const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

const common = merge([
  {
    entry: {
      'index': PATHS.source + '/index.js'
    },
    output: {
      path: PATHS.build,
      filename: 'js/[name].js'
    },
    plugins: [
      new progressBar()
    ]
  },
  babel(),
  files()
]);

module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      extractCSS(),
      jsProd()
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      sass()
    ]);
  }
};