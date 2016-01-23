import React, { Component } from 'react'
import mount from '../mount.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'

import Layout from '../components/Layout'

class Account extends Component {
  render() {
    return(
      <Layout>
        <h2>Account Page</h2>
      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(Account), { snacker, submission })
