// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import Layout from '../components/Layout'

// Actions
import * as LoggedActions from '../actions/logged'

// Presentational Component
class Home extends Component {
  render() {
    const { actions, logged } = this.props

    let content
    if (this.props.jwt !== null) {
      content = <h3>Logged in</h3>
    } else {
      content = <h3>Logged out</h3>
    }

    return (
      <Layout title="Home">
        {content}
      </Layout>
    )
  }
}

// Bindings into state and dispatch
const mapStateToProps = (state) => {
  return {
    jwt: state.logged.jwt
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(LoggedActions, dispatch)
  }
}

// Container Component
export default connect(mapStateToProps, mapDispatchToProps)(Home)
