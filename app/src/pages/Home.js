import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/Layout'

class Home extends Component {
  render() {
    return (
      <Layout title="Home">
        Home content as african children.
        {this.props.logged}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged: state
  }
}

export default connect(mapStateToProps)(Home)
