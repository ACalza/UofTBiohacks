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

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"></link>
          <link href={`/common.css`} rel="stylesheet"></link>
          <link href={`/${name}.css`} rel="stylesheet"></link>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: body}} />
          <script src={'/common.js'} />
          <script src={`/${name}.js`} />
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"></script>
          <GoogleAnalytics />
        </body>
      </html>
    )
  }
}
