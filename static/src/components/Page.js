import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'

import Html from './Html.js'

export default class Page extends Component {
  render() {
    const { body, name } = this.props

    // TODO implement more meta tags for better SEO
    // see: https://support.google.com/webmasters/answer/79812?hl=en
    const metas = {
      viewport: 'width=device-width, initial-scale=1',
      // description: 'UofT BioHacks 2016 Website',
      description: `
        UofT BioHacks 2016 will be a two day event at the Bahen Centre, Toronto.
        Come with any experience and hack away to solve real-world biological problems!
      `,
      author: 'iGEM Toronto' }

    let bodyString
    // console.log(`went to Page.js for ${name}`)
    try {
      bodyString = ReactDOMServer.renderToString(body)
    } catch(e) {
      console.log(`Page.js, ${name}: `, e)
    }

    const htmlProps = {
      title: 'BCB BioHacks',
      meta: metas,
      body: bodyString,
      name: name
    }

    return (
      <Html {...htmlProps} />
    )
  }
}
