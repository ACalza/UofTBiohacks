'use strict'

const webpack = require('webpack')
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(process.env.NODE_ENV === 'dev' ? true : false)
})

//some nice hardcoding
module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login/index.js',
    register: './src/register/index.js',
    account: './src/account/index.js',
    reset: './src/reset/index.js',
    verify: './src/verify/index.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js',
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
  plugins: [
    commonsPlugin,
    definePlugin
  ]
}
