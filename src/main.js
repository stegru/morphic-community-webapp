import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import { HTTP } from '@/services/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const token = localStorage.getItem('token')
if (token) {
  HTTP.defaults.headers.common.Authorization = `Bearer ${token}`
}

HTTP.interceptors.response.use(undefined, function (err) {
  return new Promise((resolve, reject) => {
    if (err.status === 401) {
      this.$store.dispatch('logout')
    }
    throw err
  })
})

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuelidate)
Vue.use(Vuex)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
