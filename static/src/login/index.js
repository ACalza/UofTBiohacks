import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText } from 'formsy-material-ui'
import {Snackbar, RaisedButton} from 'material-ui/lib'
import TextField from 'material-ui/lib/text-field'

import mount from '../mount.js'

import { ajaxPost } from '../util/ajax.js'

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'
import ReactRedirect from "react-redirect"

import { canSubmit, submitForm, canNotSubmit, loadResponse} from '../actions/submission.js'


import Layout from '../components/Layout'

import { BASE_URI } from '../constants/uris.js'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      forgotPassword: false,
      forgotPasswordEmail: "",
      forgotPassowrdError: "",
      forgotPasswordErrorColor: "red",
      canSubmit: true
    }
  }
  submitForm = (model) => {
    const {dispatch, submission} = this.props

    dispatch(canNotSubmit())
    dispatch(loadResponse(BASE_URI + '/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }))

  };
  checkLoggedIn = () => {
    let content = null

    if(sessionStorage.jwt){
      content = <ReactRedirect location='/account'>
                </ReactRedirect>
    }
    return content
  };
  handleOpen = () => {
    this.setState({forgotPassword: true});
  };

  handleClose = () => {
    this.setState({forgotPassword: false});
  };
  handleForgetPassword = () => {
    this.setState({forgotPassword: true})
  };
  handleforgetInputChange = (e) => {
    this.setState({
      forgotPasswordEmail: e.target.value
    });
  };
  handleForgetPasswordSubmit = () => {
    ajaxPost({email: this.state.forgotPasswordEmail}, '/user/forgot', null, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        console.log(data)
        if(data.success){
          this.setState({
            forgotPasswordError : data.message,
            forgotPasswordErrorColor: "green",
            canSubmit: false
          })
        }else{
          this.setState({
            forgotPasswordError : data.message,
            forgotPasswordErrorColor: "red",
            canSubmit: true
          })
        }
      }
    })
  };
  render() {
    const { snacker, submission, dispatch } = this.props
    const actions = [
      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={!this.state.canSubmit}
        keyboardFocused={true}
        onTouchTap={this.handleForgetPasswordSubmit} />,
    ];
    return(
      <Layout>
        <h2>Login Page</h2>
        <Formsy.Form
          onValidSubmit = {this.submitForm}
          onValid = {() => dispatch(canSubmit())}
          onInvalid = {() => dispatch(canNotSubmit())}
        >

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
            disabled = {!submission.canSubmit}
          />

        </Formsy.Form>
        <a href="#" onClick={()=> this.handleForgetPassword()}>Forgot Password?</a>
        <Dialog
            title="Password reset"
            actions={actions}
            modal={false}
            open={this.state.forgotPassword}
            onRequestClose={this.handleClose}>

            <TextField
              floatingLabelText="Email"
              hintText="Enter your Email"
              errorStyle={{color: this.state.forgotPasswordErrorColor}}
              value={this.state.forgotPasswordEmail}
              onChange={this.handleforgetInputChange}
              errorText={this.state.forgotPasswordError}
            />
          </Dialog>
        {this.checkLoggedIn()}

      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(Login), { snacker, submission })
