import Vue from 'vue'
import Vuex from 'vuex'
import { HTTP } from '@/services/index'
import { login, register, resetPassword } from '@/services/userService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'pending'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
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
    }
  },
  actions: {
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        register(user)
          .then(resp => {
            const token = resp.data.token || 'TS9LoD"!Fz5!|rED4cS{y:o2#M*l.t' // only for dev purposes
            const user = resp.data.user
            localStorage.setItem('token', token)
            HTTP.defaults.headers.common.Authorization = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        login(user)
          .then(resp => {
            const token = resp.data.token || 'TS9LoD"!Fz5!|rED4cS{y:o2#M*l.t' // only for dev purposes
            const user = resp.data.user
            localStorage.setItem('token', token)
            HTTP.defaults.headers.common.Authorization = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
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
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
