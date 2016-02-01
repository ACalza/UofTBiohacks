import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from './mount.js'

import { Row, Col } from 'react-bootstrap'
import Navigation from './components/Navigation.js'
import Timeline from './components/Timeline.js'
// import Footer from './components/Footer.js'

import './styles/Home.scss'

// import viz from './assets/js/viz.js'

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import about from './markdown/about.md'
import why from './markdown/why.md'
import overview from './markdown/overview.md'
import faq from './markdown/faq.md'

class Index extends Component {
  componentDidMount() {
    // viz('viz')
    console.log('home mounted')
  }

  render() {
    let status
    if (canUseDOM && sessionStorage.getItem('jwt')) {
      status = 'loggedIn'
    } else {
      status = 'loggedOut'
    }

    return(
      <div className="fillY">
        <Navigation title="" status={status} />
        <div className="Splash">
          <div id="viz" />
          <div className="headerPush" />
          <img className="aboveCanvas" src="http://45.55.193.224:1234/BioHacksLogo.svg" />
          <h1 className="aboveCanvas"><span className="darkBlue">UofT</span> <span className="lightBlue">Bio</span><span className="darkBlue">Hacks</span></h1>
        </div>
        <div className="registerBlock">
          <div className="container">
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <h2>March 12-13</h2>

                    <div className="buttonHolder">
                      <button type="button" className="btn btn-primary btn-lg"><a href="/register">Register</a></button>
                    </div>
                  </div>
                  <hr />
                  <div id="intro" dangerouslySetInnerHTML={{__html: about}} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div style={{backgroundColor: '#eee'}}>
          <Timeline />
        </div>
        <div className="lightBlock">
          <div className="container">
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <div id="why" dangerouslySetInnerHTML={{__html: why}} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="darkBlock">
          <div className="container">
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <div id="overview" dangerouslySetInnerHTML={{__html: overview}} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="lightBlock">
          <div className="container">
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <div id="faq" dangerouslySetInnerHTML={{__html: faq}} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

      </div>
    )
  }
}

export default mount(Index)
