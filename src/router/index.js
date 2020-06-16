import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import UserRegistration from '@/views/UserRegistration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/registration',
    name: 'Registration',
    component: UserRegistration
  }
]

const router = new VueRouter({
  routes
})

export default router
