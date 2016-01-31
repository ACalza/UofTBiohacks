import React, { Component } from 'react'
import { connect } from 'react-redux'
import mount from '../mount.js'

import Recaptcha from 'react-recaptcha'
import FMUI, { FormsyText, FormsySelect, FormsyToggle, FormsyRadio, FormsyRadioGroup, FormsyCheckbox } from 'formsy-material-ui'
import { Snackbar, RaisedButton, MenuItem, Checkbox } from 'material-ui/lib'
import { Row, Col } from 'react-bootstrap'


import MyRadioGroup from '../components/MyRadioGroup.js'
import PureTextInput from '../components/PureTextInput.js'
import PureRadioGroup from '../components/PureRadioGroup.js'
import PureSelect from '../components/PureSelect.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'
import Layout from '../components/Layout'
import { canSubmit, submitForm, canNotSubmit, loadResponse } from '../actions/submission.js'

import { BASE_URI } from '../constants/uris.js'


import '../styles/Register.scss'

class Register extends Component {
  constructor() {
    super()

    this.state = {
      customSchool: false,
      canSubmit: false
    }
  }

  submitForm = (model) => {
    const { dispatch } = this.props
    const captchaVerify = grecaptcha.getResponse()

    if (captchaVerify.length !== 0) {
      console.log(model)
      dispatch(canNotSubmit())
      dispatch(loadResponse(BASE_URI + '/user/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      }))
    } else {
      alert('please do recaptcha')
    }
  };

  // onChange = (model) => {
  //   const { school } = model
  //
  //   if (this.state.school !== 'other' && school === 'other') {
  //     this.setState({
  //       customSchool: true
  //     })
  //   } else if (this.state.school === 'other' && school !== 'other'){
  //     this.setState({
  //       customSchool: false
  //     })
  //   }
  // };

  render() {
    const { submission, dispatch } = this.props

    return(
      <Layout push>
        <div className="container">
          <Row>
            <Col className="WideForm" xs={12} md={6} mdOffset={3}>
              <h2>Register</h2>
              <Formsy.Form
                onValidSubmit = {this.submitForm}
                onValid = {() => dispatch(canSubmit())}
                onInvalid = {() => dispatch(canNotSubmit())}
              >
                <div className="fullWidth">
                  <PureTextInput
                    required
                    name = 'email'
                    validations="isEmail"
                    validationError={'Invalid email'}
                    hintText = "Email"
                    floatingLabelText = "Email*"
                  />
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    required
                    name = 'username'
                    validations={{matchRegexp: /.+/}}
                    validationError="At least one character please"
                    hintText = "Username (will be lowercased)"
                    floatingLabelText = "Username*"
                  />
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    required
                    name = 'firstName'
                    hintText = "First Name"
                    floatingLabelText = "First Name*"
                  />
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    required
                    name = 'lastName'
                    hintText = "Last Name"
                    floatingLabelText = "Last Name*"
                  />
                </div>

                <MyRadioGroup name="scienceType" pairs={[
                    { value: 'lifesci', label: 'Life Science' },
                    { value: 'compsci', label: 'Computer Science' },
                    { value: 'bioinformatics', label: 'Bioinformatics' },
                    { value: 'other', label: 'Other' }
                  ]}
                />

                <div className="fullWidth">
                  <PureTextInput
                    required
                    name = 'education'
                    hintText = "e.g. subject POST"
                    floatingLabelText = "Educational Background*"
                  />
                </div>

                <div className="fullWidth">
                  <PureSelect
                    required
                    name='school'
                    floatingLabelText="School*"
                    items={[
                      { value: 'uoft', text: "University of Toronto" },
                      { value: 'queens', text: "Queen's University" },
                      { value: 'waterloo', text: "University of Waterloo" },
                      { value: 'mcmaster', text: "McMaster University" },
                      { value: 'ryerson', text: "Ryerson University" },
                      { value: 'york', text: "York University" },
                      { value: 'ottowa', text: "University of Ottawa" },
                      { value: 'notInSchool', text: "Not in School" },
                      { value: 'other', text: "Other" }
                    ]}
                  />
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    name = 'customSchool'
                    hintText = 'Other School if not in list'
                    floatingLabelText = 'Other School'
                  />
                </div>

                <div className="fullWidth">
                  <PureSelect
                    required
                    name='year'
                    floatingLabelText="Year of Study*"
                    items={[
                      { value: '1', text: "1" },
                      { value: '2', text: "2" },
                      { value: '3', text: "3" },
                      { value: '4', text: "4" },
                      { value: '5', text: "5" },
                      { value: '5+', text: "5+" },
                      { value: 'na', text: "n/a" }
                    ]}
                  />
                </div>

                <p>
                  How did you hear about the event?
                </p>
                <MyRadioGroup type="checkbox" name="hearFrom" pairs={[
                  { value: 'hearFacebook', label: 'Facebook' },
                  { value: 'hearMailingList', label: 'Mailing List' },
                  { value: 'hearWordOfMouth', label: 'Word of Mouth' },
                  { value: 'hearOther', label: 'Other' }
                ]} />

                <div className="fullWidth">
                  <FormsySelect
                    required
                    name='codingBackground'
                    floatingLabelText="Programming Experience*">
                    <MenuItem value={'none'} primaryText="None" />
                    <MenuItem value={'little'} primaryText="A little" />
                    <MenuItem value={'moderate'} primaryText="Moderate" />
                    <MenuItem value={'good'} primaryText="Good" />
                    <MenuItem value={'proficient'} primaryText="Proficient" />
                    <MenuItem value={'vim'} primaryText="Vim" />
                  </FormsySelect>
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    name = 'github'
                    hintText = "Just your username."
                    floatingLabelText = "GitHub"
                  />
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    name = 'likeToSee'
                    hintText = "Anything you would like to see?"
                    floatingLabelText = "Anything you would like to see?"
                    multiLine={true}
                  />
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    name = 'questions'
                    hintText = "Any questions?"
                    floatingLabelText = "Any questions?"
                    multiLine={true}
                  />
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    name = 'about'
                    hintText = "Just a few lines."
                    floatingLabelText = "Tell us about yourself"
                    multiLine={true}
                  />
                </div>

                <MyRadioGroup name="mentor" pairs={[
                  { value: 'mentor', label: 'Would you like to be a mentor?' },
                  { value: 'autogroup', label: 'Would you like to be auto-assigned to a group?' },
                ]} />

                <div className="fullWidth">
                  <PureTextInput
                    required
                    name = 'password'
                    type = 'password'
                    validations={{matchRegexp: /.{7}.+/}}
                    validationError="At least eight characters please"
                    hintText = "What is your password?"
                    floatingLabelText = "Password*"
                  />
                </div>

                <div className="fullWidth">
                  <PureTextInput
                    required
                    name = 'confirmpassword'
                    type = 'password'
                    validations="equalsField:password"
                    validationError="Does not match"
                    hintText = "Confirm Password"
                    floatingLabelText = "Confirm Password*"
                  />
                </div>

                <div className="recaptcha-wrapper">
                  <Recaptcha
                    sitekey="6LfJfxYTAAAAAKVuS3AmFJMbY1ls2sWkwS6G5eCx"
                    verifyCallback={this.verifyCaptcha}
                  />
                </div>

                <div className="fullWidth">
                  <RaisedButton
                    type = "submit"
                    label = "Submit"
                    disabled = {!submission.canSubmit}
                  />
                </div>
              </Formsy.Form>
            </Col>
          </Row>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })
export default mount(connect(mapStateToProps)(Register), { snacker, submission })
