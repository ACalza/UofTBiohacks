let baseUri
if (__DEV__) {
  baseUri = 'http://localhost:3000'
} else {
  baseUri = 'http://api.2016.uoftbiohacks.com'
}

export const BASE_URI = baseUri
