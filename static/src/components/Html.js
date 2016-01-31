import React, { Component } from 'react'

import GoogleAnalytics from './GoogleAnalytics.js'

export default class Html extends Component {
  render() {
    let { title, meta, body, name } = this.props
    // NOTE supports meta name and content ONLY atm
    const metas = Object.keys(meta).map( (metaKey, index) => {
      return <meta name={metaKey} content={meta[metaKey]} key={index} />
    })
    // let common = "../common.js"
    // if(name==="index.js"){
    //   common = "./common.js"
    //   name = "index"
    // }
    return(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {metas}

          <title>{title}</title>

          <script src='https://www.google.com/recaptcha/api.js' async defer></script>

          <link href={`/common.css`} rel="stylesheet"></link>
          <link href={`/${name}.css`} rel="stylesheet"></link>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: body}} />
          <script src={'/common.js'} />
          <script src={`/${name}.js`} />
          <GoogleAnalytics />
        </body>
      </html>
    )
  }
}
