import mkdirpAsync from 'mkdirp-then'
import fsp from 'fs-promise'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Page from './components/Page.js'

// auto generated by loaders/routes.js
const routes = {}

Object.keys(routes).forEach(async function(route) {
  const component = React.createElement(routes[route]().default)
  route = 'dist/' + route

  const page = '<!doctype html>\n'
    + ReactDOMServer.renderToStaticMarkup(<Page body={component} />)

  try {
    await mkdirpAsync(route.replace(/\/index.js$/, ''))
    await fsp.writeFile(route.replace(/\.js$/, '.html'), page)
    console.log('wrote ' + route.replace(/\.js$/, '.html'))
  } catch(e) {
    console.error(e)
  }
})