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

    let content
    if (this.props.jwt !== null) {
      content = <h3>Logged in</h3>
    } else {
      content = <h3>Logged out</h3>
    }

    console.log('homepage ', this.props)

    return (
      <Layout title="Home">
        {content}
      </Layout>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
