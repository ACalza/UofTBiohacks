// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ajaxGet } from '../util'
import {Table} from 'reactable'
import RaisedButton from 'material-ui/lib/raised-button'
import $ from 'jquery'

import { BASE_URI } from '../constants/uris.js'


export default class Admin extends Component {
  constructor(){
    super()
    this.state = {
      users: []
    }
  }
  componentWillMount = () => {
    ajaxGet('/user/all', this.props.jwt, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        this.setState({
          users: data
        })
      }
    })
  };
  exportAsCSV = () => {
    let jwt = this.props.jwt
    let url = BASE_URI + '/user/all/csv'
    $.ajax({
    type: "POST",
    url: url,
    data: {},
    beforeSend: function (request)
    {
       request.setRequestHeader('Authorization', 'Bearer ' + jwt);
    },
    success: function(response, status, request) {
        var disp = request.getResponseHeader('Content-Disposition');
        if (disp && disp.search('attachment') != -1) {
            var form = $('<form method="POST" action="' + url + '">');
            $.each(params, function(k, v) {
                form.append($('<input type="hidden" name="' + k +
                        '" value="' + v + '">'));
            });
            $('body').append(form);
            form.submit();
        }
    }
});

  };
  render() {
    if(!this.props.jwt){
      return <p> Loading </p>
    }
    return(
      <div className="adminPage">
        <h2>Hello iGem Admin</h2>
        <RaisedButton
          type = "Submit"
          label = "Export Users as CSV"
          onTouchTap = {this.exportAsCSV}
        />
        <hr></hr>
        <h2>List of all users</h2>
        <p>Features: Clicking on the column names sort the table</p>
        <Table className="Users"
          sortable={true}
          data={this.state.users} />
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
