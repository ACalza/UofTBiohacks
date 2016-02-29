import React, { Component } from 'react'
import { connect } from 'react-redux'

import PureTextInput from './PureTextInput.js'
import {RaisedButton} from 'material-ui/lib'

import FMUI, { FormsyText} from 'formsy-material-ui'
import { Row, Col } from 'react-bootstrap'

import { openSnack, eatSnack } from '../actions/snacker.js'
import snacker from '../reducers/snacker.js'

import { ajaxGet } from '../util/ajax.js'
import DataGrid from 'react-datagrid'
import UserPanel from './UserPanel.js'

require('react-datagrid/index.css')



class AdminComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: null,
      selectedID: null,
      selectedUser: null
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

  selectedUser = (newSelectedId, data) => {
    this.setState({
      selectedID: newSelectedId,
      selectedUser: data
    })
  };

  render() {
    if(!this.state.data){
      return <p>Loading</p>
    } else {
      let data = this.state.data
      for(let i = 0; i < data.length; i++){
        data[i].id = data[i].email
        if(!data[i].isinvited)
          data[i].isinvited = data[i].isinvited ? 'true' : 'false'
        if(!data[i].doesAcceptInvite)
          data[i].doesAcceptInvite = data[i].doesAcceptInvite ? 'true' : 'false'

      }

      let columns = [
        { name: 'email', },
        { name: 'firstName'},
        { name: 'lastName'},
        { name: 'isinvited'},
        { name: 'doesAcceptInvite'}
      ]
      return (

        <div>
          <br></br>
          <br></br>
          <br></br>
          <h2>Welcome Administrator</h2>
          <UserPanel user={this.state.selectedUser} />
          <DataGrid idProperty="id"
                    dataSource={data}
                    columns={columns}
                    selected={this.state.selectedID}
                    onSelectionChange={this.selectedUser}
                    />

        </div>
      )

    }
  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(AdminComponent)
