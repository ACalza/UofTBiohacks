'use strict'


// Require Local
const Group = require('../models/group');             // Group is a group Model
const User = require('../models/user');
const mongoose = require('mongoose');
const util = require('../util');


// GET /group/ : get all groups in the database in [{group1}, {group2}, ...]
module.exports.getAllGroups = function* (){
    try {
        var groups = yield Group.find({}).populate('users').exec()
        if (!groups) {
            this.status = 404
            util.erorrResponse(this)
        }
        this.body = {
            message: 'get all populated groups back',
            groups: groups
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
    userModel.group = groupModel._id       // user who created the group have user.group filled automatically
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


// /group/:group   query database by group id and attach to this.groupModel
module.exports.findGroupbyId = function* (id, next) {         //middleware for attaching matching group document to this.groupModel
    try {
      let groupModel = yield Group.findById(id).populate('users').exec();
      if (!groupModel) {
        this.status = 404                              // this is a koa context that encapsulates req and res
        util.errorResponse(this)
      } else {
        this.groupModel = groupModel
        yield next
      }
    } catch (err) {
      console.error(err)
      this.status = 404
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
// query users, adds current group, and populsate their invites array.
module.exports.validateUserInGroup = function* (next){
    console.log(this.groupModel.users)
    if (!this.groupModel.users){            // check  if groupModel has users in it
        console.error(err)
        this.status = 400
        util.errorResponse(this)
    } else if(this.groupModel.users.indexOf(this.userModel._id === -1)){ // only users in the group can invite others
        this.throw(403, 'Validation Error')
    }
    yield next
}
module.exports.inviteUserstoGroup = function* (){
    var userIdArray = this.request.body.userId;
    try {
        for (let i=0; i<userIdArray.length; i++) {      // update user.invites
           let user = yield User.update({_id: userIdArray[i]}, {$addToSet: {invites: this.groupModel._id}})
        }
        this.body = 'Successful invite'
    } catch(err){
        console.error(err);
        this.status = 400
        util.errorRespose(this)
    }

}

// GET /group/:group/accept
module.exports.acceptInvite = function* (){       // this.userModel is accessible for the entire session
    try{
        // assign current group to user.group
        let userResult = yield User.update({_id: this.userModel._id}, {$set: {group: this.groupModel._id}})
        // push current user to group.users
        let groupResult = yield Group.update({_id: this.groupModel._id}, {$addToSet: {users: this.userModel._id}})
        let user = yield User.findOne({_id: this.userModel._id}).populate('group invites').exec()    // get the curernt most update of userModel
        this.body = {
            userModel: user,
            message: this.userModel._id + " successfully accepted invitation from " + this.groupModel._id
        }
    }catch(err){
        console.error(err)
        this.status = 400
        util.errorRespose(this)
    }
}

// GET /group/:group/reject
module.exports.rejectInvite = function* (){
  try{
      console.log('user ' + this.userModel._id + ' reject invitation from group ' + this.groupModel._id)
      // remove current group from user.invites
      let userResult = yield User.update({_id: this.userModel._id}, {$pull: {invites: this.groupModel._id}})

      let user = yield User.findOne({_id: this.userModel._id}).populate('group invites').exec()    // get the curernt most update of userModel
      this.body = {
          userModel: user,
          message: this.userModel._id + "successfully rejected " + this.groupModel._id
      }
  }catch(err){
      console.error(err)
      this.status = 400
      util.errorRespose(this)
  }
}

// GET /group/:group/leave
module.exports.leaveGroup = function* (){
    try {
        // remove user.group field
        let userResult = yield User.update({_id: this.userModel._id}, {$unset: {group: ""}})
        // remove user from group.users array
        let groupResult = yield Group.update({_id: this.groupModel._id}, {$pull : {users:  this.userModel._id}})
        let user = yield User.findOne({_id: this.userModel._id}).populate('group invites').exec()    // get the curernt most update of userModel
        this.body = {
            userModel: user,
            message: 'user ' + this.userModel._id + ' left group ' + this.groupModel._id
        }
    } catch(err) {
        console.error(err)
        this.status = 400
        util.errorRespose(this)
    }

}

/*
module.exports.acceptInvite = function* (){
    //inefficent for now....
    let userModel = yield User.findById(this.userModel._id)
    let groupModel = this.groupModel
    userModel.group = this.groupModel._id
    groupModel.users.push(userModel._id)

    try{
      let index = userModel.invites.indexOf(this.groupModel._id.toString())
      if(index < 0){
        throw new Error("No invite to accept")
      }
      userModel.invites.splice(index)

      userModel = yield userModel.save()
      groupModel = yield groupModel.save()
      userModel.password = undefined
      this.body = {
        userModel: userModel,
        groupModel: groupModel,
        message: "successfully joined " + groupModel.name
      }
    }catch(err){
      console.error(err)
      this.status = 404
      util.errorResponse(this)
    }
}
*/
