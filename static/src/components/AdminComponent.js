import React, { Component } from 'react'
import { connect } from 'react-redux'

import PureTextInput from './PureTextInput.js'
import {RaisedButton} from 'material-ui/lib'

import FMUI, { FormsyText} from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'
import snacker from '../reducers/snacker.js'

import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import { ajaxGet } from '../util/ajax.js'
import DataGrid from 'react-datagrid'

require('react-datagrid/index.css')

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
      console.log(err, data)
      if (err) {
        console.error(err)
      } else {
        if (data){
          this.setState({data: data.data})
        }else{
          dispatch(openSnack("Your IP has been logged"))
        }
      }
    })

  }

  selectedUser = (model) => {
    console.log(model)
    console.log("Here")
  };

  render() {

    var data = [
      { id: '1', firstName: 'John', lastName: 'Bobson'},
      { id: '2', firstName: 'Bob', lastName: 'Mclaren'}
    ]
    var columns = [
      { name: 'firstName',  width: 50},
      { name: 'lastName',  width: 50}
    ]


    if(!this.state.data){
      return <p>Loading</p>
    }
    return (

      <div>
        <br></br>
        <br></br>
        <br></br>
        <h2>Welcome Administrator</h2>

        <DataGrid idProperty="id" dataSource={data} columns={columns} />

      </div>
    )

  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(AdminComponent)
