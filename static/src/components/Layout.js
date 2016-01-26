import React, { Component } from 'react'
import { connect } from 'react-redux'

import snacker from '../reducers/snacker.js'

import { Snackbar } from 'material-ui/lib'
import { openSnack, eatSnack } from '../actions/snacker.js'

class Layout extends Component {
  render() {
    const {dispatch, snacker} = this.props

    let outerStyles = {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }
    let innerStyles = {
      flex: '1',
      paddingBottom: '30px',
      background: '#eee'
    }
    return (
      <div style={outerStyles}>
          <div className="content" style={innerStyles}>
            {this.props.children}
            <Snackbar
              open={snacker.open}
              message={snacker.message}
              action="close"
              autoHideDuration={3000}
              onActionTouchTap={() => dispatch(eatSnack())}
              onRequestClose={() => dispatch(eatSnack())}
            />
          </div>
      </div>
    )
  }
}

const mapStateToProps = ({ snacker }) => ({ snacker })
export default connect(mapStateToProps)(Layout)
