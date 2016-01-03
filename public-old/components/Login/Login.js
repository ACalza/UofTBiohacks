import React, {Component} from 'react'
import _ from 'underscore'
import autobind from 'autobind-decorator'
import $ from 'jquery'

// Components
import Icon from '../Icon'
import Input from '../Input'

@autobind
export default class Registration extends Component {
  constructor(props) {
    super(props)
    // TODO generate state properties from user-registration.js
    this.state = {
      email: null,
      username: null
    }
  }

  // ==== PASSWORD ====
  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    })
  }

  // ==== UNAME ====
  handleUNameInput(event) {
    this.setState({
      username: event.target.value
    })
  }

  // ==== EMAIl ====
  handleEmailInput(event){
    this.setState({
      email: event.target.value
    })
  }

  validateEmail(event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(event)
  }

  validatePassword(e) {
    return /.{8,}/.test(e)
  }

  // For validate in Name
  isEmpty(value) {
    return !_.isEmpty(value)
  }

  // updateStatesValue(value) {
  //   this.setState({
  //     statesValue: value
  //   })
  // }

  saveAndContinue(e) {
    e.preventDefault()

    // var canProceed = this.validateEmail(this.state.email)
    //     && !_.isEmpty(this.state.name)
    //     && !_.isEmpty(this.state.username)
    //     && this.refs.password.isValid()

    // if(canProceed) {
    this.postForm()
    // }
  }

  postForm() {
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    console.log(data)

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/user/login',
      data: data,
      success: function(data, status, jqXHR) {
        console.log('data:', data)
        console.log('jqXHR: ', jqXHR)
        console.log('headers: ', jqXHR.getAllResponseHeaders())
        console.log('X-Response-Time', jqXHR.getResponseHeader('X-Response-Time'))
        console.log('Content-Length', jqXHR.getResponseHeader('Content-Length'))
        if (status === 'success') {

          if (data.message === 'logged in!') {
            alert(data.message)
          } else if (data.message === 'Wrong password and/or email') {
            alert(data.message)
          }
        }
      }.bind(this)
    })
  }

  render() {
    return (
    <form
      style={{width: '450px'}}
      onSubmit={this.saveAndContinue}
      key={this.state.timestamp}
    >
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
        text="Username"
        ref="username"
        validate={this.isEmpty}
        value={this.state.username}
        onChange={this.handleUNameInput}
        emptyMessage="username can't be empty"
      />

      <Input
        text="Password (8 char. or more)"
        type="password"
        ref="password"
        validate={this.validatePassword}
        value={this.state.passsword}
        emptyMessage="Password is invalid"
        onChange={this.handlePasswordInput}
      />

      <button style={{display: 'block', position: 'relative', width: '100%', height: '50px', border: '0'}}
        type="submit"
        className="button button_wide">
        LOGIN
      </button>

      <a href="http://localhost:3000/user/all">users as JSON</a>
      <br/>
      <a href="http://localhost:3000/user/all/csv">users as csv</a>
      <br/>
      <a href="http://localhost:3000/user/session">session</a>
    </form>
    )
  }
}
