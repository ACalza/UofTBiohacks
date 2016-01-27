let baseUri
if (__DEV__) {
  baseUri = 'http://localhost:3000'
} else {
  baseUri = 'https://api.uoftbiohacks.com'
}

export const BASE_URI = baseUri
