import React, { Component } from 'react'
import FMUI, { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'
import autobind from 'autobind-decorator'
import $ from 'jquery'
import cookie from 'react-cookie'
import uriService from '../../services/UriService'

@autobind
export default class Login extends Component {
  constructor() {
    super()

    this.state = {
      canSubmit: false,
      password: ''
    }
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  submitForm(model) {
    console.log(model)
    // $.ajax({
    //   type: 'POST',
    //   url: uriService.baseUri() + '/user/login',
    //   data: model,
    //   success: function(data) {
    //     if(data.token){
    //       cookie.save('jwt', data.token)
    //       console.log(data)
    //     }else{
    //       this.setState({
    //         open: true
    //       })
    //     }
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
    // console.log('model: ' + JSON.stringify(model))
  }

  render() {
    return (
      <Formsy.Form
        onValid = {this.enableButton}
        onInvalid = {this.disableButton}
        onValidSubmit = {this.props.submitForm}>

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
    )
  }
}
