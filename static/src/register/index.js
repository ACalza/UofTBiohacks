import React, { Component } from 'react'
import { connect } from 'react-redux'
import mount from '../mount.js'

// Components
import Recaptcha from 'react-recaptcha'
import FMUI, { FormsyText, FormsySelect, FormsyToggle, FormsyRadio, FormsyRadioGroup, FormsyCheckbox } from 'formsy-material-ui'
import { Snackbar, RaisedButton, MenuItem, Checkbox } from 'material-ui/lib'
import { Row, Col } from 'react-bootstrap'
import Layout from '../components/Layout'
import MyRadioGroup from '../components/MyRadioGroup.js'
import PureTextInput from '../components/PureTextInput.js'
import PureRadioGroup from '../components/PureRadioGroup.js'
import PureSelect from '../components/PureSelect.js'
import PureCheckBox from '../components/PureCheckbox.js'

import CircularProgress from 'material-ui/lib/circular-progress';

// Reducers
import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'

// Actions
import { openSnack } from '../actions/snacker'
import { canSubmit, submitForm, canNotSubmit, loadResponse } from '../actions/submission.js'

// Util
import { ajaxPost } from '../util/ajax.js'

// Constants
import { BASE_URI } from '../constants/uris.js'

// Styles
import '../styles/Register.scss'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      customSchool: false,
      canSubmit: false,
      disabled: false
    }
  }


  render() {
    const { submission, dispatch } = this.props
    // if (canUseDOM)
    //   setTimeout(() => window.location.assign('/') ,5000)
    return(
      <Layout push>
        <div className="container">
          <Row>
              <Col className="WideForm" xs={12} md={6} mdOffset={3} style={{textAlign: 'center'}}>
                <h2>Registration</h2>
                <p>Closed!</p>
              </Col>
          </Row>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })
export default mount(connect(mapStateToProps)(Register), { snacker, submission })
