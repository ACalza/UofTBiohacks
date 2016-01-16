import React, { Component } from 'react'

export default class Html extends Component {
  render() {
    const { title, meta, children } = this.props

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
          {children}
        </body>
      </html>
    )
  }
}
