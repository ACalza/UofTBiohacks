// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import FMUI, { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'

import Layout from '../components/Layout'

// Actions
import { createGroup } from '../actions/logged'

// Utilites
import { ajaxPost } from '../util'

export default class Group extends Component {
  constructor(){
    super()
    this.state = { canSubmit: false }
  }
  enableButton = () => {
    this.setState({ canSubmit: true })
  };

  disableButton = () => {
    this.setState({ canSubmit: false })
  };


  submitForm = (model) => {
    const { dispatch } = this.props
    let uri;
    if(this.props.groupModel){
      model = {
        emailOrUsername: model.name
      }
      uri = '/group/'+ this.props.groupModel._id + '/invite'
    }else{
      uri = '/group/create'
    }
    ajaxPost(model, uri, this.props.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        dispatch(createGroup(data))
      }
    })
  };

  inviteHandler = (modelid) => {
    if(!modelid){
      return
    }
    console.log("herererere")
    alert(modelid)
    console.log(this.props.groupModel)

  };
//  {this.props.userModel.invites.map((model, i) => <div key={i}>{model.name}</div>)}
  render() {
    if(!this.props.jwt){
      return (
        <p>Loading</p>
      )
    }
    let content
    if(!this.props.groupModel) {
      content =
      <div className="accountPage">
        {this.props.userModel.invites.map((model, i) =>
          <div key={i}>{model.name}
            <RaisedButton
              type = "Submit"
              label = "Accept"
              onTouchTap = {() => {
                this.inviteHandler(model._id)
              }}
            />
          </div>
        )}
        <h2>Create a Group</h2>
        <Formsy.Form
          onValid = {this.enableButton}
          onInvalid = {this.disableButton}
          onValidSubmit = {this.submitForm}>

          <FormsyText style={{display: 'block'}}
            name = 'name'
            required hintText = "What is your group name?"
            floatingLabelText = "Group Name"
          />

          <RaisedButton
            type = "submit"
            label = "Submit"
            disabled = {!this.state.canSubmit}
          />
        </Formsy.Form>
    </div>
  }else{
      content =
      <div className="accountPage">
        <h2>Invite a user to {this.props.groupModel.name}!</h2>
        <Formsy.Form
          onValid = {this.enableButton}
          onInvalid = {this.disableButton}
          onValidSubmit = {this.submitForm}>

          <FormsyText style={{display: 'block'}}
            name = 'name'
            required hintText = "Type username"
            floatingLabelText = "Invite a user to your group"
          />

          <RaisedButton
            type = "submit"
            label = "Submit"
            disabled = {!this.state.canSubmit}
          />
        </Formsy.Form>
      </div>
    }

    return(
      content
    )
  }
}
let mapStateToProps = (state) => {
  return {
    jwt: state.logged.jwt,
    groupModel: state.logged.groupModel,
    userModel: state.logged.userModel
  }
}
export default connect(mapStateToProps)(Group)
