const globby = require('globby')
const path = require('path')

module.exports = function(source) {
  this.cacheable()
  const callback = this.async()

  globby('src/**/index.js')
  .then( files => {
    files = files.map(file => file.replace(/src\//, ''))
    const lines = files.map(file => `'${file}': () => require('./${file}'),`)
    return callback(null,
      source.replace(' routes = {', ' routes = {\n\t' + lines.join('\n\t')))
  })
}