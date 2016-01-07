import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Components
import Layout from '../components/Layout'

// Actions
import * as LoggedActions from '../actions/logged'

class Home extends Component {
  render() {
    const { actions, logged } = this.props

    return (
      <Layout title="Home">
        <span>{logged.toString()}</span>
        <button onClick={actions.logIn}> Log In </button>
        <button onClick={actions.logOut}> Log Out </button>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(LoggedActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
