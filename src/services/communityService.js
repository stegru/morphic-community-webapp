import { HTTP } from '@/services/index'

export function getPublicCommunities () {
  return HTTP.get('/communities/getList')
}
