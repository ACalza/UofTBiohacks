import globby from 'globby'

export default function(source) {
  this.cacheable()
  const target = this.target
  const callback = this.async()

  globby('src/**/index.js')
  .then( (files) => {
    console.log(files)
  })
}
