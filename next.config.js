const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  env: {
    buildAt: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/ShangHai' })
  }
});
