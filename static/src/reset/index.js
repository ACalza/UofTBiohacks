import React, { Component } from 'react'
import { connect } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import mount from '../mount.js'

import FMUI, { FormsyText } from 'formsy-material-ui'
import submission from '../reducers/submission.js'
import snacker from '../reducers/snacker.js'
import {Snackbar, RaisedButton} from 'material-ui/lib'
import TextField from 'material-ui/lib/text-field'

import {openSnack} from '../actions/snacker'
import { canSubmit, submitForm, canNotSubmit, loadResponse} from '../actions/submission.js'
import Layout from '../components/Layout'
import { BASE_URI } from '../constants/uris.js'
import { ajaxPost } from '../util/ajax.js'
import {FRONT_END_URL} from '../../../shared/constants'
import { Row, Col } from 'react-bootstrap'
import '../styles/navigation.scss'

class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      valid: false,
      token: "",
      changedPass: false
    }
  }

  componentWillMount() {
    if (canUseDOM) {
      let params = location.search.split('?token=')
      console.log(params)
      if(params.length == 2){
        this.setState({
          token: params[1],
          valid:true
        })
      }
    }
  }

  submitForm = (model) => {
    const { dispatch } = this.props
    if(model.password !== model.confirmPassword){
      dispatch(openSnack("Passwords do not Match!"))
    }else if(model.password.length <= 8){
      dispatch(openSnack("Password must be greater than 8 characters"))
    }else{
      model.token = this.state.token
      console.log(BASE_URI + '/user/reset')
      console.log(model)
      ajaxPost(model, '/user/reset', null, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        if(data.success){
          dispatch(openSnack("You have successfully changed your password, redirecting in 5 seconds"))
          dispatch(canNotSubmit())
          this.setState({
            changedPass: true
          })
        }else{
          dispatch(openSnack("Error proccessing password, invalid token/password"))
        }
      }
    })

    }
  };
  render() {
    const { snacker, submission, dispatch } = this.props
    let content = null

    if(this.state.valid){
      content =
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
            disabled = {this.state.changedPass}
          />

          <FormsyText style={{display: 'block'}}
            name = 'confirmPassword'
            type = 'password'
            required hintText = "Confirm your new password"
            floatingLabelText = "Confirm Password"
            disabled = {this.state.changedPass}
          />

          <RaisedButton
            type = "submit"
            label = "Submit"
            disabled = {!submission.canSubmit}
          />

        </Formsy.Form>

    } else if (canUseDOM) {
      if (this.state.changedPass) {
        content = <p>Password has been successfully resetted!  Redirecting! </p>
        setTimeout(() => window.location.assign('/login') ,5000)
      } else {
        content = <p>Invalid Token, redirecting in 5 seconds</p>
        setTimeout(() => window.location.assign('/') ,5000)
      }
    }


    return (
      <Layout push>
        <div className="container">
          <Row>
            <Col className="WideForm" xs={12} md={6} mdOffset={3}>
              <h2>Reset Password</h2>
              {content}
            </Col>
          </Row>
        </div>
      </Layout>
    )


  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })

export default mount(connect(mapStateToProps)(ResetPassword), { snacker, submission })
