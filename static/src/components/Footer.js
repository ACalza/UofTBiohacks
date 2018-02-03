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
              Copyight &copy; {new Date().getYear() - 100 + 2000} BCB
            </Col>
          </Row>
          <div className="footer-socials">
            <a target="_blank" href="mailto:bcbbiohacks2018@gmail.com"><i className="fa fa-envelope"></i></a>
          </div>
        </div>
      </footer>
    )
  }
}
