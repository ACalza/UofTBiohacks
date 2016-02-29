import React, { Component } from 'react'
import { connect } from 'react-redux'
import mount from '../mount.js'
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

import { openSnack } from '../actions/snacker'

import submission from '../reducers/submission.js'
import snacker from '../reducers/snacker.js'
import account from '../reducers/account.js'

import { authorize } from '../actions/account.js'
import Layout from '../components/Layout'

import GroupControl from '../components/GroupControl'
import About from '../components/About'
import Confirmation from '../components/Confirmation'
import { BASE_URI } from '../constants/uris.js'
import { Row, Col } from 'react-bootstrap'
import CircularProgress from 'material-ui/lib/circular-progress'

class Account extends Component {

  componentWillMount() {
    if (canUseDOM) {
      const { dispatch } = this.props
      dispatch(authorize(BASE_URI + '/user/auth', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + sessionStorage.jwt
        }
      }))
    }
  }

  render() {
    const { snacker, submission, account, dispatch } = this.props
    let content = null
    let confirmation = null
    if (canUseDOM) {
      if (account.authorized) {
        content =
        <div className="controlpanel">
          <h2>Hello, {account.userModel.firstName}</h2>
          <Confirmation user={account.userModel} />
          <GroupControl
            isInGroup={account.isInGroup}
            groupModel={account.groupModel}
            userModel = {account.userModel}
            hasInvites={account.hasInvites}
            canInvite = {account.canInvite}
          />
          <About userModel={account.userModel}/>
        </div>
      } else if (!account.authorizing && !account.authorized){
        window.location.assign("/login")
      }
    } else {
      content =
      <div style="{{display: 'block', textAlign: 'center'}}">
        <CircularProgress size={2} />
      </div>
    }


    return(
      <Layout push>
        <div className="container">
          <Row>
            <Col className="WideForm" xs={12} md={6} mdOffset={3}>
            {confirmation}
            {content}
            </Col>
        </Row>
      </div>
    </Layout>
    )
  }
}

const mapStateToProps = ({ snacker, submission, account }) => ({ snacker, submission, account })

export default mount(connect(mapStateToProps)(Account), { snacker, submission, account })
