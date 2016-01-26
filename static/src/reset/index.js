import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from '../mount.js'

import FMUI, { FormsyText } from 'formsy-material-ui'
import submission from '../reducers/submission.js'
import snacker from '../reducers/snacker.js'
import {Snackbar, RaisedButton} from 'material-ui/lib'
import TextField from 'material-ui/lib/text-field'

import {openSnack} from '../actions/snacker'
import { canSubmit, submitForm, canNotSubmit, loadResponse} from '../actions/submission.js'
import Layout from '../components/Layout'
class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      valid: false
    }
  }
  componentWillMount(){

  }
  submitForm = (model) => {
    const { dispatch } = this.props
    console.log(dispatch)
    if(model.password !== model.confirmPassword){
      dispatch(openSnack("Passwords do not Match!"))
    }else if(model.password.length <= 8){
      dispatch(openSnack("Password must be greater than 8 characters"))
    }else{
      //machine to reset password lol
    }
  };
  render() {
    const { snacker, submission, dispatch } = this.props
    return (
      <Layout>
        <h2>Reset Password</h2>
        <Formsy.Form
          onValidSubmit = {this.submitForm}
          onValid = {() => dispatch(canSubmit())}
          onInvalid = {() => dispatch(canNotSubmit())}
        >

          <FormsyText style={{display: 'block'}}
            name = 'password'
            type = 'password'
            required hintText = "What is your new password?"
            floatingLabelText = "Password"
          />

          <FormsyText style={{display: 'block'}}
            name = 'confirmPassword'
            type = 'password'
            required hintText = "Confirm your new password"
            floatingLabelText = "Confirm Password"
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

export default mount(connect(mapStateToProps)(ResetPassword), { snacker, submission })
