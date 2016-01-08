import React, { Component } from 'react'
import Snackbar from 'material-ui/lib/snackbar'
import { connect } from 'react-redux'

class Index extends Component{
  constructor(){
    super()
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  handleRequestClose() {
    this.setState({
      open: false
    })
  }
  render(){
    return(
      <div className="appWrapper">
        {this.props.children}
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          action="Close"
          autoHideDuration= {3000}
          onActionTouchTap={this.handleRequestClose}
          onRequestClose={this.handleRequestClose}
        />
      </div>


    )
  }

}
const mapStateToProps = (state) => {
  return {
    open: state.logged.snackbar.open,
    message: state.logged.snackbar.message
  }
}
export default connect(mapStateToProps)(Index)
