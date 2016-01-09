// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import { Col, Row } from 'react-bootstrap'
import Layout from '../components/Layout'

// Presentational Component
export default class Home extends Component {
  render() {
    return (
      <Layout>
        This is the super awesome homepage.
        <h2> Home </h2>
        <Row className="show-grid">
          <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
        </Row>
      </Layout>
    )
  }
}
