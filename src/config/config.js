const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : 'LOCAL'

const CONF = {
  LOCAL: {
    BACKEND_URL: 'http://localhost:5002'
  },
  DEVELOPMENT: {
    BACKEND_URL: 'http://api.morphic.dev'
  },
  PRODUCTION: {
    BACKEND_URL: 'https://api.morphic.org'
  }
}

export const CONFIG = CONF[ENV]
