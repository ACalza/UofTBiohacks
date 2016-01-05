import React, { Component } from 'react'
import FMUI, { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'
import autobind from 'autobind-decorator'
import $ from 'jquery'
import cookie from 'react-cookie'
import Snackbar from 'material-ui/lib/snackbar'
import uriService from '../../services/UriService'

@autobind
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
      autoHideDuration: 3000,
      open: false,
      message: 'Invalid email/username and/or password'
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
      url: uriService.baseUri() + '/user/login',
      data: model,
      success: function(data) {
        if(data.token){
          cookie.save('jwt', data.token)
          console.log(data)
        }else{
          this.setState({
            open: true
          })
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    console.log('model: ' + JSON.stringify(model))
  }
  handleRequestClose() {
    this.setState({
      open: false
    })
  }
  render() {
    return (
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

        <Snackbar
          open={this.state.open}
          message={this.state.message}
          action="Close"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleRequestClose}
          onRequestClose={this.handleRequestClose}
        />
      </Formsy.Form>
    )
  }
}
