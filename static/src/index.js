import React, { Component } from 'react'
import { connect } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import mount from './mount.js'

import { Row, Col } from 'react-bootstrap'
import Navigation from './components/Navigation.js'
import Timeline from './components/Timeline.js'
import Footer from './components/Footer.js'

import './styles/Home.scss'

import viz from './assets/js/viz.js'

// Markdown
import about from './markdown/about.md'
import why from './markdown/why.md'
import overview from './markdown/overview.md'
import faq from './markdown/faq.md'

class Index extends Component {
  componentDidMount() {
    viz('viz')
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
          <img id="splashLogo" className="aboveCanvas" src="/BioHacksLogo.svg" />
          <h1 id="splashTitle" className="aboveCanvas"><span className="darkBlue">UofT</span> <span className="lightBlue">Bio</span><span className="darkBlue">Hacks</span></h1>
          <i id="downArrow" className="fa fa-arrow-down"></i>
        </div>
        <div className="registerBlock">
          <div className="container">
            <Row style={{marginBottom: '30px'}}>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default grey" style={{marginBottom: '0'}}>
                  <div className="my-panel-body">
                    <h2 style={{textAlign: 'center'}}><i className="fa fa-calendar"></i> March 12-13</h2>

                    <div className="buttonHolder">
                      <button type="button" className="btn btn-primary btn-lg"><a href="/register">Apply</a></button>
                    </div>
                  </div>
                  <hr />
                  <div id="intro" dangerouslySetInnerHTML={{__html: about}} />
                  <div style={{textAlign: 'center'}}>
                    <a href="http://igem.skule.ca"><img style={{width: '40%'}} src="/img/igem.png" /></a>
                  </div>
                </div>
                <div className="downTriangle light" style={{marginBottom: '-10%'}}/>
              </Col>
            </Row>
          </div>
        </div>
        <div style={{backgroundColor: '#eee'}}>
          <Timeline />
        </div>
        <div style={{backgroundColor: '#eee'}}>
          <div className="downTriangle up" style={{backgroundColor: 'rgba(0,0,0,0)', marginTop: '-9%'}}/>
        </div>
        <div className="darkBlock">
          <div className="container">
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="downTriangle up light" style={{backgroundColor: 'rgba(0,0,0,0)', marginTop: '-20%'}}/>
                <div className="panel my-panel-default grey">
                  <div className="my-panel-body">
                    <h2 style={{textAlign: 'center'}}>Why?</h2>
                    <div id="why" dangerouslySetInnerHTML={{__html: why}} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="darkBlock2" style={{paddingTop: '15px'}}>
          <div className="container">
            <Row>
              <Col className="sponsors-wrapper" xs={12} md={8} mdOffset={2} style={{textAlign: 'center'}}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <h2>Sponsors</h2>
                    <a target="_blank" href="http://synaptivemedical.com/"><img style={{width: '50%', paddingBottom: '10px'}} src="/img/synaptive.png" /></a><br></br>
                    <a target="_blank" href="http://www.array.ca/"><img style={{width: '50%', paddingBottom: '10px'}} src="/img/ArrayLogo.jpg" /></a><br></br>
                    <a target="_blank" href="https://www.nymi.com/"><img style={{width: '30%', paddingBottom: '10px'}} src="/img/Logo_Nymi_Horizontal.png" /></a><br></br> 

                    <p style={{paddingTop: '10px'}}>
                      If you are interested in becoming a sponsor, check out our <a href="/U-of-T-BioHacks-2016-Sponsorship-Package.pdf">sponshorship package</a>.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="darkBlock2">
          <div className="container">
            <Row>
              <Col className="sponsors-wrapper" xs={12} md={8} mdOffset={2} style={{textAlign: 'center'}}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <h2>Partners</h2>
                    <a target="_blank" href="https://cssu.ca/"><img style={{width: '25%'}} src="/img/cssu.png" /></a>
                    <br></br>
                    <a target="_blank" href="http://web.cs.toronto.edu/"><img style={{width: '50%', paddingTop: '10px'}} src="/img/dcs.png" /></a>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="darkBlock2">
          <div className="container">
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <h2 style={{textAlign: 'center'}}>What?</h2>
                    <div id="overview" dangerouslySetInnerHTML={{__html: overview}} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="lightBlock2">
          <div className="container">
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <h2 style={{textAlign: 'center'}}>FAQ</h2>
                    <div id="faq" dangerouslySetInnerHTML={{__html: faq}} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default mount(Index)
