import { HTTP } from '@/services/index'

export function login ({ email, password }) {
  const auth = {
    email: email,
    password: password
  }
  return HTTP.post('/user/authenticate', auth)
}

export function register (user) {
  const auth = {
    community: user.communityName,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    subscriptionPlan: user.subscriptionPlan,
    paymentOptions: user.paymentOptions,
    password: user.password
  }
  return HTTP.post('/user/register', auth)
}

export function resetPassword ({ email }) {
  const data = {
    email: email
  }
  return HTTP.post('/user/reset-password', data)
}
