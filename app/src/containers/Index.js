// Libraries
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect,  } from 'react-redux'

// Components
import Snackbar from 'material-ui/lib/snackbar'

// Actions
import * as LoggedActions from '../actions/logged'

class Index extends Component{
  render(){
    const { eatSnack } = this.props.actions

    return(
      <div className="appWrapper">
        {this.props.children}
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          action="close"
          autoHideDuration={10000}
          onActionTouchTap={eatSnack}
          onRequestClose={eatSnack}
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(LoggedActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
