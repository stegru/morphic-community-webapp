import { HTTP } from '@/services/index'

export function getPublicCommunities () {
  return HTTP.get('/communities/getList')
}

export function createNewCommunity (name) {
  const data = {
    name: name
  }
  return HTTP.post('/v1/communities', data)
}
