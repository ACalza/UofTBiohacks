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
    ajaxPost(model, '/group/create', this.props.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        console.log("model ", model)
        console.log("data ", data)
        dispatch(createGroup(model))
      }
    })


  };

  render() {
    return(
      <Layout title="Create a Group">
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
      </Layout>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    jwt: state.logged.jwt
  }
}
export default connect(mapStateToProps)(Group)
