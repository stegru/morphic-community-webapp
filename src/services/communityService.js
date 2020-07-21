import { HTTP } from '@/services/index'

export function getUserCommunities (userId) {
  return HTTP.get(`/v1/users/${userId}/communities`)
}

export function createNewCommunity (name) {
  const data = {
    name: name
  }
  return HTTP.post('/v1/communities', data)
}

export function deleteUserCommunity (communityId) {
  return HTTP.delete(`/v1/communities/${communityId}`)
}
