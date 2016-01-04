import React, { Component } from 'react'
import FMUI, { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'
import autobind from 'autobind-decorator'
import $ from 'jquery'
import cookie from 'react-cookie'


@autobind
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false
    }
    this.errorMessages = {
      wordsError: 'Please fill in the entire form',
      serverError: 'Internal Server Error, please try again',
      verifcationError: 'Invalid email/username and/or password'
    }
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
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/user/login',
      data: model,
      success: function(data) {
        if(data.token){
          console.log(data)
        }else{
          console.log("Naw you fucked up");
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    console.log('model: ' + JSON.stringify(model))
  }

  render() {
    let { wordsError } = this.errorMessages
    return (
      <Formsy.Form
        onValid = {this.enableButton}
        onInvalid = {this.disableButton}
        onValidSubmit = {this.submitForm}>

        <FormsyText style={{display: 'block'}}
          name = 'emailOrUsername'
          validationError = {wordsError}
          required hintText = "What is your Email or Username?"
          floatingLabelText = "Email or Username"
        />

        <FormsyText style={{display: 'block'}}
          name = 'password'
          type = 'password'
          validationError = {wordsError}
          required hintText = "What is your password?"
          floatingLabelText = "Password"
        />

        <RaisedButton
          type = "submit"
          label = "Submit"
          disabled = {!this.state.canSubmit}
          />
      </Formsy.Form>
    )
  }
}
