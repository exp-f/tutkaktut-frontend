import html from 'html-webpack-plugin';
import pages from './pages';

let pagesArr = [];

pages.forEach(function (pageName) {
  let isIndex = pageName === 'index';
  let chunksArr = (isIndex) ? ['index'] : ['index', pageName];
  let curPage = new html({
    filename: `${pageName}.html`,
    chunks: chunksArr,
    template: `./source/pages/${pageName}/index.pug`
  });
  pagesArr.push(curPage);
});

export default () => {
  return {
    plugins: pagesArr
  }
}