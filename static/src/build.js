import fsAsync from 'fs-promise'
import fs from 'fs'
import globby from 'globby'
import mkdirpAsync from 'mkdirp-then'
import path from 'path'

import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Page from './components/Page.js'

import Index from './index.js'
import Login from './login/index.js'


async function main() {
  const pages = await globby('src/**/index.js')
  const outputs = pages.map( page => page.replace(/src/g, 'dist'))

  const outputDirs = outputs.map( output => output.replace(/\/index.js/g, ''))
  outputDirs.forEach(async function (dir) {
    try {
      await mkdirpAsync(dir)
    } catch(e) {
      console.error(e)
    }
  })

  pages.forEach( (page, i) => {
    console.log(path.resolve(__dirname, page))
    console.log(require(page))

    // const component = require(page)
    // console.log(component)
    console.log(outputs[i])
    console.log('wheee')
    // try {
    //   // await fsAsync.writeFile(file(outputs[i]), 'foo')
    //   await fs.writeFileSync(outputs[i], '<!doctype html>\n'
    //   + ReactDOMServer.renderToStaticMarkup(<Page body={React.createElement(component)} />))
    // } catch(e) {
    //   console.error(e)
    // }
  })
}

main()



// fs.writeFileSync('dist/index.html', '<!doctype html>\n'
//   + ReactDOMServer.renderToStaticMarkup(<Page body={<Index />} />))
//
// fs.writeFileSync('dist/login/index.html', '<!doctype html>\n'
//   + ReactDOMServer.renderToStaticMarkup(<Page body={<Login />} />))
