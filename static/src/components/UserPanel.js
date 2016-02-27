import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RaisedButton} from 'material-ui/lib'

import FMUI, { FormsyText} from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'
import snacker from '../reducers/snacker.js'

import { ajaxGet } from '../util/ajax.js'

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

class UserPanel extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const { user } = this.props
    if(!user){
      return null
    }
    return (
      <div className="userPanel">
        <Card>
          <CardTitle title={user.email} subtitle={user.firstName + " " + user.lastName} />
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
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
      </div>
    )

    }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(UserPanel)
