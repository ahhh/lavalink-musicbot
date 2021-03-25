// A wrapper for fetch that allows us to specify default user agents or extra headers
const fetch = require('node-fetch')
module.exports = (url, args = {}) => {
          args.headers = args.headers || {}
          args.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
          return fetch(url, args)
}
