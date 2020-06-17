import { HTTP } from '@/services/index'

export function login ({ email, password }) {
  const auth = {
    email: email,
    password: password
  }
  return HTTP.post('/user/authenticate', auth)
}
