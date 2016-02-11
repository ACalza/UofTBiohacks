import React, { Component } from 'react'
import { connect } from 'react-redux'

import PureTextInput from './PureTextInput.js'
import {RaisedButton} from 'material-ui/lib'

import FMUI, { FormsyText} from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'
import snacker from '../reducers/snacker.js'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { ajaxPost } from '../util/ajax.js'

class About extends Component {
  constructor(props){
    super(props)
    this.state = {
      disabled: true,
      canSubmit: false,
      display: 'none',
      editDisplay: 'block'
    }
  }
  handleEdit = () => {
    this.setState({
      disabled:false,
      display: 'block',
      editDisplay: 'none'
    })
  };

  componentDidMount() {
    injectTapEventPlugin()
  }

  submitForm = (model) => {
    const {dispatch} = this.props
    ajaxPost(model, '/user/update/about', sessionStorage.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        if(data.success){
          dispatch(openSnack(data.message))
          this.setState({
            disabled: true,
            canSubmit: false,
            display: 'none',
            editDisplay: 'block'
          })
        }else{
          dispatch(openSnack(data.message))
        }
      }
    })

  };
  handleCancel = () => {
    this.setState({
      disabled: true,
      display: 'none',
      editDisplay: 'block'
    })
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
            floatingLabelText = "Update your Bio"
            multiLine={true}
            disabled={this.state.disabled}
            value={userModel.about || ""}
          />

          <a href="#edit" style={{display: this.state.editDisplay}} onClick={() => this.handleEdit()}>Edit</a>
        </div>
        <a name="edit"></a>
        <Row>
          <Col className="WideForm" xs={12} md={6}>
            <RaisedButton
              style={{display: this.state.display}}
              type = "submit"
              label = "Submit"
              disabled = {this.state.disabled}
            />
          </Col> 
          <Col className="WideForm" xs={12} md={6}>
            <RaisedButton
              style={{display: this.state.display}}
              type = "cancel"
              label = "cancel"
              onMouseUp = {() => this.handleCancel()}
              onTouchEnd = {() => this.handleCancel()}  
              // onTouchStart = {() => this.handleCancel()} 
              disabled = {this.state.disabled}
            />
          </Col>
        </Row>
        <p>You are welcome to update your bio so we can get to know more about you</p>

      </Formsy.Form>

    )

  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(About)
