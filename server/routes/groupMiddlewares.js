'use strict'


// Require Local
const Group = require('../models/group');             // Group is a group Model
const User = require('../models/user');
const mongoose = require('mongoose');
const util = require('../util');


// GET /group/all : get all groups in the database in [{group1}, {group2}, ...]
module.exports.getAllGroups = function* (){
    try {
        var groups = yield Group.find({}).populate('users').exec()
        if (!groups) {
            this.status = 404
            util.erorrResponse(this)
        } else {
            this.body = {
                message: 'get all populated groups back',
                groups: groups
            }
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
    this.body = 'Successful invite'

}


// GET /group/:group/accept
module.exports.acceptInvite = function* (){       // this.userModel is accessible for the entire session
    try{                                          // update user.group and group.users
        let userResult = yield User.update({_id: this.userModel._id}, {$set: {group: this.groupModel._id}})
        let groupResult = yield Group.update({_id: this.groupModel._id}, {$addToSet: {users: this.userModel._id}})
        let user = yield User.findOne({_id: this.userModel._id}).populate('group invites').exec()    // get the curernt most update of userModel
        console.log(user)
        this.body = {
            userModel: user,
            message: "Successful accept: returns populated userModel"
        }
    }catch(err){
        console.error(err)
        this.status = 400
        util.errorRespose(this)
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
