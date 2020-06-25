const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : 'LOCAL'

const CONF = {
  LOCAL: {
    BACKEND_URL: 'http://localhost:3000'
  },
  DEVELOPMENT: {
    BACKEND_URL: 'http://localhost:3000'
  },
  PRODUCTION: {
    BACKEND_URL: ''
  }
}

export const CONFIG = CONF[ENV]
