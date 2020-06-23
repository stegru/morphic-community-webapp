import Vue from 'vue'
import Vuex from 'vuex'
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
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
