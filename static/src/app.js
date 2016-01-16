// TODO seperate React stuff from fs stuff #theIsomorphicLife

import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'

import fs from 'fs'
import path from 'path'

import Html from './components/Html.js'

class Index extends Component {
  render() {
    // TODO implement more meta tags for better SEO
    // see: https://support.google.com/webmasters/answer/79812?hl=en
    const metas = {
      viewport: 'width=device-width, initial-scale=1',
      description: 'UofT BioHacks 2016 Website',
      author: 'iGEM Toronto'
    }

    const htmlProps = {
      title: 'UofT BioHacks',
      meta: metas,
      body: ReactDOMServer.renderToString(<h1> Hello, World </h1>)
    }

    return (
      <Html {...htmlProps} />
    )
  }
}


const page = '<!doctype html>\n' + ReactDOMServer.renderToStaticMarkup(<Index />)


fs.writeFileSync('dist/index.html', page)
