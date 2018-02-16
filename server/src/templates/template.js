const fs = require('fs')
const path = require('path')

const html = fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf8')

module.exports = function(body) {
  return html.replace('<%BODY%>', body)
}
