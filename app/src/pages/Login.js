// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import FMUI, { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'

import Layout from '../components/Layout'

// Actions
import { logIn, logOut } from '../actions/logged'

// Utilites
import { ajaxPost } from '../util'

// Presentation Component
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { canSubmit: false }
  }

  enableButton = () => {
    this.setState({ canSubmit: true })
  };

  disableButton = () => {
    this.setState({ canSubmit: false })
  };

  submitForm = (model) => {
    const { dispatch } = this.props

    ajaxPost(model, '/user/login', null, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        dispatch(logIn(data))
      }
    })
  };

  // TODO forgot password
  render() {
    return (
      <Layout title="Login">
        <Formsy.Form
          onValid = {this.enableButton}
          onInvalid = {this.disableButton}
          onValidSubmit = {this.submitForm}>

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
            disabled = {!this.state.canSubmit}
          />
        </Formsy.Form>
      </Layout>
    )
  }
}

export default connect()(Login)
