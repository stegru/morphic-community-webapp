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

export function getCommunity (communityId) {
  return HTTP.get(`/v1/communities/${communityId}`)
}

export function deleteUserCommunity (communityId) {
  return HTTP.delete(`/v1/communities/${communityId}`)
}

export function getCommunityBars (communityId) {
  return HTTP.get(`/v1/communities/${communityId}/bars`)
}

export function createCommunityBar (communityId, data) {
  return HTTP.post(`/v1/communities/${communityId}/bars`, data)
}

export function getCommunityBar (communityId, barId) {
  return HTTP.get(`/v1/communities/${communityId}/bars/${barId}`)
}

export function updateCommunityBar (communityId, barId, bar) {
  return HTTP.put(`/v1/communities/${communityId}/bars/${barId}`, bar)
}

export function getCommunityMembers (communityId) {
  return HTTP.get(`/v1/communities/${communityId}/members`)
}

export function addCommunityMember (communityId, member) {
  return HTTP.post(`/v1/communities/${communityId}/members`, member)
}

export function getCommunityMember (communityId, memberId) {
  return HTTP.get(`/v1/communities/${communityId}/members/${memberId}`)
}

export function updateCommunityMember (communityId, memberId, member) {
  return HTTP.put(`/v1/communities/${communityId}/members/${memberId}`, member)
}

export function inviteCommunityMember (communityId, member) {
  return HTTP.post(`/v1/communities/${communityId}/invitations`, member)
}
