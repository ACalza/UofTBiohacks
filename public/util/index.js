import $ from 'jquery'
import { baseUri } from '../services/UriService.js'

export const ajaxPost(body, uri, cb) => {
  $.ajax({
    type: 'POST',
    url: baseUri + uri,
    data: body,
    success: function (data) {
      cb(null, data)
    },
    error: function (xhr, status, err) {
      cb(err, { xhr, status })
    }
  })
}
