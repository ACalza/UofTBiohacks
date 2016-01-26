import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText } from 'formsy-material-ui'
import {Snackbar, RaisedButton} from 'material-ui/lib'
import TextField from 'material-ui/lib/text-field'

import mount from '../mount.js'


import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'
import ReactRedirect from "react-redirect"

import { canSubmit, submitForm, canNotSubmit, loadResponse} from '../actions/submission.js'


import Layout from '../components/Layout'

import { BASE_URI } from '../constants/uris.js'

class Login extends Component {

  submitForm = (model) => {
    const {dispatch, submission} = this.props

    dispatch(canNotSubmit())
    dispatch(loadResponse(BASE_URI + '/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }))

  };
  checkLoggedIn = () => {
    let content = null

    if(sessionStorage.jwt){
      content = <ReactRedirect location='/account'>
                </ReactRedirect>
    }
    return content
  };
  render() {
    const { snacker, submission, dispatch } = this.props
    return(
      <Layout>
        <h1>Login Page</h1>
        <Formsy.Form
          onValidSubmit = {this.submitForm}
          onValid = {() => dispatch(canSubmit())}
          onInvalid = {() => dispatch(canNotSubmit())}
        >

          <FormsyText style={{display: 'block'}}
            name = 'emailOrUsername'
            required hintText = "What is your email or username?"
            floatingLabelText = "Email or Username"
          />

          <FormsyText style={{display: 'block'}}
            name = 'password'
            type = 'password'
            required hintText = "What is your password?"
            floatingLabelText = "Password"
          />

          <RaisedButton
            type = "submit"
            label = "Submit"
            disabled = {!submission.canSubmit}
          />
        </Formsy.Form>

        {this.checkLoggedIn()}

      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(Login), { snacker, submission })
