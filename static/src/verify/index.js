import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from '../mount.js'

import submission from '../reducers/submission.js'
import snacker from '../reducers/snacker.js'
import {Snackbar, RaisedButton} from 'material-ui/lib'


import {openSnack} from '../actions/snacker'
import { canSubmit, submitForm, canNotSubmit, loadResponse} from '../actions/submission.js'
import Layout from '../components/Layout'
import {FRONT_END_URL} from '../../../shared/constants'


class Verify extends Component {
  constructor(props){
    super(props)
    this.state = {
      valid: false,
      token: "",
      emailVerified: false
    }
  }

  componentWillMount(){
    let params = location.search.split('?token=')
    if(params.length == 2){
      this.setState({
        token: params[1],
        valid: true
      })
    }
  }

  render() {
    const { snacker, submission, dispatch } = this.props
    let content = null
    if(!this.state.valid){
      content = <p>Invalid Token, redirecting in 5 seconds</p>
      setTimeout(() => window.location.replace(FRONT_END_URL + "/") ,5000);
    }

    return(
      <Layout>
        <h2>Email Verification</h2>
        {content}
      </Layout>
    )


  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(Verify), { snacker, submission })
