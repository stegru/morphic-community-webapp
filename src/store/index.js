import Vue from 'vue'
import Vuex from 'vuex'
import { HTTP } from '@/services/index'
import { login, register, resetPassword } from '@/services/userService'
import { createNewCommunity } from '@/services/communityService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    community: {},
    errorMessage: {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'pending'
    },
    auth_success (state, data) {
      state.status = 'success'
      state.token = data.token
      state.user = data.user
    },
    auth_error (state, error) {
      state.status = 'authentication failed'
      state.status = error
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
    reset_password (state) {
      state.status = 'reset_password'
    },
    reset_password_error (state) {
      state.status = 'reset_password_failed'
    },
    new_community (state, community) {
      state.status = 'created_new_community'
      state.community = community
    },
    community_error (state) {
      state.status = 'create_new_community_failed'
    }
  },
  actions: {
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        register(user)
          .then(resp => {
            const data = {
              user: resp.data.user
            }
            commit('auth_success', data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        login(user)
          .then(resp => {
            const data = {
              user: resp.data.user,
              token: resp.data.token
            }
            localStorage.setItem('token', data.token)
            HTTP.defaults.headers.common.Authorization = `Bearer ${data.token}`
            commit('auth_success', data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete HTTP.defaults.headers.common.Authorization
        resolve()
      })
    },
    resetPassword ({ commit }, email) {
      return new Promise((resolve, reject) => {
        resetPassword(email)
          .then(resp => {
            commit('reset_password')
            resolve()
          })
          .catch(err => {
            commit('reset_password_error')
            reject(err)
          })
      })
    },
    newCommunity ({ commit }, name) {
      return new Promise((resolve, reject) => {
        createNewCommunity(name)
          .then(resp => {
            const community = resp.data.community
            commit('new_community', community)
            resolve()
          })
          .catch(err => {
            commit('community_error')
            reject(err)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
