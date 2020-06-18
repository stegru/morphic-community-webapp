import { HTTP } from '@/services/index'

export function login ({ email, password }) {
  const auth = {
    email: email,
    password: password
  }
  return HTTP.post('/user/authenticate', auth)
}

export function register ({ communityName, email, password }) {
  const auth = {
    community: communityName,
    email: email,
    password: password
  }
  return HTTP.post('/user/register', auth)
}
