import React, { Component } from 'react'
import { connect } from 'react-redux'
import mount from '../mount.js'

import Recaptcha from 'react-recaptcha'
import FMUI, { FormsyText, FormsySelect, FormsyToggle, FormsyRadio, FormsyRadioGroup, FormsyCheckbox } from 'formsy-material-ui'
import { Snackbar, RaisedButton, MenuItem, Checkbox } from 'material-ui/lib'
import { Row, Col } from 'react-bootstrap'


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
                  <FormsyText style={{display: 'block'}}
                    required
                    name = 'email'
                    validations="isEmail"
                    validationError={'Invalid email'}
                    hintText = "Email"
                    floatingLabelText = "Email*"
                  />
                </div>

                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    required
                    name = 'username'
                    validations={{matchRegexp: /.+/}}
                    validationError="At least one character please"
                    hintText = "Username (will be lowercased)"
                    floatingLabelText = "Username*"
                  />
                </div>

                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    required
                    name = 'firstName'
                    hintText = "First Name"
                    floatingLabelText = "First Name*"
                  />
                </div>

                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    required
                    name = 'lastName'
                    hintText = "Last Name"
                    floatingLabelText = "Last Name*"
                  />
                </div>

                <input type="radio" name="scienceType" value="lifesci">Life Science</input><br></br>
                <input type="radio" name="scienceType" value="compsci">Computer Science</input><br></br>
                <input type="radio" name="scienceType" value="bioinformatics">Bioinformatics</input><br></br>
                <input type="radio" name="scienceType" value="other">Other</input>


                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    required
                    name = 'education'
                    hintText = "e.g. subject POST"
                    floatingLabelText = "Educational Background*"
                  />
                </div>

                <div className="fullWidth">
                  <FormsySelect
                    required
                    name='school'
                    floatingLabelText="School*"
                  >
                    <MenuItem value={'uoft'} primaryText="University of Toronto" />
                    <MenuItem value={'queens'} primaryText="Queen's University" />
                    <MenuItem value={'waterloo'} primaryText="University of Waterloo" />
                    <MenuItem value={'mcmaster'} primaryText="McMaster University" />
                    <MenuItem value={'ryerson'} primaryText="Ryerson University" />
                    <MenuItem value={'york'} primaryText="York University" />
                    <MenuItem value={'ottowa'} primaryText="University of Ottawa" />
                    <MenuItem value={'notInSchool'} primaryText="Not in School" />
                    <MenuItem value={'other'} primaryText="Other" />
                  </FormsySelect>
                </div>

                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    name = 'customSchool'
                    hintText = 'Other School if not in list'
                    floatingLabelText = 'Other School'
                  />
                </div>

                <div className="fullWidth">
                  <FormsySelect
                    required
                    name='year'
                    floatingLabelText="Year of Study*">
                    <MenuItem value={'1'} primaryText="1" />
                    <MenuItem value={'2'} primaryText="2" />
                    <MenuItem value={'3'} primaryText="3" />
                    <MenuItem value={'4'} primaryText="4" />
                    <MenuItem value={'5'} primaryText="5" />
                    <MenuItem value={'5+'} primaryText="5+" />
                    <MenuItem value={'na'} primaryText="n/a" />
                  </FormsySelect>
                </div>

                <p>
                  How did you hear about the event?
                </p>
                <input type="checkbox" name="hearFrom" value="hearFacebook">Facebook</input><br></br>
                <input type="checkbox" name="hearFrom" value="hearMailingList">Mailing List</input><br></br>
                <input type="checkbox" name="hearFrom" value="hearWordOfMouth">Word of Mouth</input><br></br>
                <input type="checkbox" name="hearFrom" value="hearOther">Other</input><br></br>


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
                  <FormsyText style={{display: 'block'}}
                    name = 'github'
                    hintText = "Just your username."
                    floatingLabelText = "GitHub"
                  />
                </div>

                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    name = 'likeToSee'
                    hintText = "Anything you would like to see?"
                    floatingLabelText = "Anything you would like to see?"
                    multiLine={true}
                  />
                </div>

                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    name = 'questions'
                    hintText = "Any questions?"
                    floatingLabelText = "Any questions?"
                    multiLine={true}
                  />
                </div>

                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    name = 'about'
                    hintText = "Just a few lines."
                    floatingLabelText = "Tell us about yourself"
                    multiLine={true}
                  />
                </div>

                <input type="checkbox" name="mentor" value="mentor">Would you like to be a mentor?</input><br></br>
                <input type="checkbox" name="autogroup" value="autogroup">Would you like to be auto-assigned to a group?</input><br></br>

                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
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
                  <FormsyText style={{display: 'block'}}
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
