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
    }]
  }
}
