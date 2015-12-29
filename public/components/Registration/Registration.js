import React, {Component} from 'react'
import _ from 'underscore'
import autobind from 'autobind-decorator'
import Input from '../Input'

import User from '../../../reg-form.js'

import Icon from '../Icon'

@autobind
export default class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      name: null,
      password: null,
      confirmPassword: null,
      statesValue: null,
      forbiddenWords: ["password", "user", "username"]
    }
  }

  handlePasswordInput(event) {
    if(!_.isEmpty(this.state.confirmPassword)){
      this.refs.passwordConfirm.isValid();
    }
    this.refs.passwordConfirm.hideError();
    this.setState({
      password: event.target.value
    });
  }

  handleConfirmPasswordInput(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  saveAndContinue(e) {
    e.preventDefault();

    console.log(this)

    var canProceed = this.validateEmail(this.state.email)
        && !_.isEmpty(this.state.name)
        && this.refs.password.isValid()
        && this.refs.passwordConfirm.isValid();

    if(canProceed) {
      var data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      alert(JSON.stringify(data));
    } else {

      this.refs.email.isValid();
      this.refs.name.isValid();
      this.refs.password.isValid();
      this.refs.passwordConfirm.isValid();
    }
  }

  isConfirmedPassword(event) {
    return (event == this.state.password)
  }

  handleNameInput(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleEmailInput(event){
    this.setState({
      email: event.target.value
    });
  }

  validateEmail(event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  }

  isEmpty(value) {
    return !_.isEmpty(value);
  }

  updateStatesValue(value) {
    this.setState({
      statesValue: value
    })
  }

  render() {
    return (
    <form style={{width: '450px'}} onSubmit={this.saveAndContinue}>
      <Input
          text="Email Address"
          ref="email"
          type="text"
          defaultValue={this.state.email}
          validate={this.validateEmail}
          value={this.state.email}
          onChange={this.handleEmailInput}
          errorMessage="Email is invalid"
          emptyMessage="Email can't be empty"
          errorVisible={this.state.showEmailError}
      />

      <Input
        text="Name"
        ref="companyName"
        validate={this.isEmpty}
        value={this.state.name}
        onChange={this.handleNameInput}
        emptyMessage="name can't be empty"
      />

      <Input
        text="Password"
        type="password"
        ref="password"
        validator="true"
        minCharacters="8"
        requireCapitals="1"
        requireNumbers="1"
        forbiddenWords={this.state.forbiddenWords}
        value={this.state.passsword}
        emptyMessage="Password is invalid"
        onChange={this.handlePasswordInput}
      />

      <Input
        text="Confirm password"
        ref="passwordConfirm"
        type="password"
        validate={this.isConfirmedPassword}
        value={this.state.confirmPassword}
        onChange={this.handleConfirmPasswordInput}
        emptyMessage="Please confirm your password"
        errorMessage="Passwords don't match"
      />

      <button
        type="submit"
        className="button button_wide">
        CREATE ACCOUNT
      </button>
    </form>
    )
  }
}
