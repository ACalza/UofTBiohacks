import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Snackbar } from 'material-ui/lib'
import { openSnack, eatSnack } from '../actions/snacker.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'
import ReactRedirect from "react-redirect"

import { canSubmit, submitForm, canNotSubmit, loadResponse} from '../actions/submission.js'

class GroupControl extends Component {


  render() {
    const {dispatch, snacker} = this.props


    return (
      <div className="groupControl">
        <h2>This is the control panel</h2>
      </div>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })
export default connect(mapStateToProps)(GroupControl)
