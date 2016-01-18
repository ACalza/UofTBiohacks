import React, { Component } from 'react'

import GoogleAnalytics from './GoogleAnalytics.js'

export default class Html extends Component {
  render() {
    const { title, meta, body, name } = this.props
    // NOTE supports meta name and content ONLY atm
    const metas = Object.keys(meta).map( (metaKey, index) => {
      return <meta name={metaKey} content={meta[metaKey]} key={index} />
    })

    return(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {metas}

          <title>{title}</title>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: body}} />
          <script src="../common.js" />
          <script src=  {"../" + name.toString() + ".js"}/>
          <GoogleAnalytics />
        </body>
      </html>
    )
  }
}
