// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Group from '../containers/Group'

// Components
import Layout from '../components/Layout'

// Presentational Component
export default class Home extends Component {
  render() {
    return (
      <Layout push title="Account">
        <Group />
      </Layout>
    )
  }
}
