import React, { Component } from 'react'
import { connect } from 'react-redux'

import {openSnack} from '../actions/snacker'
import mount from '../mount.js'

import submission from '../reducers/submission.js'
import snacker from '../reducers/snacker.js'
import account from '../reducers/account.js'

import { authorize } from '../actions/account.js'
import Layout from '../components/Layout'
import ReactRedirect from "react-redirect"

class Account extends Component {

  componentWillMount() {
    const { dispatch } = this.props
    console.log(authorize)
    dispatch(authorize())
  }
  render() {
    const { snacker, submission, account, dispatch } = this.props
    let content = null
    console.log(account)
    if(account.isSignedIn && account.authorized){
      content = <h2>Hello, {account.userModel.name}</h2>
    }
    else if(!account.authorizing && !account.authorized){
      //redirect
      content = <ReactRedirect location='/'>
                </ReactRedirect>
    }
    return(
      <Layout>
        {content}
      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission, account }) => ({ snacker, submission, account })

export default mount(connect(mapStateToProps)(Account), { snacker, submission, account })
