// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import FMUI, { FormsyText, FormsyToggle } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'
import { Row, Col } from 'react-bootstrap'

import Layout from '../components/Layout'
import BSContainer from '../components/BSContainer'

// Actions
import { register } from '../actions/logged'

// Utilites
import { ajaxPost } from '../util'

import '../styles/WideForm.scss'

// Presentational Component
class Register extends Component {
  constructor() {
    super()

    this.state = { canSubmit: false }
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    })
  };

  disableButton = () => {
    this.setState({
      canSubmit: false
    })
  };

  submitForm = (model) => {
    const { dispatch } = this.props
    this.setState({
      canSubmit: false
    })
    ajaxPost(model, '/user/register', null, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        dispatch(register(data))
      }
    })
    // console.log('model: ' + JSON.stringify(model))
  };

  render() {
    return (
      <Layout push title="Register">
        <BSContainer>
          <Row>
            <Col className="WideForm" xs={12} md={6} mdOffset={3}>
              <Formsy.Form
                onValid = {this.enableButton}
                onInvalid = {this.disableButton}
                onValidSubmit = {this.submitForm}
              >
                <FormsyText style={{display: 'block'}}
                  required
                  name = 'email'
                  validations="isEmail"
                  validationError={'Invalid email'}
                  hintText = "What is your email?"
                  floatingLabelText = "Email"
                />

                <RaisedButton
                  type = "submit"
                  label = "Submit"
                  disabled = {!this.state.canSubmit}
                />
              </Formsy.Form>
            </Col>
          </Row>
        </BSContainer>
      </Layout>
    )
  }
}

export default connect()(Register)
