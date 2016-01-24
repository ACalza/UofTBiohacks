import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from '../mount.js'

import submission from '../reducers/submission.js'
import snacker from '../reducers/snacker.js'
import account from '../reducers/account.js'

import { authorize } from '../actions/account.js'
import Layout from '../components/Layout'

class Account extends Component {

  render() {
    const { snacker, submission, dispatch } = this.props

    return(
      <Layout>
        <div>
          <h1>{(() => {
            console.log(authorize)
            return sessionStorage.jwt
          })()}</h1>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission, account }) => ({ snacker, submission, account })

export default mount(connect(mapStateToProps)(Account), { snacker, submission, account })
