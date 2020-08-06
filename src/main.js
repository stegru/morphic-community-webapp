import Vue from 'vue'
import Vuex from 'vuex'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
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

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuelidate)
Vue.use(Vuex)
Vue.use(VueLodash, { lodash: lodash })

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
