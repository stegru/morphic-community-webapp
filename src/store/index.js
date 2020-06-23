import Vue from 'vue'
import Vuex from 'vuex'
import { HTTP } from '@/services/index'
import { login } from '@/services/userService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_success (state) {
      state.status = 'loading'
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        login(user)
          .then(resp => {
            const token = resp.data.token || 'TS9LoD"!Fz5!|rED4cS{y:o2#M*l.t'
            const user = resp.data.user
            localStorage.setItem('token', token)
            HTTP.defaults.headers.common.Authorization = token
            commit('auth_success', token, user)
            console.log(resp)
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
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
