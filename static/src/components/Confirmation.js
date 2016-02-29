import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RaisedButton} from 'material-ui/lib'

import FMUI, { FormsyText} from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'
import snacker from '../reducers/snacker.js'

import { ajaxPost, ajaxGet } from '../util/ajax.js'

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

class UserPanel extends Component {

  constructor(props){
    super(props)
  }
  acceptInvitation = (e) => {
    const { user, dispatch } = this.props

    ajaxGet(user, '/user/biohackinvite/accept', sessionStorage.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        dispatch(openSnack(data.message))
      }
    })
  };

  render() {
    const { user } = this.props
    if(!user.isinvited)
      return null
    return (
      <div className="userConfirmation">
        <Card>
          <CardTitle title="You have been invited!" subtitle={user.email} />
          <CardText>
            <p>You must RSVP within 72 hours confirming if you are going. If you accepted the invitation and cannot make it, email igem@g.skul.ca.</p>
          </CardText>
          <CardActions>
            <RaisedButton label="Accept Invitation"
                          onMouseUp={this.acceptInvitation}
                          onTouchEnd = {this.acceptInvitation} />
            <RaisedButton label="Decline Invitation"
                          onMouseUp={this.declineInvitation}
                          onTouchEnd = {this.declineInvitation} />

          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(UserPanel)
