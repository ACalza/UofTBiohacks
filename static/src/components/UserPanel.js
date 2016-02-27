import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RaisedButton} from 'material-ui/lib'

import FMUI, { FormsyText} from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'
import snacker from '../reducers/snacker.js'

import { ajaxPost } from '../util/ajax.js'

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
  acceptUser = (e) => {
    let { user } = this.props
    const { dispatch } = this.props

    ajaxPost(user, '/admin/acceptuser', sessionStorage.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        dispatch(openSnack(data.message))
      }
    })
    user.isinvited = "true"
  };

  render() {
    const { user } = this.props
    if(!user){
      return null
    }
    let button = null

    if (user.isinvited === "false")
      button = <RaisedButton label="Accept User" onMouseUp={this.acceptUser}/>

    return (
      <div className="userPanel">
        <Card>
          <CardTitle title={user.firstName + " " + user.lastName} subtitle={user.email} />
          <CardText>
            <b>About: </b>{user.about} <br></br>
            <b>school: </b>{user.school} <br></br>
            <b>education: </b>{user.education} <br></br>
            <b>Science Type: </b>{user.scienceType} <br></br>
            <b>Year: </b>{user.year} <br></br>
            <b>Coding profficiency: </b>{user.codingBackground || "Not available"}<br></br>
            <b>github: </b>{user.github}<br></br>
          </CardText>
          <CardActions>
            {button}
          </CardActions>
        </Card>
      </div>
    )

    }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(UserPanel)
