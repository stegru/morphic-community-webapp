const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : 'LOCAL'

const CONF = {
  LOCAL: {
    BACKEND_URL: 'http://localhost:5002'
  },
  DEVELOPMENT: {
    BACKEND_URL: 'http://localhost:5002'
  },
  PRODUCTION: {
    BACKEND_URL: ''
  }
}

export const CONFIG = CONF[ENV]
