import React, {Component} from 'react'
import autobind from 'autobind-decorator'
import Input from '../Input'

// import User from '../../../src/models/user.js'
import User from '../../../reg-form.js'

import Icon from '../Icon'

@autobind
class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      companyName: null,
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

    var canProceed = this.validateEmail(this.state.email)
        && !_.isEmpty(this.state.statesValue)
        && this.refs.password.isValid()
        && this.refs.passwordConfirm.isValid();

    if(canProceed) {
      var data = {
        email: this.state.email,
        state: this.state.statesValue
      }
      alert('Thanks.');
    } else {
      this.refs.email.isValid();
      this.refs.state.isValid();
      this.refs.companyName.isValid();
      this.refs.password.isValid();
      this.refs.passwordConfirm.isValid();
    }
  }

  isConfirmedPassword(event) {
    return (event == this.state.password)
  }

  handleCompanyInput(event) {
    this.setState({
      companyName: event.target.value
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
       <div>
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
       </div>
    )
  }
}

export default Registration
