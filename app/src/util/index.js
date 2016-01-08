import $ from 'jquery'

import { BASE_URI } from '../constants/uris.js'

export const ajaxPost = (body, uri, jwt, cb) => {
  $.ajax({
    type: 'POST',
    url: BASE_URI + uri,
    data: body,
    beforeSend: function (request)
     {
       console.log('Bearer ' + jwt)
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
