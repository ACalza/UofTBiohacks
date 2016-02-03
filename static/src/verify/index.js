import React, { Component } from 'react'
import { connect } from 'react-redux'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import mount from '../mount.js'

import snacker from '../reducers/snacker.js'
import {Snackbar, RaisedButton} from 'material-ui/lib'

import CircularProgress from 'material-ui/lib/circular-progress';
import {openSnack} from '../actions/snacker'
import { canSubmit, submitForm, canNotSubmit, loadResponse} from '../actions/submission.js'
import Layout from '../components/Layout'
import {FRONT_END_URL} from '../../../shared/constants'
import { ajaxPost } from '../util/ajax.js'
import { Row, Col } from 'react-bootstrap'

class Verify extends Component {
  constructor(props){
    super(props)
    this.state = {
      valid: false,
      token: "",
      emailVerified: false,
      verifying: true
    }
  }

  componentWillMount(){
    if (canUseDOM) {
      const { dispatch } = this.props
      let params = location.search.split('?token=')

      if (params.length == 2) {
        let token = params[1]
        this.setState({
          token: token,
          valid: true
        })
        ajaxPost({token: token}, '/user/verify', null, (err, data) => {
          if (err) {
            console.error(err)
          } else {
            if(data.success){
              dispatch(openSnack(data.message))
              dispatch(canNotSubmit())
              this.setState({
                emailVerified: true,
                verifying: false
              })
            }else{
              dispatch(openSnack(data.message))
              this.setState({
                emailVerified: false,
                verifying: false
              })
            }
          }
        })
      }else{
        dispatch(openSnack("Invalid Token, redirecting in 5 seconds"))
      }
    }
  }

  render() {
    const { snacker, submission, dispatch } = this.props


    if (canUseDOM) {
      if (!this.state.valid) {
        setTimeout(() => window.location.assign("/") ,5000)
      } else if (this.state.emailVerified){
        setTimeout(() => window.location.assign("/login") , 5000)
      }
    }

    return(
      <Layout push>
        <div className="container">
          <Row>
              <Col className="WideForm" xs={12} md={6} mdOffset={3} style={{textAlign: 'center'}}>
                <h2>Email Verification</h2>
                <CircularProgress size={2} />
              </Col>
          </Row>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })

export default mount(connect(mapStateToProps)(Verify), { snacker })
