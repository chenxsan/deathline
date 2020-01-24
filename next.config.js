const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  env: {
    buildAt: new Date()
  }
});
