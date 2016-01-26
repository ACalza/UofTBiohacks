import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText } from 'formsy-material-ui'
import { Snackbar, RaisedButton } from 'material-ui/lib'

import mount from '../mount.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'

import { canSubmit, submitForm, canNotSubmit, loadResponse } from '../actions/submission.js'


class Register extends Component {
  submitForm = (model) => {
    console.log(model)
  };

  render() {
    const { submission, dispatch } = this.props

    return(
      <div>
        <h2>Register</h2>
        <Formsy.Form
          onValidSubmit = {this.submitForm}
          onValid = {() => dispatch(canSubmit())}
          onInvalid = {() => dispatch(canNotSubmit())}
        >
          <FormsyText style={{display: 'block'}}
            required
            name = 'firstName'
            hintText = "First Name?"
            floatingLabelText = "First Name"
          />
        </Formsy.Form>

        <RaisedButton
          type = "submit"
          label = "Submit"
          disabled = {!submission.canSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })
export default mount(connect(mapStateToProps)(Register), { snacker, submission })
