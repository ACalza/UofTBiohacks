import React, { Component } from 'react'
import { connect } from 'react-redux'

import PureTextInput from './PureTextInput.js'
import {RaisedButton} from 'material-ui/lib'

import FMUI, { FormsyText} from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'
import snacker from '../reducers/snacker.js'


import { ajaxGet } from '../util/ajax.js'

class AdminComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: null
    }
  }
  componentWillMount(){
    const { dispatch } = this.props
    ajaxGet('/admin/all', sessionStorage.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        if (data){
          this.setState({data: data})
          console.log(data)
        }else{
          dispatch(openSnack("Your IP has been logged"))
        }
      }
    })

  }
  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <h2>Welcome Administrator</h2>


      </div>
    )

  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(AdminComponent)
