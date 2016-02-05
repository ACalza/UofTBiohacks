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
      description: 'UofT BioHacks 2016 will be hosted on Jan 12 to Jan 13, 2016 at Bahen Centre, University of Toronto. In this two day event, you will have a chance to attend keynote speeches from Prof. Brendan John Frey on genome biology and machine learning, and from Prof. Alan Davidson on bioinformatics and biochemistry. There will be bioinformatics workshops followed by a hacking night to solve real-world problems in biology.',
      author: 'iGEM Toronto'
    }

    let bodyString
    // console.log(`went to Page.js for ${name}`)
    try {
      bodyString = ReactDOMServer.renderToString(body)
    } catch(e) {
      console.log(`Page.js, ${name}: `, e)
    }

    const htmlProps = {
      title: 'UofT BioHacks',
      meta: metas,
      body: bodyString,
      name: name
    }

    return (
      <Html {...htmlProps} />
    )
  }
}
