// module.exports = {
//   FRONT_END_URL: "http://localhost:3001"
// }

module.exports = {
  // NOTE dev and prod MUST have identical structure
  dev: {
    STATIC_URL: 'http://localhost:3001'
  },
  prod: {
    STATIC_URL: 'https://2016.uoftbiohacks.com'
    // STATIC_URL: 'https://staging.uoftbiohacks.com'
  }
}
