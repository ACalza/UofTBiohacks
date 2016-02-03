module.exports = {
  styleLoader: require('extract-text-webpack-plugin').extract('style', 'css!less'),
  styles: {
    "mixins": true,

    "core": true,
    "icons": true,

    "larger": true,
    "path": true,
  }
}
