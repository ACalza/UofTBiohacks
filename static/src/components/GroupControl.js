import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText } from 'formsy-material-ui'
import TextField from 'material-ui/lib/text-field'
import {Snackbar, RaisedButton} from 'material-ui/lib'

import { openSnack, eatSnack } from '../actions/snacker.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'
import ReactRedirect from "react-redirect"
import { BASE_URI } from '../constants/uris.js'

import { canSubmit, canNotSubmit, loadResponse} from '../actions/submission.js'

class GroupControl extends Component {


  submitNewGroup = (model) => {
    const {dispatch} = this.props
    dispatch(canNotSubmit())
    dispatch(loadResponse(BASE_URI + '/group/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + sessionStorage.jwt
      },
      body: JSON.stringify(model)
    }))
  };

  createGroupView = () => {
    const {dispatch, submission} = this.props
    return (
      <div className="createGroup">
        <h2>Create a Group</h2>
          <Formsy.Form
            onValidSubmit = {this.submitNewGroup}
            onValid = {() => dispatch(canSubmit())}
            onInvalid = {() => dispatch(canNotSubmit())}>

            <FormsyText style={{display: 'block'}}
              name = 'name'
              required hintText = "What is your group name?"
              floatingLabelText = "Group Name"
            />
            <RaisedButton
              type = "submit"
              label = "Submit"
              disabled = {!submission.canSubmit}
            />
          </Formsy.Form>
        </div>
      )
  };

  render() {
    const {dispatch, snacker, isInGroup, hasInvites, groupModel, canInvite} = this.props
    let content = <h2>This is the control panel for group</h2>
    if(!isInGroup)
      content = (this.createGroupView())
    else {
      content = <p>Nothing interesting</p>
    }
    return (
      <div className="groupControl">
        {content}
      </div>
    )
  }
}

const mapStateToProps = ({ snacker, submission }) => ({ snacker, submission })
export default connect(mapStateToProps)(GroupControl)
