import React, { Component } from 'react'
import Layout from '../components/Layout'

import FMUI, { FormsyText, FormsyToggle } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'

export default class Register extends Component {
  constructor() {
    super()

    this.state = {
      canSubmit: false
    }

    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  enableButton() {
    this.setState({
      canSubmit: true
    })
  }

  disableButton() {
    this.setState({
      canSubmit: false
    })
  }

  submitForm(model) {
    console.log('model: ' + JSON.stringify(model))
  }

  render() {
    return (
      <Layout title="Register">
        <Formsy.Form
          onValid = {this.enableButton}
          onInvalid = {this.disableButton}
          onValidSubmit = {this.submitForm}
        >

        <FormsyText style={{display: 'block'}}
          required
          name = 'email'
          validations="isEmail"
          validationError={'Invalid email'}
          hintText = "What is your email?"
          floatingLabelText = "Email"
        />

        <FormsyText style={{display: 'block'}}
          required
          name = 'username'
          validations={{matchRegexp: /.+/}}
          validationError="At least one character please"
          required hintText = "What is your username?"
          floatingLabelText = "Username"
        />

        <FormsyText style={{display: 'block'}}
          required
          name = 'name'
          validations={{matchRegexp: /.+/}}
          validationError="At least one character please"
          required hintText = "What is your name?"
          floatingLabelText = "Name"
        />

        <FormsyText style={{display: 'block'}}
          name = 'password'
          type = 'password'
          validations={{matchRegexp: /.{7}.+/}}
          validationError="At least eight characters please"
          required
          hintText = "What is your password?"
          floatingLabelText = "Password"
        />

        <RaisedButton
          type = "submit"
          label = "Submit"
          disabled = {!this.state.canSubmit}
          />
      </Formsy.Form>
      </Layout>
    )
  }
}
