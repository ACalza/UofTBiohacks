import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from '../mount.js'
import submission from '../reducers/submission.js'



import snacker from '../reducers/snacker.js'
import Layout from '../components/Layout'

class Account extends Component {

  render() {
    const { snacker, submission, dispatch } = this.props

    return(
      <Layout>
        <div>
          <h1>{(() => {
            console.log(sessionStorage.jwt)
            return sessionStorage.jwt
          })()}</h1>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(Account), { snacker, submission })
