'use strict'

const webpack = require('webpack')
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(process.env.NODE_ENV === 'dev' ? true : false)
})
const ExtractTextPlugin = require('extract-text-webpack-plugin')


// NOTE IF YOU CHANGE THIS FILE, CHANGE webpack.config.js

module.exports = {
  entry: './src/build.js',
  output: {
    path: 'dist',
    filename: 'app.node.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: /^[a-z][a-z\.\-\/0-9]*$/i,
  module: {
    preLoaders: [{
      test: /build\.js$/,
      loader: './loaders/routes.js'
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass')
    }, {
      test: /\.(woff2?|ttf|eot|svg)$/,
      loader: 'url?limit=100000'
    }]
  },
  plugins: [
    definePlugin,
    new ExtractTextPlugin('[name].css')
  ]
}
