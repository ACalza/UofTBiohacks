let baseUri
if (__DEV__) {
  console.log('USING DEV URL')
  baseUri = 'http://167.114.148.229:3000'
} else {
  console.log('USERING NON_DEV URL')
  // TODO not this shit
  baseUri = 'http://localhost:4000'
  // baseUri = 'https://api.uoftbiohacks.com'
}

export const BASE_URI = baseUri
