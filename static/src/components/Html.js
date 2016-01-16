import React, { Component } from 'react'

export default class HTML extends Component {
  render() {
    const { title, meta, children } = this.props

    // TODO move this comment to where meta prop passed in
    // TODO implement more meta tags for better SEO
    // see: https://support.google.com/webmasters/answer/79812?hl=en

    // NOTE supports meta name and content ONLY atm
    // TODO this isnt working
    const metas = Object.keys(meta).reduce( (metas, metaKey, index) => {
      metas.push(
        <meta name={metaKey} content={meta[metaKey]} key={index} />
      )
    }, [])


    return(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>{title}</title>
        </head>
        <body>
          {children}
        </body>
      </html>
    )
  }
}
