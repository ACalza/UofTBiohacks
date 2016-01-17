import mkdirpAsync from 'mkdirp-then'
import fsp from 'fs-promise'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Page from './components/Page.js'

// auto generated by loaders/routes.js
const routes = {}

Object.keys(routes).forEach(async function(route) {
  // Handle un-connect() wrapped components
  let component = routes[route]().default
  if (typeof(component) === 'function') {
    component = React.createElement(component)
  }

  route = 'dist/' + route

  const page = '<!doctype html>\n'
    + ReactDOMServer.renderToStaticMarkup(<Page body={component} />)

  try {
    const dir = route.replace(/\/index.js$/, '')
    const filename = route.replace(/\.js$/, '.html')
    await mkdirpAsync(dir)
    await fsp.writeFile(filename, page)
    console.log('wrote ' + filename)
  } catch(e) {
    console.error(e)
  }
})
