"use strict"
// Require internally
const Group = require('../models/group');

function* validateGroupName(next){
  let group = yield Group.findOne({
    name: this.request.body.name
  })
  if (group) {
    this.body = {
      message: "Group name already exists"
    }
  } else if (!this.request.body.name) {
    this.body = {
      message: "No group name given"
    }
  } else {
    yield next
  }
}

module.exports = validateGroupName;
