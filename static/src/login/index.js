import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText } from 'formsy-material-ui'
import {Snackbar, RaisedButton} from 'material-ui/lib'
import TextField from 'material-ui/lib/text-field'

import mount from '../mount.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'

import { openSnack, eatSnack } from '../actions/snacker.js'
import { canSubmit, submitForm } from '../actions/submission.js'

class Login extends Component {
  test = () => {
    const { snacker, dispatch } = this.props

    dispatch(openSnack("hey you submitted ma TML"))
  };
  render() {
    const { snacker, submission, dispatch } = this.props
    return(
      <div>
        <h1>Login Page</h1>
        <Formsy.Form
          onValidSubmit = {this.test}
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
        <Snackbar
          open={snacker.open}
          message={snacker.message}
          action="close"
          autoHideDuration={3000}
          onActionTouchTap={() => dispatch(eatSnack())}
          onRequestClose={() => dispatch(eatSnack())}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(Login), { snacker, submission })
