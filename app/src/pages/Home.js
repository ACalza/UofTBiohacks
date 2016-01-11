// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import { Link } from 'react-router'
import { Col, Row } from 'react-bootstrap'
import Layout from '../components/Layout'
import BSContainer from '../components/BSContainer'

import '../styles/Home.scss'

// import Logo from '../assets/BioHacksLogo.svg'

import about from '../markdown/about.md'

// Presentational Component
export default class Home extends Component {
  render() {
    return (
      <Layout>
        <div className="Splash jumbotron">
          <div className="headerPush" />
          <img src="http://45.55.193.224:1234/BioHacksLogo.svg" />
          <h1><span className="darkBlue">UofT</span> <span className="lightBlue">Bio</span><span className="darkBlue">Hacks</span></h1>
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
        <div style={{paddingTop: '30px', backgroundColor: '#eee'}}>
          <div className="container">
            This is the super awesome homepage.
            <Row className="show-grid">
              <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
              <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
              <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
            </Row>
          </div>
        </div>
      </Layout>
    )
  }
}

// <div className="ribbon hidden-lg"><span><Link className="ribbonLink" to="/register">Register</Link></span></div>
