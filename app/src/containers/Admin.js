// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ajaxGet } from '../util'


export default class Admin extends Component {
  constructor(){
    super()
    this.state = {
      tableLoaded: false
    }
  }
  componentWillMount = () => {
    ajaxGet('/user/all', this.props.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        console.log(data)
        this.setState({
          tableLoaded: true
        })
      }
    })
  };

  render() {
    return(
      <div className="adminPage">
      <p>Hello iGem Admin</p>

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
