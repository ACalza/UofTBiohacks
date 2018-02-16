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
import challenges from './markdown/challenges.md'

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
          <h1 id="splashTitle" className="aboveCanvas"><span className="darkBlue">BCB</span> <span className="lightBlue">Bio</span><span className="darkBlue">Hacks</span></h1>
          <i id="downArrow" className="fa fa-arrow-down"></i>
        </div>
        <div className="registerBlock">
          <div className="container">
            <Row style={{marginBottom: '30px'}}>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default grey" style={{marginBottom: '0'}}>
                  <div className="my-panel-body">
                    <h2 style={{textAlign: 'center'}}><i className="fa fa-calendar"></i> March 17-18 2018</h2>

                    <div className="buttonHolder">
                      <a className="btn btn-primary btn-lg" href="/apply">Apply</a>
                      <a className="btn btn-primary btn-lg" href="https://goo.gl/forms/V3ujQb3Wt1qNXMYr1">Volunteer</a>
                      <a className="btn btn-primary btn-lg" href="/BCB-biohacks-2018-sponsor-package.pdf">Sponsor</a>
                    </div>
                  </div>
                  <hr />
                  <div id="intro" dangerouslySetInnerHTML={{__html: about}} />
                  <div style={{textAlign: 'center'}}>
                    <img style={{width: '60%', paddingBottom: '20px'}} src="/img/BCB.png" />
                    <br></br>
                    <a target="_blank" href="https://cssu.ca/"><img style={{width: '25%'}} src="/img/cssu.png" /></a>
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
                    <h2 style={{textAlign: 'center'}}>About BioHacks</h2>
                    <div id="why" dangerouslySetInnerHTML={{__html: why}} />
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
                    <div id="faq" dangerouslySetInnerHTML={{__html: challenges}} />
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
                    <a target="_blank" href="http://web.cs.toronto.edu/"><img style={{width: '50%', paddingTop: '20px'}} src="/img/dcs.png" /></a>
                    <br></br>
                    <a target="_blank" href="http://www.mclaughlin.utoronto.ca/"><img style={{width: '50%', paddingTop: '20px'}} src="/img/MC_logo_Centered_RGB.jpg" /></a>
                    <br></br>
                    <a target="_blank" href="http://www.cagef.utoronto.ca/"><img style={{width: '50%', paddingTop: '20px'}} src="/img/CAGEF_01-2_small-2.png" /></a>
                    <br></br>
                    <a target="_blank" href="https://awakechocolate.ca/"><img style={{width: '50%', paddingTop: '20px'}} src="/img/awake.png" /></a>

                    <p style={{paddingTop: '10px'}}>
                      If you are interested in becoming a sponsor, check out our <a href="/BCB-biohacks-2018-sponsor-package.pdf">sponshorship package</a>.
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
                    <a href="http://igemtoronto.ca/"><img style={{width: '30%'}} src="/img/igem.png" /></a>
                    <a target="_blank" href="https://cssu.ca/"><img style={{paddingLeft: '20px', width: '30%'}} src="/img/cssu.png" /></a>
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
