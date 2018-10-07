import path from 'path';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ProgressBar from 'progress-bar-webpack-plugin';
import {DefinePlugin} from 'webpack';
import html from './webpack/html';
import devserver from './webpack/devserver';
import sass from './webpack/sass';
import babel from './webpack/babel';
import extractCSS from './webpack/css.extract';
import files from './webpack/files';
import pug from './webpack/pug';
import jsProd from './webpack/js.prod';
import { entriesDev, entriesBuild } from './webpack/entry';

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

function setCommonConf(env) {
  const envDev = env === 'development';
  const envProd = env === 'production';
  const HTMLConf = (envDev || envProd) ? html() : {};
  const PUGConf = (envDev || envProd) ? pug() : {};
  const plugins = () => {
    const pluginsArr = [
      new ProgressBar(),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env),
        },
      })];
    if (envProd) pluginsArr.push(new CleanWebpackPlugin(['build']));
    return pluginsArr;
  };

  return merge([
    {
      entry: () => {
        if (env === 'production') return entriesDev;
        if (env === 'development') return entriesBuild;
      },
      output: {
        path: PATHS.build,
        filename: 'js/[name].js'
      },
      devtool: '#cheap-module-source-map',
      plugins: plugins(env),
      resolve: {
        alias: {
          Assets: path.resolve(`${PATHS.source}/assets/`),
          Helpers: path.resolve(`${PATHS.source}/helpers/`),
          Modules: path.resolve(`${PATHS.source}/modules/`),
          Pages: path.resolve(`${PATHS.source}/pages/`),
          Static: path.resolve(`${PATHS.source}/static/`),
          Templates: path.resolve(`${PATHS.source}/templates/`),
        },
      },
    },
    HTMLConf,
    babel(),
    files(),
    PUGConf,
  ]);
}

export default env => {
  if (env === 'production' || env === 'productionFast') {
    console.log('production or productionFast compiled!');
    return merge([
      setCommonConf(env),
      extractCSS(),
      jsProd()
    ]);
  }
  if (env === 'development') {
    return merge([
      setCommonConf(env),
      devserver(),
      sass()
    ]);
  }
}