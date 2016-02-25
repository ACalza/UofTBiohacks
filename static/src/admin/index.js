import React, { Component } from 'react'
import { connect } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import FMUI, { FormsyText } from 'formsy-material-ui'
import {RaisedButton } from 'material-ui/lib'
import TextField from 'material-ui/lib/text-field'

import mount from '../mount.js'

import { ajaxPost } from '../util/ajax.js'

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

import snacker from '../reducers/snacker.js'
import submission from '../reducers/submission.js'


import { canSubmit, submitForm, canNotSubmit, loadResponse } from '../actions/submission.js'
import { Row, Col } from 'react-bootstrap'

import Layout from '../components/Layout'

import { BASE_URI } from '../constants/uris.js'

class Admin extends Component {

  submitForm = (model) => {
    const {dispatch, submission} = this.props

    console.log(model)
    // dispatch(loadResponse(BASE_URI + '/admin/login', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(model)
    // }))

  };

  render() {

    return(
      <Layout>
        <div className="container">
          <Row>
            <Col className="WideForm" xs={12} md={6} mdOffset={3}>
              <br></br>
              <h2>Admin Page</h2>
              <p>IPs are logged, and if you are here to brute force, we will find you and we will kill you - Liam Neesan</p>
              <Formsy.Form
                onValidSubmit = {this.submitForm}
              >
                <div className="fullWidth">
                  <FormsyText style={{display: 'block'}}
                    name = 'password'
                    type = 'password'
                    required hintText = "What is your password?"
                    floatingLabelText = "Password"
                  />
                </div>

                <div className="fullWidth">
                  <RaisedButton
                    type = "submit"
                    label = "Submit"
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

export default mount(connect(mapStateToProps)(Admin), { snacker, submission })
