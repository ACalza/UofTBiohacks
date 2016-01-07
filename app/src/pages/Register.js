import React, { Component } from 'react'
import Layout from '../components/Layout'

import FMUI, { FormsyText, FormsyToggle } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'

export default class Register extends Component {
  render() {
    return (
      <Layout title="Register">
        <Formsy.Form>
          <FormsyText
            required
            name='name'
            validations='isWords'
            hintText="What is your name?"
            value="Bob"
            floatingLabelText="Name"
          />

          <RaisedButton> Register </RaisedButton>
      </Formsy.Form>
      </Layout>
    )
  }
}
