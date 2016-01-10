// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Group from '../containers/Group'
import Admin from '../containers/Admin'

// Components
import Layout from '../components/Layout'

// Presentational Component
export default class Home extends Component {
  render() {
    let content = <Group />
    if(this.props.userModel.email === "igem@g.skule.ca"){
      content = <Admin />
    }
    return (
      <Layout push title="Account">
        {content}
      </Layout>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    jwt: state.logged.jwt,
    userModel: state.logged.userModel
  }
}
export default connect(mapStateToProps)(Home)
