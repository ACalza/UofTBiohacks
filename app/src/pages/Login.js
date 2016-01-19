// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import FMUI, { FormsyText } from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'
import RaisedButton from 'material-ui/lib/raised-button'
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import Layout from '../components/Layout'
import TextField from 'material-ui/lib/text-field';
import BSContainer from '../components/BSContainer'

// Actions
import { logIn, logOut } from '../actions/logged'

// Utilites
import { ajaxPost } from '../util'

// Presentation Component
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { canSubmit: false,
      forgotPassword: false,
      forgotPasswordEmail: "",
      forgotPassowrdError: "",
      forgotPasswordErrorColor: "red"
    }
  }

  enableButton = () => {
    this.setState({ canSubmit: true })
  };

  disableButton = () => {
    this.setState({ canSubmit: false })
  };

  submitForm = (model) => {
    const { dispatch } = this.props

    ajaxPost(model, '/user/login', null, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        dispatch(logIn(data))
      }
    })
  };
  handleOpen = () => {
    this.setState({forgotPassword: true});
  };

  handleClose = () => {

    this.setState({forgotPassword: false});
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
            forgotPasswordErrorColor: "green"
          })
        }else{
          console.log(data.message)
          this.setState({
            forgotPasswordError : data.message,
            forgotPasswordErrorColor: "red"
          })
        }
      }
    })
  };
  handleForgetPassword = () => {
    this.setState({forgotPassword: true})
  };
  handleforgetInputChange = (e) => {
    this.setState({
      forgotPasswordEmail: e.target.value
    });
  };
  // TODO forgot password
  render() {
    const actions = [
      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleForgetPasswordSubmit} />,
    ];
    return (
      <Layout push title="Login">
      <BSContainer>
        <Row>
          <Col className="WideForm" xs={12} md={6} mdOffset={3}>
            <Formsy.Form
              onValid = {this.enableButton}
              onInvalid = {this.disableButton}
              onValidSubmit = {this.submitForm}>

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
                disabled = {!this.state.canSubmit}
              />
            </Formsy.Form>
            
            </Col>
          </Row>
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
        </BSContainer>
      </Layout>
    )
  }
}

export default connect()(Login)
