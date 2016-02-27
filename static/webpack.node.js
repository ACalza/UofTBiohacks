'use strict'

const webpack = require('webpack')
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(process.env.NODE_ENV === 'dev' ? true : false)
})


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
      test: /\.s?css$/,
      loader: 'ignore'
    }, {
      test: /\.md$/,
      loaders: ['html', 'markdown']
    }]
  },
  plugins: [
    definePlugin
  ]
}
