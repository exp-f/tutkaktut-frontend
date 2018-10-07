// HMR не умеет во множественные точки входа,
// поэтому в entry нужно добавлять пути до дев-сервера

import pages from './pages';
import address from './address';

function setEntries(env = 'dev') {
  let entriesObj = {};

  pages.forEach(function (pageName) {
    const isIndex = pageName === 'index',
        allPath = `./source/pages/${pageName}/index.js`,
        indexPath = './source/pages/index/index.js',
        pagePath = (isIndex) ? indexPath : allPath,
        host = `${address.ip}:${address.port}`;

    if (env !== 'dev') {
      entriesObj[pageName] = [
        pagePath,
        'webpack/hot/only-dev-server',
        `webpack-dev-server/client?http://${host}`
      ];
    } else {
      entriesObj[pageName] = pagePath;
    }
  });

  return entriesObj;
}

let entriesDev = setEntries(),
    entriesBuild = setEntries('build');

export {entriesDev, entriesBuild}
