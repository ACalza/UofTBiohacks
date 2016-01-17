'use strict'

const webpack = require('webpack')
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login/index.js',
    register: './src/register/index.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js',
    // path: '/'
  },
  module: {
    preLoaders: [{
      test: /build\.js$/,
      loader: './loaders/routes.js'
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  plugins: [commonsPlugin]
}
