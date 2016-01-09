'use strict'


// Require Local
const Group = require('../models/group');             // Group is a group Model
const User = require('../models/user');

const util = require('../util');


// GET : get all groups in the database in [{group1}, {group2}, ...]
module.exports.getAllGroups = function* (){
    try {
        let groups = yield Group.find({});
        if (!groups) {
            this.status = 404
            util.erorrResponse(this)
        } else {
            this.body.groups = groups
        }
    } catch(err) {
        console.error(err)
        this.status = 500
        util.errorResponse(this)
    }
}

// Middleware: query database to ensure nonmatching group name is provided
module.exports.validateGroupName = function* (next){
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

// POST: Create a new group given JSON {name: String} and save group into database
module.exports.saveGrouptoDatabase = function* (){
  let group = new Group({
    name: this.request.body.name,
    users: [this.userModel._id]           // JSON in post is stored in request.body
  })
  try {
    let groupModel = yield group.save()    // use try/catch + yield instead of if(error)/else in callbacks
    let userModel = yield User.findById(this.userModel._id)
    userModel.group = groupModel._id
    userModel = yield userModel.save()
    userModel.password = undefined;
    this.userModel = userModel
    this.body = {
      groupModel: groupModel,
      userModel: userModel
    }
  } catch (err) {
    this.response.status = 500
    console.error(err)
    util.errorResponse(this)
  }
}


// Middleware: query database by group id and attach to this.groupModel
module.exports.findGroupbyId = function* (id, next) {         //middleware for attaching matching group document to this.groupModel
    try {
      let groupModel = yield Group.findById(id);
      if (!groupModel) {
        this.status = 404                              // this is a koa context that encapsulates req and res
        util.errorResponse(this)
      } else {
        this.groupModel = groupModel
        yield next
      }
    } catch (err) {
      console.error(err)
      this.status = 500
      util.errorResponse(this)
    }
  }
  // POST sends in {usernameOrEmail: String},
// POST {emailOrUsername: value}
module.exports.inviteUsertoGroup = function* (){
      let emailOrUsername = this.request.body.emailOrUsername;
      try {
          let user = yield User.findOne({ $or: [{email:emailOrUsername}, {username: emailOrUsername}]})
          if(!user){
            return this.body ={
              message: "Invalid username or email"
            }
          }

          user.invites = [this.groupModel._id]
          let result = yield user.save()

          this.body = {
            message:'success'
          }

      } catch(err){
          console.error(err)
          this.status = 400
          util.errorResponse(this)
      }
  }
// POST sends in {userId: [Array of ids to invite]},
// query users, adds current group, and populate their invites array.
module.exports.inviteUserstoGroup = function* (){
    var userIdArray = this.request.body.userId;
    try {
        for (let i=0; i<userIdArray.length; i++) {      // update user.invites
           let user = yield User.update({_id: userIdArray[i]}, {$addToSet: {invites: this.groupModel._id}})
        }
    } catch(err){
        console.error(err);
        this.status = 400
        util.errorRespose(this)
    }
    this.body = 'success'

}

module.exports.acceptInvite = function* (){
    let userModel = this.userModel
    this.userModel.group = this.groupModel._id
    this.groupModel.users.push(userModel._id)
    try{
      userModel = yield userModel.save()
      groupModel = yield groupModel.save()
      this.body = {
        userModel: userModel,
        groupModel: groupModel,
        message: "successfully join " + groupModel.name
      }
    }catch(err){
      console.error(err)
      this.status = 400
      util.errorRespose(this)
    }
}
// populates the current group.users with the array of users
