// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import { Link } from 'react-router'
import { Col, Row } from 'react-bootstrap'
import Layout from '../components/Layout'
import Navigation from '../containers/Navigation'
import BSContainer from '../components/BSContainer'
import Footer from '../components/Footer'
import Timeline from '../components/Timeline'

import '../styles/Home.scss'

import viz from '../assets/js/viz.js'

// import Logo from '../assets/BioHacksLogo.svg'

import about from '../markdown/about.md'
import why from '../markdown/why.md'
import overview from '../markdown/overview.md'
import faq from '../markdown/faq.md'

// Presentational Component
export default class Home extends Component {
  componentDidMount() {
    viz('viz')
  }

  render() {
    return (
      <div className="fillY">
        <Navigation />
        <div className="Splash">
          <div id="viz" />
          <div className="headerPush" />
          <img className="aboveCanvas" src="http://45.55.193.224:1234/BioHacksLogo.svg" />
          <h1 className="aboveCanvas"><span className="darkBlue">UofT</span> <span className="lightBlue">Bio</span><span className="darkBlue">Hacks</span></h1>
        </div>
        <div className="registerBlock">
          <BSContainer>
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <h2>March 12-13</h2>

                    <div className="buttonHolder">
                      <button type="button" className="btn btn-primary btn-lg"><Link to="/register">Register</Link></button>
                    </div>
                  </div>
                  <hr />
                  <div id="intro" dangerouslySetInnerHTML={{__html: about}} />
                </div>
              </Col>
            </Row>
          </BSContainer>
        </div>
        <div style={{backgroundColor: '#eee'}}>
          <Timeline />
        </div>
        <div className="lightBlock">
          <BSContainer>
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <div id="why" dangerouslySetInnerHTML={{__html: why}} />
                  </div>
                </div>
              </Col>
            </Row>
          </BSContainer>
        </div>
        <div className="darkBlock">
          <BSContainer>
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <div id="overview" dangerouslySetInnerHTML={{__html: overview}} />
                  </div>
                </div>
              </Col>
            </Row>
          </BSContainer>
        </div>
        <div className="lightBlock">
          <BSContainer>
            <Row>
              <Col xs={12} md={8} mdOffset={2}>
                <div className="panel my-panel-default">
                  <div className="my-panel-body">
                    <div id="faq" dangerouslySetInnerHTML={{__html: faq}} />
                  </div>
                </div>
              </Col>
            </Row>
          </BSContainer>
        </div>
        <Footer />
      </div>
    )
  }
}
