import React, {Component} from 'react'
import Input from '../Input'

// import User from '../../../src/models/user.js'
import User from '../../../reg-form.js'

import Icon from '../Icon'

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

  render() {
    return (
       <div>
        <Icon type="circle_error"/>
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
