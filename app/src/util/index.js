import $ from 'jquery'

import { BASE_URI } from '../constants/uris.js'

export const ajaxPost = (body, uri, jwt, cb) => {
  $.ajax({
    type: 'POST',
    url: BASE_URI + uri,
    data: body,
    beforeSend: function (request)
     {
       if(jwt){
         request.setRequestHeader('Authorization', 'Bearer ' + jwt);
       }
     },
    success: function (data) {
      cb(null, data)
    },
    error: function (xhr, status, err) {
      cb(err, { xhr, status })
    }
  })
}
export const ajaxGet = (uri, jwt, cb) => {
  $.ajax({
    type: 'GET',
    url: BASE_URI + uri,
    beforeSend: function (request)
     {
       if(jwt){
         request.setRequestHeader('Authorization', 'Bearer ' + jwt);
       }
     },
    success: function (data) {
      cb(null, data)
    },
    error: function (xhr, status, err) {
      cb(err, { xhr, status })
    }
  })
}




export const ajaxPostAsync = (body, uri) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: BASE_URI + uri,
      data: body,
      success: function (data) {
        resolve(data)
      },
      error: function (xhr, status, err) {
        reject(err)
      }
    })
  })
}
