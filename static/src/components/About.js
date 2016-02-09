import React, { Component } from 'react'
import { connect } from 'react-redux'

import PureTextInput from './PureTextInput.js'
import {RaisedButton} from 'material-ui/lib'

import FMUI, { FormsyText} from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'
import snacker from '../reducers/snacker.js'

class About extends Component {
  constructor(props){
    super(props)
    this.state = {
      disabled: true
    }
  }
  handleEdit = () => {
    console.log("here edit")
  };
  render() {
    const { userModel } = this.props
    return(
      <Formsy.Form
        onValidSubmit = {this.submitForm}
      >

        <div className="fullWidth">
          <PureTextInput
            name = 'about'
            required
            hintText = "A paragraph or two"
            floatingLabelText = "Update about yourself"
            multiLine={true}
            disabled={this.state.disabled}
            value={userModel.about || ""}
          />
          <a href="#edit" onClick={()=> this.handleEdit()}>Edit</a>
          <a name="edit"></a>
          <p>You are welcome to update your 'about' so we can get to know you a bit more</p>
        </div>
      </Formsy.Form>

    )

  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(About)
