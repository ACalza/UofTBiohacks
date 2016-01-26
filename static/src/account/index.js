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
import GroupControl from '../components/GroupControl'

class Account extends Component {

  componentWillMount() {
    const { dispatch } = this.props
    console.log(authorize)
    dispatch(authorize())
  }
  render() {
    const { snacker, submission, account, dispatch } = this.props
    let content = null

    if(account.authorized){
      content = <div className="controlpanel">
                  <h2>Hello, {account.userModel.name}</h2>
                  <GroupControl />
                </div>
    }
    else if(!account.authorizing && !account.authorized){
      //redirect
      content = <ReactRedirect location='/'>
                </ReactRedirect>
    }else{
      content = <p>Loading...</p>
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
