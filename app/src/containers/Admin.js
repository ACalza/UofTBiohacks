// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ajaxGet } from '../util'
import {Table} from 'reactable'

export default class Admin extends Component {
  constructor(){
    super()
    this.state = {
      tableLoaded: false,
      users: []
    }
  }
  componentWillMount = () => {
    ajaxGet('/user/all', this.props.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        console.log(data)

        this.setState({
          tableLoaded: true,
          users: data
        })
      }
    })
  };

  render() {
    if(!this.props.jwt){
      return <p> Loading </p>
    }
    return(
      <div className="adminPage">
        <h2>Hello iGem Admin</h2>
        <Table className="Users" data={this.state.users} />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    jwt: state.logged.jwt
  }
}
export default connect(mapStateToProps)(Admin)
