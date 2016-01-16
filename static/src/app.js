// TODO seperate React stuff from fs stuff

import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'

import fs from 'fs'
import path from 'path'

import Html from './components/Html.js'

class Index extends Component {
  render() {
    const metas = {
      viewport: 'width=device-width, initial-scale=1'
    }

    return (
      <Html title="UofT BioHacks" meta={metas}>
        <h1>Hello, World</h1>
      </Html>
    )
  }
}


const page = '<!doctype html>\n' + ReactDOMServer.renderToString(<Index />)


fs.writeFileSync('dist/index.html', page)
