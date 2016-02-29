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
    this.state = {
      disableButtons: false
    }
  }
  acceptInvitation = (e) => {
    const { dispatch } = this.props
    this.setState({
      disableButtons: true
    })
    ajaxGet('/user/biohackinvite/accept', sessionStorage.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        if(data.success) {
          dispatch(openSnack(data.message))
        } else {
          this.setState({
            disableButtons: false
          })
          dispatch(openSnack(data.message))
        }
      }
    })
  };

  declineInvitation = (e) => {
    const { dispatch } = this.props
    this.setState({
      disableButtons: true
    })
    ajaxGet('/user/biohackinvite/reject', sessionStorage.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        if(data.success){
          dispatch(openSnack(data.message))
          delete sessionStorage.jwt
          setTimeout(() => window.location.assign('/') , 5000)
        }else{
          dispatch(openSnack(data.message))
          this.setState({
            disableButtons: false
          })
        }

      }
    })
  }
  render() {
    const { user } = this.props
    let buttons = null
    if(!user.isinvited)
      return null
    if(!user.doesAcceptInvite)
        buttons = <div className="actionButtons">
                      <RaisedButton label="Accept Invitation"
                                    onMouseUp={this.acceptInvitation}
                                    onTouchEnd = {this.acceptInvitation}
                                    disable = {this.state.disableButtons}/>
                      <RaisedButton label="Decline Invitation"
                                    onMouseUp={this.declineInvitation}
                                    onTouchEnd = {this.declineInvitation}
                                    disable = {this.state.disableButtons}/>
                    </div>
    return (
      <div className="userConfirmation">
        <Card>
          <CardTitle title="You have been invited!" subtitle={user.email} />
          <CardText>
            <p>You must RSVP within 72 hours confirming if you are going. If you accepted the invitation and cannot make it, email igem@g.skul.ca.</p>
          </CardText>
          <CardActions>
            {buttons}
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(UserPanel)
