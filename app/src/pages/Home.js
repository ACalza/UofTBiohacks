// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import { Col, Row } from 'react-bootstrap'
import Layout from '../components/Layout'

import '../styles/Home.scss'

import Logo from '../assets/BioHacksLogo.svg'

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
