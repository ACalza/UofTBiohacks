import React, { Component } from 'react'

import { Row, Col } from 'react-bootstrap'

import '../styles/footer.scss'

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
        <div className="container">
          <Row>
            <Col xs={12} md={6}>
              Copyight &copy; {new Date().getYear() - 100 + 2000} <a href="http://igem.skule.ca">iGEM Toronto</a>.
            </Col>
            <Col xs={12} md={6}>
              Proudly powered by{Object.keys(poweredLinks).map( (link, i) =>
                <span key={i}>
                  &nbsp;
                  { i === Object.keys(poweredLinks).length - 1 ? 'and ' : ''}
                  <a target="_blank" href={poweredLinks[link]}>{link}</a>
                  { i === Object.keys(poweredLinks).length - 1 ? '' : ','}
                </span>
              )}.
            </Col>
          </Row>
          <div className="footer-socials">
            <a target="_blank" href="http://igem.skule.ca"><i className="fa fa-globe"></i></a>
            <a target="_blank" href="https://twitter.com/igem_toronto"><i className="fa fa-twitter"></i></a>
            <a target="_blank" href="https://www.facebook.com/iGEMToronto/"><i className="fa fa-facebook"></i></a>
            <a target="_blank" href="mailto:igem@g.skule.ca"><i className="fa fa-envelope"></i></a>
          </div>
        </div>
      </footer>
    )
  }
}
