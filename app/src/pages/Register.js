// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import FMUI, { FormsyText, FormsyToggle } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'

import Layout from '../components/Layout'

// Actions
import { register } from '../actions/logged'

// Utilites
import { ajaxPost } from '../util'

// Presentational Component
class Register extends Component {
  constructor() {
    super()

    this.state = { canSubmit: false }
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    })
  };

  disableButton = () => {
    this.setState({
      canSubmit: false
    })
  };

  submitForm = (model) => {
    const { dispatch } = this.props

    ajaxPost(model, '/user/register', null, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        dispatch(register(data))
      }
    })
    // console.log('model: ' + JSON.stringify(model))
  };

  render() {
    return (
      <Layout push title="Register">
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

        <FormsyText style={{display: 'block'}}
          name = 'confirmpassword'
          type = 'password'
          validations="equalsField:password"
          validationError="Does not match"
          required
          hintText = "Confirm Password"
          floatingLabelText = "Confirm Password"
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

export default connect()(Register)
