import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText } from 'formsy-material-ui'
import TextField from 'material-ui/lib/text-field'
import {Snackbar, RaisedButton} from 'material-ui/lib'

import account from '../reducers/account.js'
import { authorize } from '../actions/account.js'

import { openSnack, eatSnack } from '../actions/snacker.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'
import ReactRedirect from "react-redirect"
import { BASE_URI } from '../constants/uris.js'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn} from 'material-ui/lib/table';
import { canSubmit, canNotSubmit, loadResponse} from '../actions/submission.js'

class GroupControl extends Component {


  submitNewGroup = (model) => {
    const {dispatch} = this.props
    dispatch(canNotSubmit())
    dispatch(authorize(BASE_URI + '/group/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + sessionStorage.jwt
      },
      body: JSON.stringify(model)
    }))
  };
  inviteUser = (model) => {
    const {dispatch, groupModel} = this.props
    dispatch(canNotSubmit())
    dispatch(authorize(BASE_URI + '/group/' + groupModel._id + '/invite', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + sessionStorage.jwt
      },
      body: JSON.stringify(model)
    }))

  };
  acceptInviteHandler = (modelid) => {
    const {dispatch} = this.props
    dispatch(canNotSubmit())
    dispatch(authorize(BASE_URI + '/group/' + modelid + '/accept', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + sessionStorage.jwt
      }
    }))
  };

  leaveGroupHandler = () => {
    const {dispatch, groupModel} = this.props
    dispatch(canNotSubmit())
    dispatch(authorize(BASE_URI + '/group/' + groupModel._id + '/leave', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + sessionStorage.jwt
      }
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

  inviteToGroupView = () => {
    const {groupModel, submission, dispatch} = this.props

    return (
      <div className="groupInvite">
        <h2>Invite a user to {groupModel.name}!</h2>
        <Formsy.Form
          onValid = {() => dispatch(canSubmit())}
          onInvalid = {() => dispatch(canNotSubmit())}
          onValidSubmit = {this.inviteUser}>

          <FormsyText style={{display: 'block'}}
            name = 'emailOrUsername'
            required hintText = "Username or Email"
            floatingLabelText = "Invite a user to your group"
          />

          <RaisedButton
            type = "submit"
            label = "Submit"
            disabled = {!submission.canSubmit}
          />
          <table className="table table-bordered">
          <thead>
            <tr>
            <th>Full name</th>
            <th>Username</th>
            <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {groupModel.users.map((user, i) =>
              <TableRow>
                <td key={user.name}>{user.name}</td>
                <td key={user.username}>{user.username}</td>
                <td key={user.email}>{user.email}</td>
              </TableRow>
              )
            }
          </tbody>
        </table>
          <RaisedButton
            type = "submit"
            label = "Leave Group"
            onTouchTap = {this.leaveGroupHandler}
          />
        </Formsy.Form>
      </div>
    )

};

  render() {
    const {dispatch, snacker, isInGroup, hasInvites, groupModel, userModel, account} = this.props
    let content = null
    console.log(this.props)
    if(!isInGroup && !account.authorizing){
      if(!hasInvites){
        content =
          <div className="invites">
            <h2>Pending Invites</h2>
            <p>You currently have no invites!</p>
            {this.createGroupView()}
          </div>
      }else {
        content =
          <div className="invites">
          <h2>Pending Invites</h2>
            {userModel.invites.map((model, i) =>
              <div key={i/2.0}>{model.name}
                <RaisedButton
                  key={i}
                  type = "Submit"
                  label = "Accept"
                  onTouchTap = {() => {
                    this.acceptInviteHandler(model._id)
                  }}
                />
              </div>
          )}
          {this.createGroupView()}
          </div>
      }

    }else if(isInGroup && !account.authorizing){ // => can invite
      content = (this.inviteToGroupView())
    }else{
      content = <p>Loading</p>
    }
    return (
      <div className="groupControl">
        {content}
      </div>
    )
  }
}

const mapStateToProps = ({ snacker, submission, account }) => ({ snacker, submission, account })
export default connect(mapStateToProps)(GroupControl)
