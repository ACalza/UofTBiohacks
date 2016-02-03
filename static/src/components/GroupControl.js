import React, { Component } from 'react'
import { connect } from 'react-redux'

import FMUI, { FormsyText } from 'formsy-material-ui'
import TextField from 'material-ui/lib/text-field'
import {RaisedButton, List, ListItem } from 'material-ui/lib'

import account from '../reducers/account.js'
import { authorize } from '../actions/account.js'

import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'
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

  rejectInviteHandler = (modelid) => {
    const {dispatch} = this.props
    dispatch(canNotSubmit())
    dispatch(authorize(BASE_URI + '/group/' + modelid + '/reject', {
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

                <div className="fullWidth">
                  <FormsyText
                    name = 'name'
                    hintText = "What is your group name?"
                    floatingLabelText = "Group Name"
                  />
                </div>

                <RaisedButton style={{display: 'block'}}
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

          <div className="fullWidth">
            <FormsyText
              name = 'emailOrUsername'
               hintText = "Username or Email"
              floatingLabelText = "Invite a user to your group"
            />
          </div>

          <div className="fullWidth padBotTen">
            <RaisedButton
              type = "submit"
              label = "Submit"
              disabled = {!submission.canSubmit}
            />
          </div>

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
                  <td key={user.firstName}>{user.firstName + " " + user.lastName}</td>
                  <td key={user.username}>{user.username}</td>
                  <td key={user.email}>{user.email}</td>
                </TableRow>
              )

            }
            </tbody>
          </table>

          <div className="fullWidth padBotTen">
            <RaisedButton
              type = "submit"
              label = "Leave Group"
              onTouchTap = {this.leaveGroupHandler}
            />
          </div>

          {
            (()=> {
              if(groupModel.pendingInvites.length > 0){
                return (
                  <div className="pendingInvites">
                  <h2>Pending Invites</h2>

                    <List>
                      {groupModel.pendingInvites.map((user, i) =>
                        <ListItem key={i} primaryText={user.username} />
                      )}
                    </List>

                </div>
                )
              }
            })()
          }
        </Formsy.Form>
      </div>
    )
  };

  render() {
    const { dispatch, snacker, isInGroup, hasInvites, groupModel, userModel, account } = this.props
    let content = null
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
              <Row key={i}>
                <Col xs={4} md={6} style={{lineHeight: '36px'}}>
                  {model.name}
                </Col>
                <Col xs={4} md={3} style={{textAlign: 'center'}}>
                  <div className="fullWidth">
                    <RaisedButton
                      type = "Submit"
                      label = "Accept"
                      onTouchTap = {() => {
                        this.acceptInviteHandler(model._id)
                      }}
                    />
                  </div>
                </Col>
                <Col xs={4} md={3} style={{textAlign: 'center'}}>
                  <div className="fullWidth">
                    <RaisedButton
                      type = "Submit"
                      label = "Reject"
                      onTouchTap = {() => {
                        this.rejectInviteHandler(model._id)
                      }}
                    />
                  </div>
                </Col>
              </Row>
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
        <p style={{paddingTop: '10px'}}>You are welcome to create a group and invite your friends, or contact your friends to be invited into their group.</p>
      </div>
    )
  }
}

const mapStateToProps = ({ snacker, submission, account }) => ({ snacker, submission, account })
export default connect(mapStateToProps)(GroupControl)
