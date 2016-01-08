import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    const poweredLinks = {
      Koa: 'http://koajs.com/',
      React: 'http://facebook.github.io/react/',
      Redux: 'http://redux.js.org/',
      Babel: 'http://babeljs.io/'
    }

    return(
      <footer>
        Copyight &copy; {new Date().getYear() - 100 + 2000} iGEM Toronto. <br />
        Proudly powered by{Object.keys(poweredLinks).map( (link, i) =>
          <span key={i}>
            &nbsp;
            { i === Object.keys(poweredLinks).length - 1 ? 'and ' : ''}
            <a target="_blank" href={poweredLinks[link]}>{link}</a>
            { i === Object.keys(poweredLinks).length - 1 ? '' : ','}
          </span>
        )}.
      </footer>
    )
  }
}
