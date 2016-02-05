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

          <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png"></link>
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png"></link>
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png"></link>
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png"></link>
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png"></link>
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png"></link>
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png"></link>
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png"></link>
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32"></link>
          <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192"></link>
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"></link>
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16"></link>
          <link rel="manifest" href="/manifest.json"></link>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
          <meta name="msapplication-TileColor" content="#eeeeee" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="og:url" content="https://2016.uoftbiohacks.com" />
          <meta property="og:image" content="/img/uoftbiohacks-og.jpg" />
          <meta property="og:description" content="UofT BioHacks 2016 will be hosted on Jan 12 to Jan 13, 2016 at Bahen Centre, University of Toronto. In this two day event, you will have a chance to attend keynote speeches from Prof. Brendan John Frey on genome biology and machine learning, and from Prof. Alan Davidson on bioinformatics and biochemistry. There will be bioinformatics workshops followed by a hacking night to solve real-world problems in biology. " />

          <meta property="twitter:card" content="summary" />
          <meta property="twitter:url" content="https://2016.uoftbiohacks.com" />
          <meta property="twitter:image" content="/img/uoftbiohacks-og.jpg" />
          <meta property="twitter:description" content="UofT BioHacks 2016 will be hosted on Jan 12 to Jan 13, 2016 at Bahen Centre, University of Toronto. In this two day event, you will have a chance to attend keynote speeches from Prof. Brendan John Frey on genome biology and machine learning, and from Prof. Alan Davidson on bioinformatics and biochemistry. There will be bioinformatics workshops followed by a hacking night to solve real-world problems in biology. " />

          <title>{title}</title>

          <script src='https://www.google.com/recaptcha/api.js' async defer></script>

          <link href={`/common.css`} rel="stylesheet"></link>
          <link href={`/${name}.css`} rel="stylesheet"></link>

          <GoogleAnalytics />
        </head>
        <body>
          <div id="app" className="fillY" dangerouslySetInnerHTML={{__html: body}} />
          <script src={'/common.js'} />
          <script src={`/${name}.js`} />

          <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        </body>
      </html>
    )
  }
}
