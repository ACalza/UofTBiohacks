import React, { Component } from 'react'
import { connect } from 'react-redux'
import FMUI, { FormsyText } from 'formsy-material-ui'

import RaisedButton from 'material-ui/lib/raised-button'


import Layout from '../components/Layout'

import { logIn, logOut } from '../actions/logged'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
      autoHideDuration: 3000,
      open: false,
      message: 'Invalid email/username and/or password'
    }

    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
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
    this.props.dispatch(logIn(model, '/user/login'))
  }

  handleRequestClose() {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <Layout title="Login">
        <Formsy.Form
          onValid = {this.enableButton}
          onInvalid = {this.disableButton}
          onValidSubmit = {this.submitForm}>

          <FormsyText style={{display: 'block'}}
            name = 'emailOrUsername'
            required hintText = "What is your Email or Username?"
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
            disabled = {!this.state.canSubmit}
            />

        </Formsy.Form>
      </Layout>
    )
  }
}


export default connect()(Login)
