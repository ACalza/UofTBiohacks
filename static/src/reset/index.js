import React, { Component } from 'react'
import { connect } from 'react-redux'

import mount from '../mount.js'

import FMUI, { FormsyText } from 'formsy-material-ui'
import submission from '../reducers/submission.js'
import snacker from '../reducers/snacker.js'
import {Snackbar, RaisedButton} from 'material-ui/lib'
import TextField from 'material-ui/lib/text-field'

import {openSnack} from '../actions/snacker'
import { canSubmit, submitForm, canNotSubmit, loadResponse} from '../actions/submission.js'
import Layout from '../components/Layout'
class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      valid: false,
      token: ""
    }
  }

  componentWillMount(){
    let params = location.search.split('?token=')
    console.log(params)
    if(params.length == 2){
      this.setState({
        token: params[1],
        valid:true
      })
    }


  }
  submitForm = (model) => {
    const { dispatch } = this.props
    if(model.password !== model.confirmPassword){
      dispatch(openSnack("Passwords do not Match!"))
    }else if(model.password.length <= 8){
      dispatch(openSnack("Password must be greater than 8 characters"))
    }else{
      //machine to reset password lol
    }
  };
  render() {
    const { snacker, submission, dispatch } = this.props
    let content = <Layout><h2>Invalid Token</h2></Layout>

    if(this.state.valid){
      content = <Layout>
        <h2>Reset Password</h2>
        <Formsy.Form
          onValidSubmit = {this.submitForm}
          onValid = {() => dispatch(canSubmit())}
          onInvalid = {() => dispatch(canNotSubmit())}
        >

          <FormsyText style={{display: 'block'}}
            name = 'password'
            type = 'password'
            required hintText = "What is your new password?"
            floatingLabelText = "Password"
          />

          <FormsyText style={{display: 'block'}}
            name = 'confirmPassword'
            type = 'password'
            required hintText = "Confirm your new password"
            floatingLabelText = "Confirm Password"
          />

          <RaisedButton
            type = "submit"
            label = "Submit"
            disabled = {!submission.canSubmit}
          />

        </Formsy.Form>
      </Layout>

    }
    return content


  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(ResetPassword), { snacker, submission })
