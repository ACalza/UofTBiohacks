import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Page from './components/Page.js'

import Index from './index.js'
import Login from './login/index.js'


fs.writeFileSync('dist/index.html', '<!doctype html>\n'
  + ReactDOMServer.renderToStaticMarkup(<Page body={<Index />} />))

fs.writeFileSync('dist/login/index.html', '<!doctype html>\n'
  + ReactDOMServer.renderToStaticMarkup(<Page body={<Login />} />))
