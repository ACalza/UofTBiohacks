const browserSync = require('browser-sync')
const webpack = require('webpack')
const hygienistMiddleware = require('hygienist-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config.js')

const bundler = webpack(config)

browserSync({
  server: {
    baseDir: config.output.path,

    middleware: [
      hygienistMiddleware(config.output.path),

      webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: config.output.publicPath,

        stats: {
          colors: true
        }
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),
    ],
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    config.output.path + '/**/*.css',
    config.output.path + '/**/*.html',
  ],
})
