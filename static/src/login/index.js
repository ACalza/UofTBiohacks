import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText } from 'formsy-material-ui'
import {Snackbar, RaisedButton} from 'material-ui/lib'
import TextField from 'material-ui/lib/text-field'

import mount from '../mount.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'

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
    console.log(submission)
    //More of a 'promise' that the front end will make the ajax request
    // dispatch(submitForm(model))

    // //Make the ajax post request, dispatching 'submit response on completion'
    // ajaxPost(model, '/user/login', null, dispatch, submitResponse)

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
      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(Login), { snacker, submission })
