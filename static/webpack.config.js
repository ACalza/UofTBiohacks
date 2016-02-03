'use strict'

const path = require('path')
const webpack = require('webpack')
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common'
});
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(process.env.NODE_ENV === 'dev' ? true : false)
})
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// NOTE IF YOU CHANGE THIS FILE, CHANGE webpack.node.js

// some nice hardcoding
module.exports = {
  entry: {
    index: ['font-awesome-webpack!./font-awesome.config.js', './src/index.js'],
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
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass')
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(|ttf|eot|svg)$/,
      loader: 'url?limit=100000'
    }, {
      test: /\.(ttf|eot|svg)\?v=[0-9]\.[0-9]\.[0-9]$/,
      loader: 'file'
    }, {
      test: /\.md$/,
      loader: "html!markdown"
    }]
  },
  plugins: [
    commonsPlugin,
    definePlugin,
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([{
      from: 'public'
    }])
  ]
}
