// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import Layout from '../components/Layout'

// Presentational Component
export default class Home extends Component {
  render() {
    return (
      <Layout title="Account">
        Your group:
      </Layout>
    )
  }
}
