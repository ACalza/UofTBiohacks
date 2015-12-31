"use strict"
// Require internally
const Group = require('../models/group');
const util = require('../util');

function* saveGrouptoDatabase(){
  let group = new Group({
    name: this.request.body.name           // JSON in post is stored in request.body
  })
  try {
    var groupModel = yield group.save()    // use try/catch + yield instead of if(error)/else in callbacks
    this.body = groupModel
  } catch (err) {
    this.response.status = 500
    console.error(err)
    util.errorResponse(this)
  }
}

module.exports = saveGrouptoDatabase;
