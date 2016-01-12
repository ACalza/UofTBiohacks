'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [,
    'bootstrap-loader',
    path.resolve(__dirname, 'build.js')
  ],
  output: {
    path: 'prod-dist',
    filename: 'app.node.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel'],
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.(woff2?|ttf|eot|svg)$/,
      loader: 'url?limit=100000'
    }, {
      test: /bootstrap-sass\/assets\/javascripts\//,
      loader: 'imports?jQuery=jquery'
    }, {
      test: /\.md$/,
      loader: "html!markdown"
    }, {
      test: /\.svg$/,
      loader: 'file-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
    })
  ]
}
