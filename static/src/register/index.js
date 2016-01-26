import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText, FormsySelect, FormsyToggle, FormsyRadio, FormsyRadioGroup } from 'formsy-material-ui'
import { Snackbar, RaisedButton, MenuItem } from 'material-ui/lib'

import mount from '../mount.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'

import { canSubmit, submitForm, canNotSubmit, loadResponse } from '../actions/submission.js'


class Register extends Component {
  constructor() {
    super()

    this.state = {
      customSchool: false
    }
  }

  submitForm = (model) => {
    console.log(model)
  };

  onChange = (model) => {
    if (model.school === 'other') {
      this.setState({
        customSchool: true
      })
    } else {
      this.setState({
        customSchool: false
      })
    }
  };

  render() {
    const { submission, dispatch } = this.props

    return(
      <div>
        <h2>Register</h2>
        <Formsy.Form
          onValidSubmit = {this.submitForm}
          onValid = {() => dispatch(canSubmit())}
          onInvalid = {() => dispatch(canNotSubmit())}
          onChange = {this.onChange}
        >
          <FormsyText style={{display: 'block'}}
            required
            name = 'firstName'
            hintText = "First Name?"
            floatingLabelText = "First Name"
          />

          <FormsySelect
            required
            name='school'
            floatingLabelText="School">
            <MenuItem value={'uoft'} primaryText="University of Toronto" />
            <MenuItem value={'queens'} primaryText="University of Queens" />
            <MenuItem value={'other'} primaryText="Other" />
          </FormsySelect>

          <FormsyText style={{display: 'block'}}
            required
            name = 'customSchool'
            hintText = "Other School"
            floatingLabelText = "Other School"
            disabled={!this.state.customSchool}
          />

          <FormsyText style={{display: 'block'}}
            required
            name = 'why'
            hintText = "Why?"
            floatingLabelText = "Why"
            multiLine={true}
          />

          <FormsyToggle
            name='autogroup'
            label="Auto group?"
          />

          I consider myself a
          <FormsyRadioGroup name="type">
            <FormsyRadio
              value="lifesci"
              label="Life Scientist"
            />
            <FormsyRadio
              value="compsci"
              label="Computer Scientist"
            />
            <FormsyRadio
              value="other"
              label="Other"
            />
          </FormsyRadioGroup>

          <RaisedButton
            type = "submit"
            label = "Submit"
            disabled = {!submission.canSubmit}
          />
        </Formsy.Form>
      </div>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })
export default mount(connect(mapStateToProps)(Register), { snacker, submission })
